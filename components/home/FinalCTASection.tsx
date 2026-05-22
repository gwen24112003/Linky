'use client';

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionKicker } from '@/components/ui/SectionKicker';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';
const RULE = 'rgba(255,255,255,0.16)';

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const FinalCTASection: React.FC = () => {
  return (
    <section id="contact" className="py-24 md:py-32" style={{ background: NAVY }} aria-labelledby="cta-title">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={item} className="mb-10 md:mb-12">
            <SectionKicker label="Démarrer" index="09" tone="dark" />
          </motion.div>

          <motion.h2
            id="cta-title"
            variants={item}
            className="font-heading font-bold leading-[1.02] tracking-tight text-4xl md:text-5xl lg:text-6xl text-white"
          >
            Deux façons de démarrer.
          </motion.h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-y-0 md:gap-x-14">
            {/* Pré-audit */}
            <motion.div variants={item} className="pt-7 border-t flex flex-col" style={{ borderColor: RULE }}>
              <div className="flex items-baseline justify-between gap-4 mb-4">
                <h3 className="font-heading font-bold text-2xl md:text-3xl text-white">
                  Pré-audit gratuit
                </h3>
                <span className="font-heading font-bold text-lg whitespace-nowrap" style={{ color: GOLD }}>
                  Gratuit
                </span>
              </div>
              <p className="text-base text-white/75 leading-relaxed flex-1">
                30 minutes en visio. Vous nous montrez vos outils. On identifie 3 points de friction
                et on vous montre en direct comment les régler. Sans engagement.
              </p>
              <Link
                href="/contact"
                className="group mt-7 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm md:text-base transition-all duration-200 hover:scale-[1.02] self-start"
                style={{ background: GOLD, color: NAVY }}
              >
                Réserver un créneau
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Audit Stack */}
            <motion.div variants={item} className="pt-7 border-t flex flex-col" style={{ borderColor: RULE }}>
              <div className="flex items-baseline justify-between gap-4 mb-4">
                <h3 className="font-heading font-bold text-2xl md:text-3xl text-white">
                  Audit Stack
                </h3>
                <span className="font-heading font-bold text-lg whitespace-nowrap" style={{ color: GOLD }}>
                  990 € HT
                </span>
              </div>
              <p className="text-base text-white/75 leading-relaxed flex-1">
                10 jours pour cartographier vos outils, identifier les frictions et savoir ce qu'il
                faut vraiment changer. Avec préconisation chiffrée. Livré en 10 jours ouvrés.
              </p>
              <Link
                href="/contact"
                className="group mt-7 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm md:text-base border-2 text-white hover:bg-white/5 transition-all duration-200 self-start"
                style={{ borderColor: GOLD }}
              >
                Demander un Audit Stack
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
