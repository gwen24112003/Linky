'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Mail,
  Linkedin,
  ShieldCheck,
  ArrowRight,
  Phone,
} from 'lucide-react';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';

const CAL_URL = 'https://cal.com/enzo-monnier-qc1nqv/30min';

export const ContactView: React.FC = () => {
  return (
    <main className="flex-grow">
      {/* Hero contact */}
      <section
        className="relative text-white overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20"
        style={{ background: `linear-gradient(135deg, ${NAVY}, #223047 55%, ${NAVY})` }}
      >
        <div
          className="absolute pointer-events-none opacity-40"
          style={{
            top: '-10%',
            right: '-10%',
            width: 500,
            height: 500,
            background: `radial-gradient(circle, ${GOLD}33 0%, transparent 70%)`,
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase mb-4"
              style={{ color: GOLD }}
            >
              Pré-audit · 30 min · Gratuit
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              On parle de votre boîte ?
            </h1>
            <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl">
              30 minutes en visio. Vous me montrez vos outils. Je vous identifie 3 points de friction et je vous montre en direct comment les régler.
              <br />
              <span className="text-white font-medium">
                Pas de vente, pas d'engagement.
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bloc Cal.com + coordonnées */}
      <section className="py-16 md:py-20 bg-[#FAF8F4]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Colonne Cal.com (placeholder) */}
            <motion.div
              className="lg:col-span-2 bg-white rounded-2xl p-6 md:p-8"
              style={{
                border: '1px solid rgba(26,35,50,0.08)',
                boxShadow: '0 4px 24px rgba(26,35,50,0.04)',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}55` }}
                >
                  <Calendar size={20} style={{ color: NAVY }} />
                </div>
                <h2 className="text-xl md:text-2xl font-bold" style={{ color: NAVY }}>
                  Réserver un créneau
                </h2>
              </div>

              <div
                className="rounded-xl overflow-hidden"
                style={{ border: '1px solid rgba(26,35,50,0.08)' }}
              >
                <iframe
                  src={CAL_URL}
                  title="Réserver un créneau de pré-audit avec Opus Advisory"
                  className="w-full h-[720px] border-0"
                  loading="lazy"
                  allow="camera; microphone; fullscreen; payment"
                />
              </div>

              <div className="mt-4 text-center">
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs md:text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <ArrowRight size={14} />
                  Ouvrir le calendrier dans un nouvel onglet
                </a>
              </div>

              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs md:text-sm text-gray-500">
                <li className="inline-flex items-center gap-2">
                  <Clock size={14} style={{ color: GOLD }} /> 30 min · Visio
                </li>
                <li className="inline-flex items-center gap-2">
                  <ShieldCheck size={14} style={{ color: GOLD }} /> Annulation libre jusqu'à 2h avant
                </li>
                <li className="inline-flex items-center gap-2">
                  <Calendar size={14} style={{ color: GOLD }} /> Plages dispo sous 5 jours
                </li>
              </ul>
            </motion.div>

            {/* Colonne coordonnées secours */}
            <motion.aside
              className="bg-white rounded-2xl p-6 md:p-8 flex flex-col gap-5 h-fit"
              style={{
                border: '1px solid rgba(26,35,50,0.08)',
                boxShadow: '0 4px 24px rgba(26,35,50,0.04)',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div>
                <p
                  className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
                  style={{ color: GOLD }}
                >
                  Ou par écrit
                </p>
                <h3 className="text-lg md:text-xl font-bold mb-4" style={{ color: NAVY }}>
                  Si la visio vous gonfle, on peut commencer par mail.
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Décrivez votre boîte en 3 lignes : métier, taille, outils actuels, principale galère. Je vous réponds sous 24h ouvrées.
                </p>
              </div>

              <div
                className="flex flex-col gap-3 pt-4 border-t"
                style={{ borderColor: 'rgba(26,35,50,0.08)' }}
              >
                <a
                  href="mailto:enzo@opusadvisor.fr"
                  className="inline-flex items-center gap-3 text-sm md:text-base font-medium hover:opacity-75 transition-opacity"
                  style={{ color: NAVY }}
                >
                  <Mail size={18} style={{ color: GOLD }} />
                  enzo@opusadvisor.fr
                </a>
                <a
                  href="tel:+33615756549"
                  className="inline-flex items-center gap-3 text-sm md:text-base font-medium hover:opacity-75 transition-opacity"
                  style={{ color: NAVY }}
                >
                  <Phone size={18} style={{ color: GOLD }} />
                  +33 6 15 75 65 49
                </a>
                <a
                  href="https://www.linkedin.com/in/enzo-monnier-7524ab205/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm md:text-base font-medium hover:opacity-75 transition-opacity"
                  style={{ color: NAVY }}
                >
                  <Linkedin size={18} style={{ color: GOLD }} />
                  Enzo Monnier
                </a>
              </div>

              <div
                className="mt-2 p-4 rounded-xl text-xs text-gray-600 leading-relaxed"
                style={{ background: '#FAF8F4' }}
              >
                <strong style={{ color: NAVY }}>Ce qu'on fera au pré-audit :</strong>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Tour rapide de vos outils actuels</li>
                  <li>3 points de friction identifiés en direct</li>
                  <li>1 automation démontrée sur vos propres données</li>
                  <li>Aucun engagement, aucune vente</li>
                </ul>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </main>
  );
};
