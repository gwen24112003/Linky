'use client';

import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

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

export const ProjectsView: React.FC = () => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const detailsRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: '1',
      name: 'Optimisation Supply Chain',
      company: 'Leader Grande Distribution',
      shortDescription: "Refonte complète des flux logistiques et de l'approvisionnement.",
      image: '/images/Logo_LP.jpg',
      technologies: ['Audit des flux', 'Architecture Data', 'Dashboards prédictifs', 'Formation des équipes'],
      fullDescription: '',
      duration: '8 mois',
      clientReview: 'Opus Advisor a su parler le langage de nos opérations tout en apportant une vraie vision stratégique.',
    },
    {
      id: '2',
      name: 'Structuration de la Croissance',
      company: 'Scale-up SaaS B2B',
      shortDescription: 'Passage de 50 à 150 collaborateurs : structuration des processus internes.',
      image: '/images/Logo_LP.jpg',
      technologies: ['Cartographie des processus', 'Tool Stack Optimization', 'Onboarding automatisé', 'CRM & Sales Ops'],
      fullDescription: '',
      duration: '12 mois',
      clientReview: "Plus qu'un conseil, un véritable partenaire de notre passage à l'échelle.",
    },
    {
      id: '3',
      name: 'Transformation Digitale',
      company: 'PME Industrielle',
      shortDescription: 'Digitalisation des fiches de production et suivi qualité.',
      image: '/images/Logo_LP.jpg',
      technologies: ['Applications métier tablettes', 'Suppression du papier', "Remontée d'incidents", 'Qualité & ISO'],
      fullDescription: '',
      duration: '4 mois',
      clientReview: 'Simple, efficace, rentable. Nos équipes ne pourraient plus revenir en arrière.',
    },
  ];

  const toggleProject = (projectId: string) => {
    if (expandedProject === projectId) {
      setExpandedProject(null);
    } else {
      setExpandedProject(projectId);
      setTimeout(() => {
        if (detailsRef.current) {
          const navbarHeight = 80;
          const elementPosition = detailsRef.current.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({ top: elementPosition - navbarHeight, behavior: 'smooth' });
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
    <main className="flex-grow">
      <section
        className="relative overflow-hidden flex items-center justify-center"
        style={{
          backgroundImage: 'url(/images/opus-banner.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '50vh',
        }}
      >
        <div className="absolute inset-0 bg-overlay"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-8xl text-white text-center leading-tight">
            Nos réalisations
          </h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="relative flex items-center gap-8">
            <button
              onClick={prevProject}
              className="flex-shrink-0 bg-gray-200 hover:text-white text-gray-700 p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
              onMouseEnter={(e) => (e.currentTarget.style.background = '#1A2332')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '')}
              aria-label="Projet précédent"
            >
              <ChevronLeft size={32} />
            </button>

            <div className="flex-grow max-w-6xl mx-auto">
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentProjectIndex * 100}%)` }}
                >
                  {projects.map((project) => (
                    <div key={project.id} className="w-full flex-shrink-0">
                      <div className="relative h-[48rem]">
                        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />

                        <div
                          className="absolute top-0 right-0 bottom-0 transition-all duration-700 ease-in-out"
                          style={{
                            width: '45%',
                            opacity: expandedProject === project.id ? '0' : '1',
                            pointerEvents: expandedProject === project.id ? 'none' : 'auto',
                          }}
                        >
                          <div
                            className="absolute inset-0"
                            style={{
                              backdropFilter: 'blur(8px)',
                              WebkitBackdropFilter: 'blur(8px)',
                              backgroundColor: 'rgba(0, 0, 0, 0.3)',
                              maskImage: 'linear-gradient(to left, black 70%, transparent 100%)',
                              WebkitMaskImage: 'linear-gradient(to left, black 70%, transparent 100%)',
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
                              className="flex items-center justify-center gap-2 bg-transparent text-white border-2 border-white px-4 py-2 rounded-lg font-lexend text-lg font-semibold hover:scale-105 transition-all duration-300"
                              onMouseEnter={(e) => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.borderColor = '#C9A84C'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'white'; }}
                              aria-expanded={expandedProject === project.id}
                            >
                              {expandedProject === project.id ? <X size={20} /> : <Plus size={20} />}
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

            <button
              onClick={nextProject}
              className="flex-shrink-0 bg-gray-200 hover:text-white text-gray-700 p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
              onMouseEnter={(e) => (e.currentTarget.style.background = '#1A2332')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '')}
              aria-label="Projet suivant"
            >
              <ChevronRight size={32} />
            </button>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => { setExpandedProject(null); setCurrentProjectIndex(index); }}
                className={`h-3 rounded-full transition-all duration-300 ${index === currentProjectIndex ? 'w-8' : 'bg-gray-300 w-3 hover:bg-gray-400'}`}
                style={index === currentProjectIndex ? { background: '#C9A84C' } : undefined}
                aria-label={`Aller au projet ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {expandedProject && (
          <div ref={detailsRef} className="pt-20 pb-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              {(() => {
                const project = projects.find((p) => p.id === expandedProject);
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

                    <div className="flex justify-center mt-16">
                      <button
                        onClick={() => setExpandedProject(null)}
                        className="flex items-center justify-center gap-2 text-white px-8 py-4 rounded-lg font-lexend text-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg"
                        style={{ background: '#1A2332' }}
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
  );
};
