'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { track } from '@/lib/analytics';

const NAVY = '#1A2332';
const GOLD = '#C9A84C';
const GOLD_INK = '#8A6A1C';
const PAPER = '#FAF7F0';

const WEEKS = 45; // semaines travaillées par an, congés et jours fériés déduits

const fmt = (n: number) => Math.round(n).toLocaleString('fr-FR');

/** Calculateur du temps passé à ressaisir. Les valeurs de départ s'affichent aussi sans JavaScript. */
export const TimeLossSection: React.FC = () => {
  const [hours, setHours] = useState(6);
  const [people, setPeople] = useState(2);
  const [rate, setRate] = useState(35);
  const [used, setUsed] = useState(false);

  const touch = () => {
    if (used) return;
    setUsed(true);
    track('Calculateur utilisé', { outil: 'Heures de ressaisie (accueil)' });
  };

  const yearly = hours * people * WEEKS;
  const days = yearly / 7;
  const cost = yearly * rate;

  const slider = (id: string, label: string, value: number, min: number, max: number, unit: string, set: (n: number) => void) => (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-semibold" style={{ color: NAVY }}>
          {label}
        </label>
        <output htmlFor={id} className="text-lg font-heading font-bold" style={{ color: NAVY }}>
          {value} {unit}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => {
          touch();
          set(Number(e.target.value));
        }}
        className="mt-3 w-full accent-[#1A2332] cursor-pointer"
      />
    </div>
  );

  return (
    <section className="py-24 md:py-32" style={{ background: PAPER }} aria-labelledby="timeloss-title">
      <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-6" data-reveal>
          <h2 id="timeloss-title" className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl" style={{ color: NAVY }}>
            Combien d'heures partent dans la ressaisie ?
          </h2>
          <p className="mt-6 text-lg text-gray-700 leading-relaxed">
            Recopier une inscription, refaire une facture, relancer un client à la main : faites le calcul pour votre
            entreprise. Rien n'est enregistré.
          </p>

          <div className="mt-10 space-y-7">
            {slider('tl-hours', 'Heures par semaine et par personne', hours, 1, 20, 'h', setHours)}
            {slider('tl-people', 'Personnes concernées', people, 1, 10, people > 1 ? 'personnes' : 'personne', setPeople)}
            {slider('tl-rate', 'Coût horaire chargé (salaire et charges)', rate, 15, 80, '€', setRate)}
          </div>
        </div>

        <div className="lg:col-span-6" data-reveal data-reveal-delay="2">
          <div className="rounded-2xl p-7 md:p-9" style={{ background: NAVY }} aria-live="polite">
            <p className="text-sm text-white/70">Chaque année, sur {WEEKS} semaines travaillées</p>
            <p className="mt-3 font-heading font-bold leading-none text-6xl md:text-7xl" style={{ color: GOLD }}>
              {fmt(yearly)} h
            </p>
            <p className="mt-3 text-lg text-white">soit {fmt(days)} jours de travail</p>
            <div className="mt-7 pt-6 border-t border-white/15">
              <p className="text-sm text-white/70">Temps payé passé à ressaisir</p>
              <p className="mt-1 font-heading font-bold text-3xl md:text-4xl text-white">{fmt(cost)} €</p>
            </div>
            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm md:text-base"
              style={{ background: GOLD, color: NAVY }}
            >
              Voir ce qu'on peut automatiser
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="mt-4 text-sm text-white/70">
              Le pré-audit gratuit repère, sur vos outils, les tâches qui peuvent partir seules.
            </p>
          </div>
          <p className="mt-3 text-xs" style={{ color: GOLD_INK }}>
            Estimation indicative, à partir de vos propres chiffres.
          </p>
        </div>
      </div>
    </section>
  );
};
