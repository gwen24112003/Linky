'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';
const PAPER = '#FAF7F0';
const RULE = 'rgba(26,35,50,0.16)';

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const ManifestoSection: React.FC = () => {
  return (
    <section
      className="py-24 md:py-32"
      style={{ background: PAPER }}
      aria-labelledby="manifeste-title"
    >
      <motion.div
        className="container mx-auto px-6 max-w-5xl"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Kicker */}
        <motion.div variants={item} className="flex items-center gap-5 mb-10 md:mb-14">
          <span
            className="text-xs font-semibold uppercase tracking-[0.28em] whitespace-nowrap"
            style={{ color: GOLD }}
          >
            Manifeste <span style={{ color: NAVY, opacity: 0.35 }}>/ 01</span>
          </span>
          <span className="flex-1 h-px" style={{ background: RULE }} />
        </motion.div>

        {/* Titre */}
        <motion.h2
          id="manifeste-title"
          variants={item}
          className="font-heading font-bold leading-[0.95] tracking-tight text-[2.75rem] sm:text-6xl lg:text-7xl"
          style={{ color: NAVY }}
        >
          Ni développeur,
          <br />
          ni cabinet conseil.
        </motion.h2>

        {/* Lede */}
        <motion.p
          variants={item}
          className="mt-8 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl"
        >
          Il y a deux catégories d'acteurs qui parlent aux patrons du bâtiment.
        </motion.p>

        {/* Les deux concurrents — liste-définition réglée */}
        <motion.dl variants={item} className="mt-12 md:mt-14 max-w-3xl">
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
        </motion.dl>

        {/* Bascule */}
        <motion.p
          variants={item}
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
        </motion.p>

        {/* Clôture — décalée à droite (asymétrie) */}
        <motion.div
          variants={item}
          className="mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-12"
        >
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
        </motion.div>
      </motion.div>
    </section>
  );
};
