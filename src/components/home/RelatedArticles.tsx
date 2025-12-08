import React from 'react';
import { ArticleCard } from '../ui/ArticleCard';
import { useNavigate } from 'react-router-dom';
import articlesData from '../../data/articles.json';

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
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({ currentArticleId }) => {
  const navigate = useNavigate();
  
  // Get other articles (excluding current one), limit to 2
  const relatedArticles: ArticleMetadata[] = articlesData
    .filter((article) => article.id !== currentArticleId)
    .slice(0, 2);

  // Don't render section if no related articles
  if (relatedArticles.length === 0) {
    return null;
  }

  const handleArticleClick = (slug: string) => {
    navigate(`/article/${slug}`);
  };

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-8 text-center">
          Autres articles
        </h2>
        <div className={`grid gap-8 max-w-6xl mx-auto justify-items-center ${
          relatedArticles.length === 1 ? 'grid-cols-1 md:max-w-2xl' : 'grid-cols-1 md:grid-cols-2'
        }`}>
          {relatedArticles.map((article) => (
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
