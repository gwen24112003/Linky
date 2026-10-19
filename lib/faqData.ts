export const faqs = [
  {
    question: 'Vous travaillez avec des boîtes comme la mienne ?',
    answer: `Oui. On travaille uniquement avec le second œuvre : électricité, plomberie, chauffage-clim et multi-technique, de 8 à 60+ collaborateurs. Ça va de l'artisan bien organisé à la PME qui a plusieurs agences.

On connaît votre vocabulaire (CCTP, DPGF, situation, retenue de garantie, MaPrimeRénov', RGE, autoliquidation de TVA) et vos logiciels (Batappli, Tolteck, Obat, EBP Bâtiment, Onaya, Sage Batigest).

Si votre boîte ne correspond pas à ce profil, on vous le dit dès le premier appel.`,
  },
  {
    question: "J'utilise déjà Batappli (ou Tolteck, Obat, EBP). Il faut que je change ?",
    answer: `En général, non. On ne vous fait changer de logiciel que si le vôtre est vraiment inadapté, et c'est rare.

On garde votre logiciel métier, on corrige son paramétrage et on le relie au reste : Excel, WhatsApp, la banque, le planning.

On ne revend aucun logiciel. Si on vous conseille d'en changer, on n'y gagne rien.`,
  },
  {
    question: 'Combien ça coûte, au total, de refaire mon système ?',
    answer: `Ça dépend surtout de la taille de votre boîte. Trois cas typiques :

- **8 à 12 personnes** : Diagnostic 2 500 € + Mise en œuvre 5 500 € + Gardien 400 €/mois sans engagement. Sur deux ans, comptez environ 17 500 € au total.
- **15 à 25 personnes** : Diagnostic 2 500 € + Mise en œuvre 9 000 € + Gardien 600 €/mois. Sur deux ans, environ 26 000 €.
- **PME de 30 à 60+ personnes, plusieurs agences** : Diagnostic Premium 4 500 € + Mise en œuvre 25 000 € + Gardien Premium 1 500 €/mois, avec engagement de 12 mois. Sur deux ans, environ 65 000 €.

Pour voir clair avant de vous engager, vous pouvez commencer par l'Audit Stack, à 990 €.`,
  },
  {
    question: 'Combien de temps avant de voir des résultats ?',
    answer: `On s'engage sur 10 heures par semaine rendues à votre entreprise à partir du deuxième mois.

Dans le détail :
- le diagnostic est livré 2 à 3 semaines après le cadrage ;
- la mise en œuvre prend 4 à 10 semaines selon ce qu'il y a à installer ;
- les premiers gains se mesurent dès la deuxième semaine de mise en œuvre.

Si on ne peut pas chiffrer le gain au départ, on ne s'engage pas.`,
  },
  {
    question: "Je suis nul en informatique. Vous allez m'obliger à apprendre 10 outils ?",
    answer: `Non, on fait le contraire.

On part de ce que vous et vos équipes savez déjà utiliser : Batappli, Excel, WhatsApp, vos mails. On relie ces outils entre eux au lieu d'en ajouter de nouveaux.

Quand il faut quand même ajouter quelque chose, par exemple une appli mobile pour les équipes sur le terrain, on forme votre secrétaire en 2 heures et vos chefs d'équipe en 1 heure. La documentation reste chez vous.`,
  },
  {
    question: 'Et la facturation électronique, vous gérez ?',
    answer: `Oui, c'est un sujet qu'on traite dans presque toutes les missions.

Depuis septembre 2026, toutes les entreprises doivent pouvoir recevoir des factures électroniques. En septembre 2027, les PME devront aussi les émettre. Un système propre se prépare en 2 à 3 mois : plus vous attendez, plus la mise en conformité coûtera cher dans l'urgence.

La veille réglementaire (RE2020, MaPrimeRénov', facturation électronique, autoliquidation de TVA) est comprise dans le Gardien du système.`,
  },
  {
    question: "Qu'est-ce qui se passe si vous disparaissez dans 2 ans ?",
    answer: `Votre système continue de tourner sans nous. Pour que ce soit vrai, on prend trois engagements :
- une documentation complète remise à votre équipe à la fin de la mise en œuvre ;
- la formation de vos collaborateurs (secrétaire, chefs d'équipe, chargé d'affaires) ;
- tous les comptes et tous les outils restent à votre nom, jamais au nôtre.

Le Gardien est sans engagement, sauf la formule Premium (12 mois). Vous le gardez tant qu'il vous sert.`,
  },
  {
    question: 'Vous pouvez travailler avec mon expert-comptable ?',
    answer: `Oui, et c'est même souvent une bonne idée.

On se partage le travail : votre expert-comptable garde la comptabilité et le pilotage financier, on s'occupe des outils et de la façon dont ils s'enchaînent au quotidien.

Les experts-comptables repèrent souvent des fuites chez leurs clients : situations oubliées, retenues de garantie jamais récupérées, marges chantier illisibles. C'est exactement le genre de problème qu'on règle.`,
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
