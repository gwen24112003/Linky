import React from 'react';
import { useNavigate } from 'react-router-dom';
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

export const ArticlesSection: React.FC = () => {
  const navigate = useNavigate();
  const articles: ArticleMetadata[] = articlesData;

  const handleArticleClick = (slug: string) => {
    navigate(`/article/${slug}`);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              title={article.title}
              description={article.description}
              imageSrc={article.imageSrc}
              overlayImageSrc={article.overlayImageSrc}
              onClick={() => handleArticleClick(article.slug)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
