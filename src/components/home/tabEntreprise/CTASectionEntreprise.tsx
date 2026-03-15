import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const CTASectionEntreprise: React.FC = () => {
  return (
    <section className="section-teal py-32 relative overflow-hidden">
      {/* Ambient number */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="text-[20rem] font-bold leading-none"
          style={{ color: 'rgba(255,255,255,0.03)', fontFamily: 'Bricolage Grotesque, sans-serif' }}
        >
          01
        </span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-10 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Prêt à structurer votre{' '}
            <span className="text-gradient">croissance</span> ?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 text-lg rounded-lg font-semibold hover:scale-105 transition-all duration-200 hover:shadow-xl group btn-shimmer"
            >
              Solliciter un audit
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="flex items-center justify-center gap-8 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            <span className="text-sm font-medium" style={{ color: '#99f6e4' }}>
              &lt; 48h de réponse
            </span>
            <span className="w-px h-4 bg-white/20" />
            <span className="text-sm font-medium" style={{ color: '#99f6e4' }}>
              Sans engagement
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
