// Met à jour lib/indices-bt.json avec les index du bâtiment (BT) publiés par l'INSEE.
// Source : API BDM de l'INSEE, accès libre, sans clé (série INDEX-BT-TP-DIV-IM-2010, base 100 en 2010).
// Lancé avant chaque compilation par le workflow de déploiement ; en cas d'échec, le fichier du dépôt sert tel quel.
// Usage : node scripts/update-indices-bt.mjs
import { writeFileSync, readFileSync } from 'node:fs';

const START = '2020-01';
const API_URL = `https://api.insee.fr/series/BDM/data/INDEX-BT-TP-DIV-IM-2010?startPeriod=${START}`;
const OUT = new URL('../lib/indices-bt.json', import.meta.url);

const res = await fetch(API_URL, { headers: { Accept: 'application/xml' }, signal: AbortSignal.timeout(60_000) });
if (!res.ok) throw new Error(`INSEE : HTTP ${res.status}`);
const xml = await res.text();

const attr = (s, name) => s.match(new RegExp(`${name}="([^"]*)"`))?.[1];

const monthsBetween = (a, b) => {
  const [ya, ma] = a.split('-').map(Number);
  const [yb, mb] = b.split('-').map(Number);
  return (yb - ya) * 12 + (mb - ma);
};

const series = [];
for (const m of xml.matchAll(/<Series ([^>]*)>([\s\S]*?)<\/Series>/g)) {
  const title = attr(m[1], 'TITLE_FR') ?? '';
  const match = title.match(/^Index du bâtiment - (BT\w+) - (.+?) - Base 2010$/);
  if (!match || /Série arrêtée/i.test(title)) continue;

  const obs = [...m[2].matchAll(/<Obs ([^>]*)\/>/g)]
    .map((o) => ({
      period: attr(o[1], 'TIME_PERIOD'),
      value: Number(attr(o[1], 'OBS_VALUE')),
      jo: attr(o[1], 'DATE_JO'),
      qual: attr(o[1], 'OBS_QUAL'),
    }))
    .filter((o) => o.period && Number.isFinite(o.value))
    .sort((a, b) => a.period.localeCompare(b.period));
  if (obs.length === 0) continue;

  const last = obs[obs.length - 1];
  const values = new Array(monthsBetween(START, last.period) + 1).fill(null);
  for (const o of obs) {
    const i = monthsBetween(START, o.period);
    if (i >= 0) values[i] = o.value;
  }

  series.push({
    code: match[1],
    label: match[2].trim(),
    idbank: attr(m[1], 'IDBANK'),
    last: { period: last.period, jo: last.jo ?? null, provisional: last.qual !== 'DEF' },
    values,
  });
}

const order = (code) => {
  const n = code.match(/\d+/)?.[0];
  return [Number(n), code];
};
series.sort((a, b) => {
  const [na, ca] = order(a.code);
  const [nb, cb] = order(b.code);
  return na - nb || ca.localeCompare(cb);
});

if (!series.some((s) => s.code === 'BT01')) throw new Error('INSEE : BT01 absent de la réponse, fichier non modifié');

const data = { source: 'INSEE, API BDM (INDEX-BT-TP-DIV-IM-2010)', start: START, series };
const json = JSON.stringify(data, null, 1) + '\n';

let previous = '';
try {
  previous = readFileSync(OUT, 'utf8');
} catch {}
if (previous === json) {
  console.log('Index BT : déjà à jour.');
} else {
  writeFileSync(OUT, json);
  const bt01 = series.find((s) => s.code === 'BT01');
  console.log(`Index BT : ${series.length} séries, BT01 ${bt01.last.period} = ${bt01.values.at(-1)}.`);
}
