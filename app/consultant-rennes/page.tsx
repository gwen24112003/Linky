import type { Metadata } from 'next';
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

const SITE_URL = 'https://opusadvisor.fr';
const PAGE_URL = `${SITE_URL}/consultant-rennes/`;
const PAGE_TITLE = 'Consultant en organisation et automatisation à Rennes';
const PAGE_DESCRIPTION =
  "Opus Advisor, à Rennes, automatise la gestion des organismes de formation, conciergeries, agences immobilières et entreprises du BTP d'Ille-et-Vilaine et des départements voisins. Pré-audit gratuit.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: PAGE_TITLE, description: PAGE_DESCRIPTION, url: PAGE_URL, type: 'website', images: [{ url: `${SITE_URL}/images/Logo_1200x630.png` }] },
};

const zones = [
  {
    label: "À moins de deux heures de Rennes",
    text: "De Saint-Malo à Nantes, de Vannes à Laval, en passant par Vitré, Fougères, Redon ou Saint-Brieuc. Pendant une mission, on vient sur place voir comment tourne votre bureau.",
  },
  {
    label: 'Ailleurs en France',
    text: 'Le pré-audit se fait en visio, avec vos outils en partage d’écran. Pour la suite, on regarde ensemble ce qui peut se faire à distance.',
  },
];

const topics = [
  {
    title: "Les dossiers d'un organisme de formation",
    text: 'Conventions, convocations et dossiers pour les financeurs générés et envoyés automatiquement.',
    href: '/secteurs/formation/',
    link: 'Organismes de formation',
  },
  {
    title: 'La facturation des propriétaires d’une conciergerie',
    text: 'Un seul traitement pour tous les propriétaires, des plannings de ménage qui suivent les réservations.',
    href: '/secteurs/immobilier/',
    link: 'Immobilier et conciergerie',
  },
  {
    title: 'Le suivi d’une équipe d’agents immobiliers',
    text: 'Les dossiers de chaque agent, l’état de chaque bien et l’avancement des ventes, au même endroit.',
    href: '/cas-clients/',
    link: 'Le cas client',
  },
  {
    title: 'Les devis, situations et relances dans le BTP',
    text: 'Des relances qui partent seules, des situations envoyées à date, la marge suivie chantier par chantier.',
    href: '/secteurs/btp/',
    link: 'BTP second œuvre',
  },
];

const faq = [
  {
    q: 'Vous travaillez seulement autour de Rennes ?',
    a: "Non. On est installés à Rennes et on se déplace pendant les missions dans un rayon d'environ deux heures, en Bretagne et en Pays-de-la-Loire. Ailleurs en France, le pré-audit se fait en visio et on voit ensemble la suite.",
  },
  {
    q: 'Vous vendez un logiciel ?',
    a: 'Non, on ne revend aucun logiciel. On part de ce que vous utilisez déjà, votre logiciel métier, vos tableurs, vos mails, et on ne vous fait changer d’outil que si c’est vraiment nécessaire. Le plus souvent, on installe une application centrale qui réunit les informations de ces outils. Elle est à votre nom, comme tous les comptes du système.',
  },
  {
    q: 'Combien ça coûte ?',
    a: "Le pré-audit de 30 minutes est gratuit. L'Audit Stack coûte 990 €, le diagnostic opérationnel 2 500 €, et la mise en œuvre part de 5 500 €. Les prix sont fixes et détaillés sur la page Services.",
  },
];

