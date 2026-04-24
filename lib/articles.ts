import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
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

export interface ArticleFrontMatter {
  title?: string;
  metaDescription?: string;
  date?: string;
  keywords?: string[];
}

export function getAllArticles(): ArticleMetadata[] {
  return articlesData as ArticleMetadata[];
}

export function getArticleBySlug(slug: string): ArticleMetadata | null {
  return (articlesData as ArticleMetadata[]).find((a) => a.slug === slug) || null;
}

function readArticleFile(slug: string): string {
  const filePath = path.join(process.cwd(), 'public', 'articles', `${slug}.md`);
  if (!fs.existsSync(filePath)) return '';
  return fs.readFileSync(filePath, 'utf8');
}

export function getArticleContent(slug: string): string {
  const raw = readArticleFile(slug);
  if (!raw) return '';
  // Remove front-matter YAML if any
  return raw.replace(/^---[\s\S]*?---/, '').trim();
}

export function getArticleFrontMatter(slug: string): ArticleFrontMatter {
  const raw = readArticleFile(slug);
  if (!raw) return {};
  try {
    const { data } = matter(raw);
    return data as ArticleFrontMatter;
  } catch {
    return {};
  }
}
