import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Card } from '../components/ui/Card';
import { Service } from '../types';
import { SEO } from '../components/SEO';

export const Services: React.FC = () => {
  const location = useLocation();

  const services: Service[] = [
    {
      id: 'creation',
      title: 'Création d\'outils no-code',
      description: 'Transformez vos idées en applications fonctionnelles avec Glide. Interface intuitive, déploiement rapide, sans une ligne de code.',
      features: [
        'Développer des solutions sur mesure',
        'Applications web et mobile',
        'Interfaces intuitives',
        'Prototypage rapide',
        'Déploiement simplifié'
      ]
    },
    {
      id: 'automatisation',
      title: 'Automatisation',
      description: 'Gagnez du temps en automatisant vos processus répétitifs avec Make. Connectez vos outils, optimisez vos workflows, concentrez-vous sur l\'essentiel.',
      features: [
        'Optimisez vos processus',
        'Workflows sur mesure',
        'Suppression des tâches répétitives',
        'Intégrations API',
        'Gain de temps et d\'efficacité'
      ]
    },
    {
      id: 'maintenance',
      title: 'Maintenance & Support',
      description: 'Bénéficiez d\'un accompagnement continu après le lancement. Mises à jour, corrections, évolutions : nous restons à vos côtés.',
      features: [
        'Nous vous accompagnons',
        'Suivi post-projet et corrections',
        'Accompagnement technique réactif',
        'Mises à jour régulières',
        'Support client dédié'
      ]
    }
  ];

  useEffect(() => {
    // Gérer le scroll vers la section si un hash est présent dans l'URL
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      const element = document.getElementById(sectionId);
      
      if (element) {
        setTimeout(() => {
          const navbarHeight = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO 
        title="Nos Services" 
        description="Découvrez nos services de création d'applications no-code, d'automatisation de processus et de maintenance."
        url="https://linky4u.com/services"
      />
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative h-[50vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/linky-banner.png)' }}
      >
        <div className="absolute inset-0" />
        <h1 className="relative z-10 text-6xl md:text-7xl lg:text-8xl font-bold text-white font-dongle">
          Nos Services
        </h1>
      </section>

      {/* Services Sections */}
      <main className="flex-grow">
        {services.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className={`py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
          >
            <div className="container mx-auto px-6 max-w-6xl">
              {/* Titre et description en haut */}
              <div className="mb-12">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-dongle">
                  {service.title}
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-600 font-meera leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Checks et Image */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Liste des features avec checks */}
                <div className={service.id === 'automatisation' ? 'md:order-2' : ''}>
                  <ul className="space-y-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg 
                          className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1"
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M5 13l4 4L19 7" 
                          />
                        </svg>
                        <span className="text-lg md:text-xl text-gray-700 font-meera">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card ou Image */}
                <div className={service.id === 'automatisation' ? 'md:order-1' : ''}>
                  {service.id === 'creation' ? (
                    <img 
                      src="/images/dashboard-linky.png" 
                      alt="Dashboard Linky"
                      className="w-full h-auto rounded-lg shadow-2xl scale-110"
                    />
                  ) : service.id === 'automatisation' ? (
                    <div className="overflow-hidden rounded-lg shadow-2xl">
                      <img 
                        src="/images/make-scenario.jpg" 
                        alt="Scénario d'automatisation Make.com"
                        className="w-full h-auto"
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                      />
                    </div>
                  ) : service.id === 'maintenance' ? (
                    <img 
                      src="/images/ticket-linky.png" 
                      alt="Système de tickets Linky"
                      className="w-full h-auto rounded-lg shadow-2xl scale-110"
                    />
                  ) : (
                    <Card
                      title={service.title}
                      features={service.features.slice(0, 3)}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Section Nos outils d'expertise */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-12 font-dongle text-center">
              Nos outils d'expertise
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Card Glide */}
              <div 
                className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:shadow-xl hover:border-teal-600 transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6">
                    <img 
                      src="/images/glide-logo.png" 
                      alt="Glide"
                      className="h-24 w-auto object-contain"
                    />
                  </div>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 font-lexend">
                    Glide
                  </h3>
                  <p className="text-lg md:text-xl lg:text-2xl text-gray-600 font-meera">
                    Créez des applications mobiles et web sans code. Interfaces intuitives, déploiement rapide.
                  </p>
                </div>
              </div>

              {/* Card Make.com */}
              <div 
                className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:shadow-xl hover:border-teal-600 transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6">
                    <img 
                      src="/images/make-logo.png" 
                      alt="Make.com"
                      className="h-24 w-auto object-contain"
                    />
                  </div>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 font-lexend">
                    Make.com
                  </h3>
                  <p className="text-lg md:text-xl lg:text-2xl text-gray-600 font-meera">
                    Automatisez vos workflows, connectez vos outils via API et optimisez vos processus métier.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
