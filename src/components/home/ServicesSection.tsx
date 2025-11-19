import React from 'react';
import { Card } from '../ui/Card';
import { Service } from '../../types';

export const ServicesSection: React.FC = () => {
  const services: Service[] = [
    {
      id: '1',
      title: 'Création d\'outils no-code',
      description: 'Développer des solutions sur mesure.',
      features: [
        'Applications web et mobile',
        'Interfaces intuitives'
      ]
    },
    {
      id: '2',
      title: 'Automatisation',
      description: 'Optimisez vos processus.',
      features: [
        'Workflows sur mesure',
        'Suppression des tâches répétitives'
      ]
    },
    {
      id: '3',
      title: 'Maintenance & Support',
      description: 'Nous vous accompagnons.',
      features: [
        'Suivi post-projet et corrections',
        'Accompagnement technique réactif'
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
            Nos services pour votre transformation digitale
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Bénéficiez de solutions sur mesure pour dynamiser vos process et créer rapidement des outils no-code, 
            automatisation ou support de la maintenance des produits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              title={service.title}
              description={service.description}
              features={service.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
};