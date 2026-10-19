'use client';

import React, { useState } from 'react';
import { NumberField, SelectField, ResultPanel, Warning, Note, eur } from './CalcUI';
import { VAT_OPTIONS } from './RetentionCalculator';

export const SituationCalculator: React.FC = () => {
  const [contractHT, setContractHT] = useState(48000);
  const [progress, setProgress] = useState(60);
  const [alreadyHT, setAlreadyHT] = useState(19200);
  const [vat, setVat] = useState('10');
  const [rgRate, setRgRate] = useState(5);
  const [rgBase, setRgBase] = useState<'ttc' | 'ht'>('ttc');

  const doneHT = contractHT * (progress / 100);
  const situationHT = doneHT - alreadyHT;
  const vatAmount = situationHT * (Number(vat) / 100);
  const situationTTC = situationHT + vatAmount;
  const retention = (rgBase === 'ttc' ? situationTTC : situationHT) * (rgRate / 100);
  const netToPay = situationTTC - retention;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
      <form className="lg:col-span-7" onSubmit={(e) => e.preventDefault()} aria-label="Données de la situation">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
          <NumberField label="Montant du marché" hint="Total HT des travaux prévus" unit="€ HT" step={100} value={contractHT} onChange={setContractHT} />
          <NumberField label="Avancement cumulé" hint="Travaux réalisés depuis le début" unit="%" step={5} value={progress} onChange={setProgress} />
          <NumberField label="Déjà facturé" hint="Total HT des situations précédentes" unit="€ HT" step={100} value={alreadyHT} onChange={setAlreadyHT} />
          <SelectField label="TVA" value={vat} onChange={setVat} options={VAT_OPTIONS} />
          <NumberField label="Retenue de garantie" hint="0 si le marché n'en prévoit pas" unit="%" step={0.5} value={rgRate} onChange={setRgRate} />
          <SelectField
            label="Base de la retenue"
            value={rgBase}
            onChange={(v) => setRgBase(v as 'ttc' | 'ht')}
            options={[
              { value: 'ttc', label: 'Sur le TTC (le plus courant)' },
              { value: 'ht', label: 'Sur le HT' },
            ]}
          />
        </div>
      </form>

      <div className="lg:col-span-5">
        <ResultPanel
          results={[
            { label: 'Travaux réalisés (cumul)', value: eur.format(doneHT), note: `${progress.toLocaleString('fr-FR')} % du marché, HT` },
            { label: 'Montant de cette situation', value: `${eur.format(situationHT)} HT`, note: 'cumul − déjà facturé' },
            { label: 'TVA', value: eur.format(vatAmount), note: vat === '0' ? 'autoliquidation : TVA déclarée par l’entreprise principale' : `${vat.replace('.', ',')} %` },
            { label: 'Net à payer', value: eur.format(netToPay), note: `situation TTC ${eur.format(situationTTC)} − retenue ${eur.format(retention)}` },
          ]}
        >
          {situationHT < 0 && (
            <Warning>
              L'avancement saisi est inférieur à ce qui a déjà été facturé : il faudrait un avoir, pas une situation.
            </Warning>
          )}
          {progress > 100 && <Warning>L'avancement ne peut pas dépasser 100 % : les travaux en plus passent par un avenant.</Warning>}
          {vat === '0' && (
            <Note>
              En sous-traitance BTP, la facture se fait hors taxes avec la mention « Autoliquidation » : c'est l'entreprise
              principale qui déclare la TVA.
            </Note>
          )}
        </ResultPanel>
      </div>
    </div>
  );
};
