import React from 'react';
import { ArticleCard } from '../ui/ArticleCard';

interface Article {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  overlayImageSrc?: string;
  content: React.ReactNode;
}

export const ArticlesSection: React.FC = () => {
  const articles: Article[] = [
    {
      id: 1,
      title: "Pourquoi GLIDE ?",
      description: "Découvrez comment transformer vos tableurs en une application métier élégante en quelques semaines, sans code. L’article explique pourquoi Glide s’impose: vitesse de livraison, design pro dès le départ, données prêtes à scaler et automatisations via Make.com. Avec chiffres clés, cas d’usage et sources pour décider vite et bien. Envie de passer du chaos à l’efficacité?",
      imageSrc: '/images/linky-banner.png',
      overlayImageSrc: '/images/glide-logo.png',
      content: (
        <>
          <p>
            Un ERP (Enterprise Resource Planning), ou PGI (Progiciel de Gestion Intégré) en français, est un système d'information qui permet de gérer et de suivre au quotidien l'ensemble des informations et des services opérationnels d'une entreprise.
          </p>
          <h3>Pourquoi un ERP est-il indispensable ?</h3>
          <p>
            Imaginez un chef d'orchestre qui doit coordonner tous les musiciens sans partition commune. C'est un peu ce qui se passe dans une entreprise sans ERP : la comptabilité utilise un logiciel, les ventes un autre, et la logistique un troisième. L'ERP vient unifier tout cela.
          </p>
          <ul>
            <li><strong>Centralisation des données :</strong> Une base de données unique pour tous les services.</li>
            <li><strong>Amélioration de la communication interne :</strong> L'information circule mieux entre les départements.</li>
            <li><strong>Optimisation des processus :</strong> Automatisation des tâches répétitives et réduction des erreurs.</li>
            <li><strong>Aide à la prise de décision :</strong> Des tableaux de bord en temps réel pour piloter l'activité.</li>
          </ul>
          <p>
            Chez Kapli, nous concevons des ERP sur mesure qui s'adaptent à votre façon de travailler, et non l'inverse. Nous croyons que la technologie doit être au service de l'humain pour simplifier le quotidien.
          </p>
        </>
      )
    },
    {
      id: 2,
      title: "10 TÂCHES QUI VOUS FONT PERDRE DU TEMPS ET COMMENT LES AUTOMATISER ?",
      description: "⏳ Chaque jour, vos équipes perdent un temps précieux sur des tâches répétitives et manuelles. Chez Kapli, nous aidons les TPE et PME à gagner en efficacité. Découvrez 10 tâches que vous pouvez simplifier dès aujourd'hui 🚀",
      imageSrc: '/images/linky-banner.png',
      overlayImageSrc: '/images/make-logo.png',
      content: (
        <>
          <p>
            L'automatisation n'est pas réservée aux grandes multinationales. Aujourd'hui, grâce à des outils comme Make (ex-Integromat) ou Zapier, et des solutions sur mesure, n'importe quelle entreprise peut gagner des heures précieuses chaque semaine.
          </p>
          <h3>Les tâches chronophages à éliminer :</h3>
          <ol>
            <li><strong>La saisie manuelle de données :</strong> Copier-coller des informations entre deux logiciels est source d'erreurs et de perte de temps.</li>
            <li><strong>L'envoi d'emails de confirmation :</strong> Automatisez les réponses aux formulaires de contact ou aux commandes.</li>
            <li><strong>La génération de factures récurrentes :</strong> Ne perdez plus de temps à refaire la même facture chaque mois.</li>
            <li><strong>Le tri des emails :</strong> Utilisez des filtres et des règles pour organiser votre boîte de réception.</li>
            <li><strong>La mise à jour de CRM :</strong> Connectez votre CRM à vos emails et à votre calendrier.</li>
            <li><strong>La gestion des notes de frais :</strong> Utilisez des applications mobiles pour scanner et traiter les reçus.</li>
            <li><strong>Le reporting :</strong> Générez automatiquement vos rapports hebdomadaires ou mensuels.</li>
            <li><strong>La planification de rendez-vous :</strong> Utilisez des outils comme Calendly pour éviter les allers-retours par email.</li>
            <li><strong>L'onboarding des employés :</strong> Automatisez la création des comptes et l'envoi des documents d'accueil.</li>
            <li><strong>La surveillance des stocks :</strong> Recevez des alertes automatiques lorsque les niveaux de stock sont bas.</li>
          </ol>
          <p>
            En automatisant ces processus, vous libérez votre créativité et celle de vos équipes pour des tâches à plus forte valeur ajoutée. Kapli vous accompagne dans cette transition vers une entreprise plus agile et efficace.
          </p>
        </>
      )
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              title={article.title}
              description={article.description}
              imageSrc={article.imageSrc}
              overlayImageSrc={article.overlayImageSrc}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
