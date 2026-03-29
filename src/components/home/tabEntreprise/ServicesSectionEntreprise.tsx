import React, { useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Service } from '../../../types';

function useTilt(maxDeg = 12) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-0.5, 0.5], [maxDeg, -maxDeg]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-maxDeg, maxDeg]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return { rotateX, rotateY, onMove, onLeave };
}

interface TiltServiceCardProps {
  service: Service;
  index: number;
}

const TiltServiceCard: React.FC<TiltServiceCardProps> = ({ service, index }) => {
  const { rotateX, rotateY, onMove, onLeave } = useTilt(10);
  const [spotX, setSpotX] = useState(50);
  const [spotY, setSpotY] = useState(50);
  const isTouchRef = useRef(
    typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchRef.current) return;
    onMove(e);
    const r = e.currentTarget.getBoundingClientRect();
    setSpotX(((e.clientX - r.left) / r.width) * 100);
    setSpotY(((e.clientY - r.top) / r.height) * 100);
  };

  const handleLeave = () => {
    if (isTouchRef.current) return;
    onLeave();
    setSpotX(50);
    setSpotY(50);
  };

  const numbers = ['01', '02', '03', '04', '05', '06'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '1000px' }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={isTouchRef.current ? { scale: 0.97 } : undefined}
    >
      <motion.div
        style={{
          rotateX: isTouchRef.current ? 0 : rotateX,
          rotateY: isTouchRef.current ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 35 }}
        className="card-glass rounded-2xl p-8 relative overflow-hidden h-full"
        whileHover={{
          boxShadow: '0 28px 64px rgba(26,35,50,0.22), 0 1px 0 rgba(255,255,255,0.8) inset',
        }}
      >
        <span
          className="absolute -top-3 -left-1 text-[7rem] font-bold leading-none select-none pointer-events-none"
          style={{
            color: 'rgba(201,168,76,0.06)',
            fontFamily: 'Bricolage Grotesque, system-ui',
            transform: 'perspective(180px) rotateX(18deg)',
            transformOrigin: 'top left',
          }}
        >
          {numbers[index]}
        </span>

        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${spotX}% ${spotY}%, rgba(201,168,76,0.08) 0%, transparent 60%)`,
          }}
        />

        <div className="relative z-10 pt-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
            {service.title}
          </h3>
          {service.description && (
            <p className="text-sm text-gray-600 leading-relaxed mb-4">{service.description}</p>
          )}
          <ul className="space-y-3">
            {service.features?.map((feature, fi) => (
              <li key={fi} className="flex items-start gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(201,168,76,0.15)' }}
                >
                  <Check size={11} style={{ color: '#C9A84C' }} strokeWidth={3} />
                </div>
                <span className="text-gray-800 text-sm leading-snug">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ServicesSectionEntreprise: React.FC = () => {
  const services: Service[] = [
    {
      id: '1',
      title: 'Audit des processus',
      description: 'Cartographie de vos flux actuels, identification des tâches automatisables et plan d\'action priorisé.',
      features: [
        'Analyse des processus existants',
        'Identification des tâches répétitives',
        'Rapport d\'audit + feuille de route',
      ],
    },
    {
      id: '2',
      title: 'Automatisation no-code',
      description: 'Mise en place de workflows Make ou n8n adaptés à vos outils existants, sans repartir de zéro.',
      features: [
        'Workflows Make et n8n',
        'Connexion de vos outils actuels',
        'Tests et validation inclus',
      ],
    },
    {
      id: '3',
      title: 'Intégration d\'outils',
      description: 'Connexion entre vos applications métier pour éliminer les doubles saisies et les silos.',
      features: [
        'CRM, Airtable, Notion, Google Sheets',
        'Slack, email, APIs tierces',
        'Synchronisation en temps réel',
      ],
    },
    {
      id: '4',
      title: 'Intégration IA',
      description: 'Agents IA internes, extraction automatique de données et assistants sur vos documents.',
      features: [
        'Agents IA sur mesure',
        'Génération de comptes-rendus',
        'Extraction et traitement de données',
      ],
    },
    {
      id: '5',
      title: 'Reporting automatique',
      description: 'Tableaux de bord et rapports générés et envoyés automatiquement depuis vos données.',
      features: [
        'Rapports hebdomadaires automatiques',
        'Dashboards temps réel',
        'Alertes et notifications',
      ],
    },
    {
      id: '6',
      title: 'Qualification et relance',
      description: 'Systèmes de gestion de leads : qualification, ajout CRM et relances sans intervention manuelle.',
      features: [
        'Qualification automatique des leads',
        'Intégration CRM automatique',
        'Séquences de relance programmées',
      ],
    },
  ];

  return (
    <section className="pt-4 pb-20 bg-white" aria-labelledby="services-title">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mb-16 relative z-10"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 id="services-title" className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5">
            Nos expertises : de l'Audit Opérationnel à l'Intégration d'IA
          </h2>
          <p className="text-base lg:text-xl text-gray-700 leading-relaxed max-w-2xl">
            Des solutions calibrées à votre structure et à vos outils existants. Pas de sur-ingénierie, pas de dépendances inutiles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, i) => (
            <TiltServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-3 text-white px-8 py-4 text-base rounded-xl font-semibold hover:scale-105 transition-all duration-200 hover:shadow-xl group btn-shimmer"
            style={{ background: '#1A2332' }}
          >
            Voir le détail de nos services
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </section>
  );
};
