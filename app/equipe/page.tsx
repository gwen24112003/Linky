import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TeamView } from '@/components/pages/TeamView';

const PAGE_URL = 'https://opusadvisor.fr/equipe';
const PAGE_TITLE = "Qui bosse sur votre système — Opus Advisory";
const PAGE_DESCRIPTION =
  "Enzo Monnier, développeur devenu consultant ops pour le BTP second œuvre. Je code encore les systèmes que je déploie chez vous. Pas de sous-traitance, pas de chef de projet.";

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

export default function EquipePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <TeamView />
      <Footer />
    </div>
  );
}
