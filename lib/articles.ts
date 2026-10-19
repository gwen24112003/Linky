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
  updatedAt?: string;
  category?: string;
}

export interface ArticleFrontMatter {
  title?: string;
  metaDescription?: string;
  date?: string;
  keywords?: string[];
  /** 3 puces affichées en tête d'article (« L'essentiel en 30 secondes »). */
  essentiel?: string[];
  /** Questions affichées en fin d'article et reprises en FAQPage JSON-LD. */
  faq?: { q: string; a: string }[];
  /** Encart affiché avant le 3e intertitre ; à défaut, renvoi vers le pré-audit. */
  ctaMid?: { text: string; label: string; href: string };
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
  // Retire le front-matter YAML, puis la ligne « *Catégorie : … — Auteur : …* » remplacée par la signature de l'article.
  return raw
    .replace(/^---[\s\S]*?---/, '')
    .trim()
    .replace(/^\*Catégorie :[^\n]*\*\s*/, '');
}

export function getReadingMinutes(content: string): number {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

/** « 2026-05-01 » → « 1er mai 2026 ». */
export function formatDateFr(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  const day = d.getUTCDate();
  const rest = d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric', timeZone: 'UTC' });
  return `${day === 1 ? '1er' : day} ${rest}`;
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
