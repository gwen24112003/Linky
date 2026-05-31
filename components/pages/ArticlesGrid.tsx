'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';
const RULE = 'rgba(26,35,50,0.16)';

interface ArticleMetadata {
  id: number;
  slug: string;
  title: string;
  description: string;
  publishedAt?: string;
  category?: string;
}

// Ordre d'affichage des filtres (les catégories absentes sont ignorées).
const CATEGORY_ORDER = ['Réglementation', 'Outils & systèmes', 'Organisation', 'Méthode'];

const formatDate = (d?: string): string => {
  if (!d) return '';
  try {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(d));
  } catch {
    return '';
  }
};

export const ArticlesGrid: React.FC<{ articles: ArticleMetadata[] }> = ({ articles }) => {
  const [active, setActive] = useState<string>('Tous');

  const categories = useMemo(() => {
    const present = new Set(articles.map((a) => a.category).filter(Boolean) as string[]);
    return ['Tous', ...CATEGORY_ORDER.filter((c) => present.has(c))];
  }, [articles]);

  const filtered = useMemo(
    () => (active === 'Tous' ? articles : articles.filter((a) => a.category === active)),
    [articles, active],
  );

  return (
    <div>
      {/* Barre de filtres */}
      <div className="flex flex-wrap gap-2.5 mb-10 md:mb-12">
        {categories.map((cat) => {
          const isActive = cat === active;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={isActive}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={
                isActive
                  ? { background: NAVY, color: '#fff', border: `1px solid ${NAVY}` }
                  : { background: 'transparent', color: NAVY, border: `1px solid ${RULE}` }
              }
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Liste */}
      {filtered.map((article, i) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href={`/articles/${article.slug}`}
            className="group block border-t py-9 md:py-11"
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
                {article.category && (
                  <span
                    className="block text-xs font-semibold uppercase tracking-[0.16em] mt-1"
                    style={{ color: GOLD }}
                  >
                    {article.category}
                  </span>
                )}
              </div>

              <div className="md:col-span-9">
                <h2 className="font-heading font-bold text-2xl md:text-3xl leading-tight text-[#1A2332] group-hover:text-[#C9A84C] transition-colors duration-200">
                  {article.title}
                </h2>
                <p className="mt-3 text-base text-gray-600 leading-relaxed max-w-2xl line-clamp-2">
                  {article.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1A2332]">
                  Lire l'article
                  <ArrowRight
                    size={16}
                    style={{ color: GOLD }}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
      <div className="border-t" style={{ borderColor: RULE }} />
    </div>
  );
};
