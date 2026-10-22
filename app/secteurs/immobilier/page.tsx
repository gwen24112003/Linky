import type { Metadata } from 'next';
import { SectorPage } from '@/components/pages/SectorPage';
import { casesFor } from '@/lib/cases';

const PAGE_URL = 'https://opusadvisor.fr/secteurs/immobilier/';
const PAGE_TITLE = 'Automatisation pour conciergeries et agences immobilières';
const PAGE_DESCRIPTION =
  "Facturation des propriétaires, plannings de ménage, suivi des agents : une application centrale reliée à vos outils, plus aucune ressaisie. Pré-audit gratuit.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: PAGE_TITLE, description: PAGE_DESCRIPTION, url: PAGE_URL, type: 'website', images: [{ url: 'https://opusadvisor.fr/images/Logo_1200x630.png' }] },
};

export default function ImmobilierPage() {
  return (
    <SectorPage
      url={PAGE_URL}
      breadcrumbName="Immobilier et conciergerie"
      kicker="Immobilier et conciergerie"
      title="Automatiser la gestion d'une conciergerie ou d'une agence immobilière"
      intro="Réservations, ménages, facturation des propriétaires, suivi des mandats et des agents : on réunit l'information dans une application centrale, reliée à vos outils, pour qu'elle circule sans ressaisie et qu'un propriétaire ou un dossier de plus ne demande pas un travail à part."
      painsTitle="Ce qui prend le plus de temps"
      pains={[
        {
          title: 'Une facturation propriétaire par propriétaire',
          desc: 'Relevés, commissions, reversements : chaque propriétaire a son calcul, souvent refait à la main en fin de mois.',
        },
        {
          title: 'Des ménages et des check-in à replanifier',
          desc: "Une réservation modifiée ou annulée, et le planning des prestataires est à refaire.",
        },
        {
          title: 'Des factures prestataires à rapprocher',
          desc: 'Ménage, linge, maintenance : chaque facture doit être vérifiée et rattachée au bon logement.',
        },
        {
          title: 'Des dossiers d’agents difficiles à suivre',
          desc: 'Le manager doit demander à chacun où en sont ses mandats, ses visites et ses ventes.',
        },
        {
          title: 'Des informations dispersées',
          desc: "Les mandats dans le logiciel de transaction, les échanges dans les mails, les documents dans un drive.",
        },
        {
          title: 'Un reporting refait à la main',
          desc: "Chaque fin de mois, il faut compiler les chiffres de l'équipe dans un tableau.",
        },
      ]}
      setupTitle="Ce qu'on met en place"
      setup={[
        {
          what: 'Une application centrale, reliée à votre logiciel',
          tools: 'Channel manager (Beds24, Smoobu, Lodgify…) ou logiciel de transaction (Apimo, Hektor, Netty…)',
          desc: "Elle reçoit les réservations ou les mandats de votre logiciel, et c'est d'elle que partent la facturation, les plannings et le reporting. Votre logiciel reste en place.",
        },
        {
          what: 'La facturation des propriétaires en un seul traitement',
          tools: 'Make ou n8n',
          desc: 'Le même calcul pour tous, avec les règles propres à chaque contrat, au lieu d’un fichier ou d’une automatisation par propriétaire.',
        },
        {
          what: 'Des plannings qui suivent les réservations',
          desc: 'Ménages et check-in se mettent à jour à chaque réservation, annulations comprises.',
        },
        {
          what: 'Un tableau de suivi pour le manager',
          desc: "Les dossiers de chaque agent, l'état de chaque bien et l'avancement des ventes, au même endroit.",
        },
      ]}
      demo={['conciergerie', 'agence']}
      cases={casesFor('immobilier')}
      ctaTitle="Combien de temps vous prend la fin de mois ?"
      ctaText="On regarde ensemble votre facturation des propriétaires ou le suivi de votre équipe, et ce qui peut se faire tout seul. 30 minutes en visio, gratuites."
    />
  );
}
