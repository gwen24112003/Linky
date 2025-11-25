import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Service } from '../../../types';

export const ServicesSectionEntreprise: React.FC = () => {
  const services: Service[] = [
    {
      id: '1',
      title: 'Création d\'outils no-code',
      features: [
        'Développer des solutions sur mesure',
        'Applications web et mobile',
        'Interfaces intuitives'
      ]
    },
    {
      id: '2',
      title: 'Automatisation',
      features: [
        'Optimisez vos processus',
        'Workflows sur mesure',
        'Suppression des tâches répétitives'
      ]
    },
    {
      id: '3',
      title: 'Maintenance & Support',
      features: [
        'Nous vous accompagnons',
        'Suivi post-projet et corrections',
        'Accompagnement technique réactif'
      ]
    }
  ];

  return (
    <section className="pt-4 pb-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5">
            Nos services pour votre transformation digitale
          </h2>
          <p className="text-l md:text-l lg:text-xl text-gray-600 text-base leading-relaxed">
            Bénéficiez de solutions sur mesure pour dynamiser vos process et créer rapidement des outils no-code, automatisation ou support de la maintenance des produits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <Card
              key={service.id}
              title={service.title}
              features={service.features}
            />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button className="bg-white text-teal-600 border-2 border-teal-600 px-5 py-3 text-lg font-bold rounded-lg hover:bg-teal-600 hover:text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2">
            Découvrez nos services
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};