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
      title: 'Conception de Systèmes Opérationnels',
      description: "Nous bâtissons l'architecture numérique de votre organisation. Centralisation des données, interfaces métiers, pilotage.",
      features: [
        'Architecture de l\'information (SSOT)',
        'Systèmes métier sur-mesure',
        'Tableaux de bord stratégiques',
        'Sécurité & Robustesse',
        'Expérience utilisateur fluide'
      ]
    },
    {
      id: 'automatisation',
      title: 'Optimisation des Processus',
      description: "Fluidifiez la circulation de l'information. Nous identifions et éliminons les points de friction pour libérer vos équipes.",
      features: [
        'Audit des flux existants',
        'Rationalisation des tâches',
        'Interconnexion de vos outils',
        'Fiabilisation de la donnée',
        'Réduction des délais de traitement'
      ]
    },
    {
      id: 'maintenance',
      title: 'Accompagnement & Évolution',
      description: 'Votre entreprise évolue, vos systèmes aussi. Un partenariat long terme pour garantir la performance continue.',
      features: [
        'Monitoring proactif',
        'Formation des équipes',
        'Adaptation aux nouveaux enjeux',
        'Support prioritaire',
        'Conseil stratégique continu'
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
        title="Notre Expertise - Linky4U"
        description="Conseil en organisation, optimisation des processus et mise en place de systèmes de pilotage pour dirigeants."
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
          Notre Expertise
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
              {/* Checks et Image — titre et description dans la colonne gauche */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Colonne texte : titre + description + checklist */}
                <div className={service.id === 'automatisation' ? 'md:order-2' : ''}>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-dongle">
                    {service.title}
                  </h2>
                  <p className="text-lg md:text-xl lg:text-2xl text-gray-600 font-meera leading-relaxed mb-8">
                    {service.description}
                  </p>
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

                {/* Colonne image — style uniforme basé sur la 2ème */}
                <div className={service.id === 'automatisation' ? 'md:order-1' : ''}>
                  {service.id === 'creation' ? (
                    <div className="overflow-hidden rounded-lg shadow-2xl">
                      <img
                        src="/images/dashboard-linky.png"
                        alt="Pilotage d'activité"
                        className="w-full h-auto"
                      />
                    </div>
                  ) : service.id === 'automatisation' ? (
                    <div className="overflow-hidden rounded-lg shadow-2xl">
                      <img
                        src="/images/make-scenario.jpg"
                        alt="Optimisation de processus"
                        className="w-full h-auto"
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                      />
                    </div>
                  ) : service.id === 'maintenance' ? (
                    <div className="overflow-hidden rounded-lg shadow-2xl">
                      <img
                        src="/images/ticket-linky.png"
                        alt="Suivi et performance"
                        className="w-full h-auto"
                      />
                    </div>
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
      </main>
      <Footer />
    </div>
  );
};
