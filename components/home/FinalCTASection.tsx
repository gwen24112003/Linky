'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';

export const FinalCTASection: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-[#FAF8F4]"
      aria-labelledby="cta-title"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-6xl mx-auto rounded-3xl overflow-hidden relative"
          style={{
            background: `linear-gradient(135deg, ${NAVY}, #2A3A50)`,
            boxShadow: '0 24px 60px rgba(26,35,50,0.2)',
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Glow top-left */}
          <div
            className="absolute pointer-events-none opacity-50"
            style={{
              top: '-20%',
              left: '-10%',
              width: 600,
              height: 600,
              background: `radial-gradient(circle, ${GOLD}22 0%, transparent 70%)`,
              filter: 'blur(80px)',
            }}
          />
          {/* Glow bottom-right */}
          <div
            className="absolute pointer-events-none opacity-30"
            style={{
              bottom: '-20%',
              right: '-10%',
              width: 500,
              height: 500,
              background: `radial-gradient(circle, ${GOLD}22 0%, transparent 70%)`,
              filter: 'blur(80px)',
            }}
          />
          {/* Dot pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          <div className="relative z-10 px-6 md:px-12 py-16 md:py-20">
            <div className="text-center mb-10 md:mb-12">
              <p
                className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase mb-4"
                style={{ color: GOLD }}
              >
                On se parle ?
              </p>
              <h2
                id="cta-title"
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white"
              >
                Deux façons de démarrer.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto">
              {/* Pré-audit gratuit */}
              <div
                className="rounded-2xl p-7 md:p-8 flex flex-col"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  Pré-audit gratuit
                </h3>
                <p className="text-sm md:text-base text-white/75 leading-relaxed mb-4">
                  30 minutes en visio. Vous nous montrez vos outils. On identifie 3 points de
                  friction et on vous montre en direct comment les régler.
                </p>
                <p className="text-sm font-semibold mb-6" style={{ color: GOLD }}>
                  Gratuit · Sans engagement
                </p>
                <Link
                  href="/contact"
                  className="group mt-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm md:text-base transition-all duration-200 hover:scale-[1.02] btn-shimmer"
                  style={{ background: GOLD, color: NAVY }}
                >
                  Réserver un créneau
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Audit Stack */}
              <div
                className="rounded-2xl p-7 md:p-8 flex flex-col"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: `1px solid ${GOLD}66`,
                }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  Audit Stack
                </h3>
                <p className="text-sm md:text-base text-white/75 leading-relaxed mb-4">
                  10 jours pour cartographier vos outils, identifier les frictions et savoir ce
                  qu'il faut vraiment changer. Avec préconisation chiffrée.
                </p>
                <p className="text-sm font-semibold mb-6" style={{ color: GOLD }}>
                  990 € HT · Livré en 10 jours ouvrés
                </p>
                <Link
                  href="/contact"
                  className="group mt-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm md:text-base border-2 text-white hover:bg-white/5 transition-all duration-200"
                  style={{ borderColor: GOLD }}
                >
                  Demander un Audit Stack
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
