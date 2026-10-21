import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { sectors } from '@/lib/sectors';

const NAVY = '#1A2332';
const GOLD_INK = '#8A6A1C';
const RULE = 'rgba(26,35,50,0.16)';

/** Avec headingLevel="h1", sert de page /secteurs/ : titre principal et marge sous l'en-tête fixe. */
export const SectorsSection: React.FC<{ headingLevel?: 'h1' | 'h2' }> = ({ headingLevel = 'h2' }) => {
  const Heading = headingLevel;
  return (
    <section
      id="secteurs"
      className={`${headingLevel === 'h1' ? 'pt-36 md:pt-44 pb-24 md:pb-32' : 'py-24 md:py-32'} scroll-mt-24`}
      style={{ background: '#FAF7F0' }}
      aria-labelledby="sectors-title"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <Heading
          id="sectors-title"
          className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl max-w-3xl"
          style={{ color: NAVY }}
        >
          Les entreprises avec qui on travaille
        </Heading>
        <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
          Des petites entreprises et des PME, avec du travail sur le terrain et beaucoup d'administratif derrière.
          Les problèmes se ressemblent d'un secteur à l'autre ; les outils et le vocabulaire changent.
        </p>

        <ul className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-x-10">
          {sectors.map((s) => (
            <li key={s.slug} className="border-t" style={{ borderColor: NAVY }}>
              <Link href={s.href} className="group block py-7">
                <span className="block font-heading font-bold text-2xl leading-snug group-hover:underline underline-offset-4" style={{ color: NAVY }}>
                  {s.name}
                </span>
                <span className="block mt-3 text-base text-gray-700 leading-relaxed">{s.short}</span>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: GOLD_INK }}>
                  Voir le détail
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 pt-6 border-t text-base text-gray-600" style={{ borderColor: RULE }}>
          Votre secteur n'est pas dans la liste ? Si votre entreprise ressaisit les mêmes informations dans plusieurs
          outils, on peut sûrement vous aider. Le pré-audit sert à le vérifier.
        </p>
      </div>
    </section>
  );
};
