import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArticleCard } from '../ui/ArticleCard';
import articlesData from '../../data/articles.json';

interface ArticleMetadata {
  id: number;
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  overlayImageSrc?: string;
}

const marqueeKeywords = [
  'Stratégie', 'Opérations', 'PME', 'Transformation', 'ETI',
  'Croissance', 'Organisation', 'Performance', 'Direction', 'Conseil',
  'Stratégie', 'Opérations', 'PME', 'Transformation', 'ETI',
  'Croissance', 'Organisation', 'Performance', 'Direction', 'Conseil',
];

export const ArticlesSection: React.FC = () => {
  const navigate = useNavigate();
  const articles: ArticleMetadata[] = articlesData;

  const handleArticleClick = (slug: string) => {
    navigate(`/article/${slug}`);
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      {/* Marquee ticker */}
      <div className="mb-12 relative overflow-hidden">
        <div
          className="flex gap-8 whitespace-nowrap"
          style={{ animation: 'marquee 20s linear infinite' }}
        >
          {marqueeKeywords.map((kw, i) => (
            <span
              key={i}
              className="text-sm font-semibold tracking-[0.2em] uppercase flex-shrink-0"
              style={{ color: 'rgba(200, 169, 110, 0.5)' }}
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto justify-items-center">
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <ArticleCard
                title={article.title}
                description={article.description}
                imageSrc={article.imageSrc}
                overlayImageSrc={article.overlayImageSrc}
                onClick={() => handleArticleClick(article.slug)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
