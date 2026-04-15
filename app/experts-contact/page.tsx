import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ExpertContactView } from '@/components/pages/ExpertContactView';

export const metadata: Metadata = {
  title: 'Rejoignez le réseau Opus Advisor - Candidature Expert',
  description: 'Vous êtes consultant ou expert en organisation ? Rejoignez notre réseau de partenaires qualifiés.',
  alternates: { canonical: 'https://opusadvisor.fr/experts-contact' },
};

export default function ExpertsContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <ExpertContactView />
      <Footer />
    </div>
  );
}
