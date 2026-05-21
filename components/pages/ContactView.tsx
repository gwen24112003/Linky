'use client';

import React from 'react';
import { Clock, Mail, Linkedin, ShieldCheck, ArrowRight, Phone, Calendar } from 'lucide-react';
import { SectionKicker } from '@/components/ui/SectionKicker';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';
const PAPER = '#FAF7F0';
const RULE = 'rgba(26,35,50,0.16)';

const CAL_URL = 'https://cal.com/enzo-monnier-qc1nqv/30min';

export const ContactView: React.FC = () => {
  return (
    <main className="flex-grow">
      {/* Hero */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-24" style={{ background: NAVY }}>
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionKicker label="Pré-audit · 30 min · gratuit" tone="dark" className="mb-8" />
          <h1 className="font-heading font-bold leading-[1.0] tracking-tight text-5xl md:text-6xl lg:text-7xl text-white">
            On parle de votre boîte ?
          </h1>
          <p className="mt-7 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">
            30 minutes en visio. Vous me montrez vos outils. J'identifie 3 points de friction et je
            vous montre en direct comment les régler.{' '}
            <span className="text-white font-medium">Pas de vente, pas d'engagement.</span>
          </p>
        </div>
      </section>

      {/* Réservation + coordonnées */}
      <section className="py-20 md:py-28" style={{ background: PAPER }}>
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Calendrier */}
            <div className="lg:col-span-7 border-t pt-8" style={{ borderColor: NAVY }}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] mb-2" style={{ color: GOLD }}>
                Réserver un créneau
              </p>
              <h2 className="font-heading font-bold text-2xl md:text-3xl mb-6" style={{ color: NAVY }}>
                Choisissez votre horaire.
              </h2>

              <div className="overflow-hidden rounded-lg" style={{ border: `1px solid ${RULE}` }}>
                <iframe
                  src={CAL_URL}
                  title="Réserver un créneau de pré-audit avec Opus Advisor"
                  className="w-full h-[720px] border-0 bg-white"
                  loading="lazy"
                  allow="camera; microphone; fullscreen; payment"
                />
              </div>

              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
              >
                <ArrowRight size={14} style={{ color: GOLD }} />
                Ouvrir le calendrier dans un nouvel onglet
              </a>

              <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-2 text-xs md:text-sm text-gray-500">
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
            </div>

            {/* Aside */}
            <aside className="lg:col-span-5 border-t pt-8" style={{ borderColor: RULE }}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] mb-2" style={{ color: GOLD }}>
                Ou par écrit
              </p>
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4" style={{ color: NAVY }}>
                Si la visio vous gonfle, on commence par mail.
              </h3>
              <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed">
                Décrivez votre boîte en 3 lignes : métier, taille, outils actuels, principale galère.
                Je vous réponds sous 24h ouvrées.
              </p>

              <div className="mt-7 flex flex-col gap-4 pt-6 border-t" style={{ borderColor: RULE }}>
                <a
                  href="mailto:enzo@opusadvisor.fr"
                  className="inline-flex items-center gap-3 text-sm md:text-base font-medium hover:opacity-70 transition-opacity"
                  style={{ color: NAVY }}
                >
                  <Mail size={18} style={{ color: GOLD }} />
                  enzo@opusadvisor.fr
                </a>
                <a
                  href="tel:+33615756549"
                  className="inline-flex items-center gap-3 text-sm md:text-base font-medium hover:opacity-70 transition-opacity"
                  style={{ color: NAVY }}
                >
                  <Phone size={18} style={{ color: GOLD }} />
                  +33 6 15 75 65 49
                </a>
                <a
                  href="https://www.linkedin.com/in/enzo-monnier-7524ab205/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm md:text-base font-medium hover:opacity-70 transition-opacity"
                  style={{ color: NAVY }}
                >
                  <Linkedin size={18} style={{ color: GOLD }} />
                  Enzo Monnier
                </a>
              </div>

              <div className="mt-8 pt-6 border-t" style={{ borderColor: RULE }}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: GOLD }}>
                  Ce qu'on fera au pré-audit
                </p>
                <ul className="space-y-2.5 text-sm text-gray-600">
                  {[
                    'Tour rapide de vos outils actuels',
                    '3 points de friction identifiés en direct',
                    '1 automation démontrée sur vos propres données',
                    'Aucun engagement, aucune vente',
                  ].map((d) => (
                    <li key={d} className="flex items-start gap-2.5">
                      <span className="mt-2 h-px w-3 shrink-0" style={{ background: GOLD }} />
                      <span className="leading-relaxed">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};
