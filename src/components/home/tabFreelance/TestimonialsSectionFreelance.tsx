import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Testimonial } from '../../../types';

const testimonials: Testimonial[] = [
  { id: '1', name: 'Andy Antonucci',  role: 'Co-founder',   company: 'SAFER Nation', content: 'In the garden of life, some things are just very sweet. This is one of them.' },
  { id: '2', name: 'Wanja Singleton', role: 'Leadership at', company: 'Butcher',      content: 'Your expectations will fly way high. I felt like I was soaring.' },
  { id: '3', name: 'Carl Carvalho',   role: 'Growth at',    company: 'Cannon & Co.', content: 'Using this felt like it transformed me completely.' },
  { id: '4', name: 'Julien Martin',   role: 'Partner',      company: 'StratEx',      content: 'Un réseau sérieux, des missions qui ont vraiment du sens.' },
  { id: '5', name: 'Laure Petit',     role: 'Consultant',   company: 'OrgAxis',      content: "L'onboarding était fluide et les clients sont de qualité." },
];

const TestimonialCard: React.FC<{ t: Testimonial }> = ({ t }) => (
  <div
    className="flex-shrink-0 w-80 rounded-2xl p-6"
    style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
    }}
  >
    <Quote size={20} className="mb-4" style={{ color: "rgba(201,168,76,0.6)" }} />
    <p className="text-gray-300 text-sm leading-relaxed mb-5 italic">
      "{t.content}"
    </p>
    <div className="flex items-center gap-3">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #C9A84C, #a8873a)' }}
      >
        {t.name.charAt(0)}
      </div>
      <div>
        <p className="text-sm font-semibold text-white">{t.name}</p>
        <p className="text-xs text-gray-500">{t.role} {t.company}</p>
      </div>
    </div>
  </div>
);

export const TestimonialsSectionFreelance: React.FC = () => {
  const row1 = [...testimonials, ...testimonials];
  const row2 = [...[...testimonials].reverse(), ...[...testimonials].reverse()];

  return (
    <section className="py-20 bg-gray-950 relative overflow-hidden">
      <div className="container mx-auto px-6 mb-14">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Ce que nos <span className="text-gradient">collaborateurs</span> disent de nous
        </motion.h2>
      </div>

      {/* Rangée 1 — défile gauche */}
      <div className="overflow-hidden mb-5">
        <motion.div
          className="flex gap-5"
          style={{ width: 'max-content' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        >
          {row1.map((t, i) => <TestimonialCard key={i} t={t} />)}
        </motion.div>
      </div>

      {/* Rangée 2 — défile droite */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-5"
          style={{ width: 'max-content' }}
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
        >
          {row2.map((t, i) => <TestimonialCard key={i} t={t} />)}
        </motion.div>
      </div>

      {/* Fade sur les bords */}
      <div className="absolute inset-y-0 left-0 w-24 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to right, #030712, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-24 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to left, #030712, transparent)' }} />
    </section>
  );
};
