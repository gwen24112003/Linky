import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionKicker } from '@/components/ui/SectionKicker';

const NAVY = '#1A2332';
const GOLD = '#C9A84C';
const GOLD_INK = '#8A6A1C';
const PAPER = '#FAF7F0';
const RULE = 'rgba(26,35,50,0.16)';

interface ToolPageProps {
  url: string;
  breadcrumbName: string;
  title: string;
  intro: string;
  calculator: React.ReactNode;
  children: React.ReactNode;
  ctaTitle: string;
  ctaText: string;
}

/** Gabarit des pages /outils/* : calculateur en haut, explications lisibles sans JavaScript en dessous. */
export const ToolPage: React.FC<ToolPageProps> = ({
  url, breadcrumbName, title, intro, calculator, children, ctaTitle, ctaText,
}) => {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://opusadvisor.fr/' },
      { '@type': 'ListItem', position: 2, name: 'Outils', item: 'https://opusadvisor.fr/outils/' },
      { '@type': 'ListItem', position: 3, name: breadcrumbName, item: url },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <main className="flex-grow">
        <section className="pt-32 md:pt-40 pb-14 md:pb-16" style={{ background: PAPER }}>
          <div className="container mx-auto px-6 max-w-6xl">
            <Link href="/outils/" className="inline-block mb-6 text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: GOLD_INK }}>
              ← Tous les outils
            </Link>
            <h1 className="font-heading font-bold leading-[1.02] tracking-tight text-4xl md:text-6xl max-w-4xl" style={{ color: NAVY }}>
              {title}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl">{intro}</p>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">{calculator}</div>
        </section>

        <section className="py-20 md:py-28" style={{ background: PAPER }}>
          <div className="container mx-auto px-6 max-w-3xl tool-prose">{children}</div>
        </section>

        <section className="py-20 md:py-28" style={{ background: NAVY }}>
          <div className="container mx-auto px-6 max-w-5xl">
            <SectionKicker label="Opus Advisor" tone="dark" className="mb-8" />
            <h2 className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl text-white max-w-3xl">
              {ctaTitle}
            </h2>
            <p className="mt-6 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">{ctaText}</p>
            <Link
              href="/contact"
              className="group mt-9 inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm md:text-base transition-colors"
              style={{ background: GOLD, color: NAVY }}
            >
              Réserver le pré-audit gratuit
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

/** Sous-titre de section dans les explications d'un outil. */
export const ToolH2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="font-heading font-bold leading-tight tracking-tight text-2xl md:text-3xl mt-14 first:mt-0 mb-5" style={{ color: NAVY }}>
    {children}
  </h2>
);

export const ToolP: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-lg text-gray-700 leading-relaxed mb-5">{children}</p>
);

/** Formule mise en avant (ex. « pénalités = montant × taux × jours ÷ 365 »). */
export const Formula: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="my-6 px-5 py-4 border-l-[3px] bg-white text-base md:text-lg font-semibold" style={{ borderColor: GOLD, color: NAVY }}>
    {children}
  </p>
);

export const ToolLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <Link href={href} className="font-semibold underline underline-offset-4 hover:opacity-70" style={{ color: GOLD_INK }}>
    {children}
  </Link>
);

export const ToolTable: React.FC<{ head: string[]; rows: string[][] }> = ({ head, rows }) => (
  <div className="my-6 overflow-x-auto">
    <table className="w-full text-left text-base border-collapse">
      <thead>
        <tr>
          {head.map((h) => (
            <th key={h} className="py-3 pr-4 font-semibold border-b-2" style={{ color: NAVY, borderColor: NAVY }}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.join('|')}>
            {r.map((c, i) => (
              <td key={i} className="py-3 pr-4 border-b text-gray-700" style={{ borderColor: RULE }}>
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
