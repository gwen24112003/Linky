import React from 'react';
import { SectionKicker } from '@/components/ui/SectionKicker';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';
const PAPER = '#FAF7F0';
const RULE = 'rgba(26,35,50,0.16)';

export const ManifestoSection: React.FC = () => {
  return (
    <section
      className="py-24 md:py-32"
      style={{ background: PAPER }}
      aria-labelledby="manifeste-title"
    >
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Kicker */}
        <div className="mb-10 md:mb-14">
          <SectionKicker label="Manifeste" index="01" />
        </div>

        {/* Titre */}
        <h2
          id="manifeste-title"
          className="font-heading font-bold leading-[0.95] tracking-tight text-[2.75rem] sm:text-6xl lg:text-7xl"
          style={{ color: NAVY }}
        >
          Ni développeur,
          <br />
          ni cabinet conseil.
        </h2>

        {/* Lede */}
        <p className="mt-8 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
          Il y a deux catégories d'acteurs qui parlent aux patrons du bâtiment.
        </p>

        {/* Les deux concurrents — liste-définition réglée */}
        <dl className="mt-12 md:mt-14 max-w-3xl">
          <div
            className="grid grid-cols-1 sm:grid-cols-[minmax(0,15rem)_1fr] gap-x-10 gap-y-1 py-5 border-t"
            style={{ borderColor: RULE }}
          >
            <dt className="text-lg md:text-xl font-semibold" style={{ color: NAVY }}>
              Les éditeurs de logiciels
            </dt>
            <dd className="text-base md:text-lg text-gray-600 leading-relaxed">
              vendent leur outil et passent à l'entreprise suivante.
            </dd>
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-[minmax(0,15rem)_1fr] gap-x-10 gap-y-1 py-5 border-t border-b"
            style={{ borderColor: RULE }}
          >
            <dt className="text-lg md:text-xl font-semibold" style={{ color: NAVY }}>
              Les cabinets de conseil
            </dt>
            <dd className="text-base md:text-lg text-gray-600 leading-relaxed">
              livrent une feuille de route et laissent le patron se débrouiller pour l'appliquer.
            </dd>
          </div>
          <p className="mt-6 text-base md:text-lg text-gray-500">
            Entre les deux, il y a un vide.
          </p>
        </dl>

        {/* Bascule */}
        <p
          className="font-heading font-bold tracking-tight leading-[1.02] mt-16 md:mt-20 text-4xl sm:text-5xl lg:text-6xl"
          style={{ color: NAVY }}
        >
          Opus Advisor{' '}
          <span className="relative inline-block">
            occupe ce vide.
            <span
              className="absolute left-0 -bottom-0.5 w-full"
              style={{ height: 7, background: GOLD }}
            />
          </span>
        </p>

        {/* Clôture — décalée à droite (asymétrie) */}
        <div className="mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-start-4 md:col-span-9">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Nous sommes des{' '}
              <strong className="font-semibold" style={{ color: NAVY }}>
                opérateurs
              </strong>
              . On diagnostique votre système, on le met en œuvre, on reste à vos côtés pour le
              faire évoluer. Vous gardez Batappli, Obat ou EBP — on leur apprend à parler à vos
              autres outils.
            </p>

            {/* Engagement — pull-statement réglé, pas un badge */}
            <div
              className="mt-10 pt-8 border-t flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-7"
              style={{ borderColor: RULE }}
            >
              <p
                className="font-heading font-bold leading-none whitespace-nowrap text-3xl md:text-4xl"
                style={{ color: GOLD }}
              >
                10 h / semaine
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                rendues à votre entreprise dès le deuxième mois. Pas de promesse en l'air, pas de
                slide deck — un système qui tourne, mesurable, documenté, transmis à vos équipes.
              </p>
            </div>

            <p
              className="mt-9 text-xs font-semibold uppercase tracking-[0.24em]"
              style={{ color: NAVY, opacity: 0.4 }}
            >
              — Opus Advisor
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
