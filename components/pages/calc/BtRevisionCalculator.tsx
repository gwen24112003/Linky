'use client';

import React, { useState } from 'react';
import { NumberField, SelectField, ResultPanel, Warning, Note, eur } from './CalcUI';
import { btSeries, monthLabel, ofMonth, periodAt, valueAt, fmtIndex } from '@/lib/indices-bt';

const LATEST = btSeries.find((s) => s.code === 'BT01')!.last.period;
// Mois disponibles, du plus récent au plus ancien.
const MONTH_OPTIONS = Array.from({ length: btSeries[0].values.length }, (_, i) => periodAt(i))
  .filter((p) => p <= LATEST)
  .reverse()
  .map((p) => ({ value: p, label: monthLabel(p) }));
const INDEX_OPTIONS = btSeries.map((s) => ({ value: s.code, label: `${s.code} · ${s.label}` }));

// Exemple : prix établi un an avant le dernier index publié.
const ONE_YEAR_BEFORE = MONTH_OPTIONS[12]?.value ?? MONTH_OPTIONS[MONTH_OPTIONS.length - 1].value;

export const BtRevisionCalculator: React.FC = () => {
  const [code, setCode] = useState('BT01');
  const [price, setPrice] = useState(10000);
  const [month0, setMonth0] = useState(ONE_YEAR_BEFORE);
  const [monthN, setMonthN] = useState(LATEST);
  const [fixedPart, setFixedPart] = useState(0);

  const series = btSeries.find((s) => s.code === code) ?? btSeries[0];
  const i0 = valueAt(series, month0);
  const iN = valueAt(series, monthN);
  const fixed = Math.min(fixedPart, 100) / 100;
  const ratio = i0 && iN ? iN / i0 : null;
  const coefficient = ratio != null ? fixed + (1 - fixed) * ratio : null;
  const revised = coefficient != null ? price * coefficient : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
      <form className="lg:col-span-7" onSubmit={(e) => e.preventDefault()} aria-label="Données de la révision">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
          <div className="sm:col-span-2">
            <SelectField label="Index de référence" hint="Celui que prévoit votre contrat" value={code} onChange={setCode} options={INDEX_OPTIONS} />
          </div>
          <NumberField label="Prix initial" hint="Montant HT du devis ou du marché" unit="€ HT" step={100} value={price} onChange={setPrice} />
          <NumberField label="Partie fixe" hint="0 si le contrat n'en prévoit pas" unit="%" step={0.5} value={fixedPart} onChange={setFixedPart} />
          <SelectField label="Mois zéro" hint="Mois où le prix a été établi" value={month0} onChange={setMonth0} options={MONTH_OPTIONS} />
          <SelectField label="Mois de révision" hint="Mois des travaux à facturer" value={monthN} onChange={setMonthN} options={MONTH_OPTIONS} />
        </div>
      </form>

      <div className="lg:col-span-5">
        <ResultPanel
          results={[
            {
              label: `${series.code} au mois zéro → au mois de révision`,
              value: `${fmtIndex(i0)} → ${fmtIndex(iN)}`,
              note: `${monthLabel(month0)} → ${monthLabel(monthN)}`,
            },
            {
              label: 'Coefficient de révision',
              value: coefficient != null ? coefficient.toLocaleString('fr-FR', { minimumFractionDigits: 4, maximumFractionDigits: 4 }) : '–',
              note: fixed > 0 ? `${(fixed * 100).toLocaleString('fr-FR')} % fixe + ${((1 - fixed) * 100).toLocaleString('fr-FR')} % indexé` : 'index du mois ÷ index du mois zéro',
            },
            {
              label: 'Prix révisé',
              value: revised != null ? `${eur.format(revised)} HT` : '–',
              note: revised != null ? `soit ${revised >= price ? '+' : ''}${eur.format(revised - price)} par rapport au prix initial` : undefined,
            },
          ]}
        >
          {monthN < month0 && <Warning>Le mois de révision est antérieur au mois zéro : vérifiez les deux dates.</Warning>}
          {fixedPart > 100 && <Warning>La partie fixe ne peut pas dépasser 100 %.</Warning>}
          <Note>
            Les index sont ceux publiés par l'INSEE, mis à jour automatiquement. Le dernier disponible est celui{' '}
            {ofMonth(LATEST)}.
          </Note>
        </ResultPanel>
      </div>
    </div>
  );
};
