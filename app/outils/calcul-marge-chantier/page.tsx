import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionKicker } from '@/components/ui/SectionKicker';
import { MarginCalculator } from '@/components/pages/MarginCalculator';
import { TrackFirstUse } from '@/components/analytics/TrackFirstUse';

const NAVY = '#1A2332';
const GOLD = '#C9A84C';
const GOLD_INK = '#8A6A1C';
const PAPER = '#FAF7F0';
const RULE = 'rgba(26,35,50,0.16)';

const PAGE_URL = 'https://opusadvisor.fr/outils/calcul-marge-chantier/';
const PAGE_TITLE = 'Calcul de marge chantier : calculateur gratuit pour le BTP';
const PAGE_DESCRIPTION =
  'Calculez la marge d’un chantier BTP : déboursé sec, prix de revient, marge brute, bénéfice et prix de vente conseillé. Gratuit et sans inscription.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    type: 'website',
    images: [{ url: 'https://opusadvisor.fr/images/Logo_1200x630.png' }],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://opusadvisor.fr/' },
    { '@type': 'ListItem', position: 2, name: 'Outils', item: 'https://opusadvisor.fr/outils/' },
    { '@type': 'ListItem', position: 3, name: 'Calcul de marge chantier', item: PAGE_URL },
  ],
};

// Formules, dans l'ordre où on les calcule. Le texte reste dans le HTML pour Google et sans JavaScript.
const formulas = [
  {
    name: 'Déboursé sec',
    formula: "main-d'œuvre + matériaux + sous-traitance + matériel + petites dépenses",
    text: "Tout ce que le chantier vous coûte directement. La main-d'œuvre se calcule en multipliant les heures par le coût horaire chargé (salaire et charges), pas par le salaire net.",
  },
  {
    name: 'Prix de revient',
    formula: 'déboursé sec + frais généraux',
    text: "Les frais généraux, ce sont le loyer, les véhicules, les assurances, le comptable et le temps passé au bureau. On les répartit le plus souvent en pourcentage du déboursé sec.",
  },
  {
    name: 'Marge brute',
    formula: 'prix de vente − déboursé sec',
    text: "Ce qu'il reste une fois le chantier payé. Le taux de marge brute, c'est cette marge divisée par le prix de vente.",
  },
  {
    name: 'Bénéfice net',
    formula: 'prix de vente − prix de revient',
    text: 'Ce que le chantier rapporte vraiment, une fois les frais généraux couverts.',
  },
  {
    name: 'Coefficient de vente',
    formula: 'prix de vente ÷ déboursé sec',
    text: 'Avec un coefficient de 1,28, chaque euro dépensé sur le chantier vous est revendu 1,28 €.',
  },
];

