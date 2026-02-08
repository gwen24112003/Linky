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
  title = 'Linky - Conseil en Organisation & Stratégie Opérationnelle',
  description = 'Partenaire stratégique des dirigeants. Linky structure, clarifie et optimise vos processus pour une croissance maîtrisée et durable.',
  keywords = 'conseil, organisation, stratégie opérationnelle, processus, excellence opérationnelle, structuration, croissance, Linky',
  image = '/images/linky-banner.png',
  url = 'https://linky4u.com'
}) => {
  const siteTitle = title === 'Linky - Conseil en Organisation & Stratégie Opérationnelle' ? title : `${title} | Linky`;

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
