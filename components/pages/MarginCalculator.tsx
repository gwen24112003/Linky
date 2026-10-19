'use client';

import React, { useState } from 'react';

const NAVY = '#1A2332';
const GOLD_INK = '#8A6A1C';
const RULE = 'rgba(26,35,50,0.16)';

const eur = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
const pct = (v: number) => `${(Math.round(v * 10) / 10).toLocaleString('fr-FR')} %`;

interface Field {
  key: keyof Values;
  label: string;
  hint?: string;
  unit: string;
  step: number;
}

interface Values {
  price: number;
  hours: number;
  hourlyCost: number;
  materials: number;
  subcontracting: number;
  equipment: number;
  misc: number;
  overheadRate: number;
  targetRate: number;
}

// Exemple de départ : un chantier fictif, pour que le calcul ait du sens dès l'affichage.
const DEFAULTS: Values = {
  price: 18000,
  hours: 120,
  hourlyCost: 45,
  materials: 6200,
  subcontracting: 1500,
  equipment: 400,
  misc: 600,
  overheadRate: 15,
  targetRate: 10,
};

const FIELDS: Field[] = [
  { key: 'price', label: 'Prix de vente du chantier', hint: 'Montant HT du devis', unit: '€ HT', step: 100 },
  { key: 'hours', label: "Heures de main-d'œuvre", hint: 'Heures prévues sur le chantier', unit: 'h', step: 1 },
  { key: 'hourlyCost', label: 'Coût horaire chargé', hint: 'Salaire et charges, par heure', unit: '€/h', step: 1 },
  { key: 'materials', label: 'Matériaux et fournitures', unit: '€ HT', step: 50 },
  { key: 'subcontracting', label: 'Sous-traitance', unit: '€ HT', step: 50 },
  { key: 'equipment', label: 'Matériel et location', unit: '€ HT', step: 50 },
  { key: 'misc', label: 'Petites dépenses', hint: 'Déplacements, EPI, évacuation, nettoyage', unit: '€ HT', step: 50 },
  { key: 'overheadRate', label: 'Frais généraux', hint: 'En % du déboursé sec', unit: '%', step: 1 },
  { key: 'targetRate', label: 'Bénéfice visé', hint: 'En % du prix de vente', unit: '%', step: 1 },
];

export const MarginCalculator: React.FC = () => {
  const [v, setV] = useState<Values>(DEFAULTS);

  const labour = v.hours * v.hourlyCost;
  const directCost = labour + v.materials + v.subcontracting + v.equipment + v.misc;
  const overhead = directCost * (v.overheadRate / 100);
  const costPrice = directCost + overhead;
  const grossMargin = v.price - directCost;
  const netProfit = v.price - costPrice;
  const grossRate = v.price > 0 ? (grossMargin / v.price) * 100 : 0;
  const netRate = v.price > 0 ? (netProfit / v.price) * 100 : 0;
  const coefficient = directCost > 0 ? v.price / directCost : 0;
  const advisedPrice = v.targetRate < 100 ? costPrice / (1 - v.targetRate / 100) : 0;

  const update = (key: keyof Values, raw: string) => {
    const n = Number(raw.replace(',', '.'));
    setV((prev) => ({ ...prev, [key]: Number.isFinite(n) && n >= 0 ? n : 0 }));
  };

  const results = [
    { label: 'Déboursé sec', value: eur.format(directCost), note: `dont main-d'œuvre ${eur.format(labour)}` },
    { label: 'Prix de revient', value: eur.format(costPrice), note: `frais généraux compris (${eur.format(overhead)})` },
    { label: 'Marge brute', value: eur.format(grossMargin), note: `${pct(grossRate)} du prix de vente` },
    { label: 'Bénéfice net', value: eur.format(netProfit), note: `${pct(netRate)} du prix de vente` },
    { label: 'Coefficient de vente', value: coefficient.toLocaleString('fr-FR', { maximumFractionDigits: 2 }), note: 'prix de vente ÷ déboursé sec' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
      <form className="lg:col-span-7" onSubmit={(e) => e.preventDefault()} aria-label="Données du chantier">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
          {FIELDS.map((f) => (
            <label key={f.key} className="block">
              <span className="block text-sm font-semibold" style={{ color: NAVY }}>
                {f.label}
              </span>
              {f.hint && <span className="block text-xs text-gray-500 mt-0.5">{f.hint}</span>}
              <span className="mt-2 flex items-center rounded-lg border bg-white focus-within:ring-2 focus-within:ring-[#C9A84C]/60" style={{ borderColor: RULE }}>
                <input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={f.step}
                  value={v[f.key]}
                  onChange={(e) => update(f.key, e.target.value)}
                  className="w-full bg-transparent px-4 py-3 text-base focus:outline-none"
                  style={{ color: NAVY }}
                />
                <span className="pr-4 text-sm text-gray-500 whitespace-nowrap">{f.unit}</span>
              </span>
            </label>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setV(DEFAULTS)}
          className="mt-6 text-sm font-semibold border-b pb-0.5 hover:opacity-70 transition-opacity"
          style={{ color: GOLD_INK, borderColor: GOLD_INK }}
        >
          Revenir à l'exemple
        </button>
      </form>

      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28 border-t-2 pt-6" style={{ borderColor: NAVY }} aria-live="polite">
          <p className="text-sm font-semibold" style={{ color: NAVY }}>
            Résultat
          </p>
          <dl className="mt-2">
            {results.map((r) => (
              <div key={r.label} className="py-4 border-b" style={{ borderColor: RULE }}>
                <dt className="text-sm text-gray-600">{r.label}</dt>
                <dd className="mt-1 font-heading font-bold text-2xl md:text-3xl" style={{ color: NAVY }}>
                  {r.value}
                </dd>
                <dd className="text-sm text-gray-500">{r.note}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 p-5 rounded-lg" style={{ background: '#FAF7F0' }}>
            <p className="text-sm text-gray-600">Prix de vente pour {pct(v.targetRate)} de bénéfice</p>
            <p className="mt-1 font-heading font-bold text-2xl" style={{ color: NAVY }}>
              {advisedPrice > 0 ? `${eur.format(advisedPrice)} HT` : '—'}
            </p>
            {grossMargin < 0 && (
              <p className="mt-2 text-sm font-semibold text-[#9B2C2C]">
                Votre prix ne couvre même pas le déboursé sec : ce chantier vous coûte de l'argent.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
