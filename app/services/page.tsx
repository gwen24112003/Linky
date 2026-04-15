import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServicesView } from '@/components/pages/ServicesView';

export const metadata: Metadata = {
  title: 'Notre Expertise - Opus Advisor',
  description: "Diagnostic, implémentation et suivi continu. Opus Advisor structure vos processus et développe vos outils métier.",
  alternates: { canonical: 'https://opusadvisor.fr/services' },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <ServicesView />
      <Footer />
    </div>
  );
}
