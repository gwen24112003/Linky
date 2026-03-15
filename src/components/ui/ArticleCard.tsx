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
      className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col min-h-[600px] max-w-lg border border-gray-100 hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
    >
      <div className="h-48 sm:h-56 md:h-64 overflow-hidden relative">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover blur-sm"
        />
        {overlayImageSrc && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img
              src={overlayImageSrc}
              alt="Overlay"
              className="w-80 h-80 object-contain drop-shadow-lg transition-all duration-500 group-hover:scale-110"
              style={{ transform: 'perspective(600px) rotateY(0deg)', transition: 'transform 0.5s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'perspective(600px) rotateY(8deg) scale(1.1)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'perspective(600px) rotateY(0deg) scale(1)'; }}
            />
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
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
          className="inline-flex items-center gap-2 text-gray-900 font-bold text-lg hover:text-teal-600 transition-colors w-fit group/btn cursor-pointer relative"
        >
          <span className="relative">
            LIRE L'ARTICLE
            <span className="absolute bottom-0 left-0 h-px bg-teal-600 w-0 group-hover/btn:w-full transition-all duration-300" />
          </span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
