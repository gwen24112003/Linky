'use client';

import React from 'react';
import { RefreshCw, BellOff, Database, FileText, Clock, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

const problems = [
  {
    icon: RefreshCw,
    title: 'Doubles saisies',
    desc: 'Vous ressaisissez les mêmes données entre votre CRM, vos tableurs et vos emails.',
  },
  {
    icon: BellOff,
    title: 'Relances oubliées',
    desc: "Des prospects ou clients passent entre les mailles parce qu'il n'y a pas de système automatique.",
  },
  {
    icon: Database,
    title: 'Outils en silo',
    desc: 'Votre CRM, Notion, Google Sheets et Slack ne communiquent pas entre eux.',
  },
  {
    icon: FileText,
    title: 'Rapports manuels',
    desc: 'Vous produisez les mêmes tableaux chaque semaine à la main.',
  },
  {
    icon: Clock,
    title: 'Tâches sans valeur',
    desc: 'Une partie de votre journée est consacrée à des opérations qui pourraient tourner seules.',
  },
  {
    icon: BarChart2,
    title: 'Pas de visibilité',
    desc: "Vous n'avez pas de vue consolidée sur ce qui se passe dans vos opérations.",
  },
];

export const ProblemsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50" aria-labelledby="problems-title">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-sm font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: '#C9A84C' }}>
            Pourquoi automatiser
          </p>
          <h2 id="problems-title" className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pourquoi auditer et automatiser vos processus métier ?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            La plupart des inefficacités ne viennent pas d'un manque d'outils. Elles viennent du fait que les outils ne se parlent pas et que les tâches répétitives restent manuelles.
          </p>
        </motion.div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.li
                key={problem.title}
                className="bg-white rounded-2xl p-6 flex gap-4 items-start"
                style={{ border: '1px solid rgba(26,35,50,0.08)', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 * index, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(26,35,50,0.08)' }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(26,35,50,0.06)' }}
                >
                  <Icon size={20} style={{ color: '#1A2332' }} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{problem.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{problem.desc}</p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
