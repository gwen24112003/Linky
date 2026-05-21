'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';
const OFFWHITE = '#FAF7F0';

export const ManifestoSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white" aria-labelledby="manifeste-title">
      <div className="container mx-auto px-6">
        <motion.div
          className="relative max-w-3xl mx-auto rounded-3xl overflow-hidden"
          style={{ background: OFFWHITE, boxShadow: '0 24px 60px rgba(26,35,50,0.10)' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Accent doré pleine hauteur, flush au bord gauche */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1.5"
            style={{ background: `linear-gradient(${GOLD}, ${GOLD}88)` }}
          />

          <div className="p-8 md:p-12 lg:p-14">
            <p
              className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase mb-4"
              style={{ color: GOLD }}
            >
              Notre manifeste
            </p>

            <h2
              id="manifeste-title"
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1]"
              style={{ color: NAVY }}
            >
              Ni développeur, ni cabinet conseil.
            </h2>
            <div className="mt-5 mb-7 h-[3px] w-14 rounded-full" style={{ background: GOLD }} />

            <div className="space-y-5 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>Il y a deux catégories d'acteurs qui parlent aux patrons du bâtiment.</p>
              <p>
                Les <strong style={{ color: NAVY }}>éditeurs de logiciels</strong> vendent leur
                outil et passent à l'entreprise suivante. Les{' '}
                <strong style={{ color: NAVY }}>cabinets de conseil classiques</strong> livrent une
                feuille de route et laissent le patron se débrouiller pour l'appliquer. Entre les
                deux, il y a un vide.
              </p>
            </div>

            {/* Pivot */}
            <p
              className="my-8 pl-5 border-l-4 text-2xl md:text-3xl font-bold leading-tight"
              style={{ borderColor: GOLD, color: NAVY }}
            >
              Opus Advisor occupe ce vide.
            </p>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Nous sommes des <strong style={{ color: GOLD }}>opérateurs</strong>. On diagnostique
              votre système, on le met en œuvre, on reste à vos côtés pour le faire évoluer. Vous
              gardez Batappli, Obat ou EBP — on leur apprend à parler à vos autres outils.
            </p>

            {/* Engagement — bloc navy avec stat dorée */}
            <div
              className="mt-9 rounded-2xl p-6 md:p-7 flex flex-col sm:flex-row gap-5 sm:items-center"
              style={{ background: NAVY }}
            >
              <div className="flex-shrink-0 flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${GOLD}1f`, border: `1px solid ${GOLD}66` }}
                >
                  <Clock size={22} style={{ color: GOLD }} />
                </div>
                <div className="leading-none">
                  <span className="block text-3xl font-bold" style={{ color: GOLD }}>
                    10 h
                  </span>
                  <span className="block text-xs uppercase tracking-wider text-white/60 mt-1">
                    par semaine
                  </span>
                </div>
              </div>
              <p className="text-sm md:text-[15px] text-white/85 leading-relaxed">
                <strong className="text-white">
                  Rendues à votre entreprise dès le deuxième mois.
                </strong>{' '}
                Pas de promesse en l'air, pas de slide deck. Un système qui tourne, mesurable,
                documenté, transmis à vos équipes.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
