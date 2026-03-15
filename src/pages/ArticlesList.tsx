import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ArticleCard } from '../components/ui/ArticleCard';
import articlesData from '../data/articles.json';

interface ArticleMetadata {
  id: number;
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  overlayImageSrc?: string;
}

export const ArticlesList: React.FC = () => {
  const navigate = useNavigate();
  const articles: ArticleMetadata[] = articlesData;

  const handleArticleClick = (slug: string) => {
    navigate(`/article/${slug}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 font-lexend uppercase">
            Nos Articles
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 text-center mb-10 sm:mb-14 max-w-2xl mx-auto">
            Decouvrez nos conseils et bonnes pratiques pour optimiser la gestion de votre entreprise.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
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

      <Footer />
    </div>
  );
};
