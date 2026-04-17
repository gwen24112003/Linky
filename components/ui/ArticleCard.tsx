import React from 'react';
import {
  ArrowRight,
  AlertTriangle,
  FileText,
  LayoutDashboard,
  Layers,
  Sparkles,
  Stethoscope,
  TrendingDown,
  Users,
  Wallet,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  'alert-triangle': AlertTriangle,
  'file-text': FileText,
  'layers': Layers,
  'layout-dashboard': LayoutDashboard,
  'sparkles': Sparkles,
  'stethoscope': Stethoscope,
  'trending-down': TrendingDown,
  'users': Users,
  'wallet': Wallet,
  'workflow': Workflow,
  'zap': Zap,
};

interface ArticleCardProps {
  imageSrc: string;
  overlayImageSrc?: string;
  icon?: string;
  title: string;
  description: string;
  onClick: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  imageSrc,
  overlayImageSrc,
  icon,
  title,
  description,
  onClick,
}) => {
  const Icon = icon ? iconMap[icon] : null;

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col min-h-[500px] w-full border border-gray-100 hover:shadow-xl transform hover:scale-105 transition-all duration-300 group">
      <div
        className="h-48 sm:h-56 md:h-64 overflow-hidden relative flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #f8f6f1, #ede8de)' }}
      >
        {Icon ? (
          <Icon
            size={96}
            strokeWidth={1.4}
            className="transition-transform duration-500 group-hover:scale-110"
            style={{ color: '#C9A84C' }}
            aria-label={title}
          />
        ) : overlayImageSrc ? (
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
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 font-lexend uppercase transition-colors leading-snug">
          {title}
        </h3>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 flex-grow font-meera line-clamp-4">
          {description}
        </p>
        <button
          onClick={onClick}
          className="inline-flex items-center gap-2 text-gray-900 font-bold text-lg transition-colors w-fit group/btn cursor-pointer relative"
        >
          <span className="relative">
            LIRE L'ARTICLE
            <span
              className="absolute bottom-0 left-0 h-px w-0 group-hover/btn:w-full transition-all duration-300"
              style={{ background: '#C9A84C' }}
            />
          </span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
