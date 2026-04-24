import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';

const SITE_URL = 'https://opusadvisor.fr';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/cas-clients`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/equipe`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/articles`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
  ];

  const articlePages: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: `${SITE_URL}/article/${article.slug}`,
    lastModified: article.publishedAt ? new Date(article.publishedAt) : now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages];
}
