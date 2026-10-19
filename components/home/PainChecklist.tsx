'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const NAVY = '#1A2332';
const GOLD_INK = '#8A6A1C';
const RULE = 'rgba(26,35,50,0.14)';

export interface Pain {
  n: string;
  title: string;
  desc: string;
}

// Message selon le nombre de cases cochées (l'index = le nombre de cases).
// Le message à 0 est aussi celui que lisent les visiteurs et les robots sans JavaScript.
const MESSAGES = [
  "Vous cochez 3 cases sur 6 ? On a exactement ce qu'il faut.",
  'Ça arrive à toutes les boîtes. On peut en parler au pré-audit.',
  'Ça arrive à toutes les boîtes. On peut en parler au pré-audit.',
  "3 cases ou plus : c'est exactement ce qu'on règle. Le pré-audit est fait pour vous.",
  "3 cases ou plus : c'est exactement ce qu'on règle. Le pré-audit est fait pour vous.",
  'Votre boîte perd des heures chaque semaine. 30 minutes suffisent pour les chiffrer.',
  'Votre boîte perd des heures chaque semaine. 30 minutes suffisent pour les chiffrer.',
];

export const PainChecklist: React.FC<{ pains: Pain[] }> = ({ pains }) => {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const count = checked.size;
  const hot = count >= 3;

  const toggle = (n: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });

  return (
    <>
      <p className="mt-10 text-sm font-semibold" style={{ color: GOLD_INK }}>
        Cochez ce que vous vivez en ce moment.
      </p>

      <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-14">
        {pains.map((p) => (
          <li key={p.n} className="border-t" style={{ borderColor: RULE }}>
            <label className="grid grid-cols-[1.75rem_1fr] gap-x-3 py-6 cursor-pointer">
              <input
                type="checkbox"
                checked={checked.has(p.n)}
                onChange={() => toggle(p.n)}
                className="mt-1 h-[18px] w-[18px] accent-[#1A2332] cursor-pointer"
              />
              <span>
                <span
                  className="block font-semibold text-lg md:text-xl leading-snug mb-2"
                  style={{ color: NAVY }}
                >
                  {p.title}
                </span>
                <span className="block text-sm md:text-[15px] text-gray-600 leading-relaxed">
                  {p.desc}
                </span>
              </span>
            </label>
          </li>
        ))}
      </ul>

      <div
        className="mt-6 pt-8 border-t flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8"
        style={{ borderColor: NAVY }}
      >
        <p
          className="font-heading font-bold leading-none text-5xl shrink-0"
          style={{ color: NAVY }}
          aria-hidden="true"
        >
          {count}
          <span className="text-2xl" style={{ color: GOLD_INK }}>
            {' '}
            / 6
          </span>
        </p>
        <p
          className="flex-1 text-lg md:text-xl font-medium leading-snug"
          style={{ color: NAVY }}
          aria-live="polite"
        >
          <span className="sr-only">{count} cases cochées sur 6. </span>
          {MESSAGES[count]}
        </p>
        <Link
          href="/contact"
          className={`group shrink-0 self-start sm:self-auto inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm md:text-base border-2 transition-colors ${
            hot
              ? 'bg-[#C9A84C] border-[#C9A84C] text-[#1A2332]'
              : 'border-[#1A2332] text-[#1A2332] hover:bg-[#1A2332] hover:text-[#FAF7F0]'
          }`}
        >
          {hot ? 'Réserver mon pré-audit gratuit' : 'Faire le pré-audit'}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </>
  );
};
