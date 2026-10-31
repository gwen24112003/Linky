// Service des leads du diagnostic facture électronique (opusadvisor.fr/diagnostic-facture-electronique).
// Le site est un export statique : nginx transmet /api/diagnostic-lead à ce service, qui écoute en local.
//   POST /api/diagnostic-lead                     enregistre le lead, envoie le plan et la notification
//   GET  /api/diagnostic-lead/export              CSV des leads (Authorization: Bearer <ADMIN_TOKEN>)
//   GET|POST /api/diagnostic-lead/unsubscribe?t=  désinscription en un clic
//   GET  /api/diagnostic-lead/health              surveillance
import http from 'node:http';
import { timingSafeEqual } from 'node:crypto';
import { config } from './config.ts';
import { openStore, type LeadRow, type Reminder } from './store.ts';
import { notifyMail, prospectMail, sendMail } from './mail.ts';
import { computeDiagnostic, type Diagnostic } from '../../lib/einvoice/diagnostic.ts';
import { QUESTIONS, answerLabel, parseAnswers } from '../../lib/einvoice/questions.ts';

if (config.adminToken.length < 24) {
  console.error('ADMIN_TOKEN manquant ou trop court (24 caractères minimum) : arrêt.');
  process.exit(1);
}

const store = openStore(config.dbPath);
const BASE = '/api/diagnostic-lead';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

// --- Limite d'envois : 5 par adresse IP et par heure, en mémoire ---
const hits = new Map<string, number[]>();
function allow(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < config.rateLimit.windowMs);
  if (recent.length >= config.rateLimit.max) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}
setInterval(() => {
  const now = Date.now();
  for (const [ip, ts] of hits) if (ts.every((t) => now - t >= config.rateLimit.windowMs)) hits.delete(ip);
}, 10 * 60 * 1000).unref();

// --- Petits utilitaires HTTP ---
function clientIp(req: http.IncomingMessage): string {
  const direct = req.socket.remoteAddress ?? '';
  // L'en-tête posé par nginx n'est cru que si la requête vient bien de la machine elle-même.
  const fromProxy = direct === '127.0.0.1' || direct === '::1' || direct === '::ffff:127.0.0.1';
  const real = req.headers['x-real-ip'];
  return fromProxy && typeof real === 'string' && real ? real : direct;
}

function send(res: http.ServerResponse, status: number, body: string, type = 'application/json; charset=utf-8', extra: Record<string, string> = {}) {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store', ...extra });
  res.end(body);
}
const json = (res: http.ServerResponse, status: number, data: unknown) => send(res, status, JSON.stringify(data));

