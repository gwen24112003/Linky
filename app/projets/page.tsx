import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const PAGE_URL = 'https://opusadvisor.fr/projets';
const PAGE_TITLE = 'Cas clients — Opus Advisory';
const PAGE_DESCRIPTION =
  "Cette page a été déplacée vers /cas-clients.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: 'https://opusadvisor.fr/cas-clients' },
  robots: { index: false, follow: true },
  other: {
    refresh: '0; url=/cas-clients',
  },
};

export default function ProjetsRedirectPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow flex items-center justify-center py-32 px-6 text-center">
        <div className="max-w-md">
          <h1 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#1A2332' }}>
            Cette page a déménagé.
          </h1>
          <p className="text-gray-600 mb-6">
            Les cas clients sont désormais ici :
          </p>
          <Link
            href="/cas-clients"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02]"
            style={{ background: '#C9A84C', color: '#1A2332' }}
          >
            Voir les cas clients
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
