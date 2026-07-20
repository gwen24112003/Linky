'use client';

import React, { useState } from 'react';
import { Clock, Mail, Linkedin, ShieldCheck, ArrowRight, Phone, Calendar, Check } from 'lucide-react';
import { SectionKicker } from '@/components/ui/SectionKicker';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';
const PAPER = '#FAF7F0';
const RULE = 'rgba(26,35,50,0.16)';

const CAL_URL = 'https://cal.com/enzo-monnier-qc1nqv/30min';

// Clé Web3Forms (publique, prévue pour le code côté client). Les demandes arrivent sur enzo@opusadvisor.fr.
// Tant qu'elle est vide, le formulaire renvoie proprement vers l'email.
const WEB3FORMS_ACCESS_KEY = '14bb79f3-5e45-4423-afcc-23b0cb155435';

type Status = 'idle' | 'sending' | 'ok' | 'error';

const fieldClass =
  'w-full bg-white border rounded-lg px-4 py-3 text-sm md:text-[15px] text-[#1A2332] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/60 transition-shadow';

export const ContactView: React.FC = () => {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    // Filet : pas de clé configurée → on oriente vers l'email plutôt qu'un échec silencieux.
    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    const formData = new FormData(form);
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', 'Nouvelle demande de pré-audit — opusadvisor.fr');
    formData.append('from_name', 'Site Opus Advisor');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus('ok');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

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

      {/* Réservation + formulaire */}
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

            {/* Formulaire court */}
            <aside className="lg:col-span-5 border-t pt-8" style={{ borderColor: RULE }}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] mb-2" style={{ color: GOLD }}>
                Ou par écrit
              </p>
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4" style={{ color: NAVY }}>
                Pas envie de bloquer un créneau tout de suite ?
              </h3>
              <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed mb-6">
                Dites-moi l'essentiel en 30 secondes. Je vous réponds sous 24h ouvrées avec un
                premier retour concret.
              </p>

              {status === 'ok' ? (
                <div
                  className="rounded-lg p-6 flex items-start gap-3"
                  style={{ background: 'rgba(201,168,76,0.10)', border: `1px solid ${GOLD}55` }}
                >
                  <Check size={20} style={{ color: GOLD }} className="mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold" style={{ color: NAVY }}>
                      C'est reçu.
                    </p>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      Je vous réponds sous 24h ouvrées. En attendant, vous pouvez aussi réserver
                      directement un créneau à gauche.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Honeypot anti-spam (caché) */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div>
                    <label htmlFor="metier" className="block text-xs font-medium mb-1.5 text-gray-600">
                      Votre métier
                    </label>
                    <select id="metier" name="Métier" required defaultValue="" className={fieldClass} style={{ borderColor: RULE }}>
                      <option value="" disabled>
                        Choisir…
                      </option>
                      <option>Électricité</option>
                      <option>Plomberie</option>
                      <option>Chauffage-climatisation</option>
                      <option>Multi-technique / tous corps d'état</option>
                      <option>Autre second œuvre</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="taille" className="block text-xs font-medium mb-1.5 text-gray-600">
                      Taille de l'équipe
                    </label>
                    <select id="taille" name="Taille équipe" required defaultValue="" className={fieldClass} style={{ borderColor: RULE }}>
                      <option value="" disabled>
                        Choisir…
                      </option>
                      <option>Moins de 8</option>
                      <option>8 à 25</option>
                      <option>26 à 60</option>
                      <option>Plus de 60</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-medium mb-1.5 text-gray-600">
                      Votre email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="Email"
                      required
                      placeholder="vous@votreboite.fr"
                      className={fieldClass}
                      style={{ borderColor: RULE }}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-medium mb-1.5 text-gray-600">
                      Votre principale galère du moment
                    </label>
                    <textarea
                      id="message"
                      name="Problème prioritaire"
                      rows={3}
                      required
                      placeholder="Ex : les devis traînent, les relances je les fais jamais à temps…"
                      className={`${fieldClass} resize-none`}
                      style={{ borderColor: RULE }}
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-sm leading-relaxed" style={{ color: '#B23B3B' }}>
                      L'envoi n'a pas pu se faire. Écrivez-moi directement à{' '}
                      <a href="mailto:enzo@opusadvisor.fr" className="underline font-medium">
                        enzo@opusadvisor.fr
                      </a>
                      .
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm md:text-base transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
                    style={{ background: GOLD, color: NAVY }}
                  >
                    {status === 'sending' ? 'Envoi…' : 'Envoyer ma demande'}
                    {status !== 'sending' && (
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Vos infos servent uniquement à vous recontacter. Aucune revente, aucun spam.
                  </p>
                </form>
              )}

              {/* Contact direct */}
              <div className="mt-8 flex flex-col gap-4 pt-6 border-t" style={{ borderColor: RULE }}>
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
