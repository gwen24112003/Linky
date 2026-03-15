import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring, type Variants } from 'framer-motion';
import { Button } from '../ui/Button';
import { bannerStyles } from '../../theme/bannerStyles';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const line1 = ['Donnez', 'à', 'votre', 'Ambition'];
const line2 = ['la', 'Structure', "qu'elle", 'mérite'];

const HeroCard: React.FC<{
  style?: React.CSSProperties;
  delay?: number;
  children: React.ReactNode;
}> = ({ style, delay = 0, children }) => (
  <motion.div
    className="card-glass rounded-2xl p-5 absolute"
    initial={{ opacity: 0, y: 40, rotateY: -20 }}
    animate={{ opacity: 1, y: 0, rotateY: 0 }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    style={style}
  >
    {children}
  </motion.div>
);

export const HeroBanner: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-5, 5]), { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={heroRef}
      className="relative text-white overflow-hidden flex items-center min-h-screen"
      style={{ ...bannerStyles, minHeight: '100vh' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

          {/* Left column — Text */}
          <div className="flex-1 lg:w-[55%]">
            {/* Overline */}
            <motion.p
              className="text-sm font-semibold tracking-[0.25em] uppercase mb-6"
              style={{ color: '#c8a96e' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Conseil en Organisation · Experts Sélectionnés
            </motion.p>

            {/* H1 with word stagger */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <span className="flex flex-wrap gap-x-4 gap-y-1">
                {line1.map((word) => (
                  <motion.span key={word} variants={wordVariants} className="inline-block">
                    {word}
                  </motion.span>
                ))}
              </span>
              <span className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                {line2.map((word) => (
                  <motion.span
                    key={word}
                    variants={wordVariants}
                    className={`inline-block ${word === 'Structure' ? 'text-gradient' : ''}`}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg text-white/70 mb-10 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Nous aidons les dirigeants à structurer, clarifier et optimiser leurs processus pour une croissance maîtrisée.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
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

            {/* Trust signal */}
            <motion.div
              className="flex items-center gap-6 text-sm text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <span>2 associés seniors</span>
              <span className="w-px h-4 bg-white/20" />
              <span>Paris</span>
              <span className="w-px h-4 bg-white/20" />
              <span>Missions depuis 2022</span>
            </motion.div>
          </div>

          {/* Right column — 3D Card Stack */}
          <div className="hidden lg:flex flex-1 lg:w-[45%] justify-center items-center">
            <motion.div
              className="relative w-80 h-96"
              style={{
                perspective: 1200,
                rotateX,
                rotateY,
              }}
            >
              {/* Card 3 — back */}
              <HeroCard
                delay={0.4}
                style={{
                  width: 280,
                  top: 20,
                  left: 40,
                  transform: 'perspective(1000px) rotateX(10deg) rotateY(-15deg) translateZ(-60px)',
                  animationName: 'float-delayed',
                  animationDuration: '4.5s',
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                }}
              >
                <p className="text-xs text-teal-400/70 mb-2 font-medium tracking-wider uppercase">Performance</p>
                <div className="flex items-end gap-1 mb-3">
                  {[40, 65, 50, 80, 70, 90, 75].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-sm bg-teal-500/60"
                      style={{ height: h * 0.6 }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 0.6 + i * 0.06, duration: 0.4 }}
                    />
                  ))}
                </div>
                <p className="text-xs text-white/40">Optimisation continue</p>
              </HeroCard>

              {/* Card 2 — middle */}
              <HeroCard
                delay={0.6}
                style={{
                  width: 300,
                  top: 60,
                  left: 10,
                  transform: 'perspective(1000px) rotateX(8deg) rotateY(-18deg) translateZ(0px)',
                  animationName: 'float',
                  animationDuration: '5s',
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                }}
              >
                <p className="text-xs text-teal-400/70 mb-3 font-medium tracking-wider uppercase">Stratégie</p>
                <div className="space-y-2">
                  {['Diagnostic', 'Architecture', 'Accompagnement'].map((label, i) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-teal-400" />
                      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-teal-500/70 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${[80, 65, 90][i]}%` }}
                          transition={{ delay: 0.8 + i * 0.15, duration: 0.7, ease: 'easeOut' }}
                        />
                      </div>
                      <span className="text-xs text-white/40">{[80, 65, 90][i]}%</span>
                    </div>
                  ))}
                </div>
              </HeroCard>

              {/* Card 1 — front */}
              <HeroCard
                delay={0.8}
                style={{
                  width: 260,
                  top: 140,
                  left: 30,
                  transform: 'perspective(1000px) rotateX(5deg) rotateY(-20deg) translateZ(60px)',
                  animationName: 'float',
                  animationDuration: '4s',
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                  animationDelay: '1s',
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-teal-500/30 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-teal-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/60">ROI moyen</p>
                    <motion.p
                      className="text-2xl font-bold text-teal-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                    >
                      +42%
                    </motion.p>
                  </div>
                </div>
                <p className="text-xs text-white/30">sur les missions structuration</p>
              </HeroCard>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
    </section>
  );
};
