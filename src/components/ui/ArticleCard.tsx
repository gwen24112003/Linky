import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ArticleCardProps {
  imageSrc: string;
  overlayImageSrc?: string;
  title: string;
  description: string;
  onClick: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ imageSrc, overlayImageSrc, title, description, onClick }) => {
  return (
    <article 
      className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col border border-gray-100 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      tabIndex={0}
      role="button"
      aria-label={`Lire l'article: ${title}`}
    >
      <div className="h-48 sm:h-56 overflow-hidden relative bg-gray-100">
        <img 
          src={imageSrc} 
          alt="" 
          className="w-full h-full object-cover blur-sm"
          aria-hidden="true"
        />
        {overlayImageSrc && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img 
              src={overlayImageSrc} 
              alt="" 
              className="w-64 h-64 object-contain drop-shadow-lg transform transition-transform duration-500 group-hover:scale-105"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 font-lexend uppercase transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 text-base leading-relaxed mb-6 flex-grow font-meera line-clamp-3">
          {description}
        </p>
        <div className="mt-auto">
          <span className="inline-flex items-center gap-2 text-[#1E3A5F] font-semibold text-base group-hover:text-teal-600 transition-colors">
            LIRE L'ARTICLE 
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
};
