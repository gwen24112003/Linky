'use client';

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionKicker } from '@/components/ui/SectionKicker';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';
const RULE = 'rgba(26,35,50,0.16)';

const builds = [
  {
    n: '01',
    profile: 'Plombier-chauffagiste · 8-20 personnes',
    title: "Workflow MaPrimeRénov' automatisé",
    desc: "Le montage d'un dossier passe de 6 heures à 90 minutes. Pièces vérifiées automatiquement, refus évités avant l'envoi.",
  },
  {
    n: '02',
    profile: 'Électricien · 8-15 personnes',
    title: 'Devis dans la journée, relances automatiques',
    desc: "Les devis partent le jour même au lieu de traîner 2 à 3 semaines. Les situations oubliées sont relancées toutes seules : la trésorerie rentre.",
  },
  {
    n: '03',
    profile: 'Multi-technique · 30-60+ personnes · multi-agences',
    title: 'Reporting consolidé en temps réel',
    desc: "Marge chantier et trésorerie consolidées sur toutes les agences. Plusieurs jours de DAF récupérés chaque mois, retenues de garantie recensées.",
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const CaseTeasersSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32" style={{ background: '#FAF7F0' }} aria-labelledby="builds-title">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={item} className="mb-10 md:mb-12">
            <SectionKicker label="Réalisations" index="06" />
          </motion.div>

          <motion.h2
            id="builds-title"
            variants={item}
            className="font-heading font-bold leading-[1.02] tracking-tight text-4xl md:text-5xl lg:text-6xl max-w-3xl"
            style={{ color: NAVY }}
          >
            Des systèmes taillés pour le second œuvre.
          </motion.h2>
          <motion.p variants={item} className="mt-7 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
            On démarre tout juste : pas de cas clients à exhiber. Voici les chantiers concrets qu'on
            met en œuvre — et qu'on documentera avec nos premiers pilotes.
          </motion.p>

          <motion.ol variants={item} className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-x-10">
            {builds.map((b) => (
              <li key={b.n} className="pt-6 border-t flex flex-col" style={{ borderColor: NAVY }}>
                <span className="font-heading font-bold text-2xl leading-none mb-4" style={{ color: GOLD }}>
                  {b.n}
                </span>
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.16em] mb-3"
                  style={{ color: 'rgba(26,35,50,0.45)' }}
                >
                  {b.profile}
                </span>
                <h3 className="font-semibold text-lg md:text-xl leading-snug mb-3" style={{ color: NAVY }}>
                  {b.title}
                </h3>
                <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed">{b.desc}</p>
              </li>
            ))}
          </motion.ol>

          <motion.div variants={item} className="mt-12">
            <Link
              href="/cas-clients"
              className="group inline-flex items-center gap-2 font-semibold text-base"
              style={{ color: NAVY }}
            >
              Voir le programme Opus Pilotes
              <ArrowRight size={18} style={{ color: GOLD }} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