function readBody(req: http.IncomingMessage, limit = 16 * 1024): Promise<string> {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks: Buffer[] = [];
    req.on('data', (c: Buffer) => {
      size += c.length;
      if (size > limit) {
        reject(new Error('too_large'));
        req.destroy();
      } else chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

// --- Validation des champs saisis ---
const CONTROL = /[\u0000-\u001f\u007f]/;
// Pas de lien ni de balise dans un prénom ou un nom d'entreprise : ils sont repris dans nos mails.
const LINKY = /(https?:|:\/\/|www\.|<|>)/i;
const EMAIL = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]{2,}$/;

function text(v: unknown, max: number): string | null {
  if (typeof v !== 'string') return null;
  const s = v.trim().replace(/\s+/g, ' ');
  if (!s || s.length > max || CONTROL.test(s) || LINKY.test(s)) return null;
  return s;
}

function cleanSrc(v: unknown): string {
  const s = typeof v === 'string' ? v.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 40) : '';
  return s || 'direct';
}

function cleanUtm(v: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (!v || typeof v !== 'object') return out;
  for (const k of UTM_KEYS) {
    const val = (v as Record<string, unknown>)[k];
    if (typeof val === 'string' && val.trim() && !CONTROL.test(val)) out[k] = val.trim().slice(0, 100);
  }
  return out;
}

const addDays = (day: string, n: number) => {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

/** Rappels prévus : une relance trois semaines après un verdict « en retard », puis 90 et 30 jours avant l'échéance. */
function planReminders(d: Diagnostic, today: string): Reminder[] {
  const out: Reminder[] = [];
  if (d.verdict === 'EN_RETARD') out.push({ date: addDays(today, 21), kind: 'reception' });
  const aVenir = (d.emission.concerne !== 'non' || d.ereporting.concerne) && !d.emission.enVigueur;
  if (aVenir) {
    for (const before of [90, 30]) {
      const date = addDays(d.emission.date, -before);
      if (date > addDays(today, 7) && !out.some((r) => r.date === date)) out.push({ date, kind: 'echeance' });
    }
  }
  return out.sort((a, b) => a.date.localeCompare(b.date));
}

// --- Routes ---
async function createLead(req: http.IncomingMessage, res: http.ServerResponse) {
  if (!allow(clientIp(req))) return json(res, 429, { ok: false, error: 'rate_limited' });

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(await readBody(req));
    if (!body || typeof body !== 'object') throw new Error('bad');
  } catch (e) {
    return json(res, e instanceof Error && e.message === 'too_large' ? 413 : 400, { ok: false, error: 'invalid' });
  }

  // Piège à robots rempli : on répond comme si tout allait bien, sans rien enregistrer.
  if (typeof body.website === 'string' && body.website.trim()) return json(res, 200, { ok: true, mailSent: false });

  const prenom = text(body.prenom, 60);
  const entreprise = text(body.entreprise, 120);
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const answers = parseAnswers(body.answers);
  if (!prenom || !entreprise || email.length > 254 || !EMAIL.test(email) || body.consent !== true || !answers) {
    return json(res, 400, { ok: false, error: 'invalid' });
  }
  if (answers.q5_outil_nom && (CONTROL.test(answers.q5_outil_nom) || LINKY.test(answers.q5_outil_nom))) delete answers.q5_outil_nom;

  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const d = computeDiagnostic(answers, now);
  const src = cleanSrc(body.src);
  const utm = cleanUtm(body.utm);
  const reminders = planReminders(d, today);

  // Le lead est enregistré avant tout envoi : un mail en échec ne le fait pas perdre.
  const { id, unsubToken } = store.insert({
    prenom,
    email,
    entreprise,
    secteur: answers.q4_secteur,
    answers,
    verdict: d.verdict,
    amende_estimee: d.amende?.montant ?? null,
    src,
    utm,
    consent: true,
    plan: d.plan,
    reminders,
  });
  console.log(`lead ${id} enregistré (${d.verdict}, src=${src})`);

  const mailSent = await sendMail(prospectMail({ prenom, email, entreprise }, d, unsubToken, reminders.length > 0));
  if (mailSent) store.markMailSent(id);
  const notify = notifyMail({ id, prenom, email, entreprise, src, utm }, answers, d, mailSent);
  if (notify) await sendMail(notify);

  json(res, 200, { ok: true, mailSent });
}

function authorized(req: http.IncomingMessage): boolean {
  const header = req.headers.authorization ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  const a = Buffer.from(token);
  const b = Buffer.from(config.adminToken);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Cellule CSV (séparateur « ; » pour Excel en français), protégée contre les formules. */
function cell(v: unknown): string {
  let s = v === null || v === undefined ? '' : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[";\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function exportCsv(req: http.IncomingMessage, res: http.ServerResponse) {
  if (!authorized(req)) return send(res, 401, 'Accès refusé\n', 'text/plain; charset=utf-8', { 'WWW-Authenticate': 'Bearer' });
  const cols = ['id', 'created_at', 'prenom', 'email', 'entreprise', 'secteur', 'verdict', 'amende_estimee', 'src', 'utm', 'consent', 'mail_sent', 'unsubscribed_at'];
  const head = [...cols, ...QUESTIONS.map((q) => q.id), 'q5_outil_nom', 'answers'];
  const lines = store.all().map((r: LeadRow) => {
    const a = JSON.parse(r.answers) as Record<string, string | string[]>;
    const labels = QUESTIONS.map((q) => {
      const v = a[q.id];
      return Array.isArray(v) ? v.map((x) => answerLabel(q.id, x)).join(', ') : answerLabel(q.id, v ?? '');
    });
    return [...cols.map((c) => (r as unknown as Record<string, unknown>)[c]), ...labels, a.q5_outil_nom ?? '', r.answers].map(cell).join(';');
  });
  const csv = '﻿' + [head.join(';'), ...lines].join('\r\n') + '\r\n';
  send(res, 200, csv, 'text/csv; charset=utf-8', {
    'Content-Disposition': `attachment; filename="leads-diagnostic-${new Date().toISOString().slice(0, 10)}.csv"`,
  });
}

const page = (title: string, message: string, extra = '') =>
  `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title}</title></head>
<body style="margin:0;background:#FAF7F0;font-family:Arial,Helvetica,sans-serif;color:#1A2332;"><main style="max-width:560px;margin:0 auto;padding:64px 20px;">
<h1 style="font-size:26px;">${title}</h1><p style="font-size:17px;line-height:1.55;">${message}</p>${extra}
<p><a href="/" style="color:#1A2332;">Retour sur opusadvisor.fr</a></p></main></body></html>`;

async function unsubscribe(req: http.IncomingMessage, res: http.ServerResponse, url: URL) {
  const token = url.searchParams.get('t') ?? '';
  const lead = token ? store.byToken(token) : undefined;
  const html = (status: number, title: string, message: string, extra = '') => send(res, status, page(title, message, extra), 'text/html; charset=utf-8');
  if (!lead) return html(404, 'Lien inconnu', "Ce lien de désinscription n'est pas valide. Écrivez-nous à enzo@opusadvisor.fr et nous vous retirerons de la liste.");

  if (req.method === 'POST') {
    if (!lead.unsubscribed_at) store.unsubscribe(lead.email);
    console.log(`lead ${lead.id} désinscrit`);
    // Désinscription en un clic depuis la messagerie (RFC 8058) ou depuis le bouton de la page.
    if ((req.headers['content-type'] ?? '').includes('application/x-www-form-urlencoded') && url.searchParams.get('page') !== '1') {
      return send(res, 200, 'ok\n', 'text/plain; charset=utf-8');
    }
    return html(200, 'Vous êtes désinscrit', 'Vous ne recevrez plus de mail de notre part au sujet de la facturation électronique.');
  }

  if (lead.unsubscribed_at) return html(200, 'Vous êtes désinscrit', 'Vous ne recevrez plus de mail de notre part au sujet de la facturation électronique.');
  // Le lien du mail désinscrit dès l'ouverture de la page ; les robots qui vérifient les liens
  // sans exécuter le script ne désinscrivent personne, et le bouton reste là sans JavaScript.
  const action = `${BASE}/unsubscribe?t=${encodeURIComponent(token)}&page=1`;
  return html(
    200,
    'Désinscription',
    'Un instant, nous enregistrons votre désinscription.',
    `<form id="u" method="post" action="${action}"><button type="submit" style="font-size:16px;padding:12px 20px;border-radius:8px;border:0;background:#1A2332;color:#FAF7F0;cursor:pointer;">Confirmer la désinscription</button></form>
<script>document.getElementById('u').submit();</script>`,
  );
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? '/', 'http://localhost');
    const path = url.pathname.replace(/\/+$/, '');
    if (path === BASE && req.method === 'POST') return await createLead(req, res);
    if (path === `${BASE}/export` && req.method === 'GET') return exportCsv(req, res);
    if (path === `${BASE}/unsubscribe` && (req.method === 'GET' || req.method === 'POST')) return await unsubscribe(req, res, url);
    if (path === `${BASE}/health` && req.method === 'GET') return json(res, 200, { ok: true });
    json(res, 404, { ok: false, error: 'not_found' });
  } catch (e) {
    console.error('Erreur interne :', e);
    if (!res.headersSent) json(res, 500, { ok: false, error: 'server' });
  }
});

server.listen(config.port, config.host, () => {
  console.log(`lead-api : http://${config.host}:${config.port}${BASE} (base ${config.dbPath})`);
});

for (const sig of ['SIGTERM', 'SIGINT'] as const) {
  process.on(sig, () => {
    server.close(() => {
      store.close();
      process.exit(0);
    });
  });
}
