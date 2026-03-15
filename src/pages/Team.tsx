import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Eye, Handshake, Star, Telescope } from 'lucide-react';
import { bannerStyles } from '../theme/bannerStyles';
import { SEO } from '../components/SEO';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  scale?: number;
  translateY?: number;
}

interface Value {
  icon: string;
  title: string;
}

export const Team: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: 'Enzo Monnier',
      role: 'Fondateur & Stratège',
      description: 'Consultant',
      image: '/images/enzo.jpg'
    },
    {
      name: 'Gwendoline Vanelle',
      role: 'Associée & Experte Processus',
      description: 'Consultante',
      image: '/images/gwen.jpg',
      scale: 1.5,
      translateY: 10
    }
  ];

  const values: Value[] = [
    { icon: 'eye', title: 'Lucidité' },
    { icon: 'handshake', title: 'Proximité' },
    { icon: 'star', title: 'Excellence' },
    { icon: 'telescope', title: 'Vision' }
  ];

  const getIcon = (iconName: string) => {
    const iconProps = { size: 32, className: 'text-white' };
    switch (iconName) {
      case 'eye':
        return <Eye {...iconProps} />;
      case 'handshake':
        return <Handshake {...iconProps} />;
      case 'star':
        return <Star {...iconProps} />;
      case 'telescope':
        return <Telescope {...iconProps} />;
      default:
        return <Eye {...iconProps} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO
        title="L'équipe Linky - Experts en Organisation"
        description="Rencontrez les associés du cabinet. Des consultants seniors dédiés à la performance opérationnelle de votre entreprise."
        url="https://linky4u.com/equipe"
      />
      <Header />

      <main className="flex-grow">
        {/* Hero Section with overlapping team cards */}
        <section className="relative overflow-visible">
          {/* Banner Background */}
          <div
            className="relative overflow-hidden flex items-center justify-center"
            style={bannerStyles}
          >
            <div className="container mx-auto px-6 relative z-10">
              <motion.h1
                className="text-4xl md:text-6xl lg:text-8xl text-white text-center leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                L'équipe Linky
              </motion.h1>
            </div>
          </div>

          {/* Team Members Cards - Overlapping the banner */}
          <div className="container mx-auto px-6 -mt-24 relative z-20">
            <div className="flex flex-wrap justify-center gap-24 max-w-5xl mx-auto">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member.name}
                  className="rounded-2xl shadow-xl overflow-hidden w-96"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="h-[32rem] relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300"
                      style={{
                        transform: `scale(${member.scale || 1}) translateY(${member.translateY || 0}%)`
                      }}
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="bg-white rounded-3xl border-2 border-gray-200 p-12 shadow-lg">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5">
                Notre Vision
              </h2>
              <p className="text-l md:text-l lg:text-xl text-gray-600 text-base leading-relaxed mb-6">
                Au-delà de la simple gestion de projet, nous croyons qu'une architecture opérationnelle robuste est le socle indispensable de toute croissance pérenne. Dans un éco-système en perpétuelle mutation, la capacité à exécuter vite et bien ne dépend pas d'outils magiques, mais d'une structure pensée pour l'agilité.
              </p>
              <p className="text-l md:text-l lg:text-xl text-gray-600 text-base leading-relaxed mb-6">
                Linky est né d'une conviction forte : la technologie doit servir la stratégie, et non l'inverse. Trop souvent, les entreprises s'épuisent à compenser des processus défaillants au lieu de se concentrer sur leur vision.
              </p>
              <p className="text-l md:text-l lg:text-xl text-gray-600 text-base leading-relaxed">
                Nous vous apportons cette lucidité structurelle. En alignant vos processus sur vos ambitions, nous transformons votre opérationnel en un levier de performance silencieux mais redoutable.
              </p>

              {/* Values Icons */}
              <div className="flex flex-wrap justify-center gap-24 mt-12">
                {values.map((value) => (
                  <div key={value.title} className="flex flex-col items-center gap-3">
                    <div className="w-20 h-20 rounded-full bg-teal-700 border border-teal-500/50 flex items-center justify-center hover:bg-teal-600 transition-colors duration-200">
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
