// Stockage des leads dans SQLite, avec le module intégré à Node (node:sqlite) : aucune dépendance native.
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { randomBytes } from 'node:crypto';

export interface Reminder {
  date: string;
  kind: 'reception' | 'echeance';
  sent_at?: string;
}

export interface NewLead {
  prenom: string;
  email: string;
  entreprise: string;
  secteur: string;
  answers: unknown;
  verdict: string;
  amende_estimee: number | null;
  src: string;
  utm: Record<string, string>;
  consent: boolean;
  plan: unknown;
  reminders: Reminder[];
}

export interface LeadRow {
  id: number;
  created_at: string;
  prenom: string;
  email: string;
  entreprise: string;
  secteur: string;
  answers: string;
  verdict: string;
  amende_estimee: number | null;
  src: string;
  utm: string;
  consent: number;
  plan: string;
  mail_sent: number;
  reminders: string;
  unsub_token: string;
  unsubscribed_at: string | null;
}

export type Store = ReturnType<typeof openStore>;

export function openStore(path: string) {
  mkdirSync(dirname(path), { recursive: true });
  const db = new DatabaseSync(path);
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA busy_timeout = 5000;
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL,
      prenom TEXT NOT NULL,
      email TEXT NOT NULL,
      entreprise TEXT NOT NULL,
      secteur TEXT NOT NULL,
      answers TEXT NOT NULL,
      verdict TEXT NOT NULL,
      amende_estimee INTEGER,
      src TEXT NOT NULL,
      utm TEXT NOT NULL,
      consent INTEGER NOT NULL,
      plan TEXT NOT NULL,
      mail_sent INTEGER NOT NULL DEFAULT 0,
      reminders TEXT NOT NULL DEFAULT '[]',
      unsub_token TEXT NOT NULL UNIQUE,
      unsubscribed_at TEXT
    );
    CREATE INDEX IF NOT EXISTS leads_email ON leads (email);
  `);

  const insert = db.prepare(`
    INSERT INTO leads (created_at, prenom, email, entreprise, secteur, answers, verdict, amende_estimee, src, utm, consent, plan, reminders, unsub_token)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const byId = db.prepare('SELECT * FROM leads WHERE id = ?');
  const byToken = db.prepare('SELECT * FROM leads WHERE unsub_token = ?');
  const setMailSent = db.prepare('UPDATE leads SET mail_sent = 1 WHERE id = ?');
  const setReminders = db.prepare('UPDATE leads SET reminders = ? WHERE id = ?');
  const unsubscribeEmail = db.prepare('UPDATE leads SET unsubscribed_at = ? WHERE email = ? AND unsubscribed_at IS NULL');
  const all = db.prepare('SELECT * FROM leads ORDER BY id');
  const active = db.prepare('SELECT * FROM leads WHERE consent = 1 AND unsubscribed_at IS NULL ORDER BY id');

  return {
    /** Enregistre un lead et renvoie son id et son jeton de désinscription. */
    insert(lead: NewLead): { id: number; unsubToken: string } {
      const unsubToken = randomBytes(18).toString('base64url');
      const r = insert.run(
        new Date().toISOString(),
        lead.prenom,
        lead.email,
        lead.entreprise,
        lead.secteur,
        JSON.stringify(lead.answers),
        lead.verdict,
        lead.amende_estimee,
        lead.src,
        JSON.stringify(lead.utm),
        lead.consent ? 1 : 0,
        JSON.stringify(lead.plan),
        JSON.stringify(lead.reminders),
        unsubToken,
      );
      return { id: Number(r.lastInsertRowid), unsubToken };
    },
    get: (id: number) => byId.get(id) as LeadRow | undefined,
    byToken: (token: string) => byToken.get(token) as LeadRow | undefined,
    markMailSent: (id: number) => void setMailSent.run(id),
    saveReminders: (id: number, reminders: Reminder[]) => void setReminders.run(JSON.stringify(reminders), id),
    /** Désinscrit l'adresse de toutes ses demandes ; renvoie le nombre de lignes modifiées. */
    unsubscribe: (email: string) => Number(unsubscribeEmail.run(new Date().toISOString(), email).changes),
    all: () => all.all() as unknown as LeadRow[],
    active: () => active.all() as unknown as LeadRow[],
    close: () => db.close(),
  };
}
