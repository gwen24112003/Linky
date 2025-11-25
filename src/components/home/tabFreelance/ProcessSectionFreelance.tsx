import React from 'react';
import { Lightbulb, Layers, Code, TestTube, Rocket } from 'lucide-react';

export const ProcessSectionFreelance: React.FC = () => {
  const processSteps = [
    {
      id: '1',
      icon: 'lightbulb',
      title: 'Inscription'
    },
    {
      id: '2',
      icon: 'layers',
      title: 'Validation du dossier'
    },
    {
      id: '3',
      icon: 'code',
      title: 'Activation du profil'
    },
    {
      id: '4',
      icon: 'test',
      title: 'Reception des missions'
    },
    {
      id: '5',
      icon: 'rocket',
      title: 'Choix sans engagement'
    }
  ];

  const getIcon = (iconName: string) => {
    const iconProps = { size: 36, className: 'text-white' };
    switch (iconName) {
      case 'lightbulb':
        return <Lightbulb {...iconProps} />;
      case 'layers':
        return <Layers {...iconProps} />;
      case 'code':
        return <Code {...iconProps} />;
      case 'test':
        return <TestTube {...iconProps} />;
      case 'rocket':
        return <Rocket {...iconProps} />;
      default:
        return <Lightbulb {...iconProps} />;
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-lg">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-12 text-center">
            Notre processus
          </h2>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-2">
            {processSteps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center flex-1">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full bg-gradient-to-br from-teal-400 to-teal-800 flex items-center justify-center mb-4 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                    {getIcon(step.icon)}
                  </div>
                  <p className="text-sm lg:text-base xl:text-lg text-center text-gray-600 leading-relaxed px-2">
                    {step.title}
                  </p>
                </div>

                {index < processSteps.length - 1 && (
                  <>
                    {/* Flèche horizontale pour desktop */}
                    <div className="hidden lg:flex items-center mx-2 xl:mx-5" style={{ height: '80px', alignSelf: 'flex-start' }}>
                      <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="xl:w-[60px] xl:h-[24px]">
                        <path d="M0 10 L35 10 M22 4 L35 10 L22 16" stroke="#0d9488" strokeWidth="2.5" />
                      </svg>
                    </div>
                    {/* Flèche verticale pour mobile */}
                    <div className="lg:hidden my-2">
                      <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
                        <path d="M12 0 L12 35 M6 22 L12 35 L18 22" stroke="#0d9488" strokeWidth="2.5" />
                      </svg>
                    </div>
                  </>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};