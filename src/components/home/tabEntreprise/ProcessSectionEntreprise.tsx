import React from 'react';
import { Search, Compass, Wrench, GraduationCap, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProcessSectionEntreprise: React.FC = () => {
  const processSteps = [
    { id: '1', icon: 'search', title: 'Audit & Diagnostic', num: '01' },
    { id: '2', icon: 'compass', title: 'Stratégie & Simplification', num: '02' },
    { id: '3', icon: 'wrench', title: 'Architecture & Mise en œuvre', num: '03' },
    { id: '4', icon: 'graduation', title: 'Formation & Ancrage', num: '04' },
    { id: '5', icon: 'trending', title: 'Suivi & Pérennisation', num: '05' },
  ];

  const getIcon = (iconName: string) => {
    const p = { size: 32, className: 'text-white' };
    switch (iconName) {
      case 'search': return <Search {...p} />;
      case 'compass': return <Compass {...p} />;
      case 'wrench': return <Wrench {...p} />;
      case 'graduation': return <GraduationCap {...p} />;
      case 'trending': return <TrendingUp {...p} />;
      default: return <Search {...p} />;
    }
  };

  return (
    <section className="section-teal">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Notre méthodologie
        </motion.h2>

        {/* Desktop layout */}
        <div className="hidden lg:flex items-start justify-center gap-2 relative">
          {/* Animated connector line */}
          <svg
            className="absolute top-10 left-[10%] right-[10%] w-[80%] h-[2px]"
            style={{ overflow: 'visible' }}
          >
            <motion.line
              x1="0" y1="1" x2="100%" y2="1"
              stroke="rgba(153,246,228,0.4)"
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
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.12, ease: 'easeOut' }}
            >
              {/* Step number */}
              <span className="text-xs font-bold tracking-widest mb-2 z-10 text-teal-200">
                {step.num}
              </span>

              {/* Icon circle */}
              <motion.div
                className="w-20 h-20 rounded-full bg-white/20 border border-white/30 flex items-center justify-center mb-4 z-10 relative hover:bg-white/30 transition-colors duration-200"
                whileInView={{
                  boxShadow: ['0 0 0px rgba(153,246,228,0)', '0 0 20px rgba(153,246,228,0.5)', '0 0 8px rgba(153,246,228,0.2)'],
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.12 }}
              >
                {getIcon(step.icon)}
              </motion.div>

              <p className="text-sm lg:text-base text-center text-white/80 leading-relaxed px-2 min-h-[3rem]">
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
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <span className="text-xs font-bold tracking-widest mb-2 text-teal-200">{step.num}</span>
                <div className="w-16 h-16 rounded-full bg-white/20 border border-white/30 flex items-center justify-center mb-3">
                  {getIcon(step.icon)}
                </div>
                <p className="text-sm text-center text-white/80">{step.title}</p>
              </motion.div>
              {index < processSteps.length - 1 && (
                <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
                  <path d="M12 0 L12 27 M6 18 L12 27 L18 18" stroke="rgba(153,246,228,0.5)" strokeWidth="2" />
                </svg>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
