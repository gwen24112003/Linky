import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const CTASectionFreelance: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Orbe ambiant */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600, height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13,148,136,0.07), transparent)',
          filter: 'blur(80px)',
          top: '-20%', right: '-10%',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-3xl overflow-hidden"
          style={{ border: '1px solid rgba(15,118,110,0.15)', boxShadow: '0 32px 80px rgba(15,118,110,0.12)' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ── Contenu gauche ── */}
          <div className="lg:col-span-3 p-12 lg:p-16 flex flex-col justify-center bg-gray-900 order-2 lg:order-1">
            <motion.h2
              className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Vous êtes expert en{' '}
              <span className="text-gradient">organisation</span> ?
            </motion.h2>

            <motion.p
              className="text-gray-400 mb-8 text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              Rejoignez un réseau sélectif de consultants seniors et accédez à des missions stratégiques auprès de dirigeants ambitieux.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <Link
                to="/experts-contact"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 text-lg rounded-xl font-semibold hover:scale-105 transition-all duration-200 hover:shadow-xl hover:shadow-teal-900/40 group btn-shimmer"
              >
                Proposer ma candidature
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>

            <motion.div
              className="flex items-center gap-6 mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              <span className="text-sm font-medium text-teal-400/80">Réponse sous 48h</span>
              <span className="w-px h-4 bg-white/15" />
              <span className="text-sm font-medium text-teal-400/80">Réseau sélectif</span>
            </motion.div>
          </div>

          {/* ── Panneau stat droite ── */}
          <div
            className="lg:col-span-2 p-12 flex flex-col items-center justify-center relative overflow-hidden order-1 lg:order-2"
            style={{ background: 'linear-gradient(135deg, #0e7490, #0f766e)' }}
          >
            {/* Diamant 3D rotatif */}
            <div className="absolute opacity-20 pointer-events-none" style={{ top: '10%', left: '10%' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              >
                <div style={{
                  width: 60, height: 60,
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  border: '1px solid rgba(45,212,191,0.5)',
                  background: 'rgba(45,212,191,0.08)',
                }} />
              </motion.div>
            </div>

            <span
              className="absolute text-[12rem] font-bold leading-none pointer-events-none"
              style={{ color: 'rgba(255,255,255,0.03)', fontFamily: 'Bricolage Grotesque, sans-serif' }}
            >
              02
            </span>

            <div className="relative z-10 text-center">
              <motion.span
                className="block text-7xl lg:text-8xl font-bold text-white"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                15+
              </motion.span>
              <p className="text-teal-300 mt-2 text-lg font-medium">experts partenaires</p>
              <div className="mt-6 flex flex-col gap-2 text-sm text-white/40">
                <span>Consultants seniors</span>
                <span>Multi-secteurs</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
