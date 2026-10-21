import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';
const RULE = 'rgba(255,255,255,0.16)';

export const FinalCTASection: React.FC = () => {
  return (
    <section id="contact" className="py-24 md:py-32" style={{ background: NAVY }} aria-labelledby="cta-title">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2
          data-reveal
          id="cta-title"
          className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl text-white"
        >
          Deux façons de démarrer
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-y-0 md:gap-x-14">
          {/* Pré-audit */}
          <div data-reveal data-reveal-delay="1" className="pt-7 border-t flex flex-col" style={{ borderColor: RULE }}>
            <div className="flex items-baseline justify-between gap-4 mb-4">
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-white">Le pré-audit</h3>
              <span className="font-heading font-bold text-lg whitespace-nowrap" style={{ color: GOLD }}>
                Gratuit
              </span>
            </div>
            <p className="text-base text-white/75 leading-relaxed flex-1">
              30 minutes en visio. Vous partagez votre écran, on regarde vos outils ensemble et on
              repère 3 points de friction, avec la façon de les régler.
            </p>
            <Link
              href="/contact"
              className="group mt-7 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm md:text-base transition-colors self-start"
              style={{ background: GOLD, color: NAVY }}
            >
              Réserver un créneau
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Audit Stack */}
          <div data-reveal data-reveal-delay="2" className="pt-7 border-t flex flex-col" style={{ borderColor: RULE }}>
            <div className="flex items-baseline justify-between gap-4 mb-4">
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-white">L'Audit Stack</h3>
              <span className="font-heading font-bold text-lg whitespace-nowrap" style={{ color: GOLD }}>
                990 €
              </span>
            </div>
            <p className="text-base text-white/75 leading-relaxed flex-1">
              10 jours ouvrés pour cartographier vos outils. Vous recevez une recommandation écrite et
              chiffrée : ce qu'il faut garder, et ce qu'il vaut mieux remplacer.
            </p>
            <Link
              href="/contact"
              className="group mt-7 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm md:text-base border-2 text-white hover:bg-white/5 transition-colors self-start"
              style={{ borderColor: GOLD }}
            >
              Demander un Audit Stack
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
