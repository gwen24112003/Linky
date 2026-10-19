// Mesure d'audience Umami, auto-hébergée sur le VPS (voir infra/umami). Sans cookie.
// Le script est servi par opusadvisor.fr/s.js et n'envoie rien hors du domaine opusadvisor.fr.
export const UMAMI_WEBSITE_ID = 'c06738dc-ecbf-4865-b2e6-39bea1b1a70c';

type EventData = Record<string, string | number>;

declare global {
  interface Window {
    umami?: { track: (name: string, data?: EventData) => void };
  }
}

/** Enregistre un événement ; ne fait rien si le script est bloqué ou pas encore chargé. */
export function track(name: string, data?: EventData) {
  try {
    window.umami?.track(name, data);
  } catch {
    // La mesure ne doit jamais casser la page.
  }
}
