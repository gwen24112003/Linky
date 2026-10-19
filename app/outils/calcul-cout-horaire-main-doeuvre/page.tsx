import type { Metadata } from 'next';
import { ToolPage, ToolH2, ToolP, Formula, ToolLink, ToolTable } from '@/components/pages/ToolPage';
import { LaborCostCalculator } from '@/components/pages/calc/LaborCostCalculator';
import { DEFAULT_LABOR, laborCost } from '@/lib/labor-cost';

const PAGE_URL = 'https://opusadvisor.fr/outils/calcul-cout-horaire-main-doeuvre/';
const PAGE_TITLE = "Coût horaire de la main-d'œuvre dans le bâtiment : calcul du taux horaire";
const PAGE_DESCRIPTION =
  "Calculez le coût horaire réel d'un compagnon (salaire chargé, indemnités, véhicule, heures facturées) et le taux horaire à facturer pour couvrir vos frais et dégager une marge.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: PAGE_TITLE, description: PAGE_DESCRIPTION, url: PAGE_URL, type: 'website', images: [{ url: 'https://opusadvisor.fr/images/Logo_1200x630.png' }] },
};

const h = (n: number) => `${n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
const e0 = (n: number) => `${Math.round(n).toLocaleString('fr-FR')} €`;

export default function LaborCostPage() {
  const d = DEFAULT_LABOR;
  const base = laborCost(d);
  const byBillable = [85, 75, 65].map((rate) => {
    const r = laborCost({ ...d, billableRate: rate });
    return [`${rate} %`, `${Math.round(r.billableHours).toLocaleString('fr-FR')} h`, h(r.perBillableHour), h(r.sellingRate)];
  });

  return (
    <ToolPage
      url={PAGE_URL}
      breadcrumbName="Calcul du coût horaire de main-d'œuvre"
      title="Coût horaire de la main-d'œuvre dans le bâtiment"
      intro="Ce que vous coûte vraiment une heure de compagnon, et le taux horaire à facturer pour couvrir vos frais généraux et garder une marge. Rien n'est enregistré."
      calculator={<LaborCostCalculator />}
      ctaTitle="Combien d'heures payées ne sont jamais facturées ?"
      ctaText="Pour le savoir, il faut que les heures pointées sur le chantier remontent au bon endroit, chantier par chantier. On regarde comment le faire avec vos outils actuels pendant le pré-audit : 30 minutes, gratuites."
    >
      <ToolH2>La formule</ToolH2>
      <Formula>coût horaire = coût annuel du compagnon ÷ heures réellement facturées</Formula>
      <ToolP>
        Le coût annuel comprend le salaire brut, les charges patronales (caisse de congés payés comprise dans le BTP), les
        indemnités de panier et de trajet, et les frais du poste : véhicule, outillage, équipements de protection,
        formation. On le divise par les heures que vous facturez vraiment, pas par les heures payées.
      </ToolP>
      <ToolP>
        Exemple avec les valeurs de départ du calculateur : un compagnon à {e0(d.grossMonthly)} brut par mois, {d.employerRate} %
        de charges, {d.dailyAllowance} € d'indemnités par jour et {e0(d.yearlyCosts)} de frais annuels coûte{' '}
        {e0(base.yearlyCost)} par an. Sur {d.presenceHours.toLocaleString('fr-FR')} heures de présence, cela fait{' '}
        {h(base.perPresenceHour)} de l'heure. Avec {d.billableRate} % d'heures facturées, on monte à{' '}
        {h(base.perBillableHour)} par heure facturée.
      </ToolP>

      <ToolH2>Les heures facturées, le chiffre qu'on surestime</ToolH2>
      <ToolP>
        Un temps plein à 35 heures représente 1 607 heures de travail par an, congés et jours fériés déduits. Toutes ne
        sont pas facturables : trajets, attente de matériel, reprises, passage au dépôt, dépannage offert à un bon client.
        C'est le réglage qui pèse le plus sur le taux horaire. Avec les mêmes coûts que l'exemple :
      </ToolP>
      <ToolTable head={['Heures facturées', 'Par an', 'Coût par heure facturée', 'Taux de vente HT']} rows={byBillable} />
      <ToolP>
        Pour connaître votre vrai pourcentage, comparez sur deux semaines les heures pointées et les heures facturées. Les
        heures improductives sont aussi la première fuite de marge décrite dans notre article sur la{' '}
        <ToolLink href="/articles/marge-chantier-suivi-reel/">marge prévue contre la marge réelle</ToolLink>.
      </ToolP>

      <ToolH2>Du coût horaire au taux de vente</ToolH2>
      <Formula>taux de vente HT = coût par heure facturée × (1 + frais généraux) ÷ (1 − marge visée)</Formula>
      <ToolP>
        Les frais généraux couvrent ce qui ne se rattache à aucun chantier : loyer, bureau, assurances, expert-comptable,
        temps passé aux devis. La marge se calcule ici sur le prix de vente, comme dans notre{' '}
        <ToolLink href="/outils/calcul-marge-chantier/">calculateur de marge chantier</ToolLink>. Dans l'exemple :{' '}
        {h(base.perBillableHour)} × {(1 + d.overheadRate / 100).toLocaleString('fr-FR')} ÷{' '}
        {(1 - d.marginRate / 100).toLocaleString('fr-FR')} = {h(base.sellingRate)} HT de l'heure.
      </ToolP>

      <ToolH2>Électricien, plombier, chauffagiste : ce qui change</ToolH2>
      <ToolP>
        La méthode est la même pour tous les métiers ; ce sont les montants qui bougent. Le dépannage et le SAV font baisser
        la part d'heures facturées : beaucoup de trajets courts pour des interventions d'une heure, d'où l'intérêt d'un
        forfait de déplacement. Le véhicule atelier et son stock alourdissent les frais du poste. Les appareils de mesure
        de l'électricien, l'outillage du frigoriste, les qualifications comme RGE ou l'attestation de capacité pour les
        fluides frigorigènes ont un coût de formation et de renouvellement à répartir sur l'année.
      </ToolP>
      <ToolP>
        Faites le calcul pour chaque profil de votre équipe : un apprenti, un compagnon confirmé et un chef d'équipe n'ont
        ni le même coût, ni la même part d'heures facturées.
      </ToolP>
    </ToolPage>
  );
}
