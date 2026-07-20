import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionKicker } from '@/components/ui/SectionKicker';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';
const RULE = 'rgba(26,35,50,0.16)';

const steps = [
  { n: '01', title: 'Pré-audit gratuit', line: '30 min en visio. 3 points de friction repérés en direct.' },
  { n: '02', title: 'Audit Stack', line: 'Cartographie de vos outils et préconisation chiffrée.' },
  { n: '03', title: 'Diagnostic', line: 'Un plan de consolidation chiffré, avec le ROI attendu.' },
  { n: '04', title: 'Mise en œuvre', line: 'On configure, on connecte, on forme vos équipes.' },
  { n: '05', title: 'Gardien du système', line: "L'opérateur qui reste à vos côtés, au fil de l'eau." },
];

export const MethodSection: React.FC = () => {
  return (
    <section id="methode" className="py-24 md:py-32 bg-white scroll-mt-24" aria-labelledby="method-title">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-10 md:mb-12">
          <SectionKicker label="Méthode" index="06" />
        </div>

        <h2
          id="method-title"
          className="font-heading font-bold leading-[1.02] tracking-tight text-4xl md:text-5xl lg:text-6xl"
          style={{ color: NAVY }}
        >
          Comment on bosse ensemble.
        </h2>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
          Cinq étapes claires, du premier échange jusqu'au système qui tourne.
        </p>

        <ol className="mt-12">
          {steps.map((s) => (
            <li key={s.n} className="border-t py-5" style={{ borderColor: RULE }}>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-x-6 gap-y-1">
                <span
                  className="font-heading font-bold text-lg md:text-xl leading-none shrink-0 sm:w-8"
                  style={{ color: GOLD }}
                >
                  {s.n}
                </span>
                <h3
                  className="font-semibold text-lg md:text-xl leading-snug shrink-0 sm:w-64"
                  style={{ color: NAVY }}
                >
                  {s.title}
                </h3>
                <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed flex-1">
                  {s.line}
                </p>
              </div>
            </li>
          ))}
          <li className="border-t" style={{ borderColor: RULE }} />
        </ol>

        <div className="mt-10">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 font-semibold text-base"
            style={{ color: NAVY }}
          >
            Voir le détail et les tarifs
            <ArrowRight size={18} style={{ color: GOLD }} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
