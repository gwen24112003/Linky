import React from 'react';
import { Lightbulb, Layers, Code, TestTube, Rocket } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const processSteps = [
    {
      id: '1',
      icon: 'lightbulb',
      title: 'Premier contact'
    },
    {
      id: '2',
      icon: 'layers',
      title: 'Brainstorming & alignement'
    },
    {
      id: '3',
      icon: 'code',
      title: 'Prototypage & conception'
    },
    {
      id: '4',
      icon: 'test',
      title: 'Tests utilisateurs'
    },
    {
      id: '5',
      icon: 'rocket',
      title: 'Livraison des solutions'
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
          <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-12">
            Notre processus
          </h2>

          <div className="flex flex-col md:flex-row items-start justify-center gap-6 md:gap-4">
            {processSteps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center max-w-[140px]">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-teal-800 flex items-center justify-center mb-4 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                    {getIcon(step.icon)}
                  </div>
                    <p className="text-l text-center md:text-l lg:text-xl text-gray-600 text-base leading-relaxed">
                    {step.title}
                  </p>
                </div>

                {index < processSteps.length - 1 && (
                  <div className="hidden md:block mx-5" style={{ marginTop: '30px' }}>
                    <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
                      <path d="M0 12 L55 12 M42 6 L55 12 L42 18" stroke="#0d9488" strokeWidth="2.5" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};