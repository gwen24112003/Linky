'use client';

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import { SectionKicker } from '@/components/ui/SectionKicker';

const GOLD = '#C9A84C';
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
  kicker: string;
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
    kicker: 'Pourquoi Opus Advisor',
    heading: 'Un outil efficace, pas une belle présentation.',
    bullets: [
      {
        title: 'Dev pendant 5 ans, consultant ops depuis',
        desc: "J'ai codé des systèmes métier avant de pivoter vers le conseil. Je code encore ce que je déploie chez vous. Pas de sous-traitance cachée, pas de chef de projet qui vous envoie un stagiaire.",
      },
      {
        title: "Ce que j'ai compris en bossant pour d'autres",
        desc: "Un logiciel bien choisi mais mal déployé, ça ne sert à rien. Trop souvent, un outil acheté 3k€/an reste utilisé à 20%. Mon job chez vous : pas vendre un logiciel de plus, mais faire en sorte que celui que vous avez (ou qu'on va choisir ensemble) soit réellement utilisé au quotidien.",
      },
      {
        title: 'Pourquoi le second œuvre',
        desc: "Un élec ou un plombier de 15 salariés, c'est 1 à 3 M€/an. À cette taille, le dirigeant est encore sur les chantiers et la compta passe à 22h. C'est là qu'on gagne 10h/semaine avec les bons outils, pas en embauchant un assistant de plus.",
      },
    ],
  },
  {
    name: 'Gwendoline',
    role: 'Associée',
    photo: '/images/gwen.jpg',
    location: 'Rennes · Interventions partout en France',
    experience: 'Epitech · 5 ans de dev avant Opus',
    kicker: 'Pourquoi une équipe de deux',
    heading: 'Deux têtes sur votre système, un seul interlocuteur.',
    bullets: [
      {
        title: 'Vous gardez un seul contact',
        desc: "Celui que vous préférez entre nous deux. Pas de réunions à trois, pas de chaîne de validation interne. Vous appelez, on répond.",
      },
      {
        title: 'On bosse à deux derrière',
        desc: "Sur chaque décision qui compte — choix d'outil, paramétrage, intégration — on se challenge avant de vous livrer. Concrètement : moins d'erreurs, moins d'allers-retours, et personne ne valide par politesse.",
      },
      {
        title: 'Pourquoi ça change quelque chose pour vous',
        desc: "Un consultant seul va vite valider ses propres choix. À deux, on est obligés de justifier. C'est vous qui y gagnez : chaque décision qui part chez vous a été contestée au moins une fois en interne.",
      },
    ],
  },
];

const reveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

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
            Deux profils complémentaires. Un seul interlocuteur par mission.
          </p>
        </div>
      </section>

      {/* Profils */}
      <section className="py-20 md:py-28" style={{ background: PAPER }}>
        <div className="container mx-auto px-6 max-w-5xl">
          {team.map((m) => (
            <motion.div
              key={m.name}
              className="border-t"
              style={{ borderColor: RULE }}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
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
                  <p className="text-sm md:text-base mt-1" style={{ color: GOLD }}>
                    {m.role}
                  </p>
                  <div className="mt-5 flex flex-col gap-2 text-sm text-gray-500">
                    <span className="inline-flex items-center gap-2">
                      <MapPin size={14} style={{ color: GOLD }} />
                      {m.location}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Calendar size={14} style={{ color: GOLD }} />
                      {m.experience}
                    </span>
                  </div>
                </div>

                {/* Propos */}
                <div className="md:col-span-8">
                  <SectionKicker label={m.kicker} className="mb-5" />
                  <h3 className="font-heading font-bold text-2xl md:text-3xl leading-tight mb-8" style={{ color: NAVY }}>
                    {m.heading}
                  </h3>
                  <ul className="space-y-7">
                    {m.bullets.map((b) => (
                      <li key={b.title} className="grid grid-cols-[1.25rem_1fr] gap-x-4">
                        <span className="mt-2 h-px w-4 self-start" style={{ background: GOLD }} />
                        <div>
                          <h4 className="font-semibold text-lg md:text-xl mb-1.5" style={{ color: NAVY }}>
                            {b.title}
                          </h4>
                          <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed">{b.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
          <div className="border-t" style={{ borderColor: RULE }} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28" style={{ background: NAVY }}>
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionKicker label="Démarrer" tone="dark" className="mb-8" />
          <h2 className="font-heading font-bold leading-[1.02] tracking-tight text-4xl md:text-5xl text-white max-w-3xl">
            Un seul interlocuteur, du premier échange jusqu'à la mise en production.
          </h2>
          <p className="mt-6 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">
            Pas de commercial qui vous vend puis passe la main à un chef de projet, qui lui-même
            passe la main à un consultant junior. Vous parlez à la personne qui bosse sur votre
            système.
          </p>
          <Link
            href="/contact"
            className="group mt-9 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm md:text-base transition-all duration-200 hover:scale-[1.02]"
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
