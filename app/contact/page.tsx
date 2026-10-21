import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactView } from '@/components/pages/ContactView';

const PAGE_URL = 'https://opusadvisor.fr/contact';
const PAGE_TITLE =
  'Pré-audit gratuit de 30 minutes en visio';
const PAGE_DESCRIPTION =
  "Réservez 30 minutes en visio. On passe en revue vos outils et on repère 3 points de friction en direct. Gratuit, sans engagement.";

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

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <ContactView />
      <Footer />
    </div>
  );
}
