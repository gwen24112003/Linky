'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';

const convictions = [
  {
    title: 'Pas de boîte noire',
    desc: "Tout ce qu'on met en place, vous le comprenez. On forme votre équipe. Si demain on se sépare, votre système continue de tourner.",
  },
  {
    title: 'Pas de dépendance éditeur',
    desc: "On ne revend pas Batappli, Obat ou autre. On choisit le meilleur outil pour vous, pas celui qui nous commissionne.",
  },
  {
    title: 'Un résultat chiffré, pas des promesses',
    desc: "Avant de démarrer, on chiffre ce qu'on vous fait gagner. Si on ne peut pas le prouver, on ne le promet pas.",
  },
  {
    title: 'Si on ne peut pas vous aider, on le dit',
    desc: "Certaines boîtes n'ont pas besoin de nous. On préfère vous dire non que facturer pour rien. On recommande d'autres solutions si c'est le cas.",
  },
];

export const ConvictionsSection: React.FC = () => {
  return (
    <section
      className="py-20 md:py-24 relative overflow-hidden"
      style={{ background: NAVY }}
      aria-labelledby="convictions-title"
    >
      <div
        className="absolute pointer-events-none opacity-40"
        style={{
          top: '-20%',
          right: '-10%',
          width: 600,
          height: 600,
          background: `radial-gradient(circle, ${GOLD}22 0%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-3xl mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p
            className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase mb-3"
            style={{ color: GOLD }}
          >
            Nos convictions
          </p>
          <h2
            id="convictions-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white"
          >
            Comment on travaille
            <span className="text-white/60"> (et ce qu'on refuse de faire).</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {convictions.map((c, i) => (
            <motion.div
              key={c.title}
              className="rounded-2xl p-6 md:p-7 flex gap-4 items-start"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(10px)',
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: GOLD, color: NAVY }}
              >
                <Check size={18} strokeWidth={3} />
              </div>
              <div>
                <h3 className="font-bold text-lg md:text-xl text-white mb-2 leading-snug">
                  {c.title}
                </h3>
                <p className="text-sm md:text-[15px] text-white/70 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
