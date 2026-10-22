import React from 'react';

const NAVY = '#1A2332';
const RULE = 'rgba(26,35,50,0.16)';

const stats = [
  {
    figure: '440 000',
    text: "entreprises dans le bâtiment en France, dont 94 % d'artisans. Chacune gère ses outils dans son coin.",
    source: 'Fédération Française du Bâtiment, 2024',
  },
  {
    figure: '1 sur 3',
    text: 'entreprise du BTP est sous-équipée en numérique, selon une étude menée auprès de 300 entreprises.',
    source: 'Vertuoza, 2024',
  },
  {
    figure: '88 %',
    text: "des entreprises du BTP n'envisagent pas d'utiliser l'IA, contre 77 % tous secteurs confondus.",
    source: 'Baromètre France Num, 2024',
  },
  {
    figure: '1 % par an',
    text: "de gain de productivité dans la construction, contre 3,6 % dans l'industrie manufacturière.",
    source: 'Journal du Net',
  },
];

// Une seule rangée de chiffres séparés par des filets verticaux, sources visibles.
export const ContextSection: React.FC = () => {
  return (
    <section id="contexte" className="py-24 md:py-32 scroll-mt-24 bg-white" aria-labelledby="context-title">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2
          data-reveal
          id="context-title"
          className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl max-w-3xl"
          style={{ color: NAVY }}
        >
          Le bâtiment a pris du retard sur ses outils.
        </h2>
        <p className="mt-5 text-base md:text-lg text-gray-600">Quatre chiffres, avec leurs sources.</p>

        <dl className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t" style={{ borderColor: NAVY }}>
          {stats.map((s, i) => (
            <div
              key={s.figure}
              data-reveal
              data-reveal-delay={String((i % 4) + 1)}
              className={`py-7 lg:pr-6 ${i > 0 ? 'lg:pl-6 lg:border-l' : ''} ${i > 0 ? 'border-t sm:border-t-0' : ''}`}
              style={{ borderColor: RULE }}
            >
              <dt className="font-heading font-bold leading-none text-4xl md:text-5xl mb-4" style={{ color: NAVY }}>
                {s.figure}
              </dt>
              <dd className="text-base text-gray-700 leading-relaxed">{s.text}</dd>
              <dd className="mt-3 text-sm text-gray-500">Source : {s.source}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
