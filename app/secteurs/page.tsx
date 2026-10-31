import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectorsSection } from '@/components/home/SectorsSection';
import { CasesSection } from '@/components/home/CasesSection';
import { FinalCTASection } from '@/components/home/FinalCTASection';
import { cases } from '@/lib/cases';

const PAGE_URL = 'https://opusadvisor.fr/secteurs/';
const PAGE_TITLE = 'Nos secteurs : formation, immobilier et BTP';
const PAGE_DESCRIPTION =
  "Organismes de formation, conciergeries et agences immobilières, entreprises du BTP second œuvre : ce qu'on automatise dans chaque secteur, avec des exemples réels.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: PAGE_TITLE, description: PAGE_DESCRIPTION, url: PAGE_URL, type: 'website', images: [{ url: 'https://opusadvisor.fr/images/Logo_1200x630.png' }] },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://opusadvisor.fr/' },
    { '@type': 'ListItem', position: 2, name: 'Secteurs', item: PAGE_URL },
  ],
};

export default function SecteursPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <main className="flex-grow">
        <SectorsSection headingLevel="h1" />
        <CasesSection cases={cases} title="Des missions réelles" intro="Trois missions récentes, présentées sans le nom des clients." />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
