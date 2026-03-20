import React from 'react';
import { Search, Compass, Wrench, GraduationCap, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const processSteps = [
  {
    id: '1', icon: 'search', num: '01',
    title: 'Audit & Diagnostic',
    desc: 'Cartographie de vos processus, identification des frictions et des opportunités.',
  },
  {
    id: '2', icon: 'compass', num: '02',
    title: 'Stratégie & Simplification',
    desc: 'Priorisation des chantiers, définition de la cible opérationnelle.',
  },
  {
    id: '3', icon: 'wrench', num: '03',
    title: 'Architecture & Mise en œuvre',
    desc: 'Conception et déploiement des solutions avec vos équipes.',
  },
  {
    id: '4', icon: 'graduation', num: '04',
    title: 'Formation & Ancrage',
    desc: 'Transfert de compétences et adoption durable par les collaborateurs.',
  },
  {
    id: '5', icon: 'trending', num: '05',
    title: 'Suivi & Pérennisation',
    desc: 'Pilotage des résultats et ajustements pour ancrer les gains.',
  },
];

const getIcon = (iconName: string) => {
  const p = { size: 26, className: 'text-white' };
  switch (iconName) {
    case 'search':     return <Search {...p} />;
    case 'compass':    return <Compass {...p} />;
    case 'wrench':     return <Wrench {...p} />;
    case 'graduation': return <GraduationCap {...p} />;
    case 'trending':   return <TrendingUp {...p} />;
    default:           return <Search {...p} />;
  }
};

export const ProcessSectionEntreprise: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">

        {/* ── En-tête ── */}
        <div className="text-center mb-16">
          <motion.p
            className="text-sm font-semibold tracking-[0.2em] uppercase text-teal-600 mb-3"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Notre approche
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Notre méthodologie
          </motion.h2>
        </div>

        {/* ── Grille de cartes ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className="relative bg-white rounded-2xl p-6 flex flex-col gap-4 group"
              style={{ border: '1px solid rgba(15,118,110,0.1)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(15,118,110,0.12)' }}
            >
              {/* Numéro watermark */}
              <span
                className="absolute top-4 right-5 text-5xl font-bold leading-none select-none"
                style={{ color: 'rgba(15,118,110,0.06)' }}
              >
                {step.num}
              </span>

              {/* Icône */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #2dd4bf, #0f766e)',
                  boxShadow: '0 6px 20px rgba(15,118,110,0.35)',
                }}
              >
                {getIcon(step.icon)}
              </div>

              {/* Texte */}
              <div>
                <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-1">{step.num}</p>
                <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>

              {/* Connecteur flèche (sauf dernier) */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center"
                    style={{ border: '1px solid rgba(15,118,110,0.2)', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5h6M6 2l3 3-3 3" stroke="rgba(15,118,110,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
