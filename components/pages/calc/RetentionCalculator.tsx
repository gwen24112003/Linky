'use client';

import React, { useState } from 'react';
import { DateField, NumberField, SelectField, ResultPanel, Warning, Note, eur, frDate } from './CalcUI';

export const VAT_OPTIONS = [
  { value: '20', label: '20 %' },
  { value: '10', label: '10 % (amélioration, logement de plus de 2 ans)' },
  { value: '5.5', label: '5,5 % (rénovation énergétique)' },
  { value: '0', label: 'Autoliquidation (sous-traitance)' },
];

export const RetentionCalculator: React.FC = () => {
  const [amountHT, setAmountHT] = useState(48000);
  const [vat, setVat] = useState('10');
  const [base, setBase] = useState<'ttc' | 'ht'>('ttc');
  const [rate, setRate] = useState(5);
  const [reception, setReception] = useState('2026-10-01');

  const amountTTC = amountHT * (1 + Number(vat) / 100);
  const retention = (base === 'ttc' ? amountTTC : amountHT) * (rate / 100);
  const paidNow = amountTTC - retention;

  const [y, m, d] = reception.split('-').map(Number);
  const release = y && m && d ? new Date(Date.UTC(y + 1, m - 1, d)) : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
      <form className="lg:col-span-7" onSubmit={(e) => e.preventDefault()} aria-label="Données du marché">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
          <NumberField label="Montant des travaux" hint="Montant HT du marché ou de la situation" unit="€ HT" step={100} value={amountHT} onChange={setAmountHT} />
          <SelectField label="TVA" value={vat} onChange={setVat} options={VAT_OPTIONS} />
          <SelectField
            label="Base de calcul"
            hint="Celle prévue dans votre marché"
            value={base}
            onChange={(v) => setBase(v as 'ttc' | 'ht')}
            options={[
              { value: 'ttc', label: 'Sur le montant TTC (le plus courant)' },
              { value: 'ht', label: 'Sur le montant HT' },
            ]}
          />
          <NumberField label="Taux de la retenue" hint="5 % au maximum" unit="%" step={0.5} value={rate} onChange={setRate} />
          <DateField label="Date de réception des travaux" hint="Point de départ du délai d'un an" value={reception} onChange={setReception} />
        </div>
      </form>

      <div className="lg:col-span-5">
        <ResultPanel
          results={[
            { label: 'Montant TTC des travaux', value: eur.format(amountTTC) },
            { label: 'Retenue de garantie', value: eur.format(retention), note: `${rate.toLocaleString('fr-FR')} % du montant ${base === 'ttc' ? 'TTC' : 'HT'}` },
            { label: 'Versé tout de suite', value: eur.format(paidNow), note: 'montant TTC − retenue' },
            {
              label: 'Libération de la retenue',
              value: release ? frDate(release) : '—',
              note: "un an après la réception, sauf opposition motivée du client",
            },
          ]}
        >
          {rate > 5 && (
            <Warning>
              Une retenue de garantie ne peut pas dépasser 5 % du montant du marché (loi du 16 juillet 1971). Une clause
              au-delà n'est pas valable.
            </Warning>
          )}
          <Note>
            La loi ne précise pas si la retenue se calcule sur le HT ou sur le TTC : c'est votre marché qui le dit. Le
            client peut aussi accepter une caution bancaire à la place de la retenue.
          </Note>
        </ResultPanel>
      </div>
    </div>
  );
};
