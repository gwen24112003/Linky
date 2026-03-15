import React, { useRef } from 'react';
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
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `perspective(800px) rotateX(${(-y / rect.height) * 8}deg) rotateY(${(x / rect.width) * 8}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  const baseClass =
    variant === 'glass'
      ? 'card-glass rounded-xl p-8 transition-transform duration-200'
      : 'bg-white rounded-xl border border-gray-200 p-8 hover:border-teal-500 hover:shadow-xl transition-all duration-300';

  return (
    <motion.div
      ref={cardRef}
      className={`${baseClass} ${className}`}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
                <Check className="text-teal-400 flex-shrink-0 mt-1" size={20} />
                <span className="text-xl">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};
