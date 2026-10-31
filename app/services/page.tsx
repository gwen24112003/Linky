import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServicesView } from '@/components/pages/ServicesView';

const PAGE_URL = 'https://opusadvisor.fr/services';
const PAGE_TITLE = 'Services et tarifs : audit et mise en œuvre';
const PAGE_DESCRIPTION =
  'Pré-audit gratuit, Audit Stack 990 €, Diagnostic 2 500 €, Mise en œuvre dès 5 500 €, Gardien dès 400 €/mois. Cinq étapes chiffrées, sans surprise.';

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

const ORG = { '@id': 'https://opusadvisor.fr/#organization' };

// Les offres et leurs prix, lisibles par Google et par les assistants IA (TVA non applicable, art. 293 B du CGI).
const offer = (name: string, description: string, path: string, price: Record<string, unknown>) => ({
  '@type': 'Offer',
  name,
  description,
  url: `https://opusadvisor.fr${path}`,
  priceCurrency: 'EUR',
  ...price,
  seller: ORG,
  itemOffered: { '@type': 'Service', name, provider: ORG },
});

const offersJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Offres Opus Advisor',
  url: 'https://opusadvisor.fr/services/',
  itemListElement: [
    offer('Pré-audit gratuit', '30 minutes en visio pour repérer 3 points de friction dans vos outils. Sans engagement.', '/contact/', { price: '0' }),
    offer('Audit Stack', 'Cartographie de vos outils et recommandation pour chacun, livrée en 10 jours ouvrés.', '/services/#audit-stack', { price: '990' }),
    offer('Diagnostic opérationnel', 'Plan chiffré en 2 à 3 semaines, avec le gain attendu.', '/services/#diagnostic', { price: '2500' }),
    offer('Mise en œuvre système', 'Construction du système défini au diagnostic, formation de l’équipe et documentation, en 4 à 10 semaines.', '/services/#implementation', {
      priceSpecification: { '@type': 'PriceSpecification', minPrice: 5500, priceCurrency: 'EUR' },
    }),
    offer('Gardien du système', 'Surveillance, point mensuel et évolutions du système, sans engagement.', '/services/#suivi', {
      priceSpecification: { '@type': 'UnitPriceSpecification', minPrice: 400, maxPrice: 1500, priceCurrency: 'EUR', unitText: 'mois' },
    }),
  ],
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offersJsonLd) }} />
      <Header />
      <ServicesView />
      <Footer />
    </div>
  );
}
