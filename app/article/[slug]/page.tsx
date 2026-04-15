import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArticleView } from '@/components/pages/ArticleView';
import { RelatedArticles } from '@/components/home/RelatedArticles';
import { getAllArticles, getArticleBySlug, getArticleContent } from '@/lib/articles';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `https://opusadvisor.fr/article/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      url: `https://opusadvisor.fr/article/${article.slug}`,
      images: article.imageSrc ? [{ url: article.imageSrc }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  const content = getArticleContent(slug);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: `https://opusadvisor.fr${article.imageSrc}`,
    url: `https://opusadvisor.fr/article/${article.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'Opus Advisor',
      url: 'https://opusadvisor.fr',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-white">
        <ArticleView title={article.title} description={article.description} content={content} />
        <RelatedArticles currentArticleId={article.id} />
      </main>
      <Footer />
    </>
  );
}
