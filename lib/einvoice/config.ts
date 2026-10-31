// Réglages commerciaux du diagnostic facture électronique (les règles fiscales sont dans rules.ts).

/** Prise de rendez-vous de l'appel de conseil. À remplacer par l'événement de 20 min quand il existe sur cal.com. */
export const BOOKING_URL = 'https://cal.com/enzo-monnier-qc1nqv/30min';

/** Prix de l'offre « Mise en conformité clé en main », par exemple « 690 € ». Vide : le prix n'est pas affiché. */
export const OFFER_PRICE = '';

/** Service d'enregistrement des leads (services/lead-api), servi sur le même domaine par nginx. */
export const LEAD_API_URL = '/api/diagnostic-lead';

/** Page qui porte la politique de confidentialité (section « Données personnelles »). */
export const PRIVACY_URL = '/mentions-legales/';
