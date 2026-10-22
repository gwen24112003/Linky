// Déroulés montrés dans la démonstration animée (accueil et pages Secteurs).
// Ce sont des exemples types, pas des comptes rendus de mission : aucun outil précis n'est attribué à un client.
export type DemoKey = 'formation' | 'conciergerie' | 'agence' | 'btp';

export type DemoIcon =
  | 'userPlus' | 'fileText' | 'send' | 'bell'
  | 'calendarCheck' | 'sparkles' | 'calculator' | 'mail'
  | 'penLine' | 'folderOpen' | 'layoutDashboard' | 'barChart'
  | 'fileSignature' | 'hammer' | 'receipt' | 'alarmClock';

export interface DemoFlow {
  key: DemoKey;
  tab: string;
  trigger: string;
  steps: { icon: DemoIcon; title: string; detail: string }[];
}

export const demoFlows: DemoFlow[] = [
  {
    key: 'formation',
    tab: 'Formation',
    trigger: 'Un stagiaire s’inscrit. La suite se fait toute seule :',
    steps: [
      { icon: 'userPlus', title: 'Inscription reçue', detail: 'Formulaire en ligne' },
      { icon: 'fileText', title: 'Convention générée', detail: 'Remplie avec ses informations' },
      { icon: 'send', title: 'Dossier envoyé au financeur', detail: 'Pièces jointes comprises' },
      { icon: 'bell', title: 'Relance programmée', detail: 'Si une pièce manque' },
    ],
  },
  {
    key: 'conciergerie',
    tab: 'Conciergerie',
    trigger: 'Une réservation arrive. Tout suit :',
    steps: [
      { icon: 'calendarCheck', title: 'Réservation confirmée', detail: 'Depuis le channel manager' },
      { icon: 'sparkles', title: 'Ménage planifié', detail: 'Prestataire prévenu' },
      { icon: 'calculator', title: 'Relevé propriétaire calculé', detail: 'La même règle pour tous' },
      { icon: 'mail', title: 'Facture envoyée', detail: 'En fin de mois' },
    ],
  },
  {
    key: 'agence',
    tab: 'Immobilier',
    trigger: 'Un agent signe un mandat. Le manager le voit :',
    steps: [
      { icon: 'penLine', title: 'Mandat signé', detail: 'Saisi une seule fois' },
      { icon: 'folderOpen', title: 'Dossier de l’agent à jour', detail: 'Biens, visites, ventes' },
      { icon: 'layoutDashboard', title: 'Tableau du manager', detail: 'Toute l’équipe d’un coup d’œil' },
      { icon: 'barChart', title: 'Point hebdomadaire envoyé', detail: 'Chaque lundi matin' },
    ],
  },
  {
    key: 'btp',
    tab: 'BTP',
    trigger: 'Un devis est signé. Le chantier se met en place :',
    steps: [
      { icon: 'fileSignature', title: 'Devis signé', detail: 'Dans votre logiciel de devis' },
      { icon: 'hammer', title: 'Dossier chantier créé', detail: 'Photos et documents au même endroit' },
      { icon: 'receipt', title: 'Situation préparée', detail: 'Selon l’avancement' },
      { icon: 'alarmClock', title: 'Relance automatique', detail: 'Le lendemain de l’échéance' },
    ],
  },
];
