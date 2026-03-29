import React from 'react';
import { Send, UserCheck, BadgeCheck, Users, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const processSteps = [
  {
    id: '1', icon: 'send', num: '01',
    title: 'Candidature',
    desc: 'Envoyez votre profil et décrivez votre expertise via notre formulaire dédié.',
  },
  {
    id: '2', icon: 'usercheck', num: '02',
    title: 'Entretien',
    desc: 'Échange avec un associé Opus Advisor pour valider votre profil et vos domaines d\'expertise.',
  },
  {
    id: '3', icon: 'badge', num: '03',
    title: 'Qualification',
    desc: 'Intégration officielle au réseau après validation de votre expertise et de votre approche.',
  },
  {
    id: '4', icon: 'users', num: '04',
    title: 'Onboarding',
    desc: 'Découverte des process Opus Advisor, des outils et des standards de livraison.',
  },
  {
    id: '5', icon: 'rocket', num: '05',
    title: 'Première mission',
    desc: 'Démarrage d\'une mission en co-traitance avec l\'accompagnement de nos associés.',
  },
];

const getIcon = (iconName: string) => {
  const p = { size: 26, className: 'text-white' };
  switch (iconName) {
    case 'send':      return <Send {...p} />;
    case 'usercheck': return <UserCheck {...p} />;
    case 'badge':     return <BadgeCheck {...p} />;
    case 'users':     return <Users {...p} />;
    case 'rocket':    return <Rocket {...p} />;
    default:          return <Send {...p} />;
  }
};

export const ProcessSectionFreelance: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden" aria-labelledby="process-experts-title">
      <div className="container mx-auto px-6">

        <div className="text-center mb-16">
          <motion.p
            className="text-sm font-semibold tracking-[0.2em] uppercase mb-3"
            style={{ color: '#C9A84C' }}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Comment ça fonctionne
          </motion.p>
          <motion.h2
            id="process-experts-title"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Le parcours d'intégration
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className="relative bg-white rounded-2xl p-6 flex flex-col gap-4 group"
              style={{ border: '1px solid rgba(26,35,50,0.1)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(26,35,50,0.12)' }}
            >
              <span
                className="absolute top-4 right-5 text-5xl font-bold leading-none select-none"
                style={{ color: 'rgba(201,168,76,0.06)' }}
              >
                {step.num}
              </span>

              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C, #a8873a)',
                  boxShadow: '0 6px 20px rgba(201,168,76,0.35)',
                }}
              >
                {getIcon(step.icon)}
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#C9A84C' }}>{step.num}</p>
                <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">{step.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{step.desc}</p>
              </div>

              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <div
                    className="w-6 h-6 rounded-full bg-white flex items-center justify-center"
                    style={{ border: '1px solid rgba(26,35,50,0.2)', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M2 5h6M6 2l3 3-3 3" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
