// Mails du diagnostic : plan d'action au prospect, notification à Opus Advisor, rappels.
import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { config, smtpConfigured } from './config.ts';
import type { Diagnostic, PlanStep } from '../../lib/einvoice/diagnostic.ts';
import { DATES, DISCLAIMER, OFFICIAL_LINKS, dateFr, euros, typo } from '../../lib/einvoice/rules.ts';
import { QUESTIONS, answerLabel, type Answers } from '../../lib/einvoice/questions.ts';
import { BOOKING_URL } from '../../lib/einvoice/config.ts';

const NAVY = '#1A2332';
const GOLD_INK = '#8A6A1C';

interface Mail {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  headers?: Record<string, string>;
}

let transporter: Transporter | null = null;

/** Envoie un mail ; renvoie false (sans lever d'erreur) si le SMTP manque ou refuse l'envoi. */
export async function sendMail(mail: Mail): Promise<boolean> {
  if (!smtpConfigured()) {
    console.warn(`SMTP non configuré : mail « ${mail.subject} » non envoyé`);
    return false;
  }
  const { host, port, user, pass } = config.smtp;
  transporter ??= nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  try {
    await transporter.sendMail({ from: config.mailFrom, ...mail, subject: typo(mail.subject), text: typo(mail.text) });
    return true;
  } catch (e) {
    console.error(`Échec de l'envoi du mail « ${mail.subject} » : ${e instanceof Error ? e.message : String(e)}`);
    return false;
  }
}

