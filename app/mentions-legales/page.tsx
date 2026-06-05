import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionKicker } from '@/components/ui/SectionKicker';

const NAVY = '#1A2332';
const RULE = 'rgba(26,35,50,0.16)';

const PAGE_URL = 'https://opusadvisor.fr/mentions-legales';
const PAGE_TITLE = 'Mentions légales';
const PAGE_DESCRIPTION =
  "Mentions légales du site opusadvisor.fr : éditeur, hébergeur, propriété intellectuelle et données personnelles.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
};

interface Block {
  title: string;
  rows: { label: string; value: React.ReactNode }[];
  paragraphs?: React.ReactNode[];
}

const blocks: Block[] = [
  {
    title: 'Éditeur du site',
    rows: [
      { label: 'Raison sociale', value: 'Opus Advisor — Enzo Monnier (entrepreneur individuel)' },
      { label: 'Statut', value: 'Auto-entrepreneur' },
      { label: 'SIRET', value: '982 515 751 00013' },
      { label: 'Adresse', value: "25 allée du petit domaine, 35590 L'Hermitage, France" },
      {
        label: 'E-mail',
        value: (
          <a href="mailto:enzo@opusadvisor.fr" className="underline hover:opacity-70">
            enzo@opusadvisor.fr
          </a>
        ),
      },
      { label: 'Directeur de la publication', value: 'Enzo Monnier' },
      {
        label: 'TVA',
        value: 'TVA non applicable, article 293 B du CGI (franchise en base)',
      },
    ],
  },
  {
    title: 'Hébergeur',
    rows: [
      { label: 'Société', value: 'INFRAWIRE NETWORKS' },
      { label: 'SIREN', value: '990 307 316' },
      { label: 'Adresse', value: '59 rue de Ponthieu, 75008 Paris, France' },
    ],
  },
];

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        {/* Hero */}
        <section className="pt-36 pb-16 md:pt-44 md:pb-20" style={{ background: NAVY }}>
          <div className="container mx-auto px-6 max-w-4xl">
            <SectionKicker label="Informations légales" tone="dark" className="mb-8" />
            <h1 className="font-heading font-bold leading-[1.05] tracking-tight text-4xl md:text-5xl lg:text-6xl text-white">
              Mentions légales
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/70">
              Dernière mise à jour : juin 2026.
            </p>
          </div>
        </section>

        {/* Contenu */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            {blocks.map((block) => (
              <div key={block.title} className="mb-12 md:mb-16">
                <h2
                  className="font-heading font-bold text-2xl md:text-3xl mb-6"
                  style={{ color: NAVY }}
                >
                  {block.title}
                </h2>
                <dl>
                  {block.rows.map((row) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-1 sm:grid-cols-[14rem_1fr] gap-x-6 gap-y-1 py-4 border-t"
                      style={{ borderColor: RULE }}
                    >
                      <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-gray-500">
                        {row.label}
                      </dt>
                      <dd className="text-base md:text-lg" style={{ color: NAVY }}>
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}

            {/* Propriété intellectuelle */}
            <div className="mb-12 md:mb-16">
              <h2 className="font-heading font-bold text-2xl md:text-3xl mb-6" style={{ color: NAVY }}>
                Propriété intellectuelle
              </h2>
              <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  L'ensemble du contenu du site opusadvisor.fr (textes, articles, logo, identité
                  visuelle, mise en page) est la propriété d'Opus Advisor, sauf mention contraire.
                  Toute reproduction ou réutilisation sans autorisation écrite préalable est
                  interdite.
                </p>
                <p>
                  Les marques et logos tiers cités sur le site (Batappli, Obat, Tolteck, EBP, Make,
                  n8n, Notion, etc.) restent la propriété de leurs détenteurs respectifs. Opus
                  Advisor n'est affilié à aucun de ces éditeurs.
                </p>
              </div>
            </div>

            {/* Données personnelles */}
            <div className="mb-12 md:mb-16">
              <h2 className="font-heading font-bold text-2xl md:text-3xl mb-6" style={{ color: NAVY }}>
                Données personnelles
              </h2>
              <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  Le site ne collecte aucune donnée personnelle à votre insu. Les seules données
                  recueillies sont celles que vous transmettez volontairement, par e-mail ou via la
                  prise de rendez-vous (pré-audit). Elles servent uniquement à répondre à votre
                  demande et ne sont ni vendues, ni cédées à des tiers.
                </p>
                <p>
                  Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de
                  suppression de vos données. Pour l'exercer, écrivez à{' '}
                  <a href="mailto:enzo@opusadvisor.fr" className="underline hover:opacity-70" style={{ color: NAVY }}>
                    enzo@opusadvisor.fr
                  </a>
                  .
                </p>
                <p>
                  La prise de rendez-vous s'appuie sur un service tiers (Cal.com) ; les informations
                  que vous y saisissez sont traitées selon la politique de confidentialité de ce
                  prestataire.
                </p>
              </div>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl mb-6" style={{ color: NAVY }}>
                Cookies
              </h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Le site n'utilise pas de cookies publicitaires ni de traceurs de profilage. Seuls
                des éléments techniques strictement nécessaires à son affichage peuvent être
                déposés.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
