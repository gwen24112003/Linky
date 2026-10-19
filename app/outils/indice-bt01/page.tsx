import type { Metadata } from 'next';
import { ToolPage, ToolH2, ToolP, Formula, ToolLink, ToolTable } from '@/components/pages/ToolPage';
import { BtRevisionCalculator } from '@/components/pages/calc/BtRevisionCalculator';
import { NAVY, GOLD_INK, RULE } from '@/components/pages/calc/CalcUI';
import { btSeries, getBt, monthLabel, ofMonth, dayLabel, indexOfPeriod, periodAt, change, fmtIndex, fmtChange } from '@/lib/indices-bt';

const PAGE_URL = 'https://opusadvisor.fr/outils/indice-bt01/';

const bt01 = getBt('BT01');
const latest = bt01.last.period;
const iLatest = indexOfPeriod(latest);
const latestValue = bt01.values[iLatest];
const monthBefore = periodAt(iLatest - 1);
const yearBefore = periodAt(iLatest - 12);
const valueAtPeriod = (s: (typeof btSeries)[number], p: string) => s.values[indexOfPeriod(p)] ?? null;

const PAGE_TITLE = `Indice BT01 ${monthLabel(latest)} : valeur, historique et révision de prix`;
const PAGE_DESCRIPTION = `Dernier indice BT01 publié : ${fmtIndex(latestValue)} pour ${monthLabel(latest)} (base 100 en 2010). Historique sur 12 mois, index BT du second œuvre et calculateur de révision de prix.`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: PAGE_TITLE, description: PAGE_DESCRIPTION, url: PAGE_URL, type: 'website', images: [{ url: 'https://opusadvisor.fr/images/Logo_1200x630.png' }] },
};

// Index les plus utilisés par les entreprises du second œuvre.
const SECOND_OEUVRE = ['BT38', 'BT40', 'BT41', 'BT47', 'BT46', 'BT50'];

