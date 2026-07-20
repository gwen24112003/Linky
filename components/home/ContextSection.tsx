import React from 'react';
import { SectionKicker } from '@/components/ui/SectionKicker';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';
const RULE = 'rgba(26,35,50,0.16)';

const stats = [
  {
    figure: '440 000',
    text: "entreprises dans le bâtiment français, dont 94 % artisanales. Un marché massif, fragmenté, où chaque structure gère ses outils de son côté.",
    source: 'Fédération Française du Bâtiment, 2024',
  },
  {
    figure: '1 sur 3',
    text: "entreprise BTP est sous-digitalisée. Pas par manque de volonté, par manque de méthode pour orchestrer ce qu'elle a déjà.",
    source: 'Étude Vertuoza, 300 entreprises BTP, 2024',
  },
  {
    figure: '88 %',
    text: "des entreprises BTP n'envisagent pas l'intelligence artificielle, contre 77 % tous secteurs confondus. Le secteur le plus réticent de l'économie française.",
    source: 'Baromètre France Num, 2024',
  },
  {
    figure: '1 % / an',
    text: "de croissance de productivité dans la construction, contre 3,6 % dans l'industrie manufacturière. Le retard ne se résorbe pas tout seul.",
    source: 'Journal du Net, études internationales',
  },
];

export const ContextSection: React.FC = () => {
  return (
    <section id="contexte" className="py-24 md:py-32 scroll-mt-24" style={{ background: '#FAF7F0' }} aria-labelledby="context-title">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-10 md:mb-12">
          <SectionKicker label="Le contexte" index="03" />
        </div>

        <h2
          id="context-title"
          className="font-heading font-bold leading-[1.02] tracking-tight text-4xl md:text-5xl lg:text-6xl max-w-3xl"
          style={{ color: NAVY }}
        >
          Le BTP français est en retard. C'est ce qui crée notre marché.
        </h2>
        <p className="mt-7 text-lg md:text-xl text-gray-600 max-w-2xl">
          Quatre chiffres qui résument la situation des PME du second œuvre en 2025.
        </p>

        <dl className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-14">
          {stats.map((s) => (
            <div key={s.figure} className="py-8 border-t" style={{ borderColor: RULE }}>
              <dt
                className="font-heading font-bold leading-none text-5xl md:text-6xl mb-4"
                style={{ color: NAVY }}
              >
                {s.figure}
              </dt>
              <dd className="text-base md:text-lg text-gray-700 leading-relaxed">
                {s.text}
              </dd>
              <p className="mt-3 text-sm italic" style={{ color: '#6B6B6B' }}>
                Source : {s.source}
              </p>
            </div>
          ))}
        </dl>

        <p
          className="mt-12 pt-8 border-t text-lg md:text-xl font-medium"
          style={{ color: NAVY, borderColor: RULE }}
        >
          Septembre 2027, la facturation électronique sera obligatoire pour toutes les PME.{' '}
          <span style={{ color: GOLD }}>Le temps presse.</span>
        </p>
      </div>
    </section>
  );
};
