import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  description?: string;
  features?: string[];
  className?: string;
  variant?: 'default' | 'glass';
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  features,
  className = '',
  variant = 'default',
}) => {
  const baseClass =
    variant === 'glass'
      ? 'rounded-xl p-8 border border-white/20 bg-white/10'
      : 'bg-white rounded-xl border border-gray-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300';

  return (
    <motion.div
      className={`${baseClass} ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h3 className={`text-4xl font-bold mb-8 text-center ${variant === 'glass' ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h3>

      {description && (
        <p className={`mb-6 text-sm leading-relaxed ${variant === 'glass' ? 'text-white/70' : 'text-gray-600'}`}>
          {description}
        </p>
      )}

      {features && features.length > 0 && (
        <div className="flex justify-center mt-8">
          <ul className="space-y-3 w-3/4">
            {features.map((feature, index) => (
              <li key={index} className={`text-sm leading-relaxed flex items-start gap-2 ${variant === 'glass' ? 'text-white/80' : 'text-gray-700'}`}>
                <Check className="flex-shrink-0 mt-1" size={20} style={{ color: '#C9A84C' }} />
                <span className="text-xl">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};