const LatestFigures = () => {
  const figures = [
    { label: `BT01, ${monthLabel(latest)}`, value: fmtIndex(latestValue) },
    { label: `Sur un mois (${monthLabel(monthBefore)})`, value: fmtChange(change(valueAtPeriod(bt01, monthBefore), latestValue)) },
    { label: `Sur un an (${monthLabel(yearBefore)})`, value: fmtChange(change(valueAtPeriod(bt01, yearBefore), latestValue)) },
  ];
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 mb-12 md:mb-16 border-t" style={{ borderColor: RULE }}>
      {figures.map((f) => (
        <div key={f.label} className="py-5 border-b" style={{ borderColor: RULE }}>
          <dt className="text-sm text-gray-600">{f.label}</dt>
          <dd className="mt-1 font-heading font-bold text-3xl md:text-4xl" style={{ color: NAVY }}>
            {f.value}
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default function IndiceBt01Page() {
  const history = Array.from({ length: 12 }, (_, k) => periodAt(iLatest - k)).map((p) => {
    const v = valueAtPeriod(bt01, p);
    const prev = valueAtPeriod(bt01, periodAt(indexOfPeriod(p) - 1));
    return [monthLabel(p), fmtIndex(v), fmtChange(change(prev, v))];
  });

  const row = (code: string) => {
    const s = getBt(code);
    const v = valueAtPeriod(s, s.last.period);
    return [s.code, s.label, fmtIndex(v), fmtChange(change(valueAtPeriod(s, periodAt(indexOfPeriod(s.last.period) - 12)), v))];
  };

  const datasetJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Index du bâtiment BT (base 100 en 2010)',
    description: `Valeurs mensuelles des index BT publiés par l'INSEE, de janvier 2020 à ${monthLabel(latest)}.`,
    url: PAGE_URL,
    creator: { '@type': 'Organization', name: 'INSEE', url: 'https://www.insee.fr' },
    isAccessibleForFree: true,
    temporalCoverage: `2020-01/${latest}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }} />
      <ToolPage
        url={PAGE_URL}
        breadcrumbName="Indice BT01 et révision de prix"
        title="Indice BT01 et révision de prix"
        intro={`Dernier index publié : ${fmtIndex(latestValue)} pour ${monthLabel(latest)}${bt01.last.jo ? `, paru au Journal officiel le ${dayLabel(bt01.last.jo)}` : ''}. Le calculateur révise un prix avec n'importe quel index BT, du mois zéro au mois de votre choix.`}
        calculator={
          <>
            <LatestFigures />
            <BtRevisionCalculator />
          </>
        }
        ctaTitle="Vos révisions de prix se calculent encore à la main ?"
        ctaText="Un index à reporter chaque mois sur chaque situation, c'est le genre de tâche qu'un système fait sans erreur. On regarde ensemble comment l'intégrer à votre facturation pendant le pré-audit : 30 minutes, gratuites."
      >
        <ToolH2>Valeur de l'indice BT01 sur 12 mois</ToolH2>
        <ToolP>
          Le BT01 (tous corps d'état) est l'index général du bâtiment. Il est calculé en base 100 en 2010 : à{' '}
          {fmtIndex(latestValue)}, les coûts qu'il suit (salaires, matériaux, matériel, énergie, transport) ont augmenté
          d'environ {Math.round((latestValue ?? 100) - 100)} % depuis 2010.
        </ToolP>
        <ToolTable head={['Mois', 'BT01', 'Sur un mois']} rows={history} />

        <ToolH2>Quel index pour quel métier ?</ToolH2>
        <ToolP>
          Le contrat doit indiquer l'index retenu. Pour un marché tous corps d'état, c'est souvent le BT01. Pour un lot
          précis, on prend l'index du métier :
        </ToolP>
        <ToolTable head={['Index', 'Métier', monthLabel(latest), 'Sur un an']} rows={SECOND_OEUVRE.map(row)} />

        <ToolH2>Comment réviser un prix avec un index BT</ToolH2>
        <Formula>prix révisé = prix initial × index du mois ÷ index du mois zéro</Formula>
        <ToolP>
          Le mois zéro est celui où le prix a été établi, en général le mois de remise de l'offre ; le contrat le précise.
          Si le contrat prévoit une partie fixe, seule la partie restante suit l'index :
        </ToolP>
        <Formula>prix révisé = prix initial × (partie fixe + partie indexée × index du mois ÷ index du mois zéro)</Formula>
        <ToolP>
          Exemple : un prix de 10 000 € HT établi en {monthLabel(yearBefore)}, révisé avec le BT01 {ofMonth(latest)}.
          Le coefficient vaut {fmtIndex(latestValue)} ÷ {fmtIndex(valueAtPeriod(bt01, yearBefore))}, soit un prix révisé de{' '}
          {(10000 * (latestValue ?? 0) / (valueAtPeriod(bt01, yearBefore) ?? 1)).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} € HT.
        </ToolP>

        <ToolH2>Révision ou actualisation ?</ToolH2>
        <ToolP>
          La révision s'applique pendant le chantier, à chaque situation, si le contrat prévoit un prix révisable.
          L'actualisation concerne un prix ferme : dans les marchés publics, il est actualisé quand les travaux commencent
          plus de trois mois après le mois zéro, avec l'index du mois de démarrage moins trois mois.
        </ToolP>

        <ToolH2>Quand l'index est-il publié ?</ToolH2>
        <ToolP>
          L'INSEE publie l'index d'un mois vers le milieu du deuxième mois suivant
          {bt01.last.jo ? ` : celui ${ofMonth(latest)} est paru au Journal officiel le ${dayLabel(bt01.last.jo)}` : ''}.
          Les valeurs de cette page viennent directement de l'INSEE et se mettent à jour automatiquement.
          {bt01.last.provisional ? ' La dernière valeur est encore provisoire.' : ''}
        </ToolP>
        <ToolP>
          Pour facturer les situations, notre{' '}
          <ToolLink href="/outils/calcul-situation-de-travaux/">calculateur de facture de situation</ToolLink> donne le
          montant HT, la TVA et la retenue de garantie.
        </ToolP>

        <ToolH2>Tous les index BT</ToolH2>
        <ToolTable head={['Index', 'Intitulé', 'Dernière valeur', 'Sur un an']} rows={btSeries.map((s) => row(s.code))} />
        <p className="mt-2 text-sm" style={{ color: GOLD_INK }}>
          Source : INSEE, index du bâtiment base 100 en 2010.
        </p>
      </ToolPage>
    </>
  );
}