const esc = (s: string) => typo(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const unsubscribeUrl = (token: string) => `${config.siteUrl}/api/diagnostic-lead/unsubscribe?t=${token}`;

/** Gabarit HTML commun : une colonne, couleurs du site, lisible sans images. */
function layout(body: string, unsubToken: string): string {
  return `<!doctype html><html lang="fr"><body style="margin:0;padding:0;background:#FAF7F0;">
<div style="max-width:600px;margin:0 auto;padding:28px 20px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.55;color:${NAVY};">
${body}
<p style="margin:32px 0 0;font-size:13px;line-height:1.5;color:#6b7280;">Vous recevez ce mail parce que vous avez fait le diagnostic facture électronique sur opusadvisor.fr.
<a href="${unsubscribeUrl(unsubToken)}" style="color:#6b7280;">Se désinscrire en un clic</a>.</p>
</div></body></html>`;
}

const button = (href: string, label: string) =>
  `<p style="margin:24px 0;"><a href="${esc(href)}" style="display:inline-block;background:${NAVY};color:#FAF7F0;text-decoration:none;font-weight:bold;padding:12px 20px;border-radius:8px;">${esc(label)}</a></p>`;

/** « Avant le 1er mars 2027 » pour une action, « Le 1er septembre 2027 » pour une échéance. */
const stepDate = (s: PlanStep) => `${s.echeance ? 'Le' : 'Avant le'} ${dateFr(s.date)}`;

const planHtml = (plan: PlanStep[]) =>
  plan
    .map(
      (s, i) => `<div style="border-top:1px solid #e5e1d6;padding:12px 0;">
<div style="font-size:13px;font-weight:bold;color:${GOLD_INK};">Étape ${i + 1} · ${stepDate(s)}</div>
<div style="font-weight:bold;">${esc(s.titre)}</div>
<div style="color:#374151;">${esc(s.detail)}</div></div>`,
    )
    .join('');

const planText = (plan: PlanStep[]) => plan.map((s, i) => `${i + 1}. ${stepDate(s)} : ${s.titre}. ${s.detail}`).join('\n');

function statusLines(d: Diagnostic): [string, string][] {
  const lines: [string, string][] = [
    [`Réception (obligatoire depuis le ${dateFr(DATES.reception)})`, [d.reception.texte, d.reception.risque].filter(Boolean).join(' ')],
    [d.emission.concerne === 'non' ? 'Émission' : `Émission (${d.emission.enVigueur ? 'depuis le' : 'à partir du'} ${dateFr(d.emission.date)})`, d.emission.texte],
  ];
  if (d.ereporting.concerne && d.ereporting.texte) lines.push(['E-reporting', d.ereporting.texte]);
  if (d.amende) lines.push(['Amende indicative', d.amende.texte]);
  lines.push(['Votre outil', d.recommandation]);
  return lines;
}

const officialLinksHtml = `<p style="font-size:13px;color:#6b7280;">${esc(DISCLAIMER)}<br>
<a href="${OFFICIAL_LINKS.faqImpots.url}" style="color:#6b7280;">${esc(OFFICIAL_LINKS.faqImpots.label)}</a> ·
<a href="${OFFICIAL_LINKS.servicePublic.url}" style="color:#6b7280;">${esc(OFFICIAL_LINKS.servicePublic.label)}</a></p>`;

const officialLinksText = `${DISCLAIMER}\n${OFFICIAL_LINKS.faqImpots.label} : ${OFFICIAL_LINKS.faqImpots.url}\n${OFFICIAL_LINKS.servicePublic.label} : ${OFFICIAL_LINKS.servicePublic.url}`;

const unsubHeaders = (token: string) => ({
  'List-Unsubscribe': `<${unsubscribeUrl(token)}>`,
  'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
});

/** Mail au prospect : verdict et plan d'action daté. */
export function prospectMail(lead: { prenom: string; email: string; entreprise: string }, d: Diagnostic, unsubToken: string, withReminders: boolean): Mail {
  const lines = statusLines(d);
  const reminderNote = withReminders ? 'Nous vous enverrons un rappel avant votre prochaine échéance.' : '';
  const html = layout(
    `<p>Bonjour ${esc(lead.prenom)},</p>
<p>Voici le résultat de votre diagnostic pour ${esc(lead.entreprise)}.</p>
<p style="display:inline-block;margin:8px 0 0;padding:4px 12px;border:1px solid ${GOLD_INK};border-radius:999px;font-size:12px;font-weight:bold;letter-spacing:.12em;text-transform:uppercase;color:${GOLD_INK};">Verdict : ${esc(d.verdictLabel)}</p>
<h1 style="font-size:22px;line-height:1.3;margin:16px 0 8px;">${esc(d.titre)}</h1>
<p>${esc(d.resume)}</p>
${lines.map(([k, v]) => `<div style="border-top:1px solid #e5e1d6;padding:12px 0;"><div style="font-weight:bold;">${esc(k)}</div><div style="color:#374151;">${esc(v)}</div></div>`).join('')}
<h2 style="font-size:19px;margin:28px 0 4px;">Votre plan d'action</h2>
${planHtml(d.plan)}
${reminderNote ? `<p>${reminderNote}</p>` : ''}
<p>Vous préférez qu'on regarde votre situation ensemble ? Un appel de 20 minutes suffit, sans engagement.</p>
${button(BOOKING_URL, 'Réserver un appel de 20 min')}
<p>Enzo Monnier<br>Opus Advisor · <a href="${config.siteUrl}" style="color:${NAVY};">opusadvisor.fr</a></p>
${officialLinksHtml}`,
    unsubToken,
  );
  const text = [
    `Bonjour ${lead.prenom},`,
    `Voici le résultat de votre diagnostic pour ${lead.entreprise}.`,
    `VERDICT : ${d.verdictLabel.toUpperCase()}`,
    d.titre,
    d.resume,
    ...lines.map(([k, v]) => `${k}\n${v}`),
    `VOTRE PLAN D'ACTION\n${planText(d.plan)}`,
    reminderNote,
    `Vous préférez qu'on regarde votre situation ensemble ? Réservez un appel de 20 minutes : ${BOOKING_URL}`,
    'Enzo Monnier\nOpus Advisor · opusadvisor.fr',
    officialLinksText,
    `Se désinscrire en un clic : ${unsubscribeUrl(unsubToken)}`,
  ]
    .filter(Boolean)
    .join('\n\n');
  return {
    to: lead.email,
    subject: `Votre plan d'action facture électronique (${d.verdictLabel.toLowerCase()})`,
    html,
    text,
    headers: unsubHeaders(unsubToken),
  };
}

/** Notification interne : toutes les réponses, pour rappeler le prospect. */
export function notifyMail(
  lead: { id: number; prenom: string; email: string; entreprise: string; src: string; utm: Record<string, string> },
  answers: Answers,
  d: Diagnostic,
  prospectMailSent: boolean,
): Mail | null {
  if (!config.notifyEmail) return null;
  const rows: [string, string][] = [
    ['Prénom', lead.prenom],
    ['Email', lead.email],
    ['Entreprise', lead.entreprise],
    ['Verdict', d.verdictLabel],
    ['Amende indicative', d.amende ? euros(d.amende.montant) + ' par an' : 'non concerné'],
    ['Source', lead.src],
    ['UTM', Object.entries(lead.utm).map(([k, v]) => `${k}=${v}`).join(', ') || 'aucun'],
    ...QUESTIONS.map((q): [string, string] => {
      const v = answers[q.id];
      const label = Array.isArray(v) ? v.map((x) => answerLabel(q.id, x)).join(', ') : answerLabel(q.id, v);
      return [q.label, q.id === 'q5_outil' && answers.q5_outil_nom ? `${label} (${answers.q5_outil_nom})` : label];
    }),
    ['Plan envoyé au prospect', prospectMailSent ? 'oui' : 'non, à renvoyer à la main'],
  ];
  return {
    to: config.notifyEmail,
    replyTo: lead.email,
    subject: `Nouveau lead diagnostic : ${lead.entreprise} (${d.verdictLabel})`,
    text: `Lead n° ${lead.id}\n\n${rows.map(([k, v]) => `${k} : ${v}`).join('\n')}\n\nPlan :\n${planText(d.plan)}`,
    html: `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${NAVY};"><p>Lead n° ${lead.id}</p><table cellpadding="6" style="border-collapse:collapse;">${rows
      .map(([k, v]) => `<tr><td style="color:#6b7280;vertical-align:top;">${esc(k)}</td><td><b>${esc(v)}</b></td></tr>`)
      .join('')}</table><p><b>Plan</b></p>${planHtml(d.plan)}</div>`,
  };
}

/** Rappel : trois semaines après un verdict « en retard », ou avant l'échéance d'émission. */
export function reminderMail(
  lead: { prenom: string; email: string; unsub_token: string },
  kind: 'reception' | 'echeance',
  plan: PlanStep[],
  today: string,
): Mail {
  // La relance « plateforme » reprend tout le plan, dont la désignation de la plateforme, même si sa date est passée.
  const upcoming = kind === 'reception' ? plan : plan.filter((s) => s.date >= today);
  const deadline = plan.at(-1)!;
  const intro =
    kind === 'reception'
      ? "Il y a trois semaines, votre diagnostic indiquait qu'il vous manquait une plateforme agréée pour recevoir vos factures. Si c'est réglé, parfait. Sinon, c'est la première étape de votre plan."
      : `Votre échéance du ${dateFr(deadline.date)} approche (${deadline.titre.toLowerCase()}). Voici les étapes qui restent dans votre plan.`;
  const subject =
    kind === 'reception' ? 'Votre plateforme de réception est-elle choisie ?' : `Rappel : le ${dateFr(deadline.date)} approche`;
  return {
    to: lead.email,
    subject,
    headers: unsubHeaders(lead.unsub_token),
    html: layout(
      `<p>Bonjour ${esc(lead.prenom)},</p><p>${esc(intro)}</p>
<h2 style="font-size:19px;margin:24px 0 4px;">Les prochaines étapes</h2>
${planHtml(upcoming.length ? upcoming : plan)}
<p>Un appel de 20 minutes suffit souvent à débloquer la suite.</p>
${button(BOOKING_URL, 'Réserver un appel de 20 min')}
<p>Enzo Monnier<br>Opus Advisor</p>
${officialLinksHtml}`,
      lead.unsub_token,
    ),
    text: [
      `Bonjour ${lead.prenom},`,
      intro,
      `LES PROCHAINES ÉTAPES\n${planText(upcoming.length ? upcoming : plan)}`,
      `Un appel de 20 minutes suffit souvent à débloquer la suite : ${BOOKING_URL}`,
      'Enzo Monnier\nOpus Advisor',
      officialLinksText,
      `Se désinscrire en un clic : ${unsubscribeUrl(lead.unsub_token)}`,
    ].join('\n\n'),
  };
}
