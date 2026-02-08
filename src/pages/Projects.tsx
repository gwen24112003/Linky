import React, { useState, useRef } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { SEO } from '../components/SEO';

interface Project {
  id: string;
  name: string;
  company: string;
  shortDescription: string;
  image: string;
  technologies: string[];
  fullDescription: string;
  duration: string;
  clientReview: string;
}

export const Projects: React.FC = () => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const detailsRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: '1',
      name: 'Optimisation Supply Chain',
      company: "Leader Grande Distribution",
      shortDescription: 'Refonte complète des flux logistiques et de l\'approvisionnement.',
      image: '/images/Logo_LP.jpg',
      technologies: [
        'Audit des flux',
        'Architecture Data',
        'Dashboards prédictifs',
        'Formation des équipes'
      ],
      fullDescription: 'Notre client, un acteur majeur de la distribution, souffrait de ruptures de stock chroniques et de pertes liées à un pilotage manuel.\n\nNous avons mené un diagnostic complet de la chaîne de valeur, identifié les points de friction et mis en place une architecture de données unifiée.\n\nRésultat : -15% de ruptures en 6 mois et une visibilité temps réel pour le COMEX.',
      duration: '8 mois',
      clientReview: 'Linky4U a su parler le langage de nos opérations tout en apportant une vraie vision stratégique.'
    },
    {
      id: '2',
      name: 'Structuration de la Croissance',
      company: "Scale-up SaaS B2B",
      shortDescription: 'Passage de 50 à 150 collaborateurs : structuration des processus internes.',
      image: '/images/Logo_LP.jpg',
      technologies: [
        'Cartographie des processus',
        'Tool Stack Optimization',
        'Onboarding automatisé',
        'CRM & Sales Ops'
      ],
      fullDescription: 'En pleine hyper-croissance, cette scale-up voyait sa rentabilité s\'effriter sous le poids de la désorganisation.\n\nNous avons redéfini les rôles, choisi et implémenté une stack d\'outils cohérente (CRM, HRIS, Projet) et automatisé les tâches administratives.\n\nL\'entreprise a pu tripler ses effectifs sans augmenter ses frais de structure administratifs.',
      duration: '12 mois',
      clientReview: 'Plus qu\'un conseil, un véritable partenaire de notre passage à l\'échelle.'
    },
    {
      id: '3',
      name: 'Transformation Digitale',
      company: "PME Industrielle",
      shortDescription: 'Digitalisation des fiches de production et suivi qualité.',
      image: '/images/Logo_LP.jpg',
      technologies: [
        'Applications métier tablettes',
        'Suppression du papier',
        'Remontée d\'incidents',
        'Qualité & ISO'
      ],
      fullDescription: 'Les opérateurs de production perdaient 1h par jour en saisie administrative papier.\n\nNous avons conçu et déployé des interfaces simples sur tablettes, connectées directement à l\'ERP. Zéro saisie, zéro papier, zéro erreur.\n\nL\'adhésion des équipes terrain a été immédiate grâce à une UX travaillée.',
      duration: '4 mois',
      clientReview: 'Simple, efficace, rentable. Nos équipes ne pourraient plus revenir en arrière.'
    }
  ];

  const toggleProject = (projectId: string) => {
    if (expandedProject === projectId) {
      setExpandedProject(null);
    } else {
      setExpandedProject(projectId);
      setTimeout(() => {
        if (detailsRef.current) {
          const navbarHeight = 80; // Hauteur approximative de la navbar
          const elementPosition = detailsRef.current.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  const nextProject = () => {
    setExpandedProject(null);
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setExpandedProject(null);
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO
        title="Réalisations & Cas Clients - Linky"
        description="Découvrez comment Linky a transformé l'organisation de leaders de la distribution, scale-ups B2B et PME industrielles."
        url="https://linky4u.com/projets"
      />
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section
          className="relative overflow-hidden flex items-center justify-center"
          style={{
            backgroundImage: 'url(/images/linky-banner.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '50vh'
          }}
        >
          <div className="absolute inset-0 bg-overlay"></div>

          <div className="container mx-auto px-6 relative z-10">
            <h1 className="text-4xl md:text-6xl lg:text-8xl text-white text-center leading-tight">
              Nos réalisations
            </h1>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="relative flex items-center gap-8">
              {/* Bouton navigation gauche */}
              <button
                onClick={prevProject}
                className="flex-shrink-0 bg-gray-200 hover:bg-teal-600 hover:text-white text-gray-700 p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Projet précédent"
              >
                <ChevronLeft size={32} />
              </button>

              {/* Container du projet avec carousel */}
              <div className="flex-grow max-w-6xl mx-auto">
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentProjectIndex * 100}%)` }}
                  >
                    {projects.map((project) => (
                      <div key={project.id} className="w-full flex-shrink-0">
                        <div className="relative h-[48rem]">
                          <img
                            src={project.image}
                            alt={project.name}
                            className="w-full h-full object-cover"
                          />

                          {/* Overlay avec info basique (toujours visible à droite) */}
                          <div
                            className="absolute top-0 right-0 bottom-0 transition-all duration-700 ease-in-out"
                            style={{
                              width: '45%',
                              opacity: expandedProject === project.id ? '0' : '1',
                              pointerEvents: expandedProject === project.id ? 'none' : 'auto'
                            }}
                          >
                            <div
                              className="absolute inset-0"
                              style={{
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                maskImage: 'linear-gradient(to left, black 70%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to left, black 70%, transparent 100%)'
                              }}
                            ></div>

                            <div className="relative z-10 p-8 pt-16 pr-8 flex flex-col justify-start items-end text-white h-full">
                              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 font-dongle">{project.name}</h2>
                              <p className="text-xl md:text-2xl mb-4 font-lexend">{project.company}</p>
                              <p className="text-base md:text-lg lg:text-xl mb-6 font-meera leading-relaxed">{project.shortDescription}</p>

                              <div className="space-y-3 mb-6">
                                <p className="text-lg font-semibold font-lexend">Les technologies utilisées:</p>
                                <ul className="space-y-2 font-meera">
                                  {project.technologies.slice(0, 2).map((tech, idx) => (
                                    <li key={idx} className="text-xl">• {tech}</li>
                                  ))}
                                </ul>
                              </div>

                              <button
                                onClick={() => toggleProject(project.id)}
                                className="flex items-center justify-center gap-2 bg-transparent text-white border-2 border-white px-4 py-2 rounded-lg font-lexend text-lg font-semibold hover:bg-teal-600 hover:border-teal-600 hover:scale-105 transition-all duration-300"
                                aria-expanded={expandedProject === project.id}
                                aria-label={expandedProject === project.id ? "Fermer les détails du projet" : "Voir les détails du projet"}
                              >
                                {expandedProject === project.id ? (
                                  <X size={20} />
                                ) : (
                                  <Plus size={20} />
                                )}
                                <span>En savoir plus</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bouton navigation droite */}
              <button
                onClick={nextProject}
                className="flex-shrink-0 bg-gray-200 hover:bg-teal-600 hover:text-white text-gray-700 p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Projet suivant"
              >
                <ChevronRight size={32} />
              </button>
            </div>

            {/* Indicateurs de pagination */}
            <div className="flex justify-center gap-3 mt-8">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setExpandedProject(null);
                    setCurrentProjectIndex(index);
                  }}
                  className={`h-3 rounded-full transition-all duration-300 ${index === currentProjectIndex
                    ? 'bg-teal-600 w-8'
                    : 'bg-gray-300 w-3 hover:bg-gray-400'
                    }`}
                  aria-label={`Aller au projet ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Section de description détaillée */}
          {expandedProject && (
            <div ref={detailsRef} className="pt-20 pb-20 bg-white">
              <div className="max-w-6xl mx-auto px-6">
                {(() => {
                  const project = projects.find(p => p.id === expandedProject);
                  if (!project) return null;

                  return (
                    <>
                      <div className="mb-16">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 font-dongle text-gray-900">{project.name}</h2>
                        <p className="text-xl md:text-2xl lg:text-3xl mb-4 font-lexend text-gray-700">{project.company}</p>
                        <p className="text-lg md:text-xl lg:text-2xl font-meera text-gray-600 leading-relaxed">{project.shortDescription}</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-12 mb-16">
                        <div>
                          <p className="font-bold mb-4 text-2xl md:text-3xl font-dongle text-gray-900">Les technologies utilisées:</p>
                          <ul className="space-y-3 font-meera text-gray-700">
                            {project.technologies.map((tech, idx) => (
                              <li key={idx} className="text-lg md:text-xl lg:text-2xl leading-relaxed">• {tech}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <p className="font-bold mb-4 text-2xl md:text-3xl font-dongle text-gray-900">Informations projet</p>
                          <p className="text-lg md:text-xl lg:text-2xl mb-4 font-meera text-gray-700 leading-relaxed">{project.duration}</p>
                          <p className="text-lg md:text-xl lg:text-2xl italic font-meera text-gray-600 leading-relaxed">"{project.clientReview}"</p>
                        </div>
                      </div>

                      <div className="space-y-12">
                        <div>
                          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 font-dongle text-teal-600">Objectif</h3>
                          <p className="text-lg md:text-xl lg:text-2xl leading-relaxed font-meera text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                          </p>
                        </div>

                        <div>
                          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 font-dongle text-teal-600">Problématique</h3>
                          <p className="text-lg md:text-xl lg:text-2xl leading-relaxed font-meera text-gray-700">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                          </p>
                        </div>

                        <div>
                          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 font-dongle text-teal-600">Processus</h3>
                          <p className="text-lg md:text-xl lg:text-2xl leading-relaxed font-meera text-gray-700">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                          </p>
                        </div>

                        <div>
                          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 font-dongle text-teal-600">Résultats</h3>
                          <p className="text-lg md:text-xl lg:text-2xl leading-relaxed font-meera text-gray-700">
                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-center mt-16">
                        <button
                          onClick={() => setExpandedProject(null)}
                          className="flex items-center justify-center gap-2 bg-teal-600 text-white px-8 py-4 rounded-lg font-lexend text-xl font-bold hover:bg-teal-700 hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                          <X size={24} />
                          <span>Fermer</span>
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};
