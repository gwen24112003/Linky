import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArticlesHero } from '@/components/pages/ArticlesHero';
import { ArticlesGrid } from '@/components/pages/ArticlesGrid';
import { getAllArticles } from '@/lib/articles';

const PAGE_URL = 'https://opusadvisor.fr/articles';
const PAGE_TITLE = 'Articles - Opus Advisor · Conseil en Organisation';
const PAGE_DESCRIPTION =
  'Ressources et insights pour dirigeants : stratégie, optimisation des processus, outils et méthodes pour une croissance maîtrisée.';

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

export default function ArticlesPage() {
  const articles = getAllArticles();

  const articleListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: articles.map((article, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://opusadvisor.fr/article/${article.slug}`,
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
      <main className="flex-grow py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <ArticlesGrid articles={articles} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
