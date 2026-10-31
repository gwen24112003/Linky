import type { Metadata } from 'next';
import { ToolPage, ToolH2, ToolP, Formula, ToolLink, ToolTable } from '@/components/pages/ToolPage';
import { PenaltyCalculator } from '@/components/pages/calc/PenaltyCalculator';

const PAGE_URL = 'https://opusadvisor.fr/outils/calcul-penalites-de-retard/';
const PAGE_TITLE = 'Calcul des pénalités de retard (taux 2026)';
const PAGE_DESCRIPTION =
  "Calculez les pénalités de retard d'une facture entre professionnels au bon taux (12,40 % au 2nd semestre 2026) et l'indemnité forfaitaire de 40 €.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: PAGE_TITLE, description: PAGE_DESCRIPTION, url: PAGE_URL, type: 'website', images: [{ url: 'https://opusadvisor.fr/images/Logo_1200x630.png' }] },
};

export default function PenaltyPage() {
  return (
    <ToolPage
      url={PAGE_URL}
      breadcrumbName="Calcul des pénalités de retard"
      title="Calcul des pénalités de retard"
      intro="Entrez le montant de la facture et ses dates : le calculateur applique le taux en vigueur à l'échéance et ajoute l'indemnité de 40 €. Il vaut pour les factures entre professionnels."
      calculator={<PenaltyCalculator />}
      ctaTitle="Vous en avez assez de courir après vos paiements ?"
      ctaText="On met en place une séquence de relance qui part toute seule, à la bonne date, depuis vos outils actuels. On en parle pendant le pré-audit : 30 minutes en visio, gratuites."
    >
      <ToolH2>La formule</ToolH2>
      <Formula>pénalités = montant TTC × taux annuel × jours de retard ÷ 365</Formula>
      <ToolP>
        Entre professionnels, les pénalités courent dès le lendemain de l'échéance, sans qu'une relance ou une mise en
        demeure soit nécessaire (article L441-10 du Code de commerce).
      </ToolP>
      <ToolP>
        Exemple : une facture de 4 280 € TTC à échéance du 15 juillet 2026, payée le 15 septembre. Cela fait 62 jours de
        retard au taux de 12,40 %, soit 90,15 € de pénalités, plus 40 € d'indemnité : 130,15 € à réclamer.
      </ToolP>

      <ToolH2>Quel taux appliquer ?</ToolH2>
      <ToolP>
        C'est d'abord celui de vos conditions générales de vente. Il ne peut pas être inférieur à trois fois le taux
        d'intérêt légal, soit 8,25 % au 2nd semestre 2026.
      </ToolP>
      <ToolP>
        Si vos CGV ne disent rien, c'est le taux de refinancement de la Banque centrale européenne majoré de 10 points. On
        retient le taux de la BCE au 1er janvier pour le premier semestre, et celui au 1er juillet pour le second :
      </ToolP>
      <ToolTable
        head={['Période', 'Taux BCE retenu', 'Taux par défaut']}
        rows={[
          ['1er semestre 2025', '3,15 %', '13,15 %'],
          ['2nd semestre 2025', '2,15 %', '12,15 %'],
          ['1er semestre 2026', '2,15 %', '12,15 %'],
          ['2nd semestre 2026', '2,40 %', '12,40 %'],
        ]}
      />
      <ToolP>
        Si la BCE change son taux en cours de semestre, rien ne bouge avant le semestre suivant : seul compte le taux
        affiché au 1er janvier ou au 1er juillet.
      </ToolP>

      <ToolH2>L'indemnité forfaitaire de 40 €</ToolH2>
      <ToolP>
        Elle est due de plein droit pour chaque facture payée en retard par un professionnel (article D441-5 du Code de
        commerce). Si vos frais de recouvrement réels sont plus élevés, vous pouvez demander une indemnisation
        complémentaire, justificatifs à l'appui.
      </ToolP>

      <ToolH2>Ce qui doit figurer sur vos factures</ToolH2>
      <ToolP>
        Sur une facture entre professionnels, le taux des pénalités et le montant de l'indemnité forfaitaire de 40 € font
        partie des mentions obligatoires. Si elles manquent, vous serez mal placé pour réclamer quoi que ce soit.
      </ToolP>

      <ToolH2>Et pour un client particulier ?</ToolH2>
      <ToolP>
        Ni pénalités de ce type, ni indemnité de 40 €. Après une mise en demeure, la somme due porte intérêt au taux légal
        (article 1231-6 du Code civil).
      </ToolP>

      <ToolH2>Les réclamer sans braquer le client</ToolH2>
      <ToolP>
        Les pénalités servent surtout de levier : les mentionner change le ton de la relance. Nos{' '}
        <ToolLink href="/articles/relances-automatiques-impayes-btp/">modèles de relance de facture impayée</ToolLink>{' '}
        montrent à quel moment le faire, de la première relance à la mise en demeure.
      </ToolP>
    </ToolPage>
  );
}
