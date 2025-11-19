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
    const iconProps = { size: 28, className: 'text-white' };
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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16 text-center">
          Notre processus
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-2">
          {processSteps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center text-center max-w-[140px]">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center mb-4 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                  {getIcon(step.icon)}
                </div>
                <p className="text-sm font-medium text-gray-700 leading-snug">
                  {step.title}
                </p>
              </div>
              
              {index < processSteps.length - 1 && (
                <div className="hidden md:block mx-3">
                  <svg width="50" height="20" viewBox="0 0 50 20" fill="none">
                    <path d="M0 10 L45 10 M35 5 L45 10 L35 15" stroke="#0d9488" strokeWidth="2" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};