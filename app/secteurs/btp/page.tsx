import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroBTP } from '@/components/home/HeroBTP';
import { PainSection } from '@/components/home/PainSection';
import { ContextSection } from '@/components/home/ContextSection';
import { SystemSection } from '@/components/home/SystemSection';
import { CaseTeasersSection } from '@/components/home/CaseTeasersSection';
import { FAQSection } from '@/components/home/FAQSection';
import { FinalCTASection } from '@/components/home/FinalCTASection';
import { faqsBtp, faqPageJsonLd } from '@/lib/faqData';
import { tools } from '@/lib/tools';

const NAVY = '#1A2332';
const GOLD_INK = '#8A6A1C';
const RULE = 'rgba(26,35,50,0.16)';

const PAGE_URL = 'https://opusadvisor.fr/secteurs/btp/';
const PAGE_TITLE = 'BTP second œuvre : automatiser devis, relances et suivi de chantier';
const PAGE_DESCRIPTION =
  'On rend 10 h par semaine aux patrons du BTP second œuvre : relances automatiques, chantiers centralisés, devis qui partent vite. Outils gratuits et pré-audit de 30 minutes.';

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
    { '@type': 'ListItem', position: 2, name: 'Secteurs', item: 'https://opusadvisor.fr/secteurs/' },
    { '@type': 'ListItem', position: 3, name: 'BTP second œuvre', item: PAGE_URL },
  ],
};

const BtpResources = () => (
  <section className="py-24 md:py-32 bg-white" aria-labelledby="btp-resources-title">
    <div className="container mx-auto px-6 max-w-6xl">
      <h2 id="btp-resources-title" className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl max-w-3xl" style={{ color: NAVY }}>
        Les outils gratuits pour le bâtiment
      </h2>
      <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
        Les calculs qu'on refait sans arrêt au bureau, avec l'explication de chaque formule. Pas d'inscription.
      </p>
      <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10">
        {tools.map((t) => (
          <li key={t.slug} className="border-t" style={{ borderColor: RULE }}>
            <Link href={`/outils/${t.slug}/`} className="group block py-6">
              <span className="block font-semibold text-lg leading-snug group-hover:underline underline-offset-4" style={{ color: NAVY }}>
                {t.title}
              </span>
              <span className="block mt-2 text-sm text-gray-600 leading-relaxed">{t.description}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex flex-col sm:flex-row gap-5 sm:gap-10">
        <Link href="/articles" className="group inline-flex items-center gap-2 font-semibold text-base" style={{ color: NAVY }}>
          Les articles pour le BTP
          <ArrowRight size={18} style={{ color: GOLD_INK }} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link href="/consultant-rennes" className="group inline-flex items-center gap-2 font-semibold text-base" style={{ color: NAVY }}>
          Nos interventions autour de Rennes
          <ArrowRight size={18} style={{ color: GOLD_INK }} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  </section>
);

export default function BtpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(faqsBtp)) }} />
      <Header />
      <main className="flex-grow">
        {/* Fonds alternés : crème, blanc, crème, blanc… */}
        <HeroBTP />
        <ContextSection />
        <PainSection />
        <BtpResources />
        <SystemSection />
        <FAQSection items={faqsBtp} />
        <CaseTeasersSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
