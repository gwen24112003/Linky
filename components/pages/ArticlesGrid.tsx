'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArticleCard } from '@/components/ui/ArticleCard';

interface ArticleMetadata {
  id: number;
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  overlayImageSrc?: string;
}

export const ArticlesGrid: React.FC<{ articles: ArticleMetadata[] }> = ({ articles }) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
      {articles.map((article, i) => (
        <motion.div
          key={article.id}
          className="w-full"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <ArticleCard
            title={article.title}
            description={article.description}
            imageSrc={article.imageSrc}
            overlayImageSrc={article.overlayImageSrc}
            onClick={() => router.push(`/article/${article.slug}`)}
          />
        </motion.div>
      ))}
    </div>
  );
};
