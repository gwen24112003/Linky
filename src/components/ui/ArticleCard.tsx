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
    <div 
      className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col min-h-[500px] w-full border border-gray-100 hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
    >
      <div
        className="h-48 sm:h-56 md:h-64 overflow-hidden relative flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #f8f6f1, #ede8de)' }}
      >
        {overlayImageSrc ? (
          <img
            src={overlayImageSrc}
            alt={title}
            className="w-72 h-56 object-contain drop-shadow-lg transition-all duration-500 group-hover:scale-105"
          />
        ) : (
          <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
        )}
      </div>
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-lexend uppercase transition-colors">
          {title}
        </h3>
        <p className="text-black text-lg md:text-lg lg:text-xl leading-relaxed mb-8 flex-grow font-meera line-clamp-4">
          {description}
        </p>
        <button
          onClick={onClick}
          className="inline-flex items-center gap-2 text-gray-900 font-bold text-lg transition-colors w-fit group/btn cursor-pointer relative"
        >
          <span className="relative">
            LIRE L'ARTICLE
            <span className="absolute bottom-0 left-0 h-px w-0 group-hover/btn:w-full transition-all duration-300" style={{ background: '#C9A84C' }} />
          </span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
