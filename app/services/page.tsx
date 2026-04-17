import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServicesView } from '@/components/pages/ServicesView';

const PAGE_URL = 'https://opusadvisor.fr/services';
const PAGE_TITLE = 'Notre Expertise - Opus Advisor';
const PAGE_DESCRIPTION =
  'Diagnostic, implémentation et suivi continu. Opus Advisor structure vos processus et développe vos outils métier.';

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

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <ServicesView />
      <Footer />
    </div>
  );
}
