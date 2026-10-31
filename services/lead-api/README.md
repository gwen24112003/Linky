# Service des leads du diagnostic facture électronique

La page `/diagnostic-facture-electronique` est statique (export Next). Ce petit service Node reçoit les leads, les enregistre dans SQLite et envoie les mails. nginx lui transmet `/api/diagnostic-lead` sur le même domaine.

- `POST /api/diagnostic-lead` : vérifie les champs et les réponses, recalcule le diagnostic côté serveur (`lib/einvoice`), enregistre le lead, puis envoie le plan au prospect et la notification. Si un mail échoue, le lead reste enregistré (`mail_sent = 0`).
- `GET /api/diagnostic-lead/export` : CSV de tous les leads (séparateur `;`, ouvrable dans Excel), avec l'en-tête `Authorization: Bearer <ADMIN_TOKEN>`.
- `GET|POST /api/diagnostic-lead/unsubscribe?t=…` : désinscription en un clic (lien du mail et bouton de la messagerie, RFC 8058).
- Protection : piège à robots (champ `website`), 5 envois par IP et par heure, aucun lien ni balise accepté dans le prénom ou l'entreprise.
- Rappels : `reminders.ts`, lancé chaque matin à 9 h 30 (`opus-lead-reminders.timer`). Il envoie une relance trois semaines après un verdict « en retard », puis un rappel 90 et 30 jours avant l'échéance d'émission. Il ne touche que les leads consentants et non désinscrits.

Aucune dépendance native : SQLite vient de Node (`node:sqlite`), et Node exécute le TypeScript tel quel (Node 22.18 ou plus récent). Seule dépendance : `nodemailer`.

## Variables d'environnement

| Variable | Rôle |
|---|---|
| `SMTP_HOST`, `SMTP_PORT` | `smtp.gmail.com`, `465` |
| `SMTP_USER` | `enzo@opusadvisor.fr` |
| `SMTP_PASS` | mot de passe d'application Google, jamais le mot de passe du compte |
| `LEAD_NOTIFY_EMAIL` | reçoit la notification de chaque lead |
| `ADMIN_TOKEN` | protège l'export CSV (24 caractères minimum ; le service refuse de démarrer sans) |
| `MAIL_FROM` | facultatif, par défaut `"Opus Advisor" <SMTP_USER>` |
| `DB_PATH` | facultatif, par défaut `data/leads.db` à la racine du dépôt (ignoré par git) ; sur le VPS `/var/lib/opus-lead-api/leads.db` |
| `PORT`, `SITE_URL` | facultatifs, `3101` et `https://opusadvisor.fr` |

Sur le VPS, elles sont dans `/etc/opus-lead-api.env` (root:opuslead, 640). Le modèle est `infra/lead-api/opus-lead-api.env.example`.

## En local

```bash
cd services/lead-api && npm ci
ADMIN_TOKEN=un-jeton-de-test-assez-long-0000 npm start
```

Sans SMTP configuré, les leads sont enregistrés et les mails simplement journalisés comme non envoyés. Vérification des types : `npm run check`. Tests du calcul : `npm test` à la racine du dépôt.

## Sur le VPS

Installation (une fois, après la fusion dans `main`) : voir `infra/README.md`, section « Diagnostic facture électronique ».

- Journal : `journalctl -u opus-lead-api -f`, rappels : `journalctl -u opus-lead-reminders`
- Export depuis le PC : `ssh opus-vps sudo leads-export > leads.csv`
- Mot de passe SMTP : `ssh -t opus-vps sudo lead-api-smtp`
- Mise à jour : automatique. `opus-pull.service` lance aussi `opus-lead-api-pull`, qui récupère `services/lead-api` et `lib/einvoice` depuis `main` et redémarre le service s'ils ont changé.
