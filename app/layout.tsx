import type { Metadata } from 'next';
import { Inter, Bricolage_Grotesque, Lexend } from 'next/font/google';
import './globals.css';
import { ClickTracker } from '@/components/analytics/ClickTracker';
import { RevealProvider } from '@/components/motion/RevealProvider';
import { UMAMI_WEBSITE_ID } from '@/lib/analytics';

// Polices auto-hébergées au build (next/font) : aucune requête navigateur
// vers Google au runtime, donc aucune fuite d'IP vers Google (RGPD) + plus rapide.
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
});

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
  variable: '--font-bricolage',
});

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  display: 'swap',
  variable: '--font-lexend',
});

const SITE_URL = 'https://opusadvisor.fr';
const SITE_NAME = 'Opus Advisor';
const DEFAULT_TITLE = 'Opus Advisor : automatisation de la gestion des PME';
const DEFAULT_DESCRIPTION =
  "On relie vos logiciels autour d'une application centrale : dossiers, factures et relances se font tout seuls. Formation, immobilier, BTP. Pré-audit gratuit.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    'automatisation gestion PME',
    'consultant organisation entreprise Rennes',
    'automatisation organisme de formation',
    'automatisation conciergerie',
    'automatisation agence immobilière',
    'automatisation BTP second œuvre',
    'relance automatique impayés',
    'automatisation Make n8n',
  ],
  robots: { index: true, follow: true },
  icons: {
    icon: '/images/opus-icon.png',
    apple: '/images/opus-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/images/Logo_1200x630.png`,
        width: 1200,
        height: 630,
        alt: 'Opus Advisor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@opusadvisor',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/images/Logo_1200x630.png`,
        alt: 'Opus Advisor',
      },
    ],
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: 'Opus Advisor',
      description:
        "Organisation et automatisation de la gestion des petites entreprises (organismes de formation, immobilier et conciergerie, BTP second œuvre) : automatisations entre les logiciels qu'elles utilisent déjà et, le plus souvent, une application centrale qui réunit leurs informations. Diagnostic chiffré, mise en œuvre, formation de l'équipe, suivi.",
      url: SITE_URL,
      email: 'enzo@opusadvisor.fr',
      telephone: '+33615756549',
      founder: {
        '@type': 'Person',
        name: 'Enzo Monnier',
        jobTitle: 'Consultant en organisation et automatisation',
        url: 'https://www.linkedin.com/in/enzo-monnier-7524ab205/',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: '25 allée du petit domaine',
        postalCode: '35590',
        addressLocality: "L'Hermitage",
        addressRegion: 'Bretagne',
        addressCountry: 'FR',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'enzo@opusadvisor.fr',
        telephone: '+33615756549',
        areaServed: 'FR',
        availableLanguage: ['French'],
      },
      areaServed: { '@type': 'Country', name: 'France' },
      serviceType: [
        'Automatisation de la gestion administrative',
        'Automatisation pour organismes de formation',
        'Automatisation pour conciergeries et agences immobilières',
        'Automatisation pour le BTP second œuvre',
        'Mise en conformité facturation électronique 2027',
        'Automatisation Make et n8n',
        "Formation de l'équipe",
      ],
      knowsAbout: [
        'organismes de formation',
        'Qualiopi',
        'conciergerie',
        'location courte durée',
        'agences immobilières',
        'second œuvre',
        'électricité',
        'plomberie',
        'chauffage-climatisation',
        'Batappli',
        'Obat',
        'Tolteck',
        'EBP Bâtiment',
        'facturation électronique 2027',
        'Make',
        'n8n',
        'Notion',
        'WhatsApp Business',
      ],
      sameAs: [
        'https://www.linkedin.com/in/enzo-monnier-7524ab205/',
        'https://www.instagram.com/opusadvisor/',
        'https://x.com/opusadvisor',
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${bricolage.variable} ${lexend.variable}`}>
      <head>
        <link rel="preload" as="image" href="/images/opus-icon.png" fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Mesure d'audience Umami, sans cookie, servie par notre serveur ; inactive hors de opusadvisor.fr. */}
        <script defer src="/s.js" data-website-id={UMAMI_WEBSITE_ID} data-domains="opusadvisor.fr" />
      </head>
      <body>
        {children}
        <ClickTracker />
        <RevealProvider />
      </body>
    </html>
  );
}
