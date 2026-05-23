'use client';

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionKicker } from '@/components/ui/SectionKicker';

const NAVY = '#1A2332';
const GOLD = '#C9A84C';

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const WhyNowSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32" style={{ background: NAVY }} aria-labelledby="why-now-title">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={item} className="mb-10 md:mb-12">
            <SectionKicker label="Échéance" index="08" tone="dark" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">
            {/* Date — ancre typographique */}
            <motion.div variants={item} className="md:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/50 mb-2">
                1ᵉʳ septembre
              </p>
              <p
                className="font-heading font-bold leading-[0.85] text-7xl lg:text-8xl"
                style={{ color: GOLD }}
              >
                2027
              </p>
            </motion.div>

            {/* Copy */}
            <div className="md:col-span-8">
              <motion.h2
                id="why-now-title"
                variants={item}
                className="font-heading font-bold leading-[1.02] tracking-tight text-4xl md:text-5xl text-white"
              >
                La facturation électronique arrive vite.
              </motion.h2>
              <motion.p variants={item} className="mt-6 text-lg md:text-xl text-white/75 leading-relaxed">
                Elle ne pardonnera pas les boîtes qui sortent encore leurs devis sur Excel.
              </motion.p>
              <motion.p variants={item} className="mt-4 text-base md:text-lg text-white/75 leading-relaxed">
                <span className="text-white font-semibold">
                  Un système propre se construit en 2 à 3 mois.
                </span>{' '}
                Plus vous attendez, plus vous paierez cher pour être prêt dans l'urgence.
              </motion.p>

              <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-9">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm md:text-base transition-all duration-200 hover:scale-[1.02]"
                  style={{ background: GOLD, color: NAVY }}
                >
                  Commencer par le pré-audit
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/articles/facturation-electronique-2026"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm md:text-base border-2 text-white hover:bg-white/5 transition-all duration-200"
                  style={{ borderColor: 'rgba(255,255,255,0.3)' }}
                >
                  Lire le point complet
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
