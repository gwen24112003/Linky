'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Tabs } from '../ui/Tabs';
import { TabType } from '@/types';
import { ProblemsSection } from './ProblemsSection';
import { ServicesSectionEntreprise } from './tabEntreprise/ServicesSectionEntreprise';
import { ProcessSectionEntreprise } from './tabEntreprise/ProcessSectionEntreprise';
import { CTASectionEntreprise } from './tabEntreprise/CTASectionEntreprise';
import { ServicesSectionFreelance } from './tabFreelance/ServicesSectionFreelance';
import { ProcessSectionFreelance } from './tabFreelance/ProcessSectionFreelance';
import { CTASectionFreelance } from './tabFreelance/CTASectionFreelance';
import { UseCasesSection } from './UseCasesSection';
import { ArticlesSection } from './ArticlesSection';
import { FAQSection } from './FAQSection';

export const HomeTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('entreprises');

  return (
    <>
      <div className="bg-white py-6">
        <div className="container mx-auto px-6">
          <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

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
    </>
  );
};
