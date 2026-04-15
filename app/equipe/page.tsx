import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TeamView } from '@/components/pages/TeamView';

export const metadata: Metadata = {
  title: "L'équipe Opus Advisor - Experts en Organisation",
  description: 'Rencontrez les associés du cabinet. Des consultants seniors dédiés à la performance opérationnelle de votre entreprise.',
  alternates: { canonical: 'https://opusadvisor.fr/equipe' },
};

export default function EquipePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <TeamView />
      <Footer />
    </div>
  );
}
