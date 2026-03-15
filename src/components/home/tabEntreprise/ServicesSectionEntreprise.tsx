import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../../ui/Card';
import { Service } from '../../../types';

export const ServicesSectionEntreprise: React.FC = () => {
  const services: Service[] = [
    {
      id: '1',
      title: 'Diagnostic & Stratégie',
      features: [
        'Analyse approfondie de l\'existant',
        'Identification des points de friction',
        'Feuille de route opérationnelle'
      ]
    },
    {
      id: '2',
      title: 'Architecture & Optimisation',
      features: [
        'Rationalisation de vos outils',
        'Structuration des flux de données',
        'Fluidification des processus'
      ]
    },
    {
      id: '3',
      title: 'Accompagnement',
      features: [
        'Formation et montée en compétence',
        'Suivi de la performance',
        'Adaptation continue aux enjeux'
      ]
    }
  ];

  return (
    <section className="pt-4 pb-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5">
            L'Excellence Opérationnelle au service de votre Vision
          </h2>
          <p className="text-l md:text-l lg:text-xl text-gray-600 text-base leading-relaxed">
            Nous transformons vos défis organisationnels en leviers de croissance. Une approche pragmatique pour des résultats mesurables et durables.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card
                title={service.title}
                features={service.features}
              />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link to="/services#creation" className="bg-white text-teal-600 border-2 border-teal-600 px-5 py-3 text-lg font-bold rounded-lg hover:bg-teal-600 hover:text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2">
            Notre approche détaillée
            <ArrowRight size={24} />
          </Link>
        </div>
      </div>
    </section>
  );
};