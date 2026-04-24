import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroBTP } from '@/components/home/HeroBTP';
import { PainSection } from '@/components/home/PainSection';
import { SystemSection } from '@/components/home/SystemSection';
import { ConvictionsSection } from '@/components/home/ConvictionsSection';
import { MethodSection } from '@/components/home/MethodSection';
import { FAQSectionBTP } from '@/components/home/FAQSectionBTP';
import { FinalCTASection } from '@/components/home/FinalCTASection';
import { faqJsonLd } from '@/lib/faqData';

const PAGE_URL = 'https://opusadvisor.fr/';
const PAGE_TITLE =
  'Opus Advisory — Consultant ops pour les patrons du BTP second œuvre';
const PAGE_DESCRIPTION =
  "On rend 10h/semaine aux patrons d'électricité, plomberie, chauffage. Relances auto, chantiers centralisés, devis qui ne traînent plus. Diagnostic 2 500 €, pré-audit gratuit.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Opus Advisory — 10h par semaine rendues aux patrons du BTP',
    description:
      'Relances auto, chantiers centralisés, devis qui ne traînent plus. Un système fait pour votre boîte, pas une plateforme générique.',
    url: PAGE_URL,
    type: 'website',
    images: [
      {
        url: 'https://opusadvisor.fr/images/opus-banner.png',
        width: 1200,
        height: 630,
        alt: 'Opus Advisory — 10h par semaine rendues aux patrons du BTP second œuvre',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Opus Advisory — 10h par semaine rendues aux patrons du BTP',
    description:
      'Relances auto, chantiers centralisés, devis qui ne traînent plus. Un système fait pour votre boîte, pas une plateforme générique.',
    images: [
      {
        url: 'https://opusadvisor.fr/images/opus-banner.png',
        alt: 'Opus Advisory — 10h par semaine rendues aux patrons du BTP second œuvre',
      },
    ],
  },
};

// Schema.org Service (pour les 4 offres)
const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Pré-audit gratuit',
      provider: { '@id': 'https://opusadvisor.fr/#organization' },
      description:
        "Visio de 30 min. Identification de 3 points de friction sur vos outils actuels. Sans vente, sans engagement.",
      areaServed: { '@type': 'Country', name: 'France' },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
      },
    },
    {
      '@type': 'Service',
      name: 'Diagnostic opérationnel BTP',
      provider: { '@id': 'https://opusadvisor.fr/#organization' },
      description:
        "Cartographie de la boîte, vision cible, plan de consolidation chiffré avec ROI attendu. Livré en 2 à 3 semaines.",
      areaServed: { '@type': 'Country', name: 'France' },
      offers: {
        '@type': 'Offer',
        price: '2500',
        priceCurrency: 'EUR',
      },
    },
    {
      '@type': 'Service',
      name: 'Implémentation système BTP',
      provider: { '@id': 'https://opusadvisor.fr/#organization' },
      description:
        "Configuration et connexion des outils (Batappli/Obat/Tolteck/EBP, Notion, Make, n8n), tests, formation équipe. 4 à 10 semaines.",
      areaServed: { '@type': 'Country', name: 'France' },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '5000',
          maxPrice: '15000',
          priceCurrency: 'EUR',
        },
      },
    },
    {
      '@type': 'Service',
      name: 'Suivi mensuel',
      provider: { '@id': 'https://opusadvisor.fr/#organization' },
      description:
        "Maintenance, ajustements, nouvelles automations au fil de l'eau. Un interlocuteur unique qui connaît votre système.",
      areaServed: { '@type': 'Country', name: 'France' },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '400',
          maxPrice: '600',
          priceCurrency: 'EUR',
        },
      },
    },
  ],
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <Header />
      <main className="flex-grow">
        <HeroBTP />
        <PainSection />
        <SystemSection />
        <ConvictionsSection />
        <MethodSection />
        <FAQSectionBTP />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
