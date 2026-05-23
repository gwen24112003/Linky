'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { SectionKicker } from '@/components/ui/SectionKicker';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';
const RULE = 'rgba(255,255,255,0.16)';

const convictions = [
  {
    n: '01',
    title: 'Pas de boîte noire',
    desc: "Tout ce qu'on met en place, vous le comprenez. On forme votre équipe. Si demain on se sépare, votre système continue de tourner.",
  },
  {
    n: '02',
    title: 'Pas de dépendance éditeur',
    desc: "On ne revend pas Batappli, Obat ou autre. On choisit le meilleur outil pour vous, pas celui qui nous commissionne.",
  },
  {
    n: '03',
    title: 'Un résultat chiffré, pas des promesses',
    desc: "Avant de démarrer, on chiffre ce qu'on vous fait gagner. Si on ne peut pas le prouver, on ne le promet pas.",
  },
  {
    n: '04',
    title: 'Si on ne peut pas vous aider, on le dit',
    desc: "Certaines boîtes n'ont pas besoin de nous. On préfère vous dire non que facturer pour rien. On vous oriente vers d'autres prestataires si c'est le cas.",
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const ConvictionsSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32" style={{ background: NAVY }} aria-labelledby="convictions-title">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={item} className="mb-10 md:mb-12">
            <SectionKicker label="Convictions" index="05" tone="dark" />
          </motion.div>

          <motion.h2
            id="convictions-title"
            variants={item}
            className="font-heading font-bold leading-[1.02] tracking-tight text-4xl md:text-5xl lg:text-6xl text-white max-w-3xl"
          >
            Comment on travaille{' '}
            <span className="text-white/55">(et ce qu'on refuse de faire).</span>
          </motion.h2>

          <motion.ol variants={item} className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-14">
            {convictions.map((c) => (
              <li
                key={c.n}
                className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-6 border-t"
                style={{ borderColor: RULE }}
              >
                <span
                  className="font-heading font-bold text-base leading-none pt-1"
                  style={{ color: GOLD }}
                >
                  {c.n}
                </span>
                <div>
                  <h3 className="font-semibold text-lg md:text-xl leading-snug mb-2 text-white">
                    {c.title}
                  </h3>
                  <p className="text-sm md:text-[15px] text-white/65 leading-relaxed">{c.desc}</p>
                </div>
              </li>
            ))}
          </motion.ol>
        </motion.div>
      </div>
    </section>
  );
};
