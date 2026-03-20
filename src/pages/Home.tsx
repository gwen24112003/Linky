import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { HeroBanner } from '../components/home/HeroBanner';
import { ServicesSectionEntreprise } from '../components/home/tabEntreprise/ServicesSectionEntreprise';
import { ProcessSectionEntreprise } from '../components/home/tabEntreprise/ProcessSectionEntreprise';
import { CTASectionEntreprise } from '../components/home/tabEntreprise/CTASectionEntreprise';
import { Tabs } from '../components/ui/Tabs';
import { TabType } from '../types';
import { ServicesSectionFreelance } from '../components/home/tabFreelance/ServicesSectionFreelance';
import { ProcessSectionFreelance } from '../components/home/tabFreelance/ProcessSectionFreelance';
import { CTASectionFreelance } from '../components/home/tabFreelance/CTASectionFreelance';
import { ArticlesSection } from '../components/home/ArticlesSection';
import { SEO } from '../components/SEO';

export const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('entreprises');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO
        title="Linky - Conseil en Organisation & Strategie Operationnelle"
        description="Partenaire strategique des dirigeants. Linky structure, clarifie et optimise vos processus pour une croissance maitrisee et durable."
      />
      <Header />

      {/* H1 cache pour SEO */}
      <h1 className="sr-only">Linky - Conseil en organisation et strategie operationnelle pour les entreprises et freelances</h1>

      <main className="flex-grow">
        <HeroBanner />

        {/* Section intro SEO */}
        <section className="bg-white py-10">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-meera">
                Linky est votre partenaire strategique en conseil en organisation et strategie operationnelle. 
                Nous aidons les entreprises et les freelances a structurer leurs processus, optimiser leur gestion 
                et accelerer leur croissance grace a des solutions no-code et des methodologies eprouvees.
              </p>
            </div>
          </div>
        </section>

        {/* Section avec tabs */}
        <div className="bg-white py-6">
          <div className="container mx-auto px-6">
            <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </div>

        {/* Contenu basé sur le tab actif */}
        <AnimatePresence mode="wait">
          {activeTab === 'entreprises' && (
            <motion.div
              key="entreprises"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ServicesSectionEntreprise />
              <ProcessSectionEntreprise />
              <ArticlesSection />
              <CTASectionEntreprise />
            </motion.div>
          )}

          {activeTab === 'freelances' && (
            <motion.div
              key="freelances"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ServicesSectionFreelance />
              <ProcessSectionFreelance />
              <ArticlesSection />
              <CTASectionFreelance />
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      <Footer />
    </div>
  );
};