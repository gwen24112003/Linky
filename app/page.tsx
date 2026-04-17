import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroBanner } from '@/components/home/HeroBanner';
import { HomeTabs } from '@/components/home/HomeTabs';
import { faqJsonLd } from '@/lib/faqData';

const PAGE_URL = 'https://opusadvisor.fr/';
const PAGE_TITLE = 'Opus Advisor - Cabinet de conseil en organisation & transformation';
const PAGE_DESCRIPTION =
  'Cabinet de conseil en automatisation, IA et no-code pour TPE et PME. Audit de processus, implémentation de workflows n8n et Make, formation et maintenance. Basé en France.';

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

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main className="flex-grow">
        <HeroBanner />
        <HomeTabs />
      </main>
      <Footer />
    </div>
  );
}
