export const faqs = [
  {
    question: 'Vous bossez avec des boîtes comme la mienne ?',
    answer: `Oui, c'est notre cœur de métier. On cible les entreprises du second œuvre (électricité, plomberie, chauffage-clim, multi-technique) de 8 à 60+ collaborateurs. Des artisans structurés aux PME multi-agences.

On parle votre langage (CCTP, DPGF, situation, retenue de garantie, MaPrimeRénov', RGE, autoliquidation TVA) et on connaît vos outils (Batappli, Tolteck, Obat, EBP Bâtiment, Onaya, Sage Batigest).

Si votre boîte ne colle pas à ce profil, on vous le dit franchement.`,
  },
  {
    question: "J'utilise déjà Batappli (ou Tolteck, Obat, EBP). Il faut que je change ?",
    answer: `Non, sauf si on identifie que votre outil actuel est vraiment inadapté (rare). Notre approche, c'est d'orchestrer ce que vous avez déjà.

On garde votre logiciel métier, on corrige son paramétrage, on l'exploite à fond et on le connecte au reste de votre système (Excel, WhatsApp, banque, planning).

On n'est revendeur d'aucun éditeur. Si on recommande un changement, c'est dans votre intérêt, jamais dans le nôtre.`,
  },
  {
    question: 'Ça coûte combien au total pour refaire mon système ?',
    answer: `Trois fourchettes selon la taille de votre structure :

- **Patron 8-12 personnes** : Diagnostic 2 500 € + Mise en œuvre 5 500 € + Gardien 400 €/mois sans engagement. LTV 24 mois environ 17 500 €.
- **Patron 15-25 personnes** : Diagnostic 2 500 € + Mise en œuvre 9 000 € + Gardien 600 €/mois. LTV 24 mois environ 26 000 €.
- **PME multi-agences 30-60+ personnes** : Diagnostic Premium 4 500 € + Mise en œuvre 25 000 € + Gardien Premium 1 500 €/mois sur engagement 12 mois. LTV 24 mois environ 65 000 €.

Vous pouvez aussi démarrer par l'Audit Stack à 990 € pour cartographier votre situation avant de vous engager.`,
  },
  {
    question: 'Combien de temps avant de voir des résultats ?',
    answer: `Notre engagement : 10 heures par semaine rendues à votre entreprise dès le deuxième mois.

Concrètement :
- Diagnostic livré en 2 à 3 semaines après cadrage
- Mise en œuvre déployée en 4 à 10 semaines selon le périmètre
- Premiers gains mesurables visibles dès la semaine 2 de la Mise en œuvre

Si on ne peut pas chiffrer le gain en amont, on ne s'engage pas.`,
  },
  {
    question: "Je suis nul en informatique. Vous m'obligez à apprendre 10 outils ?",
    answer: `Non. L'idée, c'est exactement l'inverse.

On part de ce que vous et vos équipes savez déjà utiliser (Batappli, Excel, WhatsApp, mails). On orchestre ces outils pour qu'ils travaillent ensemble plutôt que d'en ajouter de nouveaux.

Quand on doit introduire une brique (par exemple une appli mobile pour les équipes terrain), on forme votre secrétaire en 2 heures et vos chefs d'équipe en 1 heure. La documentation reste chez vous.`,
  },
  {
    question: 'Et la facturation électronique 2027, vous gérez ?',
    answer: `Oui. C'est même un des grands chantiers qu'on adresse systématiquement.

La facturation électronique deviendra obligatoire pour toutes les entreprises françaises à partir de septembre 2027. Un système BTP propre se prépare en 2 à 3 mois. Plus vous attendez, plus le coût d'urgence sera élevé.

Notre veille réglementaire (RE2020, MaPrimeRénov', facturation électronique, autoliquidation TVA) est incluse dans le Gardien du système.`,
  },
  {
    question: "Qu'est-ce qui se passe si vous disparaissez dans 2 ans ?",
    answer: `Votre système continue de tourner sans nous.

Trois engagements pour que ça soit vrai :
- Documentation utilisateur complète remise à votre équipe à la fin de la Mise en œuvre
- Formation systématique de vos collaborateurs (secrétaire, chefs d'équipe, chargé d'affaires)
- Aucune dépendance à un compte Opus Advisor : tous les outils restent à votre nom

Le Gardien existe parce que vous le choisissez, pas parce que vous y êtes contraint.`,
  },
  {
    question: 'Vous pouvez bosser avec mon expert-comptable ?',
    answer: `Oui, et c'est même souvent souhaitable.

On délimite clairement les périmètres : votre expert-comptable sur la comptabilité et le pilotage financier, Opus Advisor sur l'orchestration opérationnelle de vos outils. Les deux missions sont complémentaires.

Beaucoup de nos premiers contacts viennent d'ailleurs de recommandations d'experts-comptables qui voient des fuites opérationnelles chez leurs clients (situations oubliées, retenues de garantie non récupérées, marges chantier illisibles).`,
  },
];

// Texte aplati (sans markdown) pour le schema FAQPage.
const plainText = (md: string): string =>
  md.replace(/\*\*/g, '').replace(/^- /gm, '• ').trim();

export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: plainText(faq.answer),
    },
  })),
};
