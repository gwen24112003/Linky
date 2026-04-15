import type { Metadata } from 'next';
import './globals.css';

const SITE_URL = 'https://opusadvisor.fr';
const SITE_NAME = 'Opus Advisor';
const DEFAULT_TITLE = 'Opus Advisor - Cabinet de conseil en organisation & transformation';
const DEFAULT_DESCRIPTION =
  "Cabinet de conseil en automatisation, IA et no-code pour TPE et PME. Audit de processus, implémentation de workflows n8n et Make, formation et maintenance. Basé en France.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    'freelance automatisation',
    'consultant automatisation',
    'automatisation PME',
    'expert no-code',
    'workflow n8n',
    'consultant Make',
    'automatisation IA',
    'intégration IA entreprise',
    'automatisation processus',
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
    images: [{ url: `${SITE_URL}/images/opus-banner.png` }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@opusadvisor',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [`${SITE_URL}/images/opus-banner.png`],
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      description:
        "Cabinet de conseil en automatisation, IA et no-code pour TPE et PME. Audit de processus, implémentation de workflows n8n et Make, intégration d'outils, formation et maintenance.",
      url: SITE_URL,
      email: 'contact@opusadvisor.fr',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Rennes',
        addressRegion: 'Bretagne',
        addressCountry: 'FR',
      },
      areaServed: { '@type': 'Country', name: 'France' },
      serviceType: [
        'Audit de processus',
        'Automatisation no-code',
        'Workflow n8n',
        'Workflow Make',
        "Intégration d'outils",
        'Intégration IA',
        'Formation automatisation',
        'Maintenance workflows',
      ],
      knowsAbout: [
        'n8n',
        'Make',
        'Zapier',
        'Airtable',
        'Notion',
        'Google Sheets',
        'API REST',
        'Intelligence artificielle',
        'automatisation',
        'no-code',
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
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Inter:wght@300;400;500;600&family=Lexend:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
