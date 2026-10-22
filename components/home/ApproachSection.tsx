import React from 'react';

const NAVY = '#1A2332';
const RULE = 'rgba(26,35,50,0.16)';

const levels = [
  {
    what: 'Les automatisations',
    tools: 'Make ou n8n, sur vos logiciels actuels',
    desc: "Vos logiciels font l'affaire. On automatise ce qui se fait encore à la main : les documents se génèrent, les mails partent et les factures se préparent sans ressaisie.",
  },
  {
    what: 'Une application centrale',
    tools: 'Une base Airtable ou un outil développé pour vous',
    desc: "Vos logiciels restent, et une application plus simple à utiliser les réunit. Chaque information y est saisie une fois, vous suivez l'activité depuis un seul écran, et les automatisations partent de là.",
  },
  {
    what: 'Le système complet, de A à Z',
    tools: 'Choix des outils, application, automatisations, formation',
    desc: "Rien d'adapté en place, ou trop d'outils qui ne se parlent pas : on construit tout le système avec vous, jusqu'à ce qu'il tourne dans votre entreprise.",
  },
];

/** Les trois points de départ possibles : automatisations seules, application centrale, système complet. */
export const ApproachSection: React.FC = () => (
  <section className="py-24 md:py-32 bg-white" aria-labelledby="approach-title">
    <div className="container mx-auto px-6 max-w-5xl">
      <div data-reveal>
      <h2
        id="approach-title"
        className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl max-w-3xl"
        style={{ color: NAVY }}
      >
        Un système à votre image, quel que soit votre point de départ.
      </h2>
      <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
        Certaines entreprises ont seulement besoin d'automatisations. D'autres ont besoin d'une application centrale pour
        réunir leurs logiciels, ou d'un système monté de A à Z. On part de votre situation, et à la fin vous avez un
        système complet qui tourne tout seul.
      </p>
      </div>

      <dl className="mt-12">
        {levels.map((l, i) => (
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
        Une conciergerie, par exemple, a un logiciel de réservation et un logiciel de facturation : une application
        centrale reçoit les réservations, calcule ce qui revient à chaque propriétaire et déclenche les factures. Dans les
        cas présentés plus haut, l'organisme de formation et la conciergerie avaient besoin d'automatisations ; pour
        l'équipe d'agents immobiliers, on a construit l'outil de zéro.
      </p>
    </div>
  </section>
);
