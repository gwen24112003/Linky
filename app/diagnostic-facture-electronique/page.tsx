import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FAQSection } from '@/components/home/FAQSection';
import { EInvoiceDiagnostic } from '@/components/diagnostic/EInvoiceDiagnostic';
import { faqPageJsonLd } from '@/lib/faqData';
import { FAQ as FAQ_RAW, typo } from '@/lib/einvoice/rules';

const FAQ = FAQ_RAW.map((f) => ({ question: typo(f.question), answer: typo(f.answer) }));

const PAGE_URL = 'https://opusadvisor.fr/diagnostic-facture-electronique/';
const PAGE_TITLE = 'Facture électronique obligatoire : êtes-vous prêt ? Diagnostic gratuit';
const PAGE_DESCRIPTION =
  'Réception, émission, e-reporting : en 7 questions, sachez où en est votre entreprise face à la facture électronique et quelles dates vous concernent.';

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
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

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://opusadvisor.fr/' },
    { '@type': 'ListItem', position: 2, name: 'Diagnostic facture électronique', item: PAGE_URL },
  ],
};

export default function DiagnosticFactureElectroniquePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FAF7F0' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(FAQ)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <main className="flex-grow">
        <EInvoiceDiagnostic />
        <FAQSection items={FAQ} title="Questions fréquentes" />
      </main>
      <Footer />
    </div>
  );
}
