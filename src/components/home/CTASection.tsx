import React from 'react';
import { ArrowRight } from 'lucide-react';

export const CTASection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 leading-tight">
            Contactez-nous et découvrez comment on peut booster votre entreprise
          </h2>
          
          <button className="inline-flex items-center gap-3 bg-teal-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-teal-900 transition-all duration-200 hover:shadow-xl group">
            J'accède de mes projets
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </section>
  );
};