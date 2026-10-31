// Règles de la réforme de la facturation électronique utilisées par le diagnostic.
// Toutes les dates, tous les montants et tous les textes réglementaires sont ici, et nulle part
// ailleurs : à relire et à redater (RULES_UPDATED_AT) à chaque évolution des textes.
// Sources : FAQ « Tout savoir sur la facturation électronique » (impots.gouv.fr),
// entreprendre.service-public.gouv.fr (F39785), CGI art. 289 bis, 1737 et 1788 D.

import type { Volume } from './questions.ts';

export const RULES_UPDATED_AT = '2026-10-31';

export const DATES = {
  /** Réception obligatoire pour toutes les entreprises établies en France. */
  reception: '2026-09-01',
  /** Émission et e-reporting : grandes entreprises et ETI (250 salariés ou plus, ou CA supérieur à 50 M€). */
  emissionGrandes: '2026-09-01',
  /** Émission et e-reporting : PME et micro-entreprises. */
  emissionPme: '2027-09-01',
} as const;

export const AMENDES = {
  /** Par facture non émise au format électronique (CGI art. 1737). */
  parFacture: 50,
  plafondAnnuel: 15_000,
  /** Réception sans plateforme agréée : mise en demeure, puis amende si rien ne change (CGI art. 1737, IV bis). */
  miseEnDemeureMois: 3,
  receptionPremiere: 500,
  receptionSuivantes: 1_000,
} as const;

/** Milieu de chaque tranche de la question 7 ; « plus de 200 » compte pour 300 (le plafond est atteint bien avant). */
export const VOLUME_MILIEU: Record<Volume, number> = { '0-10': 5, '10-50': 30, '50-200': 125, '200+': 300 };

export const OFFICIAL_LINKS = {
  faqImpots: {
    label: 'La facturation électronique sur impots.gouv.fr (FAQ)',
    url: 'https://www.impots.gouv.fr/professionnel/je-passe-la-facturation-electronique',
  },
  servicePublic: {
    label: 'Se mettre en conformité, sur entreprendre.service-public.gouv.fr',
    url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F39785',
  },
  listePa: {
    label: 'La liste officielle des plateformes agréées',
    url: 'https://www.impots.gouv.fr/je-consulte-la-liste-des-plateformes-agreees',
  },
} as const;

/** Liens partenaires (affiliation) à proposer plus tard. Vide : aucune plateforme n'est citée. */
export const PARTNER_LINKS: { name: string; url: string; note?: string }[] = [];

const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

/** « 2027-09-01 » → « 1er septembre 2027 » (espace insécable entre le jour et le mois). */
export function dateFr(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
  return `${d === 1 ? '1er' : d} ${MOIS[m - 1]} ${y}`;
}

/** 15000 → « 15 000 € », sans retour à la ligne au milieu du montant. */
export function euros(n: number): string {
  return `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €`;
}

/** Espace insécable avant « : ? ! ; », pour l'affichage (page et mails). */
export function typo(s: string): string {
  return s.replace(/ ([:?!;])/g, ' $1');
}

export const DISCLAIMER = `Information générale à jour au ${dateFr(RULES_UPDATED_AT)}. Elle ne remplace pas l'avis de votre expert-comptable.`;

export const VERDICT_LABELS = {
  EN_RETARD: 'En retard',
  A_PREPARER: 'À préparer',
  EN_REGLE: "En règle pour l'instant",
} as const;

