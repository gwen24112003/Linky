'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';

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
    title: 'Diagnostic',
    meta: '2 à 3 semaines',
    price: '2 500 €',
    desc: "On cartographie votre boîte. On définit la vision cible. On vous livre un plan de consolidation précis, chiffré, avec ROI attendu. Si ça vous parle, on exécute. Sinon, vous gardez le plan.",
  },
  {
    n: '03',
    title: 'Implémentation',
    meta: '4 à 10 semaines',
    price: 'Selon périmètre',
    desc: "On configure les outils, on connecte, on teste, on forme l'équipe. Pas de livraison dans le vide. Vous validez chaque brique.",
  },
  {
    n: '04',
    title: 'Suivi mensuel',
    meta: 'Optionnel',
    price: '400 à 600 €/mois',
    desc: "Votre système évolue avec votre boîte. On maintient, on ajuste, on ajoute des automations au fil de l'eau. Un interlocuteur qui connaît votre système.",
  },
];

export const MethodSection: React.FC = () => {
  return (
    <section
      id="methode"
      className="py-20 md:py-24 bg-[#FAF8F4] scroll-mt-24"
      aria-labelledby="method-title"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p
            className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase mb-3"
            style={{ color: GOLD }}
          >
            Notre méthode
          </p>
          <h2
            id="method-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5"
            style={{ color: NAVY }}
          >
            Comment on bosse ensemble.
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            Quatre étapes claires. Prix affichés. Pas de surprise.
          </p>
        </motion.div>

        <ol className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              className="bg-white rounded-2xl p-6 md:p-8 relative flex flex-col gap-4"
              style={{
                border: '1px solid rgba(26,35,50,0.08)',
                boxShadow: '0 2px 12px rgba(26,35,50,0.04)',
              }}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(26,35,50,0.1)' }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className="text-5xl md:text-6xl font-bold leading-none"
                    style={{ color: GOLD, opacity: 0.35 }}
                  >
                    {s.n}
                  </span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold leading-tight" style={{ color: NAVY }}>
                      {s.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">{s.meta}</p>
                  </div>
                </div>
                <span
                  className="text-sm md:text-base font-bold px-3 py-1.5 rounded-full whitespace-nowrap"
                  style={{
                    background: i === 0 ? `${GOLD}22` : 'rgba(26,35,50,0.05)',
                    color: i === 0 ? NAVY : NAVY,
                    border: i === 0 ? `1px solid ${GOLD}66` : '1px solid rgba(26,35,50,0.1)',
                  }}
                >
                  {s.price}
                </span>
              </div>

              <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed">{s.desc}</p>

              {i === 0 && (
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-sm font-semibold mt-auto pt-2 hover:gap-2 transition-all"
                  style={{ color: NAVY }}
                >
                  Réserver mon créneau
                  <ArrowRight size={16} />
                </Link>
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};
