// Envoie les rappels arrivés à échéance. Lancé chaque matin par opus-lead-reminders.timer.
// Ne concerne que les leads qui ont consenti et ne se sont pas désinscrits.
import { config } from './config.ts';
import { openStore, type Reminder } from './store.ts';
import { reminderMail, sendMail } from './mail.ts';
import type { PlanStep } from '../../lib/einvoice/diagnostic.ts';

const store = openStore(config.dbPath);
const today = new Date().toISOString().slice(0, 10);
let sent = 0;
let failed = 0;

for (const lead of store.active()) {
  const reminders = JSON.parse(lead.reminders) as Reminder[];
  // Un seul rappel par lead et par passage, le plus ancien en attente.
  const due = reminders.find((r) => !r.sent_at && r.date <= today);
  if (!due) continue;
  const plan = JSON.parse(lead.plan) as PlanStep[];
  const ok = await sendMail(reminderMail(lead, due.kind, plan, today));
  if (ok) {
    // Les rappels en retard de plus d'une semaine sont marqués comme passés, pour ne pas les envoyer d'un coup.
    for (const r of reminders) if (!r.sent_at && r.date <= today) r.sent_at = r === due ? new Date().toISOString() : 'skipped';
    store.saveReminders(lead.id, reminders);
    sent++;
  } else failed++;
}

console.log(`rappels du ${today} : ${sent} envoyé(s), ${failed} en échec`);
store.close();
process.exit(failed > 0 && sent === 0 ? 1 : 0);
