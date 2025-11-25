import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Lightbulb, User, Settings, ThumbsUp, Brain } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

interface Value {
  icon: string;
  title: string;
}

export const Team: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: 'Enzo Monnier',
      role: 'Fondateur &',
      description: 'Développeur No-Code',
      image: '/images/enzo.jpg'
    },
    {
      name: 'Gwendoline Vanelle',
      role: 'Office Manager &',
      description: 'Développeuse No-Code',
      image: '/images/gwendoline.png'
    }
  ];

  const values: Value[] = [
    { icon: 'lightbulb', title: 'Créativité' },
    { icon: 'user', title: 'Personnalisation' },
    { icon: 'settings', title: 'Accompagnement' },
    { icon: 'thumbsup', title: 'Simplicité' },
    { icon: 'brain', title: 'Innovation' }
  ];

  const getIcon = (iconName: string) => {
    const iconProps = { size: 32, className: 'text-white' };
    switch (iconName) {
      case 'lightbulb':
        return <Lightbulb {...iconProps} />;
      case 'user':
        return <User {...iconProps} />;
      case 'settings':
        return <Settings {...iconProps} />;
      case 'thumbsup':
        return <ThumbsUp {...iconProps} />;
      case 'brain':
        return <Brain {...iconProps} />;
      default:
        return <Lightbulb {...iconProps} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section with overlapping team cards */}
        <section className="relative overflow-visible">
          {/* Banner Background */}
          <div 
            className="relative overflow-hidden flex items-center justify-center" 
            style={{
              backgroundImage: 'url(/images/linky-banner.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '50vh'
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20"></div>
            
            <div className="container mx-auto px-6 relative z-10">
              <h1 className="text-4xl md:text-6xl lg:text-8xl text-white text-center leading-tight">
                Notre équipe
              </h1>
            </div>
          </div>
          
          {/* Team Members Cards - Overlapping the banner */}
          <div className="container mx-auto px-6 -mt-24 relative z-20">
            <div className="flex flex-wrap justify-center gap-24 max-w-5xl mx-auto">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="rounded-2xl shadow-xl overflow-hidden w-96"
                >
                  <div className="h-[32rem] relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay avec dégradé de flou */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-16 text-center text-white">
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        backdropFilter: 'blur(0px)',
                        WebkitBackdropFilter: 'blur(0px)',
                        maskImage: 'linear-gradient(to top, transparent, black)',
                        WebkitMaskImage: 'linear-gradient(to top, transparent, black)'
                      }}></div>
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)',
                        maskImage: 'linear-gradient(to top, black 30%, transparent 70%)',
                        WebkitMaskImage: 'linear-gradient(to top, black 30%, transparent 70%)'
                      }}></div>
                      <div className="relative z-10">
                        <h3 className="text-3xl md:text-4xl font-bold mb-2">{member.name}</h3>
                        <p className="text-lg md:text-xl">{member.role}</p>
                        <p className="text-lg md:text-xl">{member.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="bg-white rounded-3xl border-2 border-gray-200 p-12 shadow-lg">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5">Notre mission</h2>
              <p className="text-l md:text-l lg:text-xl text-gray-600 text-base leading-relaxed mb-6">
                Nous croyons que le no-code permet de créer rapidement des produits à l'image de ceux qui les imaginent, sans barrières techniques.
              </p>
              <p className="text-l md:text-l lg:text-xl text-gray-600 text-base leading-relaxed">
                Avec Linky, vous bénéficiez de deux experts en no-code, automation et IA, dédiés à transformer vos idées en solutions concrètes et personnalisées.
              </p>

              {/* Values Icons */}
              <div className="flex flex-wrap justify-center gap-24 mt-12">
                {values.map((value) => (
                  <div key={value.title} className="flex flex-col items-center gap-3">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-teal-800 flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                      {getIcon(value.icon)}
                    </div>
                    <span className="text-sm lg:text-base text-center text-gray-600 leading-relaxed">{value.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
