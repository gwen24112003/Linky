'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Users, Zap } from 'lucide-react';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';

const pillars = [
  {
    icon: Hammer,
    tag: 'PILIER 1 — VOTRE LOGICIEL MÉTIER',
    title: 'Batappli, Tolteck, Obat, EBP — celui que vous avez déjà.',
    desc: "On l'audite, on corrige le paramétrage, on l'exploite à fond. Devis, factures, acomptes, situations : tout propre. Si vous n'en avez aucun, on choisit ensemble.",
  },
  {
    icon: Users,
    tag: "PILIER 2 — LA MÉMOIRE D'ÉQUIPE",
    title: 'Vos chantiers, vos photos, vos SAV — accessibles à tous.',
    desc: "Le plus souvent avec Notion ou Google Workspace branché à votre WhatsApp. Plus jamais d'info perdue entre le chef de chantier et le bureau.",
  },
  {
    icon: Zap,
    tag: 'PILIER 3 — LE LIANT',
    title: 'Vos outils arrêtent de vivre chacun de leur côté.',
    desc: "Make ou n8n relie votre logiciel BTP, votre compta et votre banque. Relances auto, notifications équipe, rapports hebdo. Sans que vous touchiez à rien.",
  },
];

export const SystemSection: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-white" aria-labelledby="system-title">
      <div className="container mx-auto px-6">
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
            Ce qu'on construit
          </p>
          <h2
            id="system-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5"
            style={{ color: NAVY }}
          >
            On ne remplace pas vos outils.
            <br />
            <span style={{ color: GOLD }}>On les fait enfin travailler ensemble.</span>
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            Chaque boîte du second œuvre a déjà un logiciel BTP, un drive, un WhatsApp d'équipe. Le problème n'est pas ce que vous avez — c'est que personne ne les a connectés.
            <br />
            <span className="font-medium" style={{ color: NAVY }}>
              On centralise, on automatise, on branche. Vous gardez vos outils, ils commencent à se parler.
            </span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.tag}
                className="rounded-2xl p-6 md:p-7 flex flex-col gap-4 h-full"
                style={{
                  background: i === 1 ? NAVY : '#FAF8F4',
                  border: `1px solid ${i === 1 ? 'rgba(201,168,76,0.3)' : 'rgba(26,35,50,0.08)'}`,
                  boxShadow: '0 2px 12px rgba(26,35,50,0.04)',
                  color: i === 1 ? 'white' : NAVY,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: i === 1 ? 'rgba(201,168,76,0.18)' : `${GOLD}18`,
                    border: `1px solid ${GOLD}55`,
                  }}
                >
                  <Icon size={22} style={{ color: GOLD }} />
                </div>

                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: i === 1 ? 'rgba(255,255,255,0.55)' : 'rgba(26,35,50,0.5)' }}
                >
                  {p.tag}
                </p>

                <h3
                  className="text-lg md:text-xl font-bold leading-snug"
                  style={{ color: i === 1 ? 'white' : NAVY }}
                >
                  {p.title}
                </h3>

                <p
                  className="text-sm md:text-[15px] leading-relaxed"
                  style={{ color: i === 1 ? 'rgba(255,255,255,0.75)' : 'rgba(26,35,50,0.7)' }}
                >
                  {p.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
