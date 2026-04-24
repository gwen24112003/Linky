'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, ShieldCheck, Phone } from 'lucide-react';

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

          <div className="relative z-10 px-6 md:px-12 py-16 md:py-20 text-center">
            <p
              className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase mb-4"
              style={{ color: GOLD }}
            >
              On se parle ?
            </p>
            <h2
              id="cta-title"
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white mb-6"
            >
              On parle de votre boîte ?
            </h2>
            <p className="text-base md:text-lg text-white/75 leading-relaxed mb-10 max-w-2xl mx-auto">
              30 minutes en visio. Vous nous montrez vos outils. On identifie 3 points de friction et on vous montre en direct comment les régler.
              <br />
              <span className="text-white font-medium">Pas de vente, pas d'engagement.</span>
            </p>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-2xl btn-shimmer"
              style={{ background: GOLD, color: NAVY }}
            >
              Réserver un créneau
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>

            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 text-xs md:text-sm text-white/60">
              <li className="inline-flex items-center gap-2">
                <Clock size={14} style={{ color: GOLD }} /> Plages dispo sous 5 jours
              </li>
              <li className="inline-flex items-center gap-2">
                <ShieldCheck size={14} style={{ color: GOLD }} /> Annulation libre jusqu'à 2h avant
              </li>
              <li className="inline-flex items-center gap-2">
                <Phone size={14} style={{ color: GOLD }} /> Visio · 30 min · Gratuit
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
