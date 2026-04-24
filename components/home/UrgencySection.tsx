'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight } from 'lucide-react';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';

export const UrgencySection: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-white" aria-labelledby="urgency-title">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-6xl mx-auto rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12"
          style={{
            background: `linear-gradient(135deg, ${NAVY}, #2A3A50)`,
            boxShadow: '0 24px 60px rgba(26,35,50,0.2)',
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Bandeau latéral date */}
          <div
            className="md:col-span-4 p-8 md:p-10 flex flex-col justify-center items-center text-center relative overflow-hidden"
            style={{ background: 'rgba(0,0,0,0.2)' }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle, ${GOLD}55 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
              }}
            />
            <AlertTriangle size={28} style={{ color: GOLD }} className="mb-3 relative z-10" />
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white/60 relative z-10">
              Échéance
            </p>
            <p
              className="text-4xl md:text-5xl font-bold leading-none mt-2 relative z-10"
              style={{ color: GOLD }}
            >
              1ᵉʳ sept.
            </p>
            <p className="text-2xl md:text-3xl font-bold text-white relative z-10">2027</p>
            <p className="text-xs text-white/50 mt-3 relative z-10">
              Facturation électronique
              <br />
              obligatoire pour toutes les PME
            </p>
          </div>

          {/* Contenu */}
          <div className="md:col-span-8 p-8 md:p-12 text-white">
            <p
              className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase mb-3"
              style={{ color: GOLD }}
            >
              Pourquoi maintenant
            </p>
            <h2
              id="urgency-title"
              className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-5"
            >
              La facturation électronique 2027, c'est maintenant qu'on la prépare.
            </h2>

            <div className="space-y-4 text-sm md:text-base text-white/75 leading-relaxed">
              <p>
                Au 1ᵉʳ septembre 2027, toutes les PME du BTP doivent émettre leurs factures en électronique via une Plateforme Agréée (PA). Sanctions : jusqu'à{' '}
                <strong className="text-white">50 € par facture non conforme</strong>, plafond{' '}
                <strong className="text-white">15 000 €/an</strong>.
              </p>
              <p>
                La bonne nouvelle : vos logiciels actuels (Batappli, EBP, Obat) s'adaptent. Mais encore faut-il que tout votre système tienne la route autour : relances, archivage, e-reporting, circuits de validation. C'est ça qu'on doit cadrer avant 2027.
              </p>
              <p className="font-medium text-white">
                Les boîtes qui s'y prennent en 2026 passent tranquilles. Les autres vont bricoler en urgence à l'été 2027.
              </p>
            </div>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-200 hover:scale-[1.02]"
              style={{ background: GOLD, color: NAVY }}
            >
              Sécuriser ma conformité 2027
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
