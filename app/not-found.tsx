import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow flex items-center justify-center py-24">
        <div className="text-center px-6">
          <p className="text-sm font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: '#C9A84C' }}>
            Erreur 404
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">Page introuvable</h1>
          <p className="text-gray-600 text-lg mb-10 max-w-md mx-auto">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-200"
            style={{ background: '#1A2332' }}
          >
            Retour à l'accueil
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
