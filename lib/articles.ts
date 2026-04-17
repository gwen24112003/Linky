import fs from 'fs';
import path from 'path';
import articlesData from './articles.json';

export interface ArticleMetadata {
  id: number;
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  overlayImageSrc?: string;
  icon?: string;
  publishedAt?: string;
}

export function getAllArticles(): ArticleMetadata[] {
  return articlesData as ArticleMetadata[];
}

export function getArticleBySlug(slug: string): ArticleMetadata | null {
  return (articlesData as ArticleMetadata[]).find((a) => a.slug === slug) || null;
}

export function getArticleContent(slug: string): string {
  const filePath = path.join(process.cwd(), 'public', 'articles', `${slug}.md`);
  if (!fs.existsSync(filePath)) return '';
  const raw = fs.readFileSync(filePath, 'utf8');
  // Remove front-matter YAML if any
  return raw.replace(/^---[\s\S]*?---/, '').trim();
}
