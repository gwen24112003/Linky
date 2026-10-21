import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const GOLD_INK = '#8A6A1C';
const NAVY = '#1A2332';
const RULE = 'rgba(26,35,50,0.16)';

// Les prix sont ceux de la page Services : les montrer dès l'accueil rassure plus qu'un discours.
const steps = [
  { name: 'Pré-audit', price: 'Gratuit', line: '30 minutes en visio pour repérer 3 points de friction dans vos outils.' },
  { name: 'Audit Stack', price: '990 €', line: '10 jours pour cartographier vos outils et savoir lesquels garder.' },
  { name: 'Diagnostic', price: '2 500 €', line: '2 à 3 semaines. Un plan chiffré, avec le gain attendu.' },
  { name: 'Mise en œuvre', price: 'Dès 5 500 €', line: '4 à 10 semaines pour installer le système et former votre équipe.' },
  { name: 'Gardien du système', price: '400 à 1 500 €/mois', line: "On surveille le système et on l'adapte quand votre boîte change." },
];

export const MethodSection: React.FC<{ background?: string }> = ({ background = '#FFFFFF' }) => {
  return (
    <section id="methode" className="py-24 md:py-32 scroll-mt-24" style={{ background }} aria-labelledby="method-title">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end">
          <h2
            id="method-title"
            className="md:col-span-7 font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl"
            style={{ color: NAVY }}
          >
            Comment on avance, et ce que ça coûte
          </h2>
          <p className="md:col-span-5 text-base md:text-lg text-gray-600 leading-relaxed">
            Chaque étape est facturée à part. À la fin de chacune, vous décidez si on continue.
          </p>
        </div>

        <ol className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-t" style={{ borderColor: NAVY }}>
          {steps.map((s, i) => (
            <li
              key={s.name}
              className={`py-7 lg:pr-5 ${i > 0 ? 'lg:pl-5 lg:border-l border-t lg:border-t-0' : ''} ${i === 1 ? 'sm:border-t-0' : ''}`}
              style={{ borderColor: RULE }}
            >
              <span className="block text-sm text-gray-500">Étape {i + 1}</span>
              <span className="block mt-2 font-semibold text-lg leading-snug" style={{ color: NAVY }}>
                {s.name}
              </span>
              <span className="block mt-1 font-semibold text-base" style={{ color: GOLD_INK }}>
                {s.price}
              </span>
              <span className="block mt-3 text-sm text-gray-600 leading-relaxed">{s.line}</span>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 font-semibold text-base"
            style={{ color: NAVY }}
          >
            Le détail de chaque étape
            <ArrowRight size={18} style={{ color: GOLD_INK }} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
