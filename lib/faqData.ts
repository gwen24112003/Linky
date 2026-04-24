export const faqs = [
  {
    question:
      "Je suis patron d'une boîte d'électricité ou de plomberie. Vous bossez avec des boîtes comme la mienne ?",
    answer:
      "Oui, c'est même notre cœur de métier. On cible les entreprises du second œuvre (électricité, plomberie, chauffage-clim) entre 8 et 25 salariés. On parle votre langage et on connaît vos outils (Batappli, Tolteck, Obat, EBP Bâtiment). Si votre boîte ne colle pas à ce profil, on vous le dit franchement.",
  },
  {
    question:
      "J'utilise déjà Batappli (ou Tolteck, Obat, EBP). Est-ce qu'il faut que je change ?",
    answer:
      "Non. Dans 9 cas sur 10, on garde votre outil métier et on l'exploite à fond. Ce qui manque, c'est la couche autour : relances, planning équipe, suivi chantier, automation. On ajoute ce qu'il faut, on ne remplace pas pour remplacer.",
  },
  {
    question: 'Ça coûte combien au total pour refaire mon système ?',
    answer:
      "Pré-audit : 0 €. Diagnostic : 2 500 € forfaitaires. Implémentation : de 5 000 € à 15 000 € selon le périmètre (on chiffre précisément après le diagnostic). Suivi mensuel optionnel : 400 à 600 €/mois. Vous savez exactement ce que vous payez avant de démarrer.",
  },
  {
    question: 'Combien de temps ça prend avant que je voie des résultats ?',
    answer:
      "Première automation en production en 2 à 3 semaines après le kick-off. Gain de temps mesurable dès le premier mois. Système complet déployé entre 6 et 13 semaines selon la taille de la boîte.",
  },
  {
    question: 'Je suis nul en informatique. Vous m\'obligez à apprendre 10 outils ?',
    answer:
      "Non. Le but, c'est moins d'outils, pas plus. Vous gardez ceux que vous maîtrisez déjà, on connecte le reste pour qu'il travaille tout seul en arrière-plan. Formation incluse pour vous et votre équipe, en français, sur vos propres données.",
  },
  {
    question: 'Et la facturation électronique 2027, vous gérez ?',
    answer:
      "C'est pas notre angle principal parce que votre logiciel BTP (Batappli, Obat, Tolteck, EBP) sera homologué à temps, l'éditeur s'en occupe. Par contre, dans le diagnostic, on s'assure que le circuit autour tient : archivage, relances qui s'alignent sur les délais légaux, intégration avec votre expert-comptable. C'est un point de contrôle, pas un chantier en soi.",
  },
  {
    question: 'Qu\'est-ce qui se passe si vous disparaissez dans 2 ans ?',
    answer:
      "Votre système continue de tourner. On ne développe rien de propriétaire : tout repose sur des outils standards du marché (Make, n8n, Notion, logiciels BTP). La documentation est à vous. Un autre prestataire peut reprendre en main sans difficulté.",
  },
  {
    question: 'Vous pouvez bosser avec ma comptable ou mon expert-comptable ?',
    answer:
      "Oui, et on le fait tout le temps. Votre expert-comptable reste votre interlocuteur pour la compta. Nous, on s'assure que les flux entre votre facturation, votre banque et sa saisie sont automatisés et propres. Tout le monde y gagne du temps.",
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
