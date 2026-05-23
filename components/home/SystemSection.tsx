'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { SectionKicker } from '@/components/ui/SectionKicker';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';
const RULE = 'rgba(26,35,50,0.16)';

const pillars = [
  {
    n: '01',
    tag: 'Votre logiciel métier',
    title: 'Batappli, Tolteck, Obat, EBP — celui que vous avez déjà.',
    desc: "On l'audite, on corrige le paramétrage, on l'exploite à fond. Devis, factures, acomptes, situations : tout propre. Si vous n'en avez aucun, on choisit ensemble.",
  },
  {
    n: '02',
    tag: "La mémoire d'équipe",
    title: 'Vos chantiers, vos photos, vos SAV — accessibles à tous.',
    desc: "Le plus souvent avec Notion ou Google Workspace branché à votre WhatsApp. Plus jamais d'info perdue entre le chef de chantier et le bureau.",
  },
  {
    n: '03',
    tag: 'Le liant',
    title: 'Vos outils arrêtent de vivre chacun de leur côté.',
    desc: "Make ou n8n relie votre logiciel BTP, votre compta et votre banque. Relances auto, notifications équipe, rapports hebdo. Sans que vous touchiez à rien.",
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

export const SystemSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32" style={{ background: '#FAF7F0' }} aria-labelledby="system-title">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={item} className="mb-10 md:mb-12">
            <SectionKicker label="Le système" index="04" />
          </motion.div>

          <motion.h2
            id="system-title"
            variants={item}
            className="font-heading font-bold leading-[1.02] tracking-tight text-4xl md:text-5xl lg:text-6xl max-w-3xl"
            style={{ color: NAVY }}
          >
            On ne remplace pas vos outils.{' '}
            <span style={{ color: GOLD }}>On les fait enfin travailler ensemble.</span>
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-7 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl"
          >
            Chaque boîte du second œuvre a déjà un logiciel BTP, un drive, un WhatsApp d'équipe. Le
            problème n'est pas ce que vous avez — c'est que personne ne les a connectés.{' '}
            <span className="font-medium" style={{ color: NAVY }}>
              On centralise, on automatise, on branche.
            </span>
          </motion.p>

          <motion.ol variants={item} className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-x-10">
            {pillars.map((p) => (
              <li
                key={p.n}
                className="pt-6 border-t flex flex-col"
                style={{ borderColor: NAVY }}
              >
                <span
                  className="font-heading font-bold text-2xl leading-none mb-4"
                  style={{ color: GOLD }}
                >
                  {p.n}
                </span>
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-2"
                  style={{ color: 'rgba(26,35,50,0.45)' }}
                >
                  {p.tag}
                </span>
                <h3 className="font-semibold text-lg md:text-xl leading-snug mb-3" style={{ color: NAVY }}>
                  {p.title}
                </h3>
                <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed">{p.desc}</p>
              </li>
            ))}
          </motion.ol>
        </motion.div>
      </div>
    </section>
  );
};
