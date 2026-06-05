import type { Metadata } from 'next';
import { Inter, Bricolage_Grotesque, Lexend } from 'next/font/google';
import './globals.css';

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
const DEFAULT_TITLE = 'Opus Advisor — Consultant ops BTP second œuvre';
const DEFAULT_DESCRIPTION =
  "On rend 10h/semaine aux patrons d'électricité, plomberie, chauffage. Relances auto, chantiers centralisés, devis qui ne traînent plus. Diagnostic 2 500 €, pré-audit gratuit.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    'consultant ops BTP second œuvre',
    'automatisation devis plombier électricien',
    'relance automatique impayés BTP',
    'centralisation chantiers second œuvre',
    'système unifié entreprise bâtiment',
    'logiciel gestion électricien PME',
    'Batappli Obat Tolteck EBP Bâtiment',
    'automatisation Make n8n BTP',
    'gestion chantier second œuvre',
    'consultant automatisation BTP',
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
        alt: 'Opus Advisor — Consultant ops pour les patrons du BTP second œuvre',
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
        alt: 'Opus Advisor — Consultant ops pour les patrons du BTP second œuvre',
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
        "Consultant ops pour les patrons du BTP second œuvre (électricité, plomberie, chauffage-clim). On monte un système unique qui unifie devis, chantiers, relances et facturation. Diagnostic chiffré, mise en œuvre, formation équipe.",
      url: SITE_URL,
      email: 'enzo@opusadvisor.fr',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Rennes',
        addressRegion: 'Bretagne',
        addressCountry: 'FR',
      },
      areaServed: { '@type': 'Country', name: 'France' },
      serviceType: [
        'Consultant ops BTP',
        'Système de gestion second œuvre',
        'Automatisation devis et relances',
        'Mise en conformité facturation électronique 2027',
        "Mise en œuvre Batappli / Obat / Tolteck / EBP Bâtiment",
        'Automatisation Make et n8n',
        'Formation équipe BTP',
      ],
      knowsAbout: [
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
      </head>
      <body>{children}</body>
    </html>
  );
}