export default function ConsultantRennesPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Consultant à Rennes', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Organisation et automatisation de la gestion des petites entreprises',
      url: PAGE_URL,
      provider: { '@id': `${SITE_URL}/#organization` },
      serviceType: 'Organisation et automatisation de la gestion',
      areaServed: [
        { '@type': 'City', name: 'Rennes' },
        { '@type': 'AdministrativeArea', name: 'Ille-et-Vilaine' },
        { '@type': 'AdministrativeArea', name: 'Bretagne' },
        { '@type': 'AdministrativeArea', name: 'Pays de la Loire' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="flex-grow">
        <section className="pt-32 md:pt-40 pb-16 md:pb-20" style={{ background: PAPER }}>
          <div className="container mx-auto px-6 max-w-6xl">
            <SectionKicker label="Rennes · Ille-et-Vilaine" className="mb-6" />
            <h1 className="font-heading font-bold leading-[1.02] tracking-tight text-4xl md:text-6xl max-w-4xl" style={{ color: NAVY }}>
              Consultant en organisation et automatisation, à Rennes
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl">
              Opus Advisor est installé à Rennes. On centralise et on automatise la gestion des petites entreprises de la
              région : organismes de formation, conciergeries et agences immobilières, entreprises
              du BTP.
            </p>
            <Link
              href="/contact/"
              className="group mt-9 inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm md:text-base text-white"
              style={{ background: NAVY }}
            >
              Réserver le pré-audit gratuit
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        <section className="py-20 md:py-24 bg-white" aria-labelledby="zone-titre">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 id="zone-titre" className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl max-w-3xl" style={{ color: NAVY }}>
              Où on intervient
            </h2>
            <dl className="mt-10">
              {zones.map((z) => (
                <div key={z.label} className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-2 py-7 border-t" style={{ borderColor: RULE }}>
                  <dt className="md:col-span-4 font-semibold text-lg md:text-xl" style={{ color: NAVY }}>
                    {z.label}
                  </dt>
                  <dd className="md:col-span-8 text-base md:text-lg text-gray-700 leading-relaxed">{z.text}</dd>
                </div>
              ))}
              <div className="border-t" style={{ borderColor: RULE }} />
            </dl>
          </div>
        </section>

        <section className="py-20 md:py-24" style={{ background: PAPER }} aria-labelledby="sujets-titre">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 id="sujets-titre" className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl max-w-3xl" style={{ color: NAVY }}>
              Ce qu'on règle le plus souvent
            </h2>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-2xl">
              Selon le secteur, ce sont surtout ces sujets-là. Le point commun : des informations ressaisies dans
              plusieurs outils, et un administratif qui déborde.
            </p>
            <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-12">
              {topics.map((t) => (
                <li key={t.title} className="py-7 border-t" style={{ borderColor: RULE }}>
                  <h3 className="font-semibold text-lg md:text-xl leading-snug" style={{ color: NAVY }}>
                    {t.title}
                  </h3>
                  <p className="mt-2 text-base md:text-lg text-gray-700 leading-relaxed">{t.text}</p>
                  <Link href={t.href} className="mt-3 inline-block text-sm font-semibold underline underline-offset-4 hover:opacity-70" style={{ color: GOLD_INK }}>
                    {t.link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-20 md:py-24 bg-white" aria-labelledby="pilotes-titre">
          <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <SectionKicker label="Opus Pilotes" className="mb-6" />
              <h2 id="pilotes-titre" className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-4xl" style={{ color: NAVY }}>
                Trois places pour le BTP en Bretagne et Pays-de-la-Loire
              </h2>
            </div>
            <div className="md:col-span-7">
              <p className="text-lg text-gray-700 leading-relaxed">
                Pour le bâtiment, on met en place le système complet chez trois entreprises du second œuvre de la région,
                à 40 % de moins que le tarif habituel. En échange, on publie le cas au bout de six mois, chiffres à l'appui. On vient sur
                site au moins deux fois pendant la mission.
              </p>
              <Link href="/cas-clients/" className="mt-5 inline-block font-semibold underline underline-offset-4 hover:opacity-70" style={{ color: GOLD_INK }}>
                Les conditions du programme
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24" style={{ background: PAPER }} aria-labelledby="faq-titre">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 id="faq-titre" className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-4xl" style={{ color: NAVY }}>
              Questions fréquentes
            </h2>
            <div className="mt-8 max-w-3xl">
              {faq.map((item, i) => (
                <details key={item.q} open={i === 0} className="group border-t" style={{ borderColor: RULE }}>
                  <summary className="flex items-start justify-between gap-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <span className="text-lg font-semibold leading-snug" style={{ color: NAVY }}>
                      {item.q}
                    </span>
                    <span aria-hidden="true" className="text-2xl leading-none transition-transform group-open:rotate-45" style={{ color: GOLD_INK }}>
                      +
                    </span>
                  </summary>
                  <p className="pb-6 -mt-1 text-lg text-gray-700 leading-relaxed">{item.a}</p>
                </details>
              ))}
              <div className="border-t" style={{ borderColor: RULE }} />
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28" style={{ background: NAVY }}>
          <div className="container mx-auto px-6 max-w-6xl">
            <SectionKicker label="Pré-audit gratuit" tone="dark" className="mb-8" />
            <h2 className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl text-white max-w-3xl">
              30 minutes en visio, sur vos propres outils
            </h2>
            <p className="mt-6 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">
              Vous partagez votre écran, on repère trois points qui vous font perdre du temps et on vous montre comment les
              régler. Si ça ne vaut pas le coup d'aller plus loin, on vous le dit.
            </p>
            <Link
              href="/contact/"
              className="group mt-9 inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm md:text-base"
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
