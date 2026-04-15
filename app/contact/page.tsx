import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactView } from '@/components/pages/ContactView';

export const metadata: Metadata = {
  title: 'Contactez Opus Advisor - Audit & Conseil Stratégique',
  description: 'Prenez rendez-vous avec un associé Opus Advisor pour un audit de cadrage. Discutons de vos enjeux de structuration et de croissance.',
  alternates: { canonical: 'https://opusadvisor.fr/contact' },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <ContactView />
      <Footer />
    </div>
  );
}
