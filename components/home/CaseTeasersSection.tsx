import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const GOLD_INK = '#8A6A1C';
const NAVY = '#1A2332';
const RULE = 'rgba(26,35,50,0.16)';

// Pas encore de client à montrer : on présente des objectifs, jamais des résultats.
const builds = [
  {
    profile: 'Plombier-chauffagiste, 8 à 20 personnes',
    title: "Dossiers MaPrimeRénov' automatisés",
    desc: "Objectif : passer de 6 heures à 90 minutes par dossier. Les pièces sont vérifiées avant l'envoi, ce qui évite les refus.",
  },
  {
    profile: 'Électricien, 8 à 15 personnes',
    title: 'Devis le jour même, relances automatiques',
    desc: 'Objectif : un devis envoyé le jour de la visite, au lieu de 2 à 3 semaines. Les situations oubliées sont relancées toutes seules.',
  },
  {
    profile: 'Multi-technique, 30 à 60+ personnes, plusieurs agences',
    title: 'Marge et trésorerie de toutes les agences',
    desc: 'Objectif : un tableau de bord commun, à jour en continu, et plusieurs jours de travail rendus chaque mois à la personne qui tient les comptes.',
  },
];

export const CaseTeasersSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32" style={{ background: '#FAF7F0' }} aria-labelledby="builds-title">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2
          id="builds-title"
          className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl max-w-3xl"
          style={{ color: NAVY }}
        >
          Trois systèmes qu'on sait monter
        </h2>
        <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
          On démarre, et on n'a pas encore de client à vous présenter. Voici trois systèmes typiques,
          qu'on documentera avec nos premiers clients pilotes.
        </p>

        <ul className="mt-12">
          {builds.map((b) => (
            <li
              key={b.title}
              className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-2 py-7 border-t"
              style={{ borderColor: RULE }}
            >
              <span className="md:col-span-3 text-sm text-gray-500 leading-snug">{b.profile}</span>
              <h3 className="md:col-span-4 font-semibold text-lg md:text-xl leading-snug" style={{ color: NAVY }}>
                {b.title}
              </h3>
              <p className="md:col-span-5 text-base text-gray-700 leading-relaxed">{b.desc}</p>
            </li>
          ))}
          <li className="border-t" style={{ borderColor: RULE }} aria-hidden="true" />
        </ul>

        <div className="mt-10">
          <Link
            href="/cas-clients"
            className="group inline-flex items-center gap-2 font-semibold text-base"
            style={{ color: NAVY }}
          >
            Le programme Opus Pilotes
            <ArrowRight size={18} style={{ color: GOLD_INK }} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
