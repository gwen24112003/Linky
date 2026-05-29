'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import articlesData from '@/lib/articles.json';
import { SectionKicker } from '@/components/ui/SectionKicker';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';
const PAPER = '#FAF7F0';
const RULE = 'rgba(26,35,50,0.16)';

interface RelatedArticlesProps {
  currentArticleId: number;
}

interface ArticleMetadata {
  id: number;
  slug: string;
  title: string;
  description: string;
  publishedAt?: string;
}

const formatDate = (d?: string): string => {
  if (!d) return '';
  try {
    return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(d));
  } catch {
    return '';
  }
};

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({ currentArticleId }) => {
  const related = (articlesData as ArticleMetadata[])
    .filter((article) => article.id !== currentArticleId)
    .slice(0, 2);

  if (related.length === 0) return null;

  return (
    <section className="py-20 md:py-24" style={{ background: PAPER }}>
      <div className="container mx-auto px-6 max-w-4xl">
        <SectionKicker label="À lire aussi" className="mb-10" />

        <div>
          {related.map((article, i) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="group block border-t py-8"
              style={{ borderColor: RULE }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8">
                <div className="md:col-span-3">
                  <span className="font-heading font-bold text-base" style={{ color: GOLD }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {article.publishedAt && (
                    <span className="block text-xs uppercase tracking-[0.16em] text-gray-400 mt-2">
                      {formatDate(article.publishedAt)}
                    </span>
                  )}
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-heading font-bold text-xl md:text-2xl leading-tight text-[#1A2332] group-hover:text-[#C9A84C] transition-colors duration-200">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm md:text-[15px] text-gray-600 leading-relaxed line-clamp-2">
                    {article.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
          <div className="border-t" style={{ borderColor: RULE }} />
        </div>

        <div className="mt-10">
          <Link
            href="/articles"
            className="group inline-flex items-center gap-2 font-semibold text-base"
            style={{ color: NAVY }}
          >
            Voir tous les articles
            <ArrowRight size={18} style={{ color: GOLD }} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
