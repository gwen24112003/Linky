export const faqs = [
  {
    question: "Qu'est-ce que l'automatisation no-code pour une PME ?",
    answer:
      "L'automatisation no-code permet de connecter vos outils et d'automatiser vos tâches répétitives sans écrire de code. Des plateformes comme Make ou n8n permettent de créer des workflows entre votre CRM, vos emails, vos tableurs et vos applications métier.",
  },
  {
    question: 'Quels outils utilisez-vous pour automatiser ?',
    answer:
      "Nous utilisons principalement Make (ex-Integromat), n8n, Zapier, Airtable, Notion, Google Sheets ainsi que les APIs natives de vos outils. Le choix des outils dépend de votre situation, pas l'inverse.",
  },
  {
    question: 'Comment se déroule une mission avec Opus Advisor ?',
    answer:
      'Chaque mission suit 4 étapes : Audit (cartographie de vos processus et identification des gains), Implémentation (mise en place des automatisations), Formation (vous et votre équipe maîtrisez les systèmes en place), puis Maintenance (suivi, optimisation et corrections dans le temps).',
  },
  {
    question: "Ai-je besoin d'un service informatique pour travailler avec vous ?",
    answer:
      "Non. C'est précisément l'intérêt du no-code : mettre en place des systèmes fonctionnels sans infrastructure technique lourde. Nous gérons la conception et l'implémentation, et vous formons pour que votre équipe soit autonome.",
  },
  {
    question: 'Combien coûte une automatisation ?',
    answer:
      'Un audit de processus démarre à 300€. Une automatisation simple commence autour de 500€. Un système complet (intégration multi-outils, agents IA) peut aller de 1 500€ à 5 000€. Nous fournissons toujours un devis précis après un premier échange gratuit.',
  },
  {
    question: "Qu'est-ce que n8n et Make ?",
    answer:
      "Make (anciennement Integromat) et n8n sont des plateformes d'automatisation no-code. Elles permettent de connecter des applications et de déclencher des actions automatiques en fonction d'événements. n8n est open-source et hébergeable, Make est une solution SaaS avec une interface très accessible.",
  },
  {
    question: 'Quels résultats concrets peut-on attendre ?',
    answer:
      'Les gains varient selon le processus automatisé : entre 2 et 10 heures par semaine économisées sur les tâches manuelles, réduction des erreurs de saisie, relances systématiques sans oubli, reporting automatique, synchronisation en temps réel entre outils.',
  },
  {
    question: 'Que se passe-t-il si une automatisation tombe en panne ?',
    answer:
      "Les plateformes Make et n8n intègrent des alertes en cas d'erreur. Nous configurons des notifications et assurons la maintenance dans le cadre de notre offre de suivi. En cas de panne, nous diagnostiquons et corrigeons rapidement.",
  },
];

export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};
