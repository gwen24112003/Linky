'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CalendarClock, ArrowRight } from 'lucide-react';

const NAVY = '#1A2332';
const GOLD = '#C9A84C';

export const WhyNowSection: React.FC = () => {
  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${NAVY}, #223047 55%, ${NAVY})` }}
      aria-labelledby="why-now-title"
    >
      {/* Halo doré en fond */}
      <div
        className="absolute pointer-events-none opacity-30"
        style={{
          top: '-20%',
          right: '-10%',
          width: 420,
          height: 420,
          background: `radial-gradient(circle, ${GOLD}33 0%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge date */}
          <div className="md:col-span-4 flex justify-center md:justify-end">
            <div
              className="rounded-2xl p-6 md:p-7 text-center w-full max-w-[220px]"
              style={{
                background: `${GOLD}14`,
                border: `1px solid ${GOLD}55`,
                boxShadow: `0 0 48px ${GOLD}26, 0 12px 40px rgba(0,0,0,0.25)`,
              }}
            >
              <CalendarClock size={26} className="mx-auto mb-3" style={{ color: GOLD }} />
              <p
                className="text-[10px] font-semibold tracking-[0.22em] uppercase mb-3"
                style={{ color: GOLD }}
              >
                Deadline PME
              </p>
              <p className="text-2xl md:text-3xl font-bold text-white leading-none mb-1">
                Septembre
              </p>
              <p
                className="text-5xl md:text-6xl font-bold leading-none"
                style={{ color: GOLD }}
              >
                2027
              </p>
            </div>
          </div>

          {/* Copy */}
          <div className="md:col-span-8">
            <p
              className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase mb-4"
              style={{ color: GOLD }}
            >
              Pourquoi maintenant
            </p>
            <h2
              id="why-now-title"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5"
            >
              Septembre 2027 arrive vite.
            </h2>
            <p className="text-base md:text-lg text-white/80 leading-relaxed mb-3">
              La facturation électronique obligatoire ne pardonnera pas les boîtes qui sortent encore leurs devis sur Excel.
            </p>
            <p className="text-base md:text-lg text-white/80 leading-relaxed">
              <span className="text-white font-semibold">Un système propre se construit en 2 à 3 mois.</span>{' '}
              Plus vous attendez, plus vous paierez cher pour être prêt dans l'urgence.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-7">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-200 hover:scale-[1.02] shadow-lg"
                style={{ background: GOLD, color: NAVY }}
              >
                Commencer par le pré-audit
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/article/facturation-electronique-2026"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm md:text-base border-2 border-white/25 text-white/90 hover:bg-white/5 hover:border-white/40 transition-all duration-200"
              >
                Lire le point complet
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
