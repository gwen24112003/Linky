import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArticlesHero } from '@/components/pages/ArticlesHero';
import { ArticlesGrid } from '@/components/pages/ArticlesGrid';
import { getAllArticles } from '@/lib/articles';

const PAGE_URL = 'https://opusadvisor.fr/articles';
const PAGE_TITLE = 'Articles — BTP second œuvre';
const PAGE_DESCRIPTION =
  "Conseils et retours terrain pour les patrons du BTP second œuvre : consolidation des outils, comparatifs (Batappli, Obat, Tolteck, EBP), facturation électronique 2027, automatisations testées.";

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

export default function ArticlesPage() {
  const articles = getAllArticles();

  const articleListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: articles.map((article, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://opusadvisor.fr/articles/${article.slug}`,
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleListJsonLd) }}
      />
      <Header />
      <ArticlesHero />
      <main className="flex-grow">
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-6 max-w-5xl">
            <ArticlesGrid articles={articles} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
