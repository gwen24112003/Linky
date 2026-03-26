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
  title = 'Opus Advisor - Conseil Opérationnel & Digital',
  description = 'Partenaire stratégique des dirigeants. Opus Advisor structure, automatise et optimise vos processus pour une croissance maîtrisée.',
  keywords = 'conseil, organisation, stratégie opérationnelle, processus, excellence opérationnelle, structuration, croissance, Opus Advisor',
  image = '/images/opus-banner.png',
  url = 'https://opusadvisor.fr'
}) => {
  const siteTitle = title === 'Opus Advisor - Conseil Opérationnel & Digital' ? title : `${title} | Opus Advisor`;

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