export const TEXTS = {
  verdict: {
    retardTitre: 'Il vous manque une plateforme agréée pour recevoir vos factures.',
    retardResume: `La réception est obligatoire depuis le ${dateFr(DATES.reception)}. L'administration commence par une mise en demeure : il est encore temps de vous mettre en règle.`,
    retardResumeExonere: `Votre activité exonérée ne vous dispense pas de la réception, obligatoire depuis le ${dateFr(DATES.reception)}. L'administration commence par une mise en demeure : il est encore temps.`,
    preparerTitre: (date: string) => `Votre réception est en place. Prochaine étape : l'émission, le ${date}.`,
    preparerTitreEreporting: (date: string) => `Votre réception est en place. Prochaine étape : l'e-reporting, le ${date}.`,
    preparerTitreEnVigueur: (date: string) => `Votre réception est en place. Vérifiez votre émission, obligatoire depuis le ${date}.`,
    preparerResume: 'Vous avez le temps de vous organiser. Le plus long est souvent de relier votre outil de facturation à la plateforme : mieux vaut le lancer tôt.',
    preparerResumeEnVigueur: "Chaque facture à une entreprise française doit déjà passer par votre plateforme. Contrôlez que c'est le cas et régularisez celles qui n'y sont pas passées.",
    regleTitre: "Vous êtes en règle pour l'instant.",
    regleResume: "Votre plateforme couvre la réception, et vos réponses ne font apparaître ni émission ni e-reporting à prévoir. Gardez un œil sur l'évolution de votre activité.",
    regleResumeExonere: "Votre plateforme couvre la réception, et vos opérations exonérées ne sont pas concernées par l'émission. Rien d'autre à faire tant que votre activité reste exonérée.",
  },
  reception: {
    ok: "Vous recevez vos factures par une plateforme agréée : c'est l'obligation en vigueur. Vérifiez avec elle que votre entreprise figure dans l'annuaire des destinataires, sinon vos fournisseurs ne peuvent pas vous envoyer de facture électronique.",
    retard: `Depuis le ${dateFr(DATES.reception)}, toute entreprise établie en France doit recevoir ses factures par une plateforme agréée, y compris en franchise de TVA ou avec une activité exonérée. Vous n'en avez pas encore désigné.`,
    inconnu: `Une plateforme agréée est un service validé par l'administration, qui reçoit et transmet les factures électroniques. Depuis le ${dateFr(DATES.reception)}, chaque entreprise doit en avoir désigné une pour recevoir ses factures. Si vous ne savez pas laquelle est la vôtre, c'est sans doute qu'elle n'est pas encore choisie.`,
    risque: `L'administration commence par une mise en demeure. Sans régularisation dans les ${AMENDES.miseEnDemeureMois} mois, l'amende est de ${euros(AMENDES.receptionPremiere)}, puis de ${euros(AMENDES.receptionSuivantes)} tous les ${AMENDES.miseEnDemeureMois} mois tant que la situation dure. Elle annonce une approche pédagogique en 2026 pour les entreprises qui avancent : il est encore temps.`,
  },
  emission: {
    aVenir: (date: string) => `À partir du ${date}, vos factures aux entreprises françaises devront partir au format électronique, par une plateforme agréée. Un PDF envoyé par mail ne suffira plus.`,
    enVigueur: (date: string) => `Depuis le ${date}, vos factures aux entreprises françaises doivent partir au format électronique, par votre plateforme agréée.`,
    franchise: 'La franchise de TVA ne vous en dispense pas.',
    mixte: "Cela concerne la partie taxable de votre activité. Vos opérations exonérées n'ont pas à passer par ce circuit.",
    inconnu: "À vérifier avec votre comptable : si toute votre activité est exonérée de TVA, vous n'êtes pas concerné par l'émission.",
    exoneree: "Vos opérations exonérées (articles 261 à 261 E du CGI) ne sont pas concernées par l'émission de factures électroniques. Si une partie de votre activité devient taxable, cette partie le sera.",
    sansEntreprises: (date: string) => `Vous ne facturez pas d'entreprises françaises : l'émission de factures électroniques ne vous concerne pas pour l'instant. Si cela change, la règle s'applique à partir du ${date}.`,
  },
  ereporting: {
    aVenir: (qui: string, date: string) => `Vous facturez ${qui}. À partir du ${date}, vous devrez transmettre les données de ces ventes à l'administration par votre plateforme : c'est l'e-reporting.`,
    enVigueur: (qui: string, date: string) => `Vous facturez ${qui}. Depuis le ${date}, vous devez transmettre les données de ces ventes à l'administration par votre plateforme : c'est l'e-reporting.`,
    qui: { particuliers: 'des particuliers', etranger: "des clients à l'étranger", lesDeux: "des particuliers et des clients à l'étranger" },
  },
  amende: (montant: string) => `Ordre de grandeur, si vos factures aux entreprises ne passaient pas au format électronique : jusqu'à ${montant} d'amende par an (${euros(AMENDES.parFacture)} par facture, dans la limite de ${euros(AMENDES.plafondAnnuel)} par an). C'est une estimation à partir de vos réponses, pas un montant certain.`,
  recommandation: {
    bureautique: 'Word, Excel ou Canva ne pourront pas émettre de facture électronique. Il vous faut une solution de facturation reliée à une plateforme agréée. Plusieurs proposent une offre gratuite pour les petites structures.',
    logiciel: (nom: string) => `Vérifiez que ${nom ? `votre logiciel (${nom})` : 'votre logiciel'} est une plateforme agréée, ou qu'il est connecté à une plateforme de la liste officielle publiée sur impots.gouv.fr.`,
    comptable: "Demandez à votre expert-comptable quelle plateforme il prévoit pour vous. En cas de manquement, c'est votre entreprise qui est sanctionnée, pas votre comptable.",
    erp: 'Vérifiez que votre logiciel métier dispose d’un connecteur vers une plateforme agréée. C’est souvent le chantier le plus long : mieux vaut le lancer tôt.',
    receptionSeule: "Pour vos ventes exonérées, rien ne change côté émission. Votre chantier est la réception : une plateforme agréée suffit, et plusieurs proposent une offre gratuite pour les petites structures.",
  },
  plan: {
    designer: {
      titre: 'Désigner votre plateforme agréée de réception',
      detail: "Choisissez une plateforme de la liste officielle d'impots.gouv.fr, puis vérifiez que votre entreprise apparaît dans l'annuaire des destinataires.",
    },
    tva: {
      titre: 'Faire vérifier votre régime de TVA par votre comptable',
      detail: "De lui dépend votre obligation d'émettre : une activité entièrement exonérée n'est pas concernée, une activité taxable l'est.",
    },
    outil: { titre: 'Faire le point sur votre outil de facturation' },
    choisir: {
      titre: 'Choisir la solution qui émettra vos factures',
      detail: 'Elle doit être une plateforme agréée ou y être connectée. Comptez quelques semaines pour l’installer et reprendre vos clients.',
    },
    choisirEreporting: {
      titre: "Choisir la solution qui transmettra vos données de ventes",
      detail: 'Votre plateforme agréée peut s’en charger si votre outil de caisse ou de facturation lui envoie les données.',
    },
    tester: {
      titre: 'Tester avec quelques factures réelles',
      detail: 'Envoyez vos premières factures électroniques à des clients volontaires, et formez la personne qui facture.',
    },
    echeance: {
      titre: 'Émission obligatoire',
      detail: 'Toutes vos factures aux entreprises françaises partent par la plateforme.',
      detailEreporting: 'Toutes vos factures aux entreprises françaises partent par la plateforme, et les données de vos autres ventes aussi (e-reporting).',
    },
    echeanceEreporting: {
      titre: 'E-reporting obligatoire',
      detail: 'Les données de vos ventes aux particuliers ou à l’étranger partent par votre plateforme.',
    },
    controler: {
      titre: 'Contrôler que vos factures passent par la plateforme',
      detail: "L'émission est déjà obligatoire pour vous. Vérifiez chaque flux de facturation et régularisez les factures qui ne sont pas passées par le circuit.",
    },
    ereportingEnVigueur: {
      titre: 'Transmettre vos données de ventes (e-reporting)',
      detail: "Vos ventes aux particuliers ou à l'étranger doivent déjà être déclarées par votre plateforme. Vérifiez que c'est le cas.",
    },
    documenter: {
      titre: 'Garder une trace de vos démarches',
      detail: "En cas de contrôle, l'administration regarde les démarches engagées. Conservez vos échanges avec vos prestataires et votre calendrier de mise en conformité.",
    },
    annuaire: {
      titre: "Vérifier votre inscription à l'annuaire",
      detail: 'Demandez à votre plateforme de confirmer que votre entreprise figure dans l’annuaire des destinataires.',
    },
    exoneration: {
      titre: 'Faire confirmer votre exonération par votre comptable',
      detail: "Si une partie de votre activité est taxable, cette partie entre dans l'émission de factures électroniques.",
    },
    fournisseurs: {
      titre: "Vos fournisseurs passent à l'émission",
      detail: 'Les PME qui vous facturent émettront au format électronique : leurs factures arriveront par votre plateforme.',
    },
  },
};

