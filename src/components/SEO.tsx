import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  jsonLd?: object | object[];
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Opus Advisor : Cabinet Automatisation, IA et No-Code pour PME',
  description = 'Cabinet de conseil en automatisation, IA et no-code pour TPE et PME. Audit de processus, implémentation de workflows n8n et Make, formation et maintenance. Basé en France.',
  keywords = 'freelance automatisation, consultant automatisation, automatisation PME, expert no-code, workflow n8n, consultant Make, automatisation IA, intégration IA entreprise, automatisation processus',
  image = '/images/opus-banner.png',
  url = 'https://opusadvisor.fr',
  jsonLd,
}) => {
  const siteTitle =
    title === 'Opus Advisor : Cabinet Automatisation, IA et No-Code pour PME'
      ? title
      : `${title} | Opus Advisor`;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="Opus Advisor" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@opusadvisor" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD optionnel */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};
