'use client';

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionKicker } from '@/components/ui/SectionKicker';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';
const RULE = 'rgba(26,35,50,0.16)';

const steps = [
  {
    n: '01',
    title: 'Pré-audit gratuit',
    meta: '30 min · Visio',
    price: 'Gratuit',
    desc: "Vous me montrez vos outils. J'identifie 3 points de friction. Je vous montre en live comment on les règle. Pas de vente. Vous voyez ce que ça donne, on décide ensuite.",
  },
  {
    n: '02',
    title: 'Audit Stack',
    meta: '10 jours ouvrés',
    price: '990 € HT',
    desc: "On cartographie vos outils actuels et les points de friction. Préconisation claire : ajouter un outil, en remplacer un, ou orchestrer ceux que vous avez déjà. On n'est revendeur de personne.",
  },
  {
    n: '03',
    title: 'Diagnostic',
    meta: '2 à 3 semaines',
    price: '2 500 €',
    desc: "On cartographie votre boîte. On définit la vision cible. On vous livre un plan de consolidation précis, chiffré, avec ROI attendu. Si ça vous parle, on exécute. Sinon, vous gardez le plan.",
  },
  {
    n: '04',
    title: 'Mise en œuvre',
    meta: '4 à 10 semaines',
    price: 'Selon périmètre',
    desc: "On configure les outils, on connecte, on teste, on forme l'équipe. Pas de livraison dans le vide. Vous validez chaque brique.",
  },
  {
    n: '05',
    title: 'Gardien du système',
    meta: "Optionnel · l'opérateur qui reste à vos côtés",
    price: '400 à 1 500 €/mois',
    desc: "Votre système évolue avec votre boîte. On maintient, on ajuste, on ajoute des automations au fil de l'eau. Un opérateur qui connaît votre système et reste à vos côtés.",
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const MethodSection: React.FC = () => {
  return (
    <section id="methode" className="py-24 md:py-32 bg-white scroll-mt-24" aria-labelledby="method-title">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={item} className="mb-10 md:mb-12">
            <SectionKicker label="Méthode" index="05" />
          </motion.div>

          <motion.h2
            id="method-title"
            variants={item}
            className="font-heading font-bold leading-[1.02] tracking-tight text-4xl md:text-5xl lg:text-6xl"
            style={{ color: NAVY }}
          >
            Comment on bosse ensemble.
          </motion.h2>
          <motion.p variants={item} className="mt-6 text-lg md:text-xl text-gray-600">
            Cinq étapes claires. Prix affichés. Pas de surprise.
          </motion.p>

          <motion.ol variants={item} className="mt-14">
            {steps.map((s, i) => (
              <li key={s.n} className="border-t py-7" style={{ borderColor: RULE }}>
                <div className="flex flex-col sm:flex-row gap-x-7 gap-y-3">
                  <span
                    className="font-heading font-bold text-2xl md:text-3xl leading-none shrink-0 sm:w-12"
                    style={{ color: GOLD }}
                  >
                    {s.n}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                      <h3
                        className="font-semibold text-xl md:text-2xl leading-tight"
                        style={{ color: NAVY }}
                      >
                        {s.title}
                      </h3>
                      <span
                        className="font-heading font-bold text-lg md:text-xl whitespace-nowrap"
                        style={{ color: i === 0 || i === 1 ? GOLD : NAVY }}
                      >
                        {s.price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{s.meta}</p>
                    <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed mt-3 max-w-2xl">
                      {s.desc}
                    </p>
                    {i === 0 && (
                      <Link
                        href="/contact"
                        className="group inline-flex items-center gap-1.5 text-sm font-semibold mt-4 hover:gap-2.5 transition-all"
                        style={{ color: NAVY }}
                      >
                        Réserver mon créneau
                        <ArrowRight size={16} style={{ color: GOLD }} />
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            ))}
            <li className="border-t" style={{ borderColor: RULE }} />
          </motion.ol>
        </motion.div>
      </div>
    </section>
  );
};
