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
import { ProblemsSection } from '../components/home/ProblemsSection';
import { UseCasesSection } from '../components/home/UseCasesSection';
import { FAQSection } from '../components/home/FAQSection';
import { SEO } from '../components/SEO';

export const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('entreprises');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO
        title="Opus Advisor - Cabinet de conseil en organisation & transformation"
        description="Cabinet de conseil en automatisation, IA et no-code pour TPE et PME. Audit de processus, implémentation de workflows n8n et Make, formation et maintenance. Basé en France."
      />
      <Header />

      <main className="flex-grow">
        <HeroBanner />

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
              <ProblemsSection />
              <ServicesSectionEntreprise />
              <ProcessSectionEntreprise />
              <UseCasesSection />
              <ArticlesSection />
              <FAQSection />
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
              <UseCasesSection />
              <ArticlesSection />
              <FAQSection />
              <CTASectionFreelance />
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      <Footer />
    </div>
  );
};
