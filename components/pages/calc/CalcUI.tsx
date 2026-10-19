import React from 'react';

// Briques communes aux calculateurs de /outils/ (même style que le calculateur de marge).
export const NAVY = '#1A2332';
export const GOLD_INK = '#8A6A1C';
export const RULE = 'rgba(26,35,50,0.16)';

export const eur = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 });
export const eur0 = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
export const pct = (v: number) => `${v.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} %`;
export const frDate = (d: Date) =>
  d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** Convertit une saisie en nombre positif (virgule acceptée), 0 sinon. */
export const toNumber = (raw: string) => {
  const n = Number(raw.replace(',', '.'));
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

const boxClass =
  'mt-2 flex items-center rounded-lg border bg-white focus-within:ring-2 focus-within:ring-[#C9A84C]/60';

interface FieldShellProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
}

const FieldShell: React.FC<FieldShellProps> = ({ label, hint, children }) => (
  <label className="block">
    <span className="block text-sm font-semibold" style={{ color: NAVY }}>
      {label}
    </span>
    {hint && <span className="block text-xs text-gray-500 mt-0.5">{hint}</span>}
    {children}
  </label>
);

interface NumberFieldProps {
  label: string;
  hint?: string;
  unit: string;
  value: number;
  step?: number;
  onChange: (n: number) => void;
}

export const NumberField: React.FC<NumberFieldProps> = ({ label, hint, unit, value, step = 1, onChange }) => (
  <FieldShell label={label} hint={hint}>
    <span className={boxClass} style={{ borderColor: RULE }}>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        step={step}
        value={value}
        onChange={(e) => onChange(toNumber(e.target.value))}
        className="w-full bg-transparent px-4 py-3 text-base focus:outline-none"
        style={{ color: NAVY }}
      />
      <span className="pr-4 text-sm text-gray-500 whitespace-nowrap">{unit}</span>
    </span>
  </FieldShell>
);

interface DateFieldProps {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
}

export const DateField: React.FC<DateFieldProps> = ({ label, hint, value, onChange }) => (
  <FieldShell label={label} hint={hint}>
    <span className={boxClass} style={{ borderColor: RULE }}>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent px-4 py-3 text-base focus:outline-none"
        style={{ color: NAVY }}
      />
    </span>
  </FieldShell>
);

interface SelectFieldProps {
  label: string;
  hint?: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}

export const SelectField: React.FC<SelectFieldProps> = ({ label, hint, value, options, onChange }) => (
  <FieldShell label={label} hint={hint}>
    <span className={boxClass} style={{ borderColor: RULE }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent px-4 py-3 text-base focus:outline-none"
        style={{ color: NAVY }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </span>
  </FieldShell>
);

export interface Result {
  label: string;
  value: string;
  note?: string;
}

interface ResultPanelProps {
  results: Result[];
  children?: React.ReactNode;
}

/** Colonne de résultats : annoncée aux lecteurs d'écran à chaque recalcul. */
export const ResultPanel: React.FC<ResultPanelProps> = ({ results, children }) => (
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
          {r.note && <dd className="text-sm text-gray-500">{r.note}</dd>}
        </div>
      ))}
    </dl>
    {children}
  </div>
);

export const Warning: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="mt-4 text-sm font-semibold text-[#9B2C2C] leading-relaxed">{children}</p>
);

export const Note: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="mt-4 p-4 rounded-lg text-sm text-gray-700 leading-relaxed" style={{ background: '#FAF7F0' }}>
    {children}
  </p>
);
