import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProjectsView } from '@/components/pages/ProjectsView';

export const metadata: Metadata = {
  title: 'Réalisations & Cas Clients - Opus Advisor',
  description: "Découvrez comment Opus Advisor a transformé l'organisation de leaders de la distribution, scale-ups B2B et PME industrielles.",
  alternates: { canonical: 'https://opusadvisor.fr/projets' },
};

export default function ProjetsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <ProjectsView />
      <Footer />
    </div>
  );
}
