import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const NAVY = '#1A2332';
const GOLD_INK = '#8A6A1C';
const PAPER = '#FAF7F0';
const RULE = 'rgba(26,35,50,0.16)';

export const HeroHome: React.FC = () => {
  return (
    <section
      className="pt-32 md:pt-40 pb-20 md:pb-28"
      style={{ background: PAPER, color: NAVY }}
      aria-label="Opus Advisor, organisation et automatisation de la gestion des petites entreprises"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD_INK }}>
          Formation · Immobilier et conciergerie · BTP
        </p>

        <h1 className="font-heading font-bold leading-[1.0] tracking-tight text-[2.6rem] sm:text-6xl lg:text-7xl mt-6 max-w-5xl">
          On automatise la gestion des petites entreprises, avec les outils qu'elles ont déjà.
        </h1>

        <div
          className="mt-12 md:mt-16 pt-8 border-t grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10"
          style={{ borderColor: RULE }}
        >
          <p className="md:col-span-4 text-sm text-gray-600 leading-relaxed">
            Opus Advisor, à Rennes.
            <br />
            On intervient partout en France.
          </p>

          <div className="md:col-span-8">
            <p className="text-lg md:text-2xl text-gray-700 leading-relaxed max-w-2xl">
              Des dossiers qui se génèrent et partent seuls, des factures préparées en une fois pour tous vos
              clients, une équipe suivie depuis un seul écran. On relie vos logiciels, vos tableurs et vos mails,
              puis on reste pour les faire tourner.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold text-base bg-[#1A2332] text-[#FAF7F0] hover:bg-[#26334a] transition-colors"
              >
                Réserver le pré-audit gratuit
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/cas-clients"
                className="self-start sm:self-auto font-semibold text-base border-b pb-0.5 hover:opacity-70 transition-opacity"
                style={{ color: GOLD_INK, borderColor: GOLD_INK }}
              >
                Voir ce qu'on a déjà mis en place
              </Link>
            </div>

            <p className="mt-6 text-sm text-gray-500">30 minutes en visio, gratuites et sans engagement.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
