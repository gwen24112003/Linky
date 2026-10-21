import React from 'react';

const NAVY = '#1A2332';
const RULE = 'rgba(26,35,50,0.16)';

// Mise en forme de lettre signée : une colonne étroite, à la première personne.
export const ManifestoSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-white" aria-labelledby="manifeste-title">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2
          id="manifeste-title"
          className="font-heading font-bold leading-tight tracking-tight text-3xl md:text-4xl"
          style={{ color: NAVY }}
        >
          Pourquoi on a monté Opus Advisor
        </h2>

        <div className="mt-8 space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed">
          <p>
            Les éditeurs de logiciels vendent leur outil, puis passent à l'entreprise suivante. Les
            cabinets de conseil livrent une feuille de route, et c'est au dirigeant de l'appliquer seul,
            le soir, après sa journée.
          </p>
          <p>
            Entre les deux, personne ne branche les outils entre eux, et personne ne reste ensuite
            pour les faire tourner. C'est ce qu'on fait.
          </p>
          <p>
            Vous gardez vos logiciels. On les relie à vos tableurs, à votre boîte mail, à votre banque
            et au WhatsApp de vos équipes. Au bout de deux mois, vous devez récupérer 10 heures par
            semaine. On les mesure avec vous, sur vos chiffres.
          </p>
        </div>

        <div className="mt-10 pt-6 border-t flex items-center gap-4" style={{ borderColor: RULE }}>
          <img
            src="/images/enzo.jpg"
            alt="Enzo Monnier"
            className="w-14 h-14 rounded-full object-cover"
            loading="lazy"
          />
          <div>
            <p className="font-semibold" style={{ color: NAVY }}>
              Enzo Monnier
            </p>
            <p className="text-sm text-gray-600">Fondateur, ancien développeur</p>
          </div>
        </div>
      </div>
    </section>
  );
};
