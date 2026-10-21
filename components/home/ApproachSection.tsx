import React from 'react';

const NAVY = '#1A2332';
const RULE = 'rgba(26,35,50,0.16)';

const layers = [
  {
    what: 'Votre logiciel métier',
    tools: 'Logiciel de gestion de formation, channel manager, logiciel de devis…',
    desc: "On corrige son paramétrage et on s'en sert jusqu'au bout. Si vous n'en avez pas, on le choisit avec vous.",
  },
  {
    what: 'Vos tableurs et vos documents',
    tools: 'Google Sheets, Airtable, Notion, Drive',
    desc: 'Une seule source pour chaque information, au lieu de trois fichiers qui se contredisent.',
  },
  {
    what: 'Les liaisons entre vos outils',
    tools: 'Make ou n8n',
    desc: 'Les documents se génèrent, les mails partent et les factures se préparent sans ressaisie.',
  },
];

/** Ce qui nous distingue d'une agence qui développe un logiciel sur mesure. */
export const ApproachSection: React.FC = () => (
  <section className="py-24 md:py-32 bg-white" aria-labelledby="approach-title">
    <div className="container mx-auto px-6 max-w-5xl">
      <div data-reveal>
      <h2
        id="approach-title"
        className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl max-w-3xl"
        style={{ color: NAVY }}
      >
        Vos outils d'abord. Du sur-mesure seulement s'il le faut.
      </h2>
      <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
        Un logiciel développé pour vous prend des mois et coûte cher. Dans la plupart des entreprises, les outils sont
        déjà là ; ce qui manque, ce sont les liens entre eux.
      </p>
      </div>

      <dl className="mt-12">
        {layers.map((l, i) => (
          <div key={l.what} data-reveal data-reveal-delay={String(i + 1)} className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-2 py-7 border-t" style={{ borderColor: RULE }}>
            <dt className="md:col-span-5">
              <span className="block font-semibold text-lg md:text-xl leading-snug" style={{ color: NAVY }}>
                {l.what}
              </span>
              <span className="block mt-1 text-sm text-gray-500">{l.tools}</span>
            </dt>
            <dd className="md:col-span-7 text-base md:text-lg text-gray-700 leading-relaxed">{l.desc}</dd>
          </div>
        ))}
        <div className="border-t" style={{ borderColor: RULE }} />
      </dl>

      <p data-reveal className="mt-8 text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl">
        Quand aucun outil existant ne fait l'affaire, on construit le vôtre, comme l'outil de suivi de l'équipe
        d'agents immobiliers présenté plus haut. C'est l'exception, et on vous le dit avant de le chiffrer.
      </p>
    </div>
  </section>
);
