import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const NAVY = '#1A2332';
const GOLD = '#C9A84C';

export const WhyNowSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32" style={{ background: NAVY }} aria-labelledby="why-now-title">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">
          {/* Date : ancre typographique */}
          <div data-reveal className="md:col-span-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60 mb-2">
              1ᵉʳ septembre
            </p>
            <p className="font-heading font-bold leading-[0.85] text-7xl lg:text-8xl" style={{ color: GOLD }}>
              2027
            </p>
          </div>

          <div data-reveal data-reveal-delay="2" className="md:col-span-8">
            <h2
              id="why-now-title"
              className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl text-white"
            >
              La facturation électronique arrive pour les PME.
            </h2>
            <p className="mt-6 text-lg md:text-xl text-white/75 leading-relaxed">
              À cette date, une PME doit émettre ses factures entre entreprises au format
              électronique, via une plateforme agréée. Une facture tapée sur Excel puis envoyée en
              PDF ne sera plus valable.
            </p>
            <p className="mt-4 text-base md:text-lg text-white/75 leading-relaxed">
              <span className="text-white font-semibold">Un système propre se monte en 2 à 3 mois.</span>{' '}
              Commencé à l'été 2027, il se fera dans l'urgence, et l'urgence se paie.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-9">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm md:text-base transition-colors"
                style={{ background: GOLD, color: NAVY }}
              >
                Commencer par le pré-audit
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/articles/facturation-electronique-2026"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm md:text-base border-2 text-white hover:bg-white/5 transition-colors"
                style={{ borderColor: 'rgba(255,255,255,0.3)' }}
              >
                Lire notre article sur la réforme
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
