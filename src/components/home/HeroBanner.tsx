import React from 'react';
import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { Button } from '../ui/Button';
import { bannerStyles } from '../../theme/bannerStyles';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const line1 = ['Donnez', 'à', 'votre', 'Ambition'];
const line2 = ['la', 'Structure', "qu'elle", 'mérite'];

export const HeroBanner: React.FC = () => {
  return (
    <section
      className="relative text-white overflow-hidden flex items-center min-h-screen"
      style={{ ...bannerStyles, minHeight: '100vh' }}
    >
      {/* Subtle overlay dots pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Overline */}
          <motion.p
            className="text-sm font-semibold tracking-[0.25em] uppercase mb-6 text-teal-200"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Conseil en Organisation · Experts Sélectionnés
          </motion.p>

          {/* H1 word stagger */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <span className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              {line1.map((word) => (
                <motion.span key={word} variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-1">
              {line2.map((word) => (
                <motion.span
                  key={word}
                  variants={wordVariants}
                  className={`inline-block ${word === 'Structure' ? 'text-teal-200' : ''}`}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-white/75 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Nous aidons les dirigeants à structurer, clarifier et optimiser leurs processus pour une croissance maîtrisée.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <Link to="/services">
              <Button variant="primary" className="btn-shimmer">
                Notre Expertise
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary">
                Échanger avec un associé
              </Button>
            </Link>
          </motion.div>

          {/* Trust signal */}
          <motion.div
            className="flex items-center justify-center gap-6 text-sm text-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <span>2 associés seniors</span>
            <span className="w-px h-4 bg-white/25" />
            <span>Paris</span>
            <span className="w-px h-4 bg-white/25" />
            <span>Missions depuis 2022</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
    </section>
  );
};
