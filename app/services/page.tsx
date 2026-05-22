import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServicesView } from '@/components/pages/ServicesView';

const PAGE_URL = 'https://opusadvisor.fr/services';
const PAGE_TITLE =
  'Services & tarifs — Opus Advisor (BTP second œuvre)';
const PAGE_DESCRIPTION =
  'Pré-audit gratuit. Audit Stack 990 €. Diagnostic 2 500 €. Mise en œuvre 5 500 à 25 000 €. Gardien du système 400 à 1 500 €/mois. Cinq étapes claires, chiffrées, sans surprise.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    type: 'website',
    images: [{ url: 'https://opusadvisor.fr/images/opus-icon.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['https://opusadvisor.fr/images/opus-icon.png'],
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <ServicesView />
      <Footer />
    </div>
  );
}
