import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroHome } from '@/components/home/HeroHome';
import { CasesSection } from '@/components/home/CasesSection';
import { SectorsSection } from '@/components/home/SectorsSection';
import { ApproachSection } from '@/components/home/ApproachSection';
import { ManifestoSection } from '@/components/home/ManifestoSection';
import { ConvictionsSection } from '@/components/home/ConvictionsSection';
import { MethodSection } from '@/components/home/MethodSection';
import { WhyNowSection } from '@/components/home/WhyNowSection';
import { FAQSection } from '@/components/home/FAQSection';
import { FinalCTASection } from '@/components/home/FinalCTASection';
import { faqs, faqJsonLd } from '@/lib/faqData';
import { cases } from '@/lib/cases';

const PAGE_URL = 'https://opusadvisor.fr/';
const PAGE_TITLE = 'Automatisation de la gestion des PME, à Rennes | Opus Advisor';
const PAGE_DESCRIPTION =
  'On relie vos logiciels, vos tableurs et vos mails pour que dossiers, factures et relances se fassent tout seuls. Formation, immobilier, BTP. Pré-audit gratuit de 30 minutes.';
const OG_TITLE = "Opus Advisor : on automatise la gestion des petites entreprises, avec les outils qu'elles ont déjà";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: OG_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    type: 'website',
    images: [{ url: 'https://opusadvisor.fr/images/Logo_1200x630.png', width: 1200, height: 630, alt: 'Opus Advisor' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: OG_TITLE,
    description: PAGE_DESCRIPTION,
    images: [{ url: 'https://opusadvisor.fr/images/Logo_1200x630.png', alt: 'Opus Advisor' }],
  },
};

// Schema.org Service : les cinq étapes, avec leurs prix publics.
const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Pré-audit gratuit',
      provider: { '@id': 'https://opusadvisor.fr/#organization' },
      description: 'Visio de 30 minutes pour repérer 3 points de friction dans vos outils actuels. Sans engagement.',
      areaServed: { '@type': 'Country', name: 'France' },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    },
    {
      '@type': 'Service',
      name: 'Audit Stack',
      provider: { '@id': 'https://opusadvisor.fr/#organization' },
      description:
        'Cartographie des outils actuels et des points de friction, avec une recommandation pour chaque outil : le garder, le remplacer ou le relier aux autres. Livré en 10 jours ouvrés.',
      areaServed: { '@type': 'Country', name: 'France' },
      offers: { '@type': 'Offer', price: '990', priceCurrency: 'EUR' },
    },
    {
      '@type': 'Service',
      name: 'Diagnostic opérationnel',
      provider: { '@id': 'https://opusadvisor.fr/#organization' },
      description: "Cartographie de l'entreprise et plan d'action chiffré, avec le gain attendu. Livré en 2 à 3 semaines.",
      areaServed: { '@type': 'Country', name: 'France' },
      offers: { '@type': 'Offer', price: '2500', priceCurrency: 'EUR' },
    },
    {
      '@type': 'Service',
      name: 'Mise en œuvre',
      provider: { '@id': 'https://opusadvisor.fr/#organization' },
      description:
        'Paramétrage du logiciel métier, automatisations (Make, n8n), documents partagés, tests et formation de l’équipe. 4 à 10 semaines.',
      areaServed: { '@type': 'Country', name: 'France' },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'EUR',
        priceSpecification: { '@type': 'PriceSpecification', minPrice: '5500', priceCurrency: 'EUR' },
      },
    },
    {
      '@type': 'Service',
      name: 'Gardien du système',
      provider: { '@id': 'https://opusadvisor.fr/#organization' },
      description: "Surveillance des automatisations, point mensuel et évolutions au fil de l'eau, par quelqu'un qui connaît votre système.",
      areaServed: { '@type': 'Country', name: 'France' },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'EUR',
        priceSpecification: { '@type': 'PriceSpecification', minPrice: '400', maxPrice: '1500', priceCurrency: 'EUR' },
      },
    },
  ],
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }} />
      <Header />
      <main className="flex-grow">
        <HeroHome />
        <CasesSection
          cases={cases}
          title="Ce qu'on a déjà mis en place"
          intro="Trois missions récentes, présentées sans le nom des clients."
          link={{ href: '/cas-clients', label: 'Tous les cas clients' }}
        />
        <SectorsSection />
        <ApproachSection />
        <ConvictionsSection />
        <ManifestoSection />
        <WhyNowSection />
        <MethodSection />
        <FAQSection items={faqs} background="#FAF7F0" />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
