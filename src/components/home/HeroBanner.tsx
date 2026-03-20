import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, type Variants } from 'framer-motion';
import { Button } from '../ui/Button';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const line1 = ['Donnez', 'à', 'votre', 'Ambition'];
const line2 = ['la', 'Structure', "qu'elle", 'mérite'];

export const HeroBanner: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // 3 depth layers — vitesses différentes pour l'illusion de profondeur
  const bgX  = useTransform(rawX, [-0.5, 0.5], ['-20px', '20px']);
  const bgY  = useTransform(rawY, [-0.5, 0.5], ['-10px', '10px']);
  const midX = useTransform(rawX, [-0.5, 0.5], ['-45px', '45px']);
  const midY = useTransform(rawY, [-0.5, 0.5], ['-22px', '22px']);
  const fgX  = useTransform(rawX, [-0.5, 0.5], ['-80px', '80px']);
  const fgY  = useTransform(rawY, [-0.5, 0.5], ['-40px', '40px']);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={sectionRef}
      className="relative text-white overflow-hidden flex items-center min-h-screen"
      onMouseMove={handleMouseMove}
      style={{
        background: 'linear-gradient(135deg, #0f766e, #0e7490, #0c4a6e, #0f766e, #155e75)',
        backgroundSize: '400% 400%',
        animation: 'mesh-shift 14s ease infinite',
        minHeight: '100vh',
      }}
    >
      {/* ── Couche 1 : Gros blobs flous (arrière-plan) ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ x: bgX, y: bgY, top: '-10%', left: '-15%', width: '700px', height: '700px' }}
      >
        <div
          className="w-full h-full rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, #2dd4bf 0%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'float 10s ease-in-out infinite',
          }}
        />
      </motion.div>

      <motion.div
        className="absolute pointer-events-none"
        style={{ x: bgX, y: bgY, bottom: '-5%', right: '-10%', width: '500px', height: '500px' }}
      >
        <div
          className="w-full h-full rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #0d9488 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'float-delayed 8s ease-in-out infinite',
          }}
        />
      </motion.div>

      {/* ── Couche 2 : Formes géométriques 3D (desktop uniquement) ── */}

      {/* Anneau rotatif — gauche */}
      <motion.div
        className="absolute hidden md:block pointer-events-none"
        style={{ x: midX, y: midY, top: '15%', left: '5%' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        <div style={{
          width: 90, height: 90, borderRadius: '50%',
          border: '1.5px solid rgba(45,212,191,0.3)',
          boxShadow: '0 0 20px rgba(45,212,191,0.08)',
        }} />
      </motion.div>

      {/* Anneau rotatif lent — droite */}
      <motion.div
        className="absolute hidden md:block pointer-events-none"
        style={{ x: midX, y: midY, top: '18%', right: '8%' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <div style={{
          width: 70, height: 70, borderRadius: '50%',
          border: '1.5px solid rgba(45,212,191,0.25)',
        }}>
          <div style={{
            position: 'absolute', inset: 8, borderRadius: '50%',
            border: '1px solid rgba(45,212,191,0.15)',
          }} />
        </div>
      </motion.div>

      {/* Petit carré rotatif — bas droite */}
      <motion.div
        className="absolute hidden md:block pointer-events-none"
        style={{ x: fgX, y: fgY, bottom: '25%', right: '18%' }}
        animate={{ rotate: 45 }}
        transition={{ duration: 0.01, repeat: 0 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          style={{
            width: 50, height: 50,
            border: '1.5px solid rgba(153,246,228,0.35)',
            borderRadius: 6,
          }}
        />
      </motion.div>

      {/* ── Couche 3 : Orbe proche (fort parallaxe) ── */}
      <motion.div
        className="absolute hidden md:block pointer-events-none"
        style={{ x: fgX, y: fgY, top: '55%', left: '12%', width: '180px', height: '180px' }}
      >
        <div
          className="w-full h-full rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, #99f6e4 0%, transparent 70%)',
            filter: 'blur(30px)',
            animation: 'float 6s ease-in-out infinite',
          }}
        />
      </motion.div>

      {/* ── Dot pattern overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── Contenu principal ── */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Overline */}
          <motion.p
            className="text-sm font-semibold tracking-[0.25em] uppercase mb-6 text-teal-200"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Conseil en Organisation · Experts Sélectionnés
          </motion.p>

          {/* H1 word stagger */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <span className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              {line1.map((word) => (
                <motion.span key={word} variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-1">
              {line2.map((word) => (
                <motion.span
                  key={word}
                  variants={wordVariants}
                  className={`inline-block ${word === 'Structure' ? 'text-teal-200' : ''}`}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-white/75 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Nous aidons les dirigeants à structurer, clarifier et optimiser leurs processus pour une croissance maîtrisée.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <Link to="/services">
              <Button variant="primary" className="btn-shimmer">
                Notre Expertise
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary">
                Échanger avec un associé
              </Button>
            </Link>
          </motion.div>

          {/* Trust signal — pill glassmorphism */}
          <motion.div
            className="inline-flex items-center justify-center gap-6 px-8 py-3 rounded-full text-sm text-white/70"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.18)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <span>2 associés seniors</span>
            <span className="w-px h-4 bg-white/25" />
            <span>France</span>
            <span className="w-px h-4 bg-white/25" />
            <span>Missions depuis 2022</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
    </section>
  );
};
