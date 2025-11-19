import React from 'react';
import { Check } from 'lucide-react';

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
    <div className={`bg-white rounded-xl border border-gray-200 p-8 hover:border-teal-500 hover:shadow-xl hover:scale-105 transition-all duration-300 ${className}`}>
      <h3 className="text-4xl font-bold text-gray-900 mb-8 text-center">{title}</h3>
      
      {description && (
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">{description}</p>
      )}
      
      {features && features.length > 0 && (
        <div className="flex justify-center mt-8">
          <ul className="space-y-3 w-3/4">
            {features.map((feature, index) => (
              <li key={index} className="text-gray-700 text-sm leading-relaxed flex items-start gap-2">
                <Check className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                <span className="text-xl">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};