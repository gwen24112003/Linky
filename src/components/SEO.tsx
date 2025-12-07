import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Linky - Solutions No-Code & Automatisation',
  description = 'Transformez vos idées en réalité avec Linky. Experts en création d\'outils no-code, automatisation et IA pour booster votre productivité.',
  keywords = 'no-code, automatisation, IA, intelligence artificielle, productivité, applications web, sites web, Linky',
  image = '/images/logo-linky-fond-bleu-arrondis.png',
  url = 'https://linky4u.com' // Remplacez par l'URL réelle de votre site
}) => {
  const siteTitle = title === 'Linky - Solutions No-Code & Automatisation' ? title : `${title} | Linky`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{siteTitle}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />

      {/* Open Graph tags (Facebook, LinkedIn) */}
      <meta property='og:type' content='website' />
      <meta property='og:title' content={siteTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:url' content={url} />

      {/* Twitter Card tags */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={siteTitle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
    </Helmet>
  );
};
