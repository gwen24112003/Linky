import React from 'react';

const NAVY = '#1A2332';
const RULE = 'rgba(26,35,50,0.16)';

const layers = [
  {
    what: 'Vos logiciels métier',
    tools: 'Facturation, réservations, gestion de formation, devis…',
    desc: "Ils restent en place. On corrige leur paramétrage et on s'en sert jusqu'au bout. S'il en manque un, on le choisit avec vous.",
  },
  {
    what: "L'application centrale",
    tools: 'Une base Airtable ou un outil développé pour vous',
    desc: "Elle reçoit les informations de tous vos logiciels. Chaque donnée y est saisie une fois, au lieu de trois fichiers qui se contredisent, et vous suivez l'activité depuis un seul écran.",
  },
  {
    what: 'Les automatisations',
    tools: 'Make ou n8n',
    desc: "Elles partent de l'application centrale : les documents se génèrent, les mails partent et les factures se préparent sans ressaisie.",
  },
];

/** Comment le système est construit : vos logiciels, une application centrale, les automatisations. */
export const ApproachSection: React.FC = () => (
  <section className="py-24 md:py-32 bg-white" aria-labelledby="approach-title">
    <div className="container mx-auto px-6 max-w-5xl">
      <div data-reveal>
      <h2
        id="approach-title"
        className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl max-w-3xl"
        style={{ color: NAVY }}
      >
        Vos logiciels restent. Au milieu, une application qui centralise tout.
      </h2>
      <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
        Chaque logiciel fait bien son travail : l'un facture, l'autre gère les réservations ou les inscriptions. Ce qui
        manque, c'est un endroit où tout se retrouve. On l'installe, et les automatisations partent de là.
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
        Une conciergerie, par exemple, a un logiciel de réservation et un logiciel de facturation. L'application centrale
        reçoit les réservations, calcule ce qui revient à chaque propriétaire, et c'est elle qui déclenche les factures.
        L'outil de suivi de l'équipe d'agents immobiliers, présenté plus haut, est une application centrale développée
        sur mesure.
      </p>
    </div>
  </section>
);
