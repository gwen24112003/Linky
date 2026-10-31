// Réglages du service, lus dans l'environnement (sur le VPS : /etc/opus-lead-api.env, voir README.md).
import { dirname, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// Racine du dépôt, depuis services/lead-api (TypeScript exécuté tel quel) ou depuis la version compilée sous dist/.
const HERE = dirname(fileURLToPath(import.meta.url));
const DIST = `${sep}dist${sep}`;
const ROOT = join(HERE.includes(DIST) ? HERE.slice(0, HERE.indexOf(DIST)) : HERE, '..', '..');
const env = process.env;

export const config = {
  host: env.HOST || '127.0.0.1',
  port: Number(env.PORT || 3101),
  /** Base SQLite, hors du dossier public. Par défaut data/leads.db à la racine du dépôt (ignoré par git). */
  dbPath: env.DB_PATH || join(ROOT, 'data', 'leads.db'),
  siteUrl: (env.SITE_URL || 'https://opusadvisor.fr').replace(/\/$/, ''),
  smtp: {
    host: env.SMTP_HOST || '',
    port: Number(env.SMTP_PORT || 465),
    user: env.SMTP_USER || '',
    pass: env.SMTP_PASS || '',
  },
  /** Expéditeur des mails ; par défaut « Opus Advisor » avec l'adresse SMTP_USER. */
  mailFrom: env.MAIL_FROM || (env.SMTP_USER ? `"Opus Advisor" <${env.SMTP_USER}>` : ''),
  /** Adresse qui reçoit la notification de chaque nouveau lead. */
  notifyEmail: env.LEAD_NOTIFY_EMAIL || '',
  /** Protège l'export CSV (en-tête Authorization: Bearer <ADMIN_TOKEN>). */
  adminToken: env.ADMIN_TOKEN || '',
  rateLimit: { max: 5, windowMs: 60 * 60 * 1000 },
};

// Sans SMTP_PASS, l'envoi passe sans authentification : c'est le cas du relais Google Workspace
// (smtp-relay.gmail.com), qui reconnaît le serveur à son adresse IP.
export const smtpConfigured = () => Boolean(config.smtp.host && config.mailFrom);
