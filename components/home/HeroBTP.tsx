'use client';

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Clock, Calendar, ShieldCheck, Network } from 'lucide-react';

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

// Outils réels d'une boîte du second œuvre.
// Mêmes noms avant/après : on ne les remplace pas, on les connecte.
// Positions en % dans le conteneur radial (left, top), centre = hub à 50/50.
const tools = [
  { name: 'Excel',    left: 20, top: 18 },
  { name: 'WhatsApp', left: 80, top: 18 },
  { name: 'Batappli', left: 10, top: 50 },
  { name: 'Emails',   left: 90, top: 50 },
  { name: 'Papiers',  left: 20, top: 82 },
  { name: 'Banque',   left: 80, top: 82 },
];

export const HeroBTP: React.FC = () => {
  return (
    <section
      className="relative text-white overflow-hidden min-h-[calc(100vh-5rem)] flex items-center"
      style={{ background: `linear-gradient(135deg, ${NAVY}, #223047 55%, ${NAVY})` }}
      aria-label="Opus Advisor — Consultant ops pour les patrons du BTP second œuvre"
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
              Relances automatiques, chantiers centralisés, devis qui ne traînent plus.
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
              role="figure"
              aria-label="Comparaison avant/après : de 6 outils déconnectés à un système unifié"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
              }}
            >
              {/* Avant — mêmes outils, dispersés, aucun lien */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block h-2 w-2 rounded-full bg-red-400/80" />
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-white/50">
                    Aujourd'hui
                  </span>
                </div>
                <div className="relative h-[200px] md:h-[220px]">
                  {tools.map((t) => (
                    <div
                      key={t.name}
                      className="absolute -translate-x-1/2 -translate-y-1/2 text-xs md:text-sm px-3 py-1.5 rounded-lg text-white/75 whitespace-nowrap"
                      style={{
                        left: `${t.left}%`,
                        top: `${t.top}%`,
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px dashed rgba(255,255,255,0.18)',
                      }}
                    >
                      {t.name}
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[11px] text-white/40 italic">
                  6 outils en silo. Chacun dans son coin.
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

              {/* Après — mêmes outils, reliés à un hub central */}
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
                <div className="relative h-[200px] md:h-[220px]">
                  {/* Lignes qui relient chaque outil au hub central */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    {tools.map((t) => (
                      // Ligne jusqu'au centre du chip. Le chip ayant un fond
                      // opaque, la portion sous la card est masquée : le
                      // trait semble s'arrêter pile au bord de la card.
                      <line
                        key={t.name}
                        x1="50"
                        y1="50"
                        x2={t.left}
                        y2={t.top}
                        stroke={GOLD}
                        strokeOpacity="0.6"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    ))}
                  </svg>

                  {/* Mêmes chips qu'avant, mêmes positions — on change pas les outils.
                      Fond opaque (NAVY + gold overlay) pour masquer la portion de ligne sous la card. */}
                  {tools.map((t) => (
                    <div
                      key={t.name}
                      className="absolute -translate-x-1/2 -translate-y-1/2 text-xs md:text-sm px-3 py-1.5 rounded-lg font-medium whitespace-nowrap z-10"
                      style={{
                        left: `${t.left}%`,
                        top: `${t.top}%`,
                        background: `linear-gradient(${GOLD}22, ${GOLD}22), ${NAVY}`,
                        border: `1px solid ${GOLD}66`,
                        color: 'white',
                      }}
                    >
                      {t.name}
                    </div>
                  ))}

                  {/* Hub central — la couche Opus qui fait le liant */}
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center z-10"
                    style={{
                      width: 52,
                      height: 52,
                      background: GOLD,
                      color: NAVY,
                      boxShadow: `0 0 0 6px ${GOLD}22, 0 0 28px ${GOLD}55`,
                    }}
                    aria-label="Hub Opus — couche qui connecte vos outils"
                  >
                    <Network size={22} strokeWidth={2.2} />
                  </div>
                </div>
                <p className="mt-3 text-[11px] text-white/60 italic">
                  Les mêmes outils. On les fait juste parler ensemble.
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
