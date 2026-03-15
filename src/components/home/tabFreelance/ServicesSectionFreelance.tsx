import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../../ui/Card';
import { Service } from '../../../types';

export const ServicesSectionFreelance: React.FC = () => {
  const services: Service[] = [
    {
      id: '1',
      title: 'Missions Stratégiques',
      features: [
        'Projets à fort impact',
        'Grands comptes & ETI',
        'Enjeux de transformation'
      ]
    },
    {
      id: '2',
      title: 'Cadre d\'Intervention',
      features: [
        'Méthodologie Linky',
        'Outils & Frameworks',
        'Support opérationnel'
      ]
    },
    {
      id: '3',
      title: 'Partenariat Gagnant',
      features: [
        'Apport d\'affaires qualifié',
        'Réseau d\'experts',
        'Respect de votre indépendance'
      ]
    }
  ];

  return (
    <section className="pt-4 pb-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5">
            Rejoignez notre réseau d'experts
          </h2>
          <p className="text-l md:text-l lg:text-xl text-gray-600 text-base leading-relaxed">
            Nous collaborons avec les meilleurs consultants indépendants pour délivrer une valeur exceptionnelle à nos clients.
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
          <Link to="/experts-contact" className="bg-white text-teal-600 border-2 border-teal-600 px-5 py-3 text-lg font-bold rounded-lg hover:bg-teal-600 hover:text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2">
            Postuler au réseau
            <ArrowRight size={24} />
          </Link>
        </div>
      </div>
    </section>
  );
};