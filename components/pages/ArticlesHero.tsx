'use client';

import React from 'react';
import { SectionKicker } from '@/components/ui/SectionKicker';

const NAVY = '#1A2332';

export const ArticlesHero: React.FC = () => (
  <section className="pt-36 pb-20 md:pt-44 md:pb-24" style={{ background: NAVY }}>
    <div className="container mx-auto px-6 max-w-5xl">
      <SectionKicker label="Le journal" tone="dark" className="mb-8" />
      <h1 className="font-heading font-bold leading-[1.0] tracking-tight text-5xl md:text-6xl lg:text-7xl text-white">
        Conseils et retours terrain.
      </h1>
      <p className="mt-7 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">
        Méthodes de consolidation, outils BTP comparés, facturation électronique, automatisations
        testées sur le terrain. Lecture courte, sans jargon.
      </p>
    </div>
  </section>
);
