// Liste des outils gratuits : source unique pour la page /outils/, le sitemap et llms.txt.
export interface Tool {
  slug: string;
  title: string;
  description: string;
}

export const tools: Tool[] = [
  {
    slug: 'calcul-marge-chantier',
    title: 'Calcul de marge chantier',
    description:
      'Déboursé sec, prix de revient, marge brute, bénéfice net et prix de vente à pratiquer pour gagner ce que vous visez.',
  },
  {
    slug: 'calcul-penalites-de-retard',
    title: 'Calcul des pénalités de retard',
    description:
      "Pénalités dues sur une facture payée en retard entre professionnels, au taux en vigueur à l'échéance, avec l'indemnité de 40 €.",
  },
  {
    slug: 'calcul-retenue-de-garantie',
    title: 'Calcul de la retenue de garantie',
    description:
      'Montant de la retenue de garantie sur un marché de travaux, sur le HT ou le TTC, avec sa date de libération.',
  },
  {
    slug: 'calcul-situation-de-travaux',
    title: 'Calcul d’une facture de situation',
    description:
      'Montant d’une situation de travaux à partir de l’avancement cumulé : HT, TVA, retenue de garantie et net à payer.',
  },
];
