'use client';

import React, { useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Service } from '@/types';

function useTilt(maxDeg = 10) {
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

interface TiltCardProps { service: Service; index: number; }

const TiltCard: React.FC<TiltCardProps> = ({ service, index }) => {
  const { rotateX, rotateY, onMove, onLeave } = useTilt(10);
  const [spotX, setSpotX] = useState(50);
  const [spotY, setSpotY] = useState(50);
  const isTouch = useRef(
    typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch.current) return;
    onMove(e);
    const r = e.currentTarget.getBoundingClientRect();
    setSpotX(((e.clientX - r.left) / r.width) * 100);
    setSpotY(((e.clientY - r.top) / r.height) * 100);
  };

  const numbers = ['01', '02', '03'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '1000px' }}
      onMouseMove={handleMove}
      onMouseLeave={() => { if (!isTouch.current) { onLeave(); setSpotX(50); setSpotY(50); } }}
    >
      <motion.div
        style={{
          rotateX: isTouch.current ? 0 : rotateX,
          rotateY: isTouch.current ? 0 : rotateY,
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
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${spotX}% ${spotY}%, rgba(201,168,76,0.08) 0%, transparent 60%)`,
          }}
        />

        <div className="relative z-10 pt-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">
            {service.title}
          </h3>
          <ul className="space-y-4">
            {service.features?.map((feature, fi) => (
              <li key={fi} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(201,168,76,0.15)' }}>
                  <Check size={11} style={{ color: '#C9A84C' }} strokeWidth={3} />
                </div>
                <span className="text-gray-800 leading-snug">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ServicesSectionFreelance: React.FC = () => {
  const services: Service[] = [
    {
      id: '1',
      title: 'Missions à fort impact',
      features: [
        'Projets de transformation organisationnelle',
        'Clients PME, ETI et grands comptes',
        'Missions avec enjeux mesurables',
      ],
    },
    {
      id: '2',
      title: "Cadre d'intervention structuré",
      features: [
        'Méthodologie Opus Advisor',
        'Outils, frameworks et livrables partagés',
        'Support opérationnel tout au long de la mission',
      ],
    },
    {
      id: '3',
      title: 'Partenariat sur mesure',
      features: [
        "Apport d'affaires qualifié",
        "Réseau d'experts complémentaires",
        'Respect total de votre indépendance',
      ],
    },
  ];

  return (
    <section className="pt-4 pb-20 bg-white" aria-labelledby="services-experts-title">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 id="services-experts-title" className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5">
            Rejoignez notre réseau de Consultants en Automatisation
          </h2>
          <p className="text-gray-700 text-base lg:text-xl leading-relaxed max-w-2xl">
            Nous collaborons avec des consultants indépendants sélectionnés pour délivrer une valeur concrète à nos clients. Si vous êtes expert en organisation, transformation ou opérations, parlons-nous.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, i) => (
            <TiltCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/experts-contact"
            className="inline-flex items-center gap-3 text-white px-8 py-4 text-base rounded-xl font-semibold hover:scale-105 transition-all duration-200 hover:shadow-xl group btn-shimmer"
            style={{ background: '#1A2332' }}
          >
            Postuler au réseau
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </section>
  );
};
