import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionKicker } from '@/components/ui/SectionKicker';
import { tools } from '@/lib/tools';

const NAVY = '#1A2332';
const GOLD_INK = '#8A6A1C';
const PAPER = '#FAF7F0';
const RULE = 'rgba(26,35,50,0.16)';

const PAGE_URL = 'https://opusadvisor.fr/outils/';
const PAGE_TITLE = 'Outils gratuits pour le BTP : calculateurs et indice BT01';
const PAGE_DESCRIPTION =
  'Calculateurs gratuits pour les entreprises du bâtiment : marge chantier, coût horaire, indice BT01 et révision de prix, pénalités de retard, retenue de garantie, facture de situation. Sans inscription.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: PAGE_TITLE, description: PAGE_DESCRIPTION, url: PAGE_URL, type: 'website', images: [{ url: 'https://opusadvisor.fr/images/Logo_1200x630.png' }] },
};

export default function ToolsPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://opusadvisor.fr/' },
        { '@type': 'ListItem', position: 2, name: 'Outils', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: tools.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: t.title,
        url: `${PAGE_URL}${t.slug}/`,
      })),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="flex-grow">
        <section className="pt-32 md:pt-40 pb-14 md:pb-16" style={{ background: PAPER }}>
          <div className="container mx-auto px-6 max-w-6xl">
            <SectionKicker label="Outils gratuits" className="mb-6" />
            <h1 className="font-heading font-bold leading-[1.02] tracking-tight text-4xl md:text-6xl max-w-4xl" style={{ color: NAVY }}>
              Les calculs qu'on refait sans arrêt au bureau
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl">
              Marge d'un chantier, coût horaire d'un compagnon, révision de prix, pénalités d'une facture en retard, retenue de garantie, situation de travaux. Chaque
              outil donne le résultat et explique le calcul. Pas d'inscription, rien n'est enregistré.
            </p>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <ol>
              {tools.map((tool, i) => (
                <li key={tool.slug} className="border-t" style={{ borderColor: RULE }}>
                  <Link
                    href={`/outils/${tool.slug}/`}
                    className="group grid grid-cols-[2.5rem_1fr] md:grid-cols-[4rem_1fr_auto] gap-x-4 md:gap-x-8 gap-y-2 py-8 md:py-10 items-baseline"
                  >
                    <span className="text-sm font-semibold tabular-nums" style={{ color: GOLD_INK }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>
                      <span className="block font-heading font-bold text-2xl md:text-3xl tracking-tight group-hover:underline underline-offset-4" style={{ color: NAVY }}>
                        {tool.title}
                      </span>
                      <span className="block mt-2 text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl">
                        {tool.description}
                      </span>
                    </span>
                    <span className="col-start-2 md:col-start-auto inline-flex items-center gap-2 text-sm font-semibold whitespace-nowrap" style={{ color: GOLD_INK }}>
                      Ouvrir
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
            <div className="border-t" style={{ borderColor: RULE }} />
            <p className="mt-10 text-base text-gray-700 leading-relaxed max-w-2xl">
              Ces outils donnent un ordre de grandeur fiable pour un devis ou une relance. Pour un litige, faites valider le
              montant par votre comptable ou votre avocat.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
