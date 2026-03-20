import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SEO } from '../components/SEO';

interface ServiceData {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
}

const services: ServiceData[] = [
  {
    id: 'creation',
    title: 'Conception de Systèmes Opérationnels',
    description: "Nous bâtissons l'architecture numérique de votre organisation. Centralisation des données, interfaces métiers, pilotage.",
    features: [
      "Architecture de l'information (SSOT)",
      'Systèmes métier sur-mesure',
      'Tableaux de bord stratégiques',
      'Sécurité & Robustesse',
      'Expérience utilisateur fluide',
    ],
    image: '/images/dashboard-linky.png',
    imageAlt: "Pilotage d'activité",
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
      'Réduction des délais de traitement',
    ],
    image: '/images/make-scenario.jpg',
    imageAlt: 'Optimisation de processus',
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
      'Conseil stratégique continu',
    ],
    image: '/images/ticket-linky.png',
    imageAlt: 'Suivi et performance',
  },
];

const serviceNumbers = ['01', '02', '03'];

export const Services: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          const navbarHeight = 80;
          const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO
        title="Notre Expertise - Linky"
        description="Conseil en organisation, optimisation des processus et mise en place de systèmes de pilotage pour dirigeants."
        url="https://linky4u.com/services"
      />
      <Header />

      {/* ── Hero Section — mesh gradient animé ── */}
      <section
        className="relative h-[55vh] flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0f766e, #0e7490, #0c4a6e, #0f766e, #155e75)',
          backgroundSize: '400% 400%',
          animation: 'mesh-shift 14s ease infinite',
        }}
      >
        {/* Blobs */}
        <div className="absolute pointer-events-none opacity-20 hidden md:block"
          style={{ width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, #2dd4bf, transparent)', filter: 'blur(80px)', top: '-30%', left: '-5%', animation: 'float 10s ease-in-out infinite' }} />
        <div className="absolute pointer-events-none opacity-15 hidden md:block"
          style={{ width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, #0e7490, transparent)', filter: 'blur(60px)', bottom: '-15%', right: '10%', animation: 'float-delayed 8s ease-in-out infinite' }} />

        {/* Dot pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.10]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 text-center px-6">
          <motion.p
            className="text-sm font-semibold tracking-[0.25em] uppercase mb-4 text-teal-200"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Linky · Cabinet Conseil
          </motion.p>
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-white font-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Notre Expertise
          </motion.h1>
        </div>
      </section>

      {/* ── Services — Bento Grid ── */}
      <main className="flex-grow">
        {services.map((service, index) => (
          <React.Fragment key={service.id}>
            <motion.section
              id={service.id}
              className="py-20 bg-white"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="container mx-auto px-6 max-w-6xl">
                {/* Numéro de section */}
                <motion.div
                  className="flex items-center gap-4 mb-10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <span
                    className="text-6xl font-bold leading-none"
                    style={{ color: 'rgba(13,148,136,0.15)', fontFamily: 'Bricolage Grotesque, system-ui' }}
                  >
                    {serviceNumbers[index]}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-teal-200/50 to-transparent" />
                </motion.div>

                {/* Bento grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                  {/* Grande carte titre + description + features */}
                  <motion.div
                    className="lg:col-span-2 card-glass rounded-3xl p-10 relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    whileHover={{ boxShadow: '0 24px 60px rgba(15,118,110,0.18), 0 1px 0 rgba(255,255,255,0.8) inset' }}
                  >
                    {/* Tache lumière teal en coin */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none opacity-30"
                      style={{ background: 'radial-gradient(circle, #2dd4bf, transparent)', filter: 'blur(30px)' }} />

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight relative z-10">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8 relative z-10">
                      {service.description}
                    </p>

                    <ul className="space-y-3 relative z-10">
                      {service.features.map((feature, fi) => (
                        <motion.li
                          key={fi}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.2 + fi * 0.07 }}
                        >
                          <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={11} className="text-teal-700" strokeWidth={3} />
                          </div>
                          <span className="text-gray-700 leading-snug">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Carte image */}
                  <motion.div
                    className="lg:col-span-1 rounded-3xl overflow-hidden relative"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ boxShadow: '0 16px 48px rgba(15,118,110,0.15)', minHeight: '320px', height: '100%' }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      className="w-full object-cover"
                      style={{ height: '100%', minHeight: '320px' }}
                      loading="lazy"
                    />
                    {/* Halo teal sur les bords */}
                    <div className="absolute inset-0 rounded-3xl pointer-events-none"
                      style={{ boxShadow: 'inset 0 0 0 1px rgba(45,212,191,0.2)' }} />
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* Séparateur entre services */}
            {index < services.length - 1 && (
              <div className="container mx-auto px-6 max-w-6xl">
                <div className="h-px bg-gradient-to-r from-transparent via-teal-500/25 to-transparent" />
              </div>
            )}
          </React.Fragment>
        ))}
      </main>

      <Footer />
    </div>
  );
};
