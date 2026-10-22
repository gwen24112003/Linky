// Scénarios animés de la page Cas clients, façon Make. Représentations simplifiées des missions réelles.
// Conciergerie : repris du carrousel LinkedIn d'Enzo. Formation : version reconstituée (outils à confirmer).
export type AppKey = 'airtable' | 'tools' | 'aggregator' | 'docs' | 'drive' | 'gmail' | 'ifelse' | 'qontoClient' | 'qontoInvoice';

export interface ScenarioModule {
  app: AppKey;
  n: number;
  sub?: string;
  pill?: string;
}

export interface Scenario {
  title: string;
  schedule: string;
  cols: 3 | 4;
  rows: ScenarioModule[][];
  branches: ScenarioModule[];
  description: string;
}

export const scenarios = {
  conciergerie: {
    title: 'Facturation générale (tous proprios)',
    schedule: 'Chaque 1er du mois · 10:00',
    cols: 3,
    rows: [
      [
        { app: 'airtable', n: 1, pill: 'Proprios à facturer' },
        { app: 'airtable', n: 2, sub: 'Résa conciergerie (commission)' },
        { app: 'tools', n: 3, sub: 'Sum Commission HT' },
      ],
      [
        { app: 'airtable', n: 8, sub: 'Résa conciergerie (débours)' },
        { app: 'tools', n: 4, sub: 'Sum Débours Ménage' },
        { app: 'airtable', n: 9, sub: 'Résa conciergerie (blanchisserie)' },
      ],
      [
        { app: 'tools', n: 5, sub: 'Sum Blanchisserie HT' },
        { app: 'qontoClient', n: 14, sub: 'Client Qonto par identifiant' },
        { app: 'ifelse', n: 10, sub: 'Choisir uniquement les postes facturables' },
      ],
    ],
    branches: [
      { app: 'qontoInvoice', n: 11, sub: 'Facture commission seule' },
      { app: 'qontoInvoice', n: 12, sub: 'Facture commission + blanchisserie' },
      { app: 'qontoInvoice', n: 13, sub: 'Facture commission + débours' },
      { app: 'qontoInvoice', n: 7, sub: 'Créer facture brouillon' },
    ],
    description:
      "Scénario « Facturation générale (tous proprios) », lancé chaque 1er du mois : lecture des propriétaires à facturer et de leurs réservations dans Airtable, calcul de la commission, des débours de ménage et de la blanchisserie, recherche du client dans Qonto, puis création de la bonne facture en brouillon selon les postes facturables.",
  },
  'organisme-de-formation': {
    title: 'Dossiers de financement (tous stagiaires)',
    schedule: 'À chaque inscription complète',
    cols: 4,
    rows: [
      [
        { app: 'airtable', n: 1, sub: 'Nouvelle inscription', pill: 'Inscriptions complètes' },
        { app: 'airtable', n: 2, sub: 'Session et financeur' },
        { app: 'docs', n: 3, sub: 'Convention depuis le modèle' },
        { app: 'docs', n: 4, sub: 'Convocation depuis le modèle' },
      ],
      [
        { app: 'drive', n: 5, sub: 'Export en PDF' },
        { app: 'drive', n: 6, sub: 'Programme de la session' },
        { app: 'aggregator', n: 7, sub: 'Assembler les pièces jointes' },
        { app: 'ifelse', n: 8, sub: 'Selon le financeur' },
      ],
    ],
    branches: [
      { app: 'gmail', n: 9, sub: "Envoi à l'OPCO" },
      { app: 'gmail', n: 10, sub: 'Envoi à France Travail' },
      { app: 'gmail', n: 11, sub: "Envoi à l'entreprise" },
    ],
    description:
      "Scénario « Dossiers de financement » : à chaque inscription complète, la convention et la convocation sont générées depuis des modèles, exportées en PDF avec le programme de la session, puis envoyées au financeur concerné : OPCO, France Travail ou entreprise.",
  },
} satisfies Record<string, Scenario>;

export type ScenarioKey = keyof typeof scenarios;
