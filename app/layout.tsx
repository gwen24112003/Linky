import type { Metadata } from 'next';
import './globals.css';

const SITE_URL = 'https://opusadvisor.fr';
const SITE_NAME = 'Opus Advisory';
const DEFAULT_TITLE =
  'Opus Advisory — Consultant ops pour les patrons du BTP second œuvre';
const DEFAULT_DESCRIPTION =
  "On rend 10h/semaine aux patrons d'électricité, plomberie, chauffage. Relances auto, chantiers centralisés, facturation 2027 prête. Diagnostic 2 500 €, pré-audit gratuit.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    'consultant automatisation BTP',
    'logiciel gestion électricien PME',
    'facturation électronique électricien 2027',
    'automatisation devis plombier',
    'relance automatique impayés BTP',
    'système unifié entreprise bâtiment',
    'Batappli consultant',
    'Obat Tolteck EBP Bâtiment',
    'gestion chantier second œuvre',
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
      alternateName: 'Opus Advisor',
      description:
        "Consultant ops pour les patrons du BTP second œuvre (électricité, plomberie, chauffage-clim). On monte un système unique qui unifie devis, chantiers, relances et facturation 2027. Diagnostic chiffré, implémentation, formation équipe.",
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
        "Implémentation Batappli / Obat / Tolteck / EBP Bâtiment",
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
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Inter:wght@300;400;500;600&family=Lexend:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" as="image" href="/images/opus-banner.png" fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
