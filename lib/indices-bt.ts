// Index du bâtiment (BT), base 100 en 2010. Données : lib/indices-bt.json, mis à jour depuis l'INSEE
// par scripts/update-indices-bt.mjs avant chaque compilation. Utilisable côté serveur comme navigateur.
import data from './indices-bt.json';

export interface BtSeries {
  code: string;
  label: string;
  idbank: string;
  last: { period: string; jo: string | null; provisional: boolean };
  values: (number | null)[];
}

export const BT_START: string = data.start;
export const btSeries = data.series as BtSeries[];

const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

/** « 2026-08 » → « août 2026 ». */
export function monthLabel(period: string): string {
  const [y, m] = period.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

/** « de juillet 2026 », « d'août 2026 » : élision devant avril, août, octobre. */
export function ofMonth(period: string): string {
  const label = monthLabel(period);
  return /^[aeiouéo]/i.test(label) ? `d'${label}` : `de ${label}`;
}

/** « 2026-10-16 » → « 16 octobre 2026 ». */
export function dayLabel(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d === 1 ? '1er' : d} ${MONTHS[m - 1]} ${y}`;
}

export function periodAt(i: number): string {
  const [y, m] = BT_START.split('-').map(Number);
  const total = y * 12 + (m - 1) + i;
  return `${Math.floor(total / 12)}-${String((total % 12) + 1).padStart(2, '0')}`;
}

export function indexOfPeriod(period: string): number {
  const [ys, ms] = BT_START.split('-').map(Number);
  const [y, m] = period.split('-').map(Number);
  return (y - ys) * 12 + (m - ms);
}

export function valueAt(s: BtSeries, period: string): number | null {
  const i = indexOfPeriod(period);
  return i >= 0 && i < s.values.length ? s.values[i] : null;
}

export function getBt(code: string): BtSeries {
  const s = btSeries.find((x) => x.code === code);
  if (!s) throw new Error(`Index ${code} absent de lib/indices-bt.json`);
  return s;
}

/** Variation en % entre deux valeurs, arrondie au dixième. */
export function change(from: number | null, to: number | null): number | null {
  if (from == null || to == null || from === 0) return null;
  return Math.round(((to - from) / from) * 1000) / 10;
}

export const fmtIndex = (v: number | null) =>
  v == null ? '–' : v.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export const fmtChange = (v: number | null) =>
  v == null ? '–' : `${v > 0 ? '+' : ''}${v.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`;
