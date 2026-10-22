// Missions réelles, présentées sans nom de client et sans chiffre tant qu'on n'a pas l'accord et les mesures.
// Source unique pour l'accueil, la page Cas clients et les pages Secteurs.
export type SectorSlug = 'formation' | 'immobilier' | 'btp';

export interface ClientCase {
  slug: string;
  sector: SectorSlug;
  client: string;
  title: string;
  before: string;
  done: string;
  result: string;
  /** Visuel de la page Cas clients (slide « Après » des carrousels LinkedIn, recadrée). */
  visual?: { src: string; width: number; height: number; alt: string; caption: string };
}

export const cases: ClientCase[] = [
  {
    slug: 'organisme-de-formation',
    sector: 'formation',
    client: 'Organisme de formation',
    title: 'Les dossiers de financement se préparent et partent tout seuls',
    before:
      "Chaque dossier se montait à la main : les documents à générer pour chaque stagiaire, puis l'envoi aux financeurs, un par un. Ça prenait beaucoup de temps à l'équipe.",
    done: "On a automatisé la génération des dossiers et leur envoi aux financeurs.",
    result: "Le système tourne au quotidien : l'équipe ne monte plus les dossiers à la main.",
    visual: {
      src: '/images/cas-clients/formation-dossiers.webp',
      width: 1492,
      height: 1222,
      alt: "Scénario d'automatisation « Dossiers de financement » : à chaque inscription complète, la convention et la convocation sont générées depuis des modèles, exportées en PDF avec le programme de la session, puis envoyées au financeur concerné : OPCO, France Travail ou entreprise.",
      caption: 'Le scénario, en représentation simplifiée.',
    },
  },
  {
    slug: 'conciergerie',
    sector: 'immobilier',
    client: 'Conciergerie',
    title: 'Une seule automatisation pour facturer tous les propriétaires',
    before:
      "Le système existait déjà, mais la facturation reposait sur une automatisation par propriétaire. Chaque nouveau propriétaire en ajoutait une, et chaque changement devait être reporté partout.",
    done:
      "On a remplacé toutes ces automatisations par une seule, qui facture l'ensemble des propriétaires, et ajouté de quoi simplifier la maintenance du reste du système.",
    result: "Un seul scénario à surveiller et à faire évoluer. Un nouveau propriétaire ne demande plus de nouvelle automatisation.",
    visual: {
      src: '/images/cas-clients/conciergerie-facturation.webp',
      width: 1492,
      height: 1564,
      alt: "Scénario « Facturation générale (tous proprios) », lancé chaque 1er du mois : lecture des propriétaires à facturer et de leurs réservations dans Airtable, calcul de la commission, des débours de ménage et de la blanchisserie, recherche du client dans Qonto, puis création de la bonne facture en brouillon selon les postes facturables.",
      caption: 'Le scénario de facturation, en représentation simplifiée. Les factures sont créées en brouillon et validées avant envoi.',
    },
  },
  {
    slug: 'equipe-agents-immobiliers',
    sector: 'immobilier',
    client: "Équipe d'agents immobiliers · mission en sous-traitance",
    title: 'Un manager qui suit toute son équipe depuis un seul outil',
    before: "Le manager devait pouvoir suivre le travail de chacun de ses agents immobiliers.",
    done:
      "On a construit l'outil de suivi : les dossiers de chaque agent, la gestion de chaque bien et l'avancement des ventes, au même endroit.",
    result: "Le manager revoit les dossiers de son équipe et voit où en sont les ventes, sans courir après l'information.",
    visual: {
      src: '/images/cas-clients/immobilier-suivi-equipe.webp',
      width: 1492,
      height: 1176,
      alt: "Maquette de l'outil « Suivi de l'équipe » : chiffres clés (mandats actifs, visites, offres, ventes du mois), tableau par agent, et liste des biens d'un agent avec leur statut : offre reçue, en visite, compromis, mandat signé.",
      caption: "Maquette de l'outil, avec des données d'exemple.",
    },
  },
];

export const casesFor = (sector: SectorSlug) => cases.filter((c) => c.sector === sector);
