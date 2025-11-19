import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CardProps {
  title: string;
  description?: string;
  features?: string[];
  className?: string;
}

export const Card: React.FC<CardProps> = ({ 
  title, 
  description, 
  features,
  className = '' 
}) => {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-8 hover:border-teal-500 hover:shadow-xl transition-all duration-300 group ${className}`}>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      
      {description && (
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">{description}</p>
      )}
      
      {features && features.length > 0 && (
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="text-gray-700 text-sm leading-relaxed">
              {feature}
            </li>
          ))}
        </ul>
      )}
      
      <div className="flex justify-end">
        <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition-colors duration-300">
          <ArrowRight className="text-teal-600" size={20} />
        </div>
      </div>
    </div>
  );
};