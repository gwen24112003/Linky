import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleCard } from '../ui/ArticleCard';
import { ArrowRight } from 'lucide-react';
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
  const displayArticles = articles.slice(0, 3);
  const hasMoreArticles = articles.length > 3;

  const handleArticleClick = (slug: string) => {
    navigate(`/article/${slug}`);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 font-lexend uppercase">
          Nos Articles
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 text-center mb-10 sm:mb-14 max-w-2xl mx-auto">
          Decouvrez nos conseils et bonnes pratiques pour optimiser la gestion de votre entreprise.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {displayArticles.map((article) => (
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
        {hasMoreArticles && (
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/articles')}
              className="inline-flex items-center gap-2 bg-[#1E3A5F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2a4a7f] transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Voir tous nos articles
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