/** FAQ de la page (et son JSON-LD FAQPage). */
export const FAQ = [
  {
    question: 'Quelles sont les dates de la facture électronique ?',
    answer: `Depuis le ${dateFr(DATES.reception)}, toutes les entreprises établies en France doivent pouvoir recevoir leurs factures par une plateforme agréée. L'émission devient obligatoire le ${dateFr(DATES.emissionGrandes)} pour les grandes entreprises et les ETI, et le ${dateFr(DATES.emissionPme)} pour les PME et les micro-entreprises.`,
  },
  {
    question: 'Une micro-entreprise est-elle concernée ?',
    answer: `Oui. Elle doit recevoir ses factures par une plateforme agréée depuis le ${dateFr(DATES.reception)}, et émettre ses factures aux entreprises françaises au format électronique à partir du ${dateFr(DATES.emissionPme)}.`,
  },
  {
    question: 'Je suis en franchise de TVA : suis-je concerné ?',
    answer: `Oui. La franchise en base ne vous dispense pas de la réforme. Vous devez recevoir vos factures par une plateforme agréée, et émettre vos factures aux entreprises au format électronique à partir du ${dateFr(DATES.emissionPme)} si vous êtes une PME ou une micro-entreprise.`,
  },
  {
    question: 'Un PDF envoyé par mail, est-ce une facture électronique ?',
    answer: "Non. Une facture électronique est un fichier structuré (Factur-X, UBL ou CII) qui passe par une plateforme agréée. Une fois votre date d'émission arrivée, un PDF envoyé par mail ne suffit plus pour vos factures aux entreprises françaises.",
  },
  {
    question: 'Quelles sont les sanctions ?',
    answer: `Une amende de ${euros(AMENDES.parFacture)} par facture qui n'est pas émise au format électronique, dans la limite de ${euros(AMENDES.plafondAnnuel)} par an. Sans plateforme pour recevoir vos factures, l'administration envoie d'abord une mise en demeure : sans régularisation dans les ${AMENDES.miseEnDemeureMois} mois, l'amende est de ${euros(AMENDES.receptionPremiere)}, puis de ${euros(AMENDES.receptionSuivantes)} tous les ${AMENDES.miseEnDemeureMois} mois. L'administration annonce une approche pédagogique en 2026 pour les entreprises qui se mettent en conformité.`,
  },
];
