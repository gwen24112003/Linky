'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { ArticleCard } from '../ui/ArticleCard';
import articlesData from '@/lib/articles.json';

interface RelatedArticlesProps {
  currentArticleId: number;
}

interface ArticleMetadata {
  id: number;
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  overlayImageSrc?: string;
  icon?: string;
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({ currentArticleId }) => {
  const router = useRouter();

  const relatedArticles: ArticleMetadata[] = articlesData
    .filter((article) => article.id !== currentArticleId)
    .slice(0, 2);

  if (relatedArticles.length === 0) {
    return null;
  }

  const handleArticleClick = (slug: string) => {
    router.push(`/article/${slug}`);
  };

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-8 text-center">
          Autres articles
        </h2>
        <div
          className={`grid gap-8 max-w-6xl mx-auto justify-items-center ${
            relatedArticles.length === 1 ? 'grid-cols-1 md:max-w-2xl' : 'grid-cols-1 md:grid-cols-2'
          }`}
        >
          {relatedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              title={article.title}
              description={article.description}
              imageSrc={article.imageSrc}
              overlayImageSrc={article.overlayImageSrc}
              icon={article.icon}
              onClick={() => handleArticleClick(article.slug)}
            />
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Link
            href="/articles"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 group"
            style={{ border: '1px solid #C9A84C', color: '#C9A84C' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(201,168,76,0.08)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '';
            }}
          >
            Voir tous les articles
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </section>
  );
};
