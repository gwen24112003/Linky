import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ExpertContactView } from '@/components/pages/ExpertContactView';

const PAGE_URL = 'https://opusadvisor.fr/experts-contact';
const PAGE_TITLE = 'Rejoignez le réseau Opus Advisor - Candidature Expert';
const PAGE_DESCRIPTION =
  'Vous êtes consultant ou expert en organisation ? Rejoignez notre réseau de partenaires qualifiés.';

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

export default function ExpertsContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <ExpertContactView />
      <Footer />
    </div>
  );
}
