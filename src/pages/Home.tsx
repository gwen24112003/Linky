import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { HeroBanner } from '../components/home/HeroBanner';
import { ServicesSection } from '../components/home/ServicesSection';
import { ProcessSection } from '../components/home/ProcessSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { CTASection } from '../components/home/CTASection';
import { Tabs } from '../components/ui/Tabs';
import { TabType } from '../types';

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
            <ServicesSection />
            <ProcessSection />
            {/* Affiche les témoignages pour correspondre à la maquette */}
            <TestimonialsSection />
          </>
        )}

        {activeTab === 'freelances' && (
          <div className="bg-white py-20">
            <div className="container mx-auto px-6">
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-16 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Section Freelances
                </h2>
                <p className="text-gray-600 text-lg">
                  Contenu pour les freelances à implémenter selon vos besoins
                </p>
              </div>
            </div>
          </div>
        )}

        <CTASection />
      </main>

      <Footer />
    </div>
  );
};