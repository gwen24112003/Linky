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
  price: string;
  priceNote?: string;
}

const services: ServiceData[] = [
  {
    id: 'diagnostic',
    title: 'Diagnostic & Stratégie',
    description: "On ne touche à rien avant de comprendre. Audit de votre organisation, cartographie des flux, identification des vrais blocages. Vous repartez avec une feuille de route claire, pas un rapport de 80 pages.",
    features: [
      "Audit complet de l'existant",
      "Identification des points de friction",
      "Cartographie des processus",
      "Conseil stratégique et priorisation",
      "Feuille de route opérationnelle",
    ],
    image: '/images/dashboard-linky.png',
    imageAlt: 'Diagnostic & Stratégie',
    price: 'À partir de 2 000€',
  },
  {
    id: 'implementation',
    title: 'Implémentation',
    description: "On construit, on n'envoie pas des specs. Automatisation, développement d'applications métier sur-mesure, intégrations. On passe de la stratégie au produit fonctionnel sans intermédiaire.",
    features: [
      "Automatisation (Make, Zapier, n8n)",
      "Développement d'applications métier sur-mesure",
      "Intégrations et interconnexion d'outils",
      "Interfaces adaptées à vos process",
      "Fiabilisation et structuration de la donnée",
    ],
    image: '/images/make-scenario.jpg',
    imageAlt: 'Implémentation',
    price: 'À partir de 5 000€',
  },
  {
    id: 'suivi',
    title: 'Suivi & Croissance',
    description: "On reste parce que ça a de la valeur. Maintenance, mises à jour, nouvelles fonctionnalités, formation des équipes. Un partenariat continu pour que vos outils évoluent avec votre activité.",
    features: [
      "Maintenance et mises à jour",
      "Développement de nouvelles fonctionnalités",
      "Formation des équipes",
      "Suivi de la performance",
      "Support prioritaire",
    ],
    image: '/images/ticket-linky.png',
    imageAlt: 'Suivi & Croissance',
    price: 'À partir de 400€ / mois',
    priceNote: 'MAJ & formations sur devis',
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
        title="Notre Expertise - Opus Advisor"
        description="Diagnostic, implémentation et suivi continu. Opus Advisor structure vos processus et développe vos outils métier."
        url="https://opusadvisor.fr/services"
      />
      <Header />

      {/* ── Hero Section — mesh gradient animé ── */}
      <section
        className="relative h-[55vh] flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1A2332, #2A3A50, #1A2332)',
          backgroundSize: '400% 400%',
          animation: 'mesh-shift 14s ease infinite',
        }}
      >
        {/* Blobs */}
        <div className="absolute pointer-events-none opacity-20 hidden md:block"
          style={{ width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.3), transparent)', filter: 'blur(80px)', top: '-30%', left: '-5%', animation: 'float 10s ease-in-out infinite' }} />
        <div className="absolute pointer-events-none opacity-15 hidden md:block"
          style={{ width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,35,50,0.6), transparent)', filter: 'blur(60px)', bottom: '-15%', right: '10%', animation: 'float-delayed 8s ease-in-out infinite' }} />

        {/* Dot pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.10]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 text-center px-6">
          <motion.p
            className="text-sm font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: '#C9A84C' }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Opus Advisor · Cabinet Conseil
          </motion.p>
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-white"
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
                    style={{ color: 'rgba(201,168,76,0.25)', fontFamily: 'Bricolage Grotesque, system-ui' }}
                  >
                    {serviceNumbers[index]}
                  </span>
                  <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.3), transparent)' }} />
                </motion.div>

                {/* Bento grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">

                  {/* Grande carte titre + description + features */}
                  <motion.div
                    className="card-glass rounded-3xl p-8 lg:p-10 relative overflow-hidden flex flex-col justify-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    whileHover={{ boxShadow: '0 24px 60px rgba(201,168,76,0.12), 0 1px 0 rgba(255,255,255,0.8) inset' }}
                  >
                    {/* Tache lumière gold en coin */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none opacity-30"
                      style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.5), transparent)', filter: 'blur(30px)' }} />

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight relative z-10">
                      {service.title}
                    </h2>
                    <p className="text-gray-800 text-lg leading-relaxed mb-8 relative z-10">
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
                          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(201,168,76,0.15)' }}>
                            <Check size={11} style={{ color: '#C9A84C' }} strokeWidth={3} />
                          </div>
                          <span className="text-gray-900 leading-snug">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="mt-8 pt-6 border-t border-gray-100 relative z-10">
                      <p className="text-2xl font-bold text-gray-900">{service.price}</p>
                      {service.priceNote && (
                        <p className="text-sm text-gray-400 mt-1">{service.priceNote}</p>
                      )}
                    </div>
                  </motion.div>

                  {/* Carte image */}
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      className="w-full h-full object-cover object-left rounded-3xl shadow-[0_20px_50px_rgba(26,35,50,0.15)]"
                      loading="lazy"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* Séparateur entre services */}
            {index < services.length - 1 && (
              <div className="container mx-auto px-6 max-w-6xl">
                <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.25), transparent)' }} />
              </div>
            )}
          </React.Fragment>
        ))}
      </main>

      <Footer />
    </div>
  );
};
