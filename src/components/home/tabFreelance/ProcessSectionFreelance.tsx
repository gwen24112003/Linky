import React from 'react';
import { Lightbulb, Layers, Code, TestTube, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProcessSectionFreelance: React.FC = () => {
  const processSteps = [
    { id: '1', icon: 'lightbulb', title: 'Candidature', num: '01' },
    { id: '2', icon: 'layers', title: 'Entretien & Qualification', num: '02' },
    { id: '3', icon: 'code', title: 'Accréditation', num: '03' },
    { id: '4', icon: 'test', title: 'Onboarding', num: '04' },
    { id: '5', icon: 'rocket', title: 'Première Mission', num: '05' },
  ];

  const getIcon = (iconName: string) => {
    const p = { size: 32, className: 'text-white' };
    switch (iconName) {
      case 'lightbulb': return <Lightbulb {...p} />;
      case 'layers': return <Layers {...p} />;
      case 'code': return <Code {...p} />;
      case 'test': return <TestTube {...p} />;
      case 'rocket': return <Rocket {...p} />;
      default: return <Lightbulb {...p} />;
    }
  };

  return (
    <section className="section-dark">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Notre processus
        </motion.h2>

        {/* Desktop layout */}
        <div className="hidden lg:flex items-start justify-center gap-2 relative">
          <svg
            className="absolute top-10 left-[10%] right-[10%] w-[80%] h-[2px]"
            style={{ overflow: 'visible' }}
          >
            <motion.line
              x1="0" y1="1" x2="100%" y2="1"
              stroke="rgba(13,148,136,0.4)"
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              whileInView={{ strokeDashoffset: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
            />
          </svg>

          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className="flex flex-col items-center flex-1 relative"
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-xs font-bold tracking-widest mb-2 z-10" style={{ color: '#c8a96e' }}>
                {step.num}
              </span>
              <motion.div
                className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-teal-800 flex items-center justify-center mb-4 shadow-md z-10 relative"
                whileInView={{
                  boxShadow: ['0 0 0px rgba(13,148,136,0)', '0 0 24px rgba(13,148,136,0.7)', '0 0 8px rgba(13,148,136,0.3)'],
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.15 }}
              >
                {getIcon(step.icon)}
              </motion.div>
              <p className="text-sm lg:text-base text-center text-white/70 leading-relaxed px-2 min-h-[3rem]">
                {step.title}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden flex flex-col items-center gap-6">
          {processSteps.map((step, index) => (
            <React.Fragment key={step.id}>
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <span className="text-xs font-bold tracking-widest mb-2" style={{ color: '#c8a96e' }}>{step.num}</span>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-800 flex items-center justify-center mb-3 shadow-md">
                  {getIcon(step.icon)}
                </div>
                <p className="text-sm text-center text-white/70">{step.title}</p>
              </motion.div>
              {index < processSteps.length - 1 && (
                <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
                  <path d="M12 0 L12 27 M6 18 L12 27 L18 18" stroke="#0d9488" strokeWidth="2" opacity="0.5" />
                </svg>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
