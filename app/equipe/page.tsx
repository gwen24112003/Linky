import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TeamView } from '@/components/pages/TeamView';

const PAGE_URL = 'https://opusadvisor.fr/equipe';
const PAGE_TITLE = "Qui bosse sur votre système";
const PAGE_DESCRIPTION =
  "Enzo Monnier, développeur devenu consultant en automatisation des petites entreprises, code lui-même les systèmes qu'il installe chez vous, sans sous-traitant.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    type: 'website',
    images: [{ url: 'https://opusadvisor.fr/images/Logo_1200x630.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['https://opusadvisor.fr/images/Logo_1200x630.png'],
  },
};

// Fiche du fondateur pour Google et les assistants IA ; reliée à l'entreprise et à l'auteur des articles par son @id.
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://opusadvisor.fr/equipe/#enzo-monnier',
  name: 'Enzo Monnier',
  jobTitle: "Fondateur d'Opus Advisor",
  description:
    "Développeur de logiciels métier pendant 5 ans, devenu consultant en organisation et automatisation des petites entreprises. Il code lui-même les systèmes qu'il installe.",
  image: 'https://opusadvisor.fr/images/enzo.jpg',
  url: 'https://opusadvisor.fr/equipe/',
  worksFor: { '@id': 'https://opusadvisor.fr/#organization' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Epitech' },
  workLocation: { '@type': 'Place', name: 'Rennes' },
  knowsAbout: ['automatisation', 'Make', 'n8n', 'Airtable', 'organismes de formation', 'conciergerie', 'BTP second œuvre'],
  sameAs: ['https://www.linkedin.com/in/enzo-monnier/'],
};

export default function EquipePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <Header />
      <TeamView />
      <Footer />
    </div>
  );
}
