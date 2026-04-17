import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProjectsView } from '@/components/pages/ProjectsView';

const PAGE_URL = 'https://opusadvisor.fr/projets';
const PAGE_TITLE = 'Réalisations & Cas Clients - Opus Advisor';
const PAGE_DESCRIPTION =
  "Découvrez comment Opus Advisor a transformé l'organisation de leaders de la distribution, scale-ups B2B et PME industrielles.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    type: 'website',
    images: [{ url: 'https://opusadvisor.fr/images/opus-banner.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['https://opusadvisor.fr/images/opus-banner.png'],
  },
};

export default function ProjetsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <ProjectsView />
      <Footer />
    </div>
  );
}
