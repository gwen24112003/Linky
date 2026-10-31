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
  getReadingMinutes,
  formatDateFr,
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
  const pageUrl = `https://opusadvisor.fr/articles/${article.slug}/`;
  const ogImage = article.imageSrc
    ? `https://opusadvisor.fr${article.imageSrc}`
    : 'https://opusadvisor.fr/images/opus-icon.png';
  const ogImageAlt = `Illustration de l'article : ${article.title}`;
  return {
    title: article.seoTitle ? { absolute: article.seoTitle } : article.title,
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
      ...(article.updatedAt ? { modifiedTime: article.updatedAt } : {}),
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

  const pageUrl = `https://opusadvisor.fr/articles/${article.slug}/`;
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: `https://opusadvisor.fr${article.imageSrc}`,
    url: pageUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    articleSection: 'Organisation et gestion des entreprises du BTP',
    ...(frontMatter.keywords && frontMatter.keywords.length > 0
      ? { keywords: frontMatter.keywords.join(', ') }
      : {}),
    author: {
      '@type': 'Person',
      '@id': 'https://opusadvisor.fr/equipe/#enzo-monnier',
      name: 'Enzo Monnier',
      url: 'https://opusadvisor.fr/equipe/',
      jobTitle: "Fondateur d'Opus Advisor",
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
      { '@type': 'ListItem', position: 2, name: 'Articles', item: 'https://opusadvisor.fr/articles/' },
      { '@type': 'ListItem', position: 3, name: article.title, item: pageUrl },
    ],
  };

  const faq = frontMatter.faq ?? [];
  const faqJsonLd =
    faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faq.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-white">
        <ArticleView
          title={article.title}
          description={article.description}
          content={content}
          publishedLabel={article.publishedAt ? formatDateFr(article.publishedAt) : undefined}
          updatedLabel={
            article.updatedAt && article.updatedAt !== article.publishedAt ? formatDateFr(article.updatedAt) : undefined
          }
          readingMinutes={getReadingMinutes(content)}
          essentiel={frontMatter.essentiel}
          faq={faq}
          ctaMid={frontMatter.ctaMid}
        />
        <RelatedArticles currentArticleId={article.id} />
      </main>
      <Footer />
    </>
  );
}
