'use client';

import React, { useState } from 'react';
import { DateField, NumberField, SelectField, ResultPanel, Warning, Note, eur, pct } from './CalcUI';

// Taux par défaut des pénalités entre professionnels (art. L441-10 du Code de commerce) :
// taux de refinancement de la BCE au 1er janvier (1er semestre) ou au 1er juillet (2nd semestre),
// majoré de 10 points. Source BCE : 3,15 % au 01/01/2025, 2,15 % au 01/07/2025 et au 01/01/2026,
// 2,40 % au 01/07/2026. À compléter à chaque semestre.
export const DEFAULT_RATES: Record<string, number> = {
  '2025-S1': 13.15,
  '2025-S2': 12.15,
  '2026-S1': 12.15,
  '2026-S2': 12.4,
};
const LATEST_PERIOD = '2026-S2';

const periodLabel = (key: string) => {
  const [y, s] = key.split('-');
  return `${s === 'S1' ? '1er' : '2nd'} semestre ${y}`;
};

const parseDate = (v: string) => {
  const [y, m, d] = v.split('-').map(Number);
  return y && m && d ? new Date(Date.UTC(y, m - 1, d)) : null;
};

export const PenaltyCalculator: React.FC = () => {
  // Exemple fixe (pas « aujourd'hui ») pour que le rendu serveur et navigateur soient identiques.
  const [amount, setAmount] = useState(4280);
  const [due, setDue] = useState('2026-07-15');
  const [paid, setPaid] = useState('2026-09-15');
  const [mode, setMode] = useState<'legal' | 'cgv'>('legal');
  const [cgvRate, setCgvRate] = useState(10);
  const [flatFee, setFlatFee] = useState('oui');

  const dueDate = parseDate(due);
  const paidDate = parseDate(paid);
  const daysLate =
    dueDate && paidDate ? Math.max(0, Math.round((paidDate.getTime() - dueDate.getTime()) / 86400000)) : 0;

  // Les pénalités courent dès le lendemain de l'échéance : c'est ce jour-là qui fixe le semestre.
  const firstLateDay = dueDate ? new Date(dueDate.getTime() + 86400000) : null;
  const periodKey = firstLateDay
    ? `${firstLateDay.getUTCFullYear()}-${firstLateDay.getUTCMonth() < 6 ? 'S1' : 'S2'}`
    : LATEST_PERIOD;
  const knownPeriod = periodKey in DEFAULT_RATES;
  const legalRate = DEFAULT_RATES[knownPeriod ? periodKey : LATEST_PERIOD];
  const rate = mode === 'legal' ? legalRate : cgvRate;

  const penalties = (amount * (rate / 100) * daysLate) / 365;
  const fee = flatFee === 'oui' && daysLate > 0 ? 40 : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
      <form className="lg:col-span-7" onSubmit={(e) => e.preventDefault()} aria-label="Données de la facture">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
          <NumberField label="Montant de la facture" hint="Somme restant due, TTC" unit="€ TTC" step={10} value={amount} onChange={setAmount} />
          <SelectField
            label="Taux des pénalités"
            hint="Par défaut : taux de la BCE + 10 points"
            value={mode}
            onChange={(v) => setMode(v as 'legal' | 'cgv')}
            options={[
              { value: 'legal', label: 'Taux par défaut' },
              { value: 'cgv', label: 'Taux de mes CGV' },
            ]}
          />
          <DateField label="Date d'échéance" hint="Indiquée sur la facture" value={due} onChange={setDue} />
          <DateField label="Date de paiement" hint="Ou la date du jour si la facture est toujours impayée" value={paid} onChange={setPaid} />
          {mode === 'cgv' && (
            <NumberField label="Taux de vos CGV" hint="Taux annuel" unit="%" step={0.5} value={cgvRate} onChange={setCgvRate} />
          )}
          <SelectField
            label="Indemnité forfaitaire de 40 €"
            hint="Due pour chaque facture payée en retard par un professionnel"
            value={flatFee}
            onChange={setFlatFee}
            options={[
              { value: 'oui', label: 'Oui, client professionnel' },
              { value: 'non', label: 'Non' },
            ]}
          />
        </div>
      </form>

      <div className="lg:col-span-5">
        <ResultPanel
          results={[
            { label: 'Jours de retard', value: `${daysLate} jour${daysLate > 1 ? 's' : ''}` },
            {
              label: 'Taux appliqué',
              value: pct(rate),
              note: mode === 'legal' ? `taux par défaut du ${periodLabel(knownPeriod ? periodKey : LATEST_PERIOD)}` : 'taux de vos conditions générales',
            },
            { label: 'Pénalités de retard', value: eur.format(penalties), note: 'montant × taux × jours de retard ÷ 365' },
            { label: 'Total à réclamer', value: eur.format(penalties + fee), note: fee ? 'pénalités + indemnité de 40 €' : 'pénalités seules' },
          ]}
        >
          {mode === 'legal' && !knownPeriod && (
            <Warning>
              Le taux du {periodLabel(periodKey)} n'est pas encore renseigné ici : le calcul utilise celui du{' '}
              {periodLabel(LATEST_PERIOD)}. Vérifiez le taux de la BCE au 1er janvier ou au 1er juillet et ajoutez 10 points.
            </Warning>
          )}
          {mode === 'cgv' && cgvRate < 8.25 && (
            <Warning>
              Attention : un taux contractuel ne peut pas être inférieur à trois fois le taux d'intérêt légal, soit 8,25 % au
              2nd semestre 2026.
            </Warning>
          )}
          <Note>
            Ce calcul vaut entre professionnels. Pour un client particulier, pas de pénalités de ce type ni d'indemnité de
            40 € : la somme due porte intérêt au taux légal à partir de la mise en demeure.
          </Note>
        </ResultPanel>
      </div>
    </div>
  );
};
