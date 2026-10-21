'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import { SectionKicker } from '@/components/ui/SectionKicker';

const GOLD = '#C9A84C';
// Or foncé pour le texte et les icônes sur fond clair : l'or d'origine y tombe à 2,1:1 de contraste.
const GOLD_INK = '#8A6A1C';
const NAVY = '#1A2332';
const PAPER = '#FAF7F0';
const RULE = 'rgba(26,35,50,0.16)';

interface Bullet {
  title: string;
  desc: string;
}

interface Member {
  name: string;
  role: string;
  photo: string;
  location: string;
  experience: string;
  label: string;
  heading: string;
  bullets: Bullet[];
}

const team: Member[] = [
  {
    name: 'Enzo Monnier',
    role: 'Consultant ops · Fondateur',
    photo: '/images/enzo.jpg',
    location: 'Rennes · Interventions partout en France',
    experience: 'Epitech · 5 ans de dev avant Opus',
    label: 'Pourquoi Opus Advisor',
    heading: 'Je code encore ce que je déploie chez vous.',
    bullets: [
      {
        title: 'Dev pendant 5 ans, consultant ops depuis',
        desc: "J'ai développé des logiciels métier pendant 5 ans avant de passer au conseil. Je code moi-même ce que j'installe chez vous : vous n'aurez jamais affaire à un sous-traitant.",
      },
      {
        title: "Ce que j'ai compris en travaillant pour d'autres",
        desc: "Un logiciel bien choisi mais mal installé ne sert à rien. J'ai souvent vu un outil payé 3 000 € par an utilisé à 20 %. Mon travail, c'est que celui que vous avez, ou celui qu'on choisira ensemble, serve vraiment au quotidien.",
      },
      {
        title: 'Pourquoi les petites entreprises',
        desc: "Organisme de formation, conciergerie ou entreprise du bâtiment : à cette taille, le dirigeant est encore sur le terrain et l'administratif se fait le soir. C'est là qu'on gagne 10 heures par semaine avec les bons outils, sans embaucher d'assistant.",
      },
    ],
  },
  {
    name: 'Gwendoline',
    role: 'Associée',
    photo: '/images/gwen.jpg',
    location: 'Rennes · Interventions partout en France',
    experience: 'Epitech · 5 ans de dev avant Opus',
    label: 'Pourquoi une équipe de deux',
    heading: 'Deux personnes sur votre système, un seul interlocuteur.',
    bullets: [
      {
        title: 'Vous gardez un seul contact',
        desc: 'Vous choisissez qui de nous deux vous suit, et vous avez toujours la même personne au téléphone.',
      },
      {
        title: 'On travaille à deux derrière',
        desc: "Chaque décision importante (choix d'un outil, paramétrage, branchement) est discutée entre nous avant de vous être livrée. Concrètement, ça fait moins d'erreurs et moins d'allers-retours.",
      },
      {
        title: 'Ce que ça change pour vous',
        desc: "Seul, un consultant valide vite ses propres choix. À deux, on doit se justifier l'un devant l'autre : chaque décision qui arrive chez vous a été contestée au moins une fois.",
      },
    ],
  },
];

export const TeamView: React.FC = () => {
  return (
    <main className="flex-grow">
      {/* Hero */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-24" style={{ background: NAVY }}>
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionKicker label="Équipe" tone="dark" className="mb-8" />
          <h1 className="font-heading font-bold leading-[1.0] tracking-tight text-5xl md:text-6xl lg:text-7xl text-white">
            Qui bosse sur votre système.
          </h1>
          <p className="mt-7 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">
            Deux associés, anciens développeurs. Un seul interlocuteur par mission.
          </p>
        </div>
      </section>

      {/* Profils */}
      <section className="py-20 md:py-28" style={{ background: PAPER }}>
        <div className="container mx-auto px-6 max-w-5xl">
          {team.map((m) => (
            <div key={m.name} className="border-t" style={{ borderColor: RULE }}>
              <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
                {/* Identité */}
                <div className="md:col-span-4">
                  <div
                    className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden mb-5"
                    style={{ border: `2px solid ${GOLD}` }}
                  >
                    <img src={m.photo} alt={m.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <h2 className="font-heading font-bold text-2xl md:text-3xl" style={{ color: NAVY }}>
                    {m.name}
                  </h2>
                  <p className="text-sm md:text-base mt-1" style={{ color: GOLD_INK }}>
                    {m.role}
                  </p>
                  <div className="mt-5 flex flex-col gap-2 text-sm text-gray-500">
                    <span className="inline-flex items-center gap-2">
                      <MapPin size={14} style={{ color: GOLD_INK }} />
                      {m.location}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Calendar size={14} style={{ color: GOLD_INK }} />
                      {m.experience}
                    </span>
                  </div>
                </div>

                {/* Propos */}
                <div className="md:col-span-8">
                  <p className="text-sm text-gray-500 mb-3">{m.label}</p>
                  <h3 className="font-heading font-bold text-2xl md:text-3xl leading-tight mb-8" style={{ color: NAVY }}>
                    {m.heading}
                  </h3>
                  <ul className="space-y-7">
                    {m.bullets.map((b) => (
                      <li key={b.title}>
                        <h4 className="font-semibold text-lg md:text-xl mb-1.5" style={{ color: NAVY }}>
                          {b.title}
                        </h4>
                        <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed">{b.desc}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
          <div className="border-t" style={{ borderColor: RULE }} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28" style={{ background: NAVY }}>
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl text-white max-w-3xl">
            Un seul interlocuteur, du premier appel jusqu'au système qui tourne.
          </h2>
          <p className="mt-6 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">
            La personne qui fait votre pré-audit est celle qui installe votre système, puis celle qui
            vous répond quand vous avez une question.
          </p>
          <Link
            href="/contact"
            className="group mt-9 inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm md:text-base transition-colors"
            style={{ background: GOLD, color: NAVY }}
          >
            Réserver 30 min en visio
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
};
