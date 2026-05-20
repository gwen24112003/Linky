'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileCheck, Wallet, BarChart3, ArrowRight } from 'lucide-react';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';

const builds = [
  {
    icon: FileCheck,
    profile: 'Plombier-chauffagiste · 8-20 personnes',
    title: "Workflow MaPrimeRénov' automatisé",
    desc: "Le montage d'un dossier passe de 6 heures à 90 minutes. Pièces vérifiées automatiquement, refus évités avant l'envoi.",
  },
  {
    icon: Wallet,
    profile: 'Électricien · 8-15 personnes',
    title: 'Devis dans la journée, relances automatiques',
    desc: "Les devis partent le jour même au lieu de traîner 2 à 3 semaines. Les situations oubliées sont relancées toutes seules : la trésorerie rentre.",
  },
  {
    icon: BarChart3,
    profile: 'Multi-technique · 30-60+ personnes · multi-agences',
    title: 'Reporting consolidé en temps réel',
    desc: "Marge chantier et trésorerie consolidées sur toutes les agences. Plusieurs jours de DAF récupérés chaque mois, retenues de garantie recensées.",
  },
];

export const CaseTeasersSection: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-white" aria-labelledby="builds-title">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl mb-12 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p
            className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase mb-3"
            style={{ color: GOLD }}
          >
            Ce qu'on construit
          </p>
          <h2
            id="builds-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5"
            style={{ color: NAVY }}
          >
            Des systèmes taillés pour le second œuvre.
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            On démarre tout juste : pas de cas clients à exhiber. Voici les chantiers concrets
            qu'on met en œuvre — et qu'on documentera avec nos premiers pilotes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {builds.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                className="bg-white rounded-2xl p-6 md:p-7 flex flex-col gap-4"
                style={{
                  border: '1px solid rgba(26,35,50,0.08)',
                  boxShadow: '0 4px 20px rgba(26,35,50,0.05)',
                }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(26,35,50,0.1)' }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}55` }}
                >
                  <Icon size={20} style={{ color: NAVY }} />
                </div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.16em]"
                  style={{ color: GOLD }}
                >
                  {b.profile}
                </p>
                <h3 className="text-lg md:text-xl font-bold leading-tight" style={{ color: NAVY }}>
                  {b.title}
                </h3>
                <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed">{b.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 md:mt-12">
          <Link
            href="/cas-clients"
            className="group inline-flex items-center gap-2 font-semibold text-base"
            style={{ color: NAVY }}
          >
            Voir le programme Opus Pilotes
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
