'use client';

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Clock, Calendar, ShieldCheck } from 'lucide-react';

const NAVY = '#1A2332';
const GOLD = '#C9A84C';

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// Petits blocs "avant / après" pour le visuel éditorial
const beforeTools = ['Excel', 'WhatsApp', 'Batappli', 'Emails', 'Papiers', 'Banque'];
const afterTools = ['Devis', 'Chantier', 'Facturation', 'Équipe', 'Banque', 'SAV'];

export const HeroBTP: React.FC = () => {
  return (
    <section
      className="relative text-white overflow-hidden min-h-[calc(100vh-5rem)] flex items-center"
      style={{ background: `linear-gradient(135deg, ${NAVY}, #223047 55%, ${NAVY})` }}
      aria-label="Opus Advisory — Consultant ops pour les patrons du BTP second œuvre"
    >
      {/* Blob doré en fond */}
      <div
        className="absolute pointer-events-none opacity-40"
        style={{
          top: '-15%',
          left: '-10%',
          width: 620,
          height: 620,
          background: `radial-gradient(circle, ${GOLD}33 0%, transparent 70%)`,
          filter: 'blur(70px)',
        }}
      />
      <div
        className="absolute pointer-events-none opacity-30"
        style={{
          bottom: '-15%',
          right: '-10%',
          width: 540,
          height: 540,
          background: `radial-gradient(circle, ${GOLD}22 0%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />

      {/* Grille points */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container mx-auto px-6 relative z-10 pt-28 pb-16 md:pt-24 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Colonne texte */}
          <motion.div
            className="lg:col-span-7"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase mb-5"
              style={{ color: GOLD }}
              variants={item}
            >
              Second œuvre · Élec · Plomberie · Chauffage-clim
            </motion.p>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mb-6"
              variants={item}
            >
              On rend{' '}
              <span style={{ color: GOLD }}>10h par semaine</span>
              <br className="hidden sm:block" /> aux patrons du second œuvre.
            </motion.h1>

            <motion.p
              className="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl mb-8"
              variants={item}
            >
              Relances automatiques, chantiers centralisés, facturation 2027 prête.
              Un outil unique, adapté à votre boîte. Pas une énième plateforme.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8"
              variants={item}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl btn-shimmer"
                style={{ background: GOLD, color: NAVY }}
              >
                Pré-audit gratuit 30 min
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <a
                href="#methode"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-base md:text-lg border-2 border-white/25 text-white/90 hover:bg-white/5 hover:border-white/40 transition-all duration-200"
              >
                Voir comment on procède
              </a>
            </motion.div>

            <motion.ul
              className="flex flex-wrap gap-x-5 gap-y-2 text-xs md:text-sm text-white/60"
              variants={item}
            >
              <li className="inline-flex items-center gap-2">
                <Clock size={14} style={{ color: GOLD }} /> Visio
              </li>
              <li className="inline-flex items-center gap-2">
                <ShieldCheck size={14} style={{ color: GOLD }} /> Sans engagement
              </li>
              <li className="inline-flex items-center gap-2">
                <Calendar size={14} style={{ color: GOLD }} /> 3 points de friction identifiés en direct
              </li>
            </motion.ul>
          </motion.div>

          {/* Colonne visuel "Avant / Après" */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="rounded-2xl p-5 md:p-6 backdrop-blur-xl"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
              }}
            >
              {/* Avant */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block h-2 w-2 rounded-full bg-red-400/80" />
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-white/50">
                    Aujourd'hui
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {beforeTools.map((t) => (
                    <div
                      key={t}
                      className="text-xs md:text-sm px-2 py-2.5 rounded-lg text-center text-white/75"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px dashed rgba(255,255,255,0.18)',
                      }}
                    >
                      {t}
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[11px] text-white/40 italic">
                  6 outils qui ne se parlent pas.
                </p>
              </div>

              {/* Flèche */}
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-white/15" />
                <span
                  className="text-[10px] font-semibold tracking-[0.18em] uppercase px-2 py-1 rounded-full"
                  style={{
                    background: `${GOLD}22`,
                    color: GOLD,
                    border: `1px solid ${GOLD}44`,
                  }}
                >
                  Votre système Opus
                </span>
                <div className="flex-1 h-px bg-white/15" />
              </div>

              {/* Après */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: GOLD }}
                  />
                  <span
                    className="text-[11px] font-semibold tracking-wider uppercase"
                    style={{ color: GOLD }}
                  >
                    Après
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {afterTools.map((t) => (
                    <div
                      key={t}
                      className="text-xs md:text-sm px-2 py-2.5 rounded-lg text-center font-medium"
                      style={{
                        background: `${GOLD}14`,
                        border: `1px solid ${GOLD}55`,
                        color: 'white',
                      }}
                    >
                      {t}
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[11px] text-white/60 italic">
                  Un hub central. Tout le monde parle la même langue.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dégradé bas vers section suivante */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/[0.04] to-transparent pointer-events-none" />
    </section>
  );
};