export default function MarginCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main className="flex-grow">
        {/* Hero */}
        <section className="pt-32 md:pt-40 pb-14 md:pb-16" style={{ background: PAPER }}>
          <div className="container mx-auto px-6 max-w-6xl">
            <Link href="/outils/" className="inline-block mb-6 text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: GOLD_INK }}>
              ← Tous les outils
            </Link>
            <h1
              className="font-heading font-bold leading-[1.02] tracking-tight text-4xl md:text-6xl max-w-4xl"
              style={{ color: NAVY }}
            >
              Calcul de la marge d'un chantier
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl">
              Entrez les chiffres de votre devis : vous obtenez le déboursé sec, la marge brute, le
              bénéfice net et le prix à pratiquer pour gagner ce que vous visez. Rien n'est enregistré.
            </p>
          </div>
        </section>

        {/* Calculateur */}
        <section className="py-14 md:py-20 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <TrackFirstUse tool="Calcul de marge chantier">
              <MarginCalculator />
            </TrackFirstUse>
          </div>
        </section>

        {/* Formules */}
        <section className="py-20 md:py-28" style={{ background: PAPER }} aria-labelledby="formules-title">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2
              id="formules-title"
              className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl max-w-3xl"
              style={{ color: NAVY }}
            >
              Comment calculer la marge d'un chantier
            </h2>
            <dl className="mt-12">
              {formulas.map((f) => (
                <div
                  key={f.name}
                  className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-2 py-7 border-t"
                  style={{ borderColor: RULE }}
                >
                  <dt className="md:col-span-4">
                    <span className="block font-semibold text-lg md:text-xl" style={{ color: NAVY }}>
                      {f.name}
                    </span>
                    <span className="block mt-1 text-sm" style={{ color: GOLD_INK }}>
                      = {f.formula}
                    </span>
                  </dt>
                  <dd className="md:col-span-8 text-base md:text-lg text-gray-700 leading-relaxed">{f.text}</dd>
                </div>
              ))}
              <div className="border-t" style={{ borderColor: RULE }} />
            </dl>
          </div>
        </section>

        {/* Exemple détaillé */}
        <section className="py-20 md:py-28 bg-white" aria-labelledby="exemple-title">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2
              id="exemple-title"
              className="font-heading font-bold leading-tight tracking-tight text-3xl md:text-4xl"
              style={{ color: NAVY }}
            >
              L'exemple du calculateur, ligne par ligne
            </h2>
            <div className="mt-8 space-y-5 text-lg text-gray-700 leading-relaxed">
              <p>
                Un chantier fictif vendu 18 000 € HT. La main-d'œuvre représente 120 heures à 45 €
                de l'heure chargée, soit 5 400 €. On ajoute 6 200 € de matériaux, 1 500 € de
                sous-traitance, 400 € de location et 600 € de petites dépenses : le déboursé sec
                monte à 14 100 €.
              </p>
              <p>
                La marge brute est de 3 900 €, soit 21,7 % du prix de vente, avec un coefficient de
                1,28. Avec 15 % de frais généraux sur le déboursé sec (2 115 €), le prix de revient
                atteint 16 215 €, et le bénéfice net tombe à 1 785 €, soit 9,9 %.
              </p>
              <p>
                Il suffit d'environ 1 800 € de dépenses imprévues pour effacer le bénéfice de ce chantier.
                C'est pour ça qu'une marge calculée au devis ne suffit pas : il faut la suivre pendant
                le chantier.
              </p>
            </div>
          </div>
        </section>

        {/* Fuites de marge */}
        <section className="py-20 md:py-28" style={{ background: PAPER }} aria-labelledby="fuites-title">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2
              id="fuites-title"
              className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl max-w-3xl"
              style={{ color: NAVY }}
            >
              Pourquoi la marge réelle est souvent plus basse que prévu
            </h2>
            <ul className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-x-10">
              <li className="py-7 border-t" style={{ borderColor: NAVY }}>
                <h3 className="font-semibold text-lg" style={{ color: NAVY }}>
                  Les petites dépenses oubliées
                </h3>
                <p className="mt-2 text-base text-gray-700 leading-relaxed">
                  EPI, petites fournitures, allers-retours au dépôt : cumulées, elles pèsent 5 à 15 % du
                  déboursé sec.
                </p>
              </li>
              <li className="py-7 border-t" style={{ borderColor: NAVY }}>
                <h3 className="font-semibold text-lg" style={{ color: NAVY }}>
                  Les heures improductives
                </h3>
                <p className="mt-2 text-base text-gray-700 leading-relaxed">
                  Déplacements, attente de matériel, reprises : un compagnon n'est productif que 70 à
                  75 % du temps payé.
                </p>
              </li>
              <li className="py-7 border-t" style={{ borderColor: NAVY }}>
                <h3 className="font-semibold text-lg" style={{ color: NAVY }}>
                  Les avenants jamais facturés
                </h3>
                <p className="mt-2 text-base text-gray-700 leading-relaxed">
                  Le petit travail en plus, fait pour ne pas bloquer le chantier, et qui ne ressort sur
                  aucune facture.
                </p>
              </li>
            </ul>
            <Link
              href="/articles/marge-chantier-suivi-reel/"
              className="group mt-10 inline-flex items-center gap-2 font-semibold text-base"
              style={{ color: NAVY }}
            >
              Lire notre article sur la marge réelle des chantiers
              <ArrowRight size={18} style={{ color: GOLD_INK }} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28" style={{ background: NAVY }}>
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl text-white max-w-3xl">
              Vous voulez connaître la marge réelle de vos chantiers, sans tout recalculer à la main ?
            </h2>
            <p className="mt-6 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">
              On met en place un suivi qui remonte les heures, les achats et les avenants chantier par
              chantier. On en parle pendant le pré-audit : 30 minutes en visio, gratuites.
            </p>
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
}
