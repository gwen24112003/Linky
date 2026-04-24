import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArticleView } from '@/components/pages/ArticleView';
import { RelatedArticles } from '@/components/home/RelatedArticles';
import {
  getAllArticles,
  getArticleBySlug,
  getArticleContent,
  getArticleFrontMatter,
} from '@/lib/articles';

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
  const frontMatter = getArticleFrontMatter(slug);
  const pageUrl = `https://opusadvisor.fr/article/${article.slug}`;
  const ogImage = article.imageSrc
    ? `https://opusadvisor.fr${article.imageSrc}`
    : 'https://opusadvisor.fr/images/opus-banner.png';
  const ogImageAlt = `Illustration de l'article : ${article.title}`;
  return {
    title: article.title,
    description: article.description,
    ...(frontMatter.keywords && frontMatter.keywords.length > 0
      ? { keywords: frontMatter.keywords }
      : {}),
    alternates: { canonical: pageUrl },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      url: pageUrl,
      images: [{ url: ogImage, alt: ogImageAlt }],
      publishedTime: article.publishedAt,
      authors: ['Enzo Monnier'],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [{ url: ogImage, alt: ogImageAlt }],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  const content = getArticleContent(slug);
  const frontMatter = getArticleFrontMatter(slug);

  const pageUrl = `https://opusadvisor.fr/article/${article.slug}`;
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: `https://opusadvisor.fr${article.imageSrc}`,
    url: pageUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    articleSection: 'Conseil ops PME et BTP second œuvre',
    ...(frontMatter.keywords && frontMatter.keywords.length > 0
      ? { keywords: frontMatter.keywords.join(', ') }
      : {}),
    author: {
      '@type': 'Person',
      name: 'Enzo Monnier',
      url: 'https://opusadvisor.fr/equipe',
      jobTitle: 'Consultant ops · Fondateur',
      worksFor: {
        '@type': 'Organization',
        name: 'Opus Advisor',
        url: 'https://opusadvisor.fr',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Opus Advisor',
      url: 'https://opusadvisor.fr',
      logo: {
        '@type': 'ImageObject',
        url: 'https://opusadvisor.fr/images/opus-icon.png',
      },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://opusadvisor.fr/' },
      { '@type': 'ListItem', position: 2, name: 'Articles', item: 'https://opusadvisor.fr/articles' },
      { '@type': 'ListItem', position: 3, name: article.title, item: pageUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
