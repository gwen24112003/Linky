'use client';

import React from 'react';
import { motion } from 'framer-motion';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';
const OFFWHITE = '#FAF7F0';

export const ManifestoSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white" aria-labelledby="manifeste-title">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-[720px] mx-auto rounded-2xl p-8 md:p-12"
          style={{
            background: OFFWHITE,
            borderLeft: `4px solid ${GOLD}`,
            boxShadow: '0 12px 40px rgba(26,35,50,0.06)',
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            id="manifeste-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
            style={{ color: NAVY }}
          >
            Ni développeur, ni cabinet conseil.
          </h2>

          <div className="space-y-5 text-base md:text-lg text-gray-700 leading-relaxed">
            <p>
              Il y a deux catégories d'acteurs qui parlent aux patrons du bâtiment.
            </p>
            <p>
              Les <strong style={{ color: NAVY }}>éditeurs de logiciels</strong> vendent
              leur outil et passent à l'entreprise suivante. Les{' '}
              <strong style={{ color: NAVY }}>cabinets de conseil classiques</strong>{' '}
              livrent une feuille de route et laissent le patron se débrouiller pour
              l'appliquer. Entre les deux, il y a un vide.
            </p>
            <p className="text-xl md:text-2xl font-bold" style={{ color: NAVY }}>
              Opus Advisor occupe ce vide.
            </p>
            <p>
              Nous sommes des <strong style={{ color: GOLD }}>opérateurs</strong>. On
              diagnostique votre système, on le met en œuvre, on reste à vos côtés pour le
              faire évoluer. Vous gardez Batappli, Obat ou EBP — on leur apprend à parler à
              vos autres outils.
            </p>
            <p>
              Notre engagement :{' '}
              <strong style={{ color: NAVY }}>
                10 heures par semaine rendues à votre entreprise dès le deuxième mois
              </strong>
              . Pas de promesse en l'air, pas de slide deck. Un système qui tourne,
              mesurable, documenté, transmis à vos équipes.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
