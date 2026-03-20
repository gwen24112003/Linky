import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const CTASectionEntreprise: React.FC = () => {
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
          top: '-20%', left: '-10%',
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
          {/* ── Panneau stat gauche ── */}
          <div
            className="lg:col-span-2 p-12 flex flex-col items-center justify-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0f766e, #0e7490)' }}
          >
            {/* Anneau décoratif */}
            <motion.div
              className="absolute opacity-30 pointer-events-none"
              style={{ top: '10%', right: '10%' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            >
              <div style={{
                width: 70, height: 70, borderRadius: '50%',
                border: '1.5px solid rgba(45,212,191,0.6)',
              }}>
                <div style={{
                  position: 'absolute', inset: 10, borderRadius: '50%',
                  border: '1px solid rgba(45,212,191,0.3)',
                }} />
              </div>
            </motion.div>

            <span
              className="absolute text-[12rem] font-bold leading-none pointer-events-none"
              style={{ color: 'rgba(255,255,255,0.03)', fontFamily: 'Bricolage Grotesque, sans-serif' }}
            >
              01
            </span>

            <div className="relative z-10 text-center">
              <motion.span
                className="block text-7xl lg:text-8xl font-bold text-white"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                10+
              </motion.span>
              <p className="text-teal-300 mt-2 text-lg font-medium">missions livrées</p>
              <div className="mt-6 flex flex-col gap-2 text-sm text-white/40">
                <span>France</span>
                <span>Depuis 2022</span>
              </div>
            </div>
          </div>

          {/* ── Contenu droite ── */}
          <div className="lg:col-span-3 p-12 lg:p-16 flex flex-col justify-center bg-gray-900">
            <motion.h2
              className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Prêt à structurer votre{' '}
              <span className="text-gradient">croissance</span> ?
            </motion.h2>

            <motion.p
              className="text-gray-400 mb-8 text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              Un audit de cadrage avec un associé senior pour cartographier vos enjeux et définir les leviers d'action.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 text-lg rounded-xl font-semibold hover:scale-105 transition-all duration-200 hover:shadow-xl hover:shadow-teal-900/40 group btn-shimmer"
              >
                Solliciter un audit
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
              <span className="text-sm font-medium text-teal-400/80">&lt; 48h de réponse</span>
              <span className="w-px h-4 bg-white/15" />
              <span className="text-sm font-medium text-teal-400/80">Sans engagement</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
