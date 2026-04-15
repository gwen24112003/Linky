import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArticlesHero } from '@/components/pages/ArticlesHero';
import { ArticlesGrid } from '@/components/pages/ArticlesGrid';
import { getAllArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Articles - Opus Advisor · Conseil en Organisation',
  description: 'Ressources et insights pour dirigeants : stratégie, optimisation des processus, outils et méthodes pour une croissance maîtrisée.',
  alternates: { canonical: 'https://opusadvisor.fr/articles' },
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
