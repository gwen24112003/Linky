import React from 'react';

const NAVY = '#1A2332';
const RULE = 'rgba(26,35,50,0.16)';

const pillars = [
  {
    what: 'Votre logiciel de devis et factures',
    tools: 'Batappli, Tolteck, Obat, EBP',
    desc: "On corrige le paramétrage et on s'en sert jusqu'au bout : devis, acomptes, situations. Si vous n'en avez pas encore, on le choisit avec vous.",
  },
  {
    what: "L'application centrale des chantiers",
    tools: 'Airtable, Notion ou un outil développé pour vous, relié à WhatsApp',
    desc: 'Photos, imprévus et SAV arrivent au même endroit. Le bureau voit ce que voit le chef de chantier.',
  },
  {
    what: 'Les liaisons entre vos outils',
    tools: 'Make ou n8n',
    desc: 'Votre logiciel échange avec la banque et la compta. Les relances partent seules, et vous recevez un point chaque semaine.',
  },
];

// Présentation en registre : ce que vous avez (à gauche), ce qu'on en fait (à droite).
export const SystemSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32" style={{ background: '#FAF7F0' }} aria-labelledby="system-title">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2
          data-reveal
          id="system-title"
          className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl max-w-3xl"
          style={{ color: NAVY }}
        >
          Vous gardez Batappli. On le branche sur le reste.
        </h2>
        <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
          Chaque boîte a déjà un logiciel de devis, un drive et un groupe WhatsApp. Ce qui manque, c'est
          un endroit où tout se retrouve, et les liens entre ces outils.
        </p>

        <dl className="mt-12">
          {pillars.map((p, i) => (
            <div
              key={p.what}
              data-reveal
              data-reveal-delay={String(i + 1)}
              className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-2 py-7 border-t"
              style={{ borderColor: RULE }}
            >
              <dt className="md:col-span-5">
                <span className="block font-semibold text-lg md:text-xl leading-snug" style={{ color: NAVY }}>
                  {p.what}
                </span>
                <span className="block mt-1 text-sm text-gray-500">{p.tools}</span>
              </dt>
              <dd className="md:col-span-7 text-base md:text-lg text-gray-700 leading-relaxed">{p.desc}</dd>
            </div>
          ))}
          <div className="border-t" style={{ borderColor: RULE }} />
        </dl>
      </div>
    </section>
  );
};
