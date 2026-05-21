'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Code2,
  HardHat,
  Lightbulb,
  Users,
  User as UserIcon,
  Scale,
  MapPin,
  Calendar,
} from 'lucide-react';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';

interface Bullet {
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  title: string;
  desc: string;
}

interface Member {
  name: string;
  role: string;
  photo: string;
  location: string;
  experience: string;
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
    heading: 'Un outil efficace, pas une belle présentation.',
    bullets: [
      {
        icon: Code2,
        title: 'Dev pendant 4 ans, consultant ops depuis',
        desc: "J'ai codé des systèmes métier avant de pivoter vers le conseil. Je code encore ce que je déploie chez vous. Pas de sous-traitance cachée, pas de chef de projet qui vous envoie un stagiaire.",
      },
      {
        icon: Lightbulb,
        title: "Ce que j'ai compris en bossant pour d'autres",
        desc: "Un logiciel bien choisi mais mal déployé, ça ne sert à rien. Trop souvent, un outil acheté 3k€/an reste utilisé à 20%. Mon job chez vous : pas vendre un logiciel de plus, mais faire en sorte que celui que vous avez (ou qu'on va choisir ensemble) soit réellement utilisé au quotidien.",
      },
      {
        icon: HardHat,
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
    heading: 'Deux têtes sur votre système, un seul interlocuteur.',
    bullets: [
      {
        icon: UserIcon,
        title: 'Vous gardez un seul contact',
        desc: "Celui que vous préférez entre nous deux. Pas de réunions à trois, pas de chaîne de validation interne. Vous appelez, on répond.",
      },
      {
        icon: Users,
        title: 'On bosse à deux derrière',
        desc: "Sur chaque décision qui compte — choix d'outil, paramétrage, intégration — on se challenge avant de vous livrer. Concrètement : moins d'erreurs, moins d'allers-retours, et personne ne valide par politesse.",
      },
      {
        icon: Scale,
        title: 'Pourquoi ça change quelque chose pour vous',
        desc: "Un consultant seul va vite valider ses propres choix. À deux, on est obligés de justifier. C'est vous qui y gagnez : chaque décision qui part chez vous a été contestée au moins une fois en interne.",
      },
    ],
  },
];

export const TeamView: React.FC = () => {
  return (
    <main className="flex-grow">
      {/* Hero */}
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
              Équipe
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Qui bosse sur votre système.
            </h1>
            <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl">
              Deux profils complémentaires. Un seul interlocuteur par mission.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Profils */}
      <section className="py-16 md:py-24 bg-[#FAF8F4]">
        <div className="container mx-auto px-6 max-w-5xl space-y-10 md:space-y-14">
          {team.map((m, idx) => (
            <motion.div
              key={m.name}
              className="bg-white rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12"
              style={{
                border: '1px solid rgba(26,35,50,0.08)',
                boxShadow: '0 12px 40px rgba(26,35,50,0.06)',
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
            >
              <div
                className="md:col-span-5 p-8 md:p-10 flex flex-col justify-center items-center text-center"
                style={{ background: NAVY }}
              >
                <div
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full mb-5 overflow-hidden"
                  style={{
                    border: `3px solid ${GOLD}`,
                    boxShadow: `0 0 0 4px rgba(201,168,76,0.15)`,
                  }}
                >
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{m.name}</h2>
                <p className="text-sm md:text-base" style={{ color: GOLD }}>
                  {m.role}
                </p>
                <div
                  className="mt-5 pt-5 border-t w-full flex flex-col gap-2 text-xs md:text-sm text-white/60"
                  style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <MapPin size={14} style={{ color: GOLD, opacity: 0.8 }} />
                    {m.location}
                  </span>
                  <span className="inline-flex items-center justify-center gap-2">
                    <Calendar size={14} style={{ color: GOLD, opacity: 0.8 }} />
                    {m.experience}
                  </span>
                </div>
              </div>

              <div className="md:col-span-7 p-8 md:p-10 flex flex-col gap-6">
                <div>
                  <p
                    className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
                    style={{ color: GOLD }}
                  >
                    {idx === 0 ? 'Pourquoi Opus Advisor' : 'Pourquoi une équipe de deux'}
                  </p>
                  <h3
                    className="text-2xl md:text-3xl font-bold leading-tight"
                    style={{ color: NAVY }}
                  >
                    {m.heading}
                  </h3>
                </div>

                <ul className="space-y-5">
                  {m.bullets.map((b) => {
                    const Icon = b.icon;
                    return (
                      <li key={b.title} className="flex gap-4 items-start">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}55` }}
                        >
                          <Icon size={18} style={{ color: NAVY }} />
                        </div>
                        <div>
                          <h4
                            className="font-bold text-base md:text-lg mb-1"
                            style={{ color: NAVY }}
                          >
                            {b.title}
                          </h4>
                          <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed">
                            {b.desc}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-5"
            style={{ color: NAVY }}
          >
            Un seul interlocuteur, du premier échange jusqu'à la mise en production.
          </h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
            Pas de commercial qui vous vend, puis passe la main à un chef de projet qui lui-même passe la main à un consultant junior. Vous parlez à la personne qui bosse sur votre système.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-6 py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-200 hover:scale-[1.02] btn-shimmer"
            style={{ background: GOLD, color: NAVY }}
          >
            Réserver 30 min en visio
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </section>
    </main>
  );
};
