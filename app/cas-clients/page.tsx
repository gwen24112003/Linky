import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const NAVY = '#1A2332';
const GOLD = '#C9A84C';

const PAGE_URL = 'https://opusadvisor.fr/cas-clients';
const PAGE_TITLE = 'Cas clients — Opus Advisory';
const PAGE_DESCRIPTION =
  "Premiers cas clients publics publiés en janvier 2027. Entre-temps, on vous montre des systèmes déjà en production, en visio, sous accord de confidentialité.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    type: 'website',
    images: [{ url: 'https://opusadvisor.fr/images/opus-banner.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['https://opusadvisor.fr/images/opus-banner.png'],
  },
};

export default function CasClientsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        {/* Hero */}
        <section
          className="relative text-white overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20"
          style={{
            background: `linear-gradient(135deg, ${NAVY}, #223047 55%, ${NAVY})`,
          }}
        >
          <div
            className="absolute pointer-events-none opacity-40"
            style={{
              top: '-10%',
              left: '-10%',
              width: 500,
              height: 500,
              background: `radial-gradient(circle, ${GOLD}33 0%, transparent 70%)`,
              filter: 'blur(80px)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.08]"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <p
                className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase mb-4"
                style={{ color: GOLD }}
              >
                Cas clients
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Les premiers cas publics arrivent en janvier 2027.
              </h1>
              <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl">
                On préfère laisser tourner les systèmes 6 mois avant de publier des chiffres. Pas de cas client enjolivé, pas de témoignage écrit sous contrainte.
              </p>
            </div>
          </div>
        </section>

        {/* Promesse honnête */}
        <section className="py-16 md:py-24 bg-[#FAF8F4]">
          <div className="container mx-auto px-6 max-w-3xl">
            <div
              className="bg-white rounded-3xl p-8 md:p-12"
              style={{
                border: '1px solid rgba(26,35,50,0.08)',
                boxShadow: '0 12px 40px rgba(26,35,50,0.06)',
              }}
            >
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
                style={{ color: GOLD }}
              >
                En attendant
              </p>
              <h2
                className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-5"
                style={{ color: NAVY }}
              >
                On vous montre des systèmes en production, en visio.
              </h2>
              <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed mb-8">
                <p>
                  Si vous voulez voir concrètement à quoi ressemble un système Opus, on organise une démo commentée sous accord de confidentialité. 45 minutes en visio, on ouvre un Batappli, un Notion chantier, des scénarios Make. Vous voyez les données, les dashboards, les automations en live.
                </p>
                <p>
                  <strong style={{ color: NAVY }}>Ce n'est pas un sales pitch.</strong> C'est littéralement le système d'un client existant, avec son autorisation. Vous repartez avec une vision claire de ce qui est possible pour votre boîte.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm md:text-base transition-all duration-200 hover:scale-[1.02]"
                style={{ background: GOLD, color: NAVY }}
              >
                Demander une démo commentée
              </Link>
            </div>

            <p className="mt-8 text-center text-xs md:text-sm text-gray-500 italic">
              Prochaine mise à jour prévue : janvier 2027 — premiers cas complets, avec chiffres avant/après.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
