'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import articlesData from '@/lib/articles.json';
import { tools } from '@/lib/tools';
import { SectionKicker } from '@/components/ui/SectionKicker';

// Or foncé pour le texte et les icônes sur fond clair : l'or d'origine y tombe à 2,1:1 de contraste.
const GOLD_INK = '#8A6A1C';
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
  category?: string;
  related?: string[];
  tools?: string[];
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
  const all = articlesData as ArticleMetadata[];
  const current = all.find((a) => a.id === currentArticleId);
  // Articles choisis par sujet (champ « related ») ; à défaut, même catégorie, puis les plus récents.
  const picked = (current?.related ?? [])
    .map((slug) => all.find((a) => a.slug === slug))
    .filter((a): a is ArticleMetadata => Boolean(a));
  const fallback = all.filter(
    (a) => a.id !== currentArticleId && !picked.includes(a) && a.category === current?.category,
  );
  const rest = all.filter((a) => a.id !== currentArticleId && !picked.includes(a) && !fallback.includes(a));
  const related = [...picked, ...fallback, ...rest].slice(0, 3);
  const relatedTools = (current?.tools ?? [])
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter((t): t is (typeof tools)[number] => Boolean(t));

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
                  <span className="font-heading font-bold text-base" style={{ color: GOLD_INK }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {article.publishedAt && (
                    <span className="block text-xs uppercase tracking-[0.16em] text-gray-500 mt-2">
                      {formatDate(article.publishedAt)}
                    </span>
                  )}
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-heading font-bold text-xl md:text-2xl leading-tight text-[#1A2332] group-hover:text-[#8A6A1C] transition-colors duration-200">
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

        {relatedTools.length > 0 && (
          <div className="mt-12">
            <SectionKicker label="Outils gratuits liés" className="mb-6" />
            <ul>
              {relatedTools.map((t) => (
                <li key={t.slug} className="border-t" style={{ borderColor: RULE }}>
                  <Link href={`/outils/${t.slug}/`} className="group flex items-center justify-between gap-4 py-5">
                    <span>
                      <span className="block font-semibold text-lg leading-snug text-[#1A2332] group-hover:text-[#8A6A1C] transition-colors duration-200">
                        {t.title}
                      </span>
                      <span className="block mt-1 text-sm text-gray-600 leading-relaxed">{t.description}</span>
                    </span>
                    <ArrowRight size={18} aria-hidden="true" className="shrink-0" style={{ color: GOLD_INK }} />
                  </Link>
                </li>
              ))}
              <li className="border-t" style={{ borderColor: RULE }} aria-hidden="true" />
            </ul>
          </div>
        )}

        <div className="mt-10">
          <Link
            href="/articles"
            className="group inline-flex items-center gap-2 font-semibold text-base"
            style={{ color: NAVY }}
          >
            Voir tous les articles
            <ArrowRight size={18} style={{ color: GOLD_INK }} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
