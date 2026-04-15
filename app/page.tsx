import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroBanner } from '@/components/home/HeroBanner';
import { HomeTabs } from '@/components/home/HomeTabs';
import { faqJsonLd } from '@/lib/faqData';

export const metadata: Metadata = {
  title: 'Opus Advisor - Cabinet de conseil en organisation & transformation',
  description:
    "Cabinet de conseil en automatisation, IA et no-code pour TPE et PME. Audit de processus, implémentation de workflows n8n et Make, formation et maintenance. Basé en France.",
  alternates: { canonical: 'https://opusadvisor.fr/' },
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
