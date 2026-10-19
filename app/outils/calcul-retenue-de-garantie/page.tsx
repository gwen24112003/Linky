import type { Metadata } from 'next';
import { ToolPage, ToolH2, ToolP, Formula, ToolLink, ToolTable } from '@/components/pages/ToolPage';
import { RetentionCalculator } from '@/components/pages/calc/RetentionCalculator';

const PAGE_URL = 'https://opusadvisor.fr/outils/calcul-retenue-de-garantie/';
const PAGE_TITLE = 'Calcul de la retenue de garantie : HT ou TTC, taux, libération';
const PAGE_DESCRIPTION =
  "Calculez la retenue de garantie d'un marché de travaux : 5 % au maximum, sur le HT ou le TTC selon le marché, et sa libération un an après la réception.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: PAGE_TITLE, description: PAGE_DESCRIPTION, url: PAGE_URL, type: 'website', images: [{ url: 'https://opusadvisor.fr/images/Logo_1200x630.png' }] },
};

export default function RetentionPage() {
  return (
    <ToolPage
      url={PAGE_URL}
      breadcrumbName="Calcul de la retenue de garantie"
      title="Calcul de la retenue de garantie"
      intro="Le montant retenu, ce qui vous est versé tout de suite, et la date à laquelle vous récupérez la retenue."
      calculator={<RetentionCalculator />}
      ctaTitle="Combien de retenues de garantie dorment dans vos comptes ?"
      ctaText="Une retenue oubliée, c'est jusqu'à 5 % d'un chantier que personne ne réclame. On les recense et on programme leur relance à la bonne date. On en parle pendant le pré-audit : 30 minutes en visio, gratuites."
    >
      <ToolH2>À quoi sert la retenue de garantie</ToolH2>
      <ToolP>
        Sur un marché de travaux privé, le client peut retenir jusqu'à 5 % de chaque paiement (loi n° 71-584 du 16 juillet
        1971). Cette somme sert à couvrir les réserves émises à la réception des travaux.
      </ToolP>
      <Formula>retenue = montant des travaux × taux (5 % au maximum)</Formula>

      <ToolH2>Sur le HT ou sur le TTC ?</ToolH2>
      <ToolP>
        La loi ne le précise pas : c'est votre marché qui fixe la base. En pratique, le TTC est le plus courant, parce que
        c'est le montant réellement payé. Le plus sûr est de l'écrire noir sur blanc dans le contrat.
      </ToolP>
      <ToolTable
        head={['Marché de 48 000 € HT, TVA 10 %', 'Base TTC', 'Base HT']}
        rows={[
          ['Montant de référence', '52 800 €', '48 000 €'],
          ['Retenue de 5 %', '2 640 €', '2 400 €'],
          ['Versé tout de suite', '50 160 €', '50 400 €'],
        ]}
      />

      <ToolH2>Consignation ou caution bancaire</ToolH2>
      <ToolP>
        Le client doit consigner la somme retenue auprès d'un consignataire accepté par les deux parties. Vous pouvez aussi
        lui proposer une caution d'un établissement financier pour le même montant : dans ce cas, il ne retient rien sur vos
        paiements.
      </ToolP>

      <ToolH2>Quand la récupérer</ToolH2>
      <ToolP>
        Un an après la réception des travaux, même sans accord écrit du client, sauf s'il a notifié une opposition motivée
        par lettre recommandée. Notez la date dès la réception : une retenue que personne ne réclame finit souvent par être
        oubliée.
      </ToolP>

      <ToolH2>Et sur les marchés publics ?</ToolH2>
      <ToolP>
        Ils suivent le Code de la commande publique, avec un plafond de 5 % lui aussi. Pour calculer la retenue sur une
        situation de travaux, utilisez notre{' '}
        <ToolLink href="/outils/calcul-situation-de-travaux/">calculateur de facture de situation</ToolLink>.
      </ToolP>
    </ToolPage>
  );
}
