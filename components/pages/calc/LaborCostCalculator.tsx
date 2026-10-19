'use client';

import React, { useState } from 'react';
import { NumberField, ResultPanel, Warning, Note, eur, eur0 } from './CalcUI';
import { DEFAULT_LABOR, laborCost, type LaborInputs } from '@/lib/labor-cost';

type Key = keyof LaborInputs;

const FIELDS: { key: Key; label: string; hint: string; unit: string; step: number }[] = [
  { key: 'grossMonthly', label: 'Salaire brut mensuel', hint: 'Du compagnon, hors primes exceptionnelles', unit: '€', step: 50 },
  { key: 'employerRate', label: 'Charges patronales', hint: 'Caisse de congés payés comprise, en % du brut', unit: '%', step: 1 },
  { key: 'dailyAllowance', label: 'Indemnités par jour travaillé', hint: 'Panier, trajet, transport', unit: '€ / jour', step: 1 },
  { key: 'yearlyCosts', label: 'Frais annuels du poste', hint: 'Véhicule, outillage, EPI, formation', unit: '€ / an', step: 100 },
  { key: 'presenceHours', label: 'Heures de présence par an', hint: '1 607 h pour un temps plein à 35 h', unit: 'h', step: 1 },
  { key: 'billableRate', label: 'Part des heures facturées', hint: 'Le reste : trajets, attente, reprises, SAV offert', unit: '%', step: 1 },
  { key: 'overheadRate', label: 'Frais généraux', hint: 'Loyer, bureau, assurances, comptable…', unit: '%', step: 1 },
  { key: 'marginRate', label: 'Marge visée', hint: 'En % du prix de vente', unit: '%', step: 1 },
];

export const LaborCostCalculator: React.FC = () => {
  const [v, setV] = useState<LaborInputs>(DEFAULT_LABOR);
  const set = (key: Key) => (n: number) => setV((prev) => ({ ...prev, [key]: n }));
  const r = laborCost(v);
  const perHour = (n: number) => `${eur.format(n)} / h`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
      <form className="lg:col-span-7" onSubmit={(e) => e.preventDefault()} aria-label="Coûts du compagnon">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
          {FIELDS.map((f) => (
            <NumberField key={f.key} label={f.label} hint={f.hint} unit={f.unit} step={f.step} value={v[f.key]} onChange={set(f.key)} />
          ))}
        </div>
      </form>

      <div className="lg:col-span-5">
        <ResultPanel
          results={[
            { label: 'Coût annuel du compagnon', value: eur0.format(r.yearlyCost), note: 'salaire chargé + indemnités + frais du poste' },
            { label: 'Coût par heure de présence', value: perHour(r.perPresenceHour), note: `sur ${v.presenceHours.toLocaleString('fr-FR')} h par an` },
            {
              label: 'Coût par heure facturée',
              value: perHour(r.perBillableHour),
              note: `${Math.round(r.billableHours).toLocaleString('fr-FR')} h facturées par an`,
            },
            {
              label: 'Taux horaire de vente à pratiquer',
              value: `${perHour(r.sellingRate)} HT`,
              note: `frais généraux ${v.overheadRate.toLocaleString('fr-FR')} % et marge ${v.marginRate.toLocaleString('fr-FR')} % compris`,
            },
          ]}
        >
          {v.billableRate > 100 && <Warning>La part des heures facturées ne peut pas dépasser 100 %.</Warning>}
          {v.marginRate >= 100 && <Warning>La marge visée doit rester sous 100 % du prix de vente.</Warning>}
          {v.presenceHours === 0 && <Warning>Indiquez le nombre d'heures de présence par an.</Warning>}
          <Note>
            Les valeurs de départ sont un exemple. Le taux de charges réel dépend de votre effectif, des allègements et de
            la caisse de congés payés : votre journal de paie ou votre expert-comptable vous donne le chiffre exact.
          </Note>
        </ResultPanel>
      </div>
    </div>
  );
};
