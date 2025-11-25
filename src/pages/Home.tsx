import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { HeroBanner } from '../components/home/HeroBanner';
import { ServicesSectionEntreprise } from '../components/home/tabEntreprise/ServicesSectionEntreprise';
import { ProcessSectionEntreprise } from '../components/home/tabEntreprise/ProcessSectionEntreprise';
import { TestimonialsSectionEntreprise } from '../components/home/tabEntreprise/TestimonialsSectionEntreprise';
import { TestimonialsSectionFreelance } from '../components/home/tabFreelance/TestimonialsSectionFreelance';
import { CTASectionEntreprise } from '../components/home/tabEntreprise/CTASectionEntreprise';
import { Tabs } from '../components/ui/Tabs';
import { TabType } from '../types';
import { ServicesSectionFreelance } from '../components/home/tabFreelance/ServicesSectionFreelance';
import { ProcessSectionFreelance } from '../components/home/tabFreelance/ProcessSectionFreelance';
import { CTASectionFreelance } from '../components/home/tabFreelance/CTASectionFreelance';

export const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('entreprises');

  return (
    <div className="min-h-screen flex flex-col bg-white">
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
        {activeTab === 'entreprises' && (
          <>
            <ServicesSectionEntreprise />
            <ProcessSectionEntreprise />
            {/* Affiche les témoignages pour correspondre à la maquette
            <TestimonialsSectionEntreprise /> */}
            <CTASectionEntreprise />
          </>
        )}

        {activeTab === 'freelances' && (
          <>
            <ServicesSectionFreelance />
            <ProcessSectionFreelance />
            {/* Affiche les témoignages pour correspondre à la maquette
            <TestimonialsSectionFreelance /> */}
            <CTASectionFreelance />
          </>
        )}

      </main>

      <Footer />
    </div>
  );
};