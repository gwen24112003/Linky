'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const CTASectionEntreprise: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600, height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.07), transparent)',
          filter: 'blur(80px)',
          top: '-20%', left: '-10%',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-3xl overflow-hidden"
          style={{ border: '1px solid rgba(26,35,50,0.15)', boxShadow: '0 32px 80px rgba(26,35,50,0.12)' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="lg:col-span-2 p-12 flex flex-col items-center justify-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1A2332, #2A3A50)' }}
          >
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
                  border: '1px solid rgba(201,168,76,0.3)',
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
              <p className="mt-2 text-lg font-medium" style={{ color: "#C9A84C" }}>missions livrées</p>
              <div className="mt-6 flex flex-col gap-2 text-sm text-white/40">
                <span>France</span>
                <span>Depuis 2022</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 p-12 lg:p-16 flex flex-col justify-center bg-gray-900">
            <motion.h2
              className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Vous avez un processus à{' '}
              <span className="text-gradient">automatiser</span> ?
            </motion.h2>

            <motion.p
              className="text-gray-400 mb-8 text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              Décrivez-nous votre situation en quelques lignes. Nous vous répondons avec une approche concrète sous 24h, sans engagement.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 text-white px-8 py-4 text-lg rounded-xl font-semibold hover:scale-105 transition-all duration-200 hover:shadow-xl group btn-shimmer" style={{ background: "#1A2332" }}
              >
                Démarrer un audit
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
              <span className="text-sm font-medium" style={{ color: 'rgba(201,168,76,0.8)' }}>Premier échange gratuit</span>
              <span className="w-px h-4 bg-white/15" />
              <span className="text-sm font-medium" style={{ color: 'rgba(201,168,76,0.8)' }}>Réponse sous 24h</span>
              <span className="w-px h-4 bg-white/15" />
              <span className="text-sm font-medium" style={{ color: 'rgba(201,168,76,0.8)' }}>Basé en France</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
