'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { ArrowRight } from 'lucide-react';
import { TableOfContents } from '@/components/ui/TableOfContents';

const NAVY = '#1A2332';
const GOLD = '#C9A84C';
const GOLD_INK = '#8A6A1C';
const PAPER = '#FAF7F0';
const RULE = 'rgba(26,35,50,0.16)';

const DEFAULT_CTA = {
  text: 'Vous voulez savoir où part le temps dans votre entreprise ? On regarde vos outils ensemble pendant 30 minutes, en visio. C’est gratuit.',
  label: 'Réserver le pré-audit',
  href: '/contact/',
};

interface ArticleViewProps {
  title: string;
  description: string;
  content: string;
  publishedLabel?: string;
  updatedLabel?: string;
  readingMinutes: number;
  essentiel?: string[];
  faq?: { q: string; a: string }[];
  ctaMid?: { text: string; label: string; href: string };
}

/** Coupe le markdown juste avant le 3e intertitre, pour y glisser l'encart. */
function splitBeforeThirdH2(md: string): [string, string] {
  const re = /^## /gm;
  let count = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(md))) {
    count += 1;
    if (count === 3) return [md.slice(0, match.index), md.slice(match.index)];
  }
  return [md, ''];
}

const Markdown: React.FC<{ children: string }> = ({ children }) => (
  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
    {children}
  </ReactMarkdown>
);

export const ArticleView: React.FC<ArticleViewProps> = ({
  title,
  description,
  content,
  publishedLabel,
  updatedLabel,
  readingMinutes,
  essentiel,
  faq,
  ctaMid,
}) => {
  const [tocPosition, setTocPosition] = useState<'absolute' | 'fixed' | 'absolute-bottom'>('absolute');
  const articleSectionRef = useRef<HTMLDivElement>(null);
  const tocRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!articleSectionRef.current || !tocRef.current) return;
      const articleRect = articleSectionRef.current.getBoundingClientRect();
      const tocHeight = tocRef.current.offsetHeight;
      const stickyStartOffset = 96;

      if (articleRect.top > stickyStartOffset) {
        setTocPosition('absolute');
      } else if (articleRect.bottom < tocHeight + stickyStartOffset) {
        setTocPosition('absolute-bottom');
      } else {
        setTocPosition('fixed');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [content]);

  const [before, after] = splitBeforeThirdH2(content);
  const cta = ctaMid ?? DEFAULT_CTA;

  return (
    <div className="relative pt-32 pb-12" ref={articleSectionRef}>
      <div
        ref={tocRef}
        className={`hidden xl:block xl:w-64 ${
          tocPosition === 'fixed'
            ? 'fixed left-8 top-28'
            : tocPosition === 'absolute-bottom'
            ? 'absolute left-8 bottom-4'
            : 'absolute left-8 top-12'
        }`}
        style={{ transition: 'none' }}
      >
        <TableOfContents content={content} />
      </div>

      {/* À partir de xl, le sommaire fixe occupe 288 px à gauche : on décale le texte tant que l'écran ne permet pas de le centrer. */}
      <div className="container mx-auto px-6 max-w-4xl xl:mr-auto xl:ml-[max(19rem,calc((100%_-_56rem)/2))]">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{title}</h1>
          <p className="text-lg text-gray-600">{description}</p>

          <div className="mt-6 flex items-center gap-3">
            <img src="/images/enzo.jpg" alt="" className="w-11 h-11 rounded-full object-cover shrink-0" />
            <div className="text-sm leading-snug">
              <Link href="/equipe/" className="font-semibold hover:underline underline-offset-4" style={{ color: NAVY }}>
                Enzo Monnier
              </Link>
              <span className="text-gray-600"> · {readingMinutes} min de lecture</span>
              <div className="text-gray-600">
                {publishedLabel && <>Publié le {publishedLabel}</>}
                {updatedLabel && <> · Mis à jour le {updatedLabel}</>}
              </div>
            </div>
          </div>
        </header>

        {essentiel && essentiel.length > 0 && (
          <aside aria-labelledby="essentiel-titre" className="mb-10 px-6 py-6 border-l-[3px]" style={{ background: PAPER, borderColor: GOLD }}>
            <div id="essentiel-titre" className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD_INK }}>
              L'essentiel en 30 secondes
            </div>
            <ul className="mt-4 space-y-3">
              {essentiel.map((item) => (
                <li key={item} className="flex gap-3 text-base md:text-lg text-gray-800 leading-relaxed">
                  <span aria-hidden="true" className="mt-[0.7em] w-1.5 h-1.5 rounded-full shrink-0" style={{ background: GOLD_INK }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <article
          className="prose prose-lg max-w-none
            prose-headings:text-gray-800 prose-headings:font-bold
            prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
            prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8
            prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-6
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-lg
            prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
            prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
            prose-li:text-gray-700 prose-li:text-lg prose-li:leading-relaxed
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-a:no-underline hover:prose-a:underline
            prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-hr:my-8 prose-hr:border-gray-300
          "
        >
          <Markdown>{before}</Markdown>
          {after && (
            <aside className="not-prose my-10 py-6 border-y flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8" style={{ borderColor: RULE }}>
              <div className="flex-1 text-base md:text-lg text-gray-800 leading-relaxed">{cta.text}</div>
              <Link
                href={cta.href}
                data-plain
                className="group self-start sm:self-auto inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm whitespace-nowrap text-white"
                style={{ background: NAVY }}
              >
                {cta.label}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </aside>
          )}
          {after && <Markdown>{after}</Markdown>}
        </article>

        {faq && faq.length > 0 && (
          <section aria-labelledby="faq-titre" className="mt-16">
            <h2 id="faq-titre" className="text-3xl font-bold text-gray-800 mb-6">
              Questions fréquentes
            </h2>
            {faq.map((item) => (
              <details key={item.q} className="group border-t" style={{ borderColor: RULE }}>
                <summary className="flex items-start justify-between gap-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="text-lg font-semibold leading-snug" style={{ color: NAVY }}>
                    {item.q}
                  </span>
                  <span aria-hidden="true" className="text-2xl leading-none transition-transform group-open:rotate-45" style={{ color: GOLD_INK }}>
                    +
                  </span>
                </summary>
                <div className="pb-6 -mt-1 text-lg text-gray-700 leading-relaxed">{item.a}</div>
              </details>
            ))}
            <div className="border-t" style={{ borderColor: RULE }} />
          </section>
        )}

        <section aria-label="L'auteur" className="mt-16 pt-8 border-t flex gap-5" style={{ borderColor: RULE }}>
          <img src="/images/enzo.jpg" alt="Enzo Monnier" className="w-16 h-16 rounded-full object-cover shrink-0" />
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD_INK }}>
              Écrit par
            </div>
            <div className="mt-1 text-lg font-semibold" style={{ color: NAVY }}>
              Enzo Monnier, fondateur d'Opus Advisor
            </div>
            <div className="mt-2 text-base text-gray-700 leading-relaxed max-w-2xl">
              Cinq ans de développement de logiciels métier avant de passer au conseil. Depuis Rennes, il relie les outils
              des entreprises du second œuvre : logiciel de devis, Excel, WhatsApp, banque et comptabilité.
            </div>
            <Link href="/equipe/" className="mt-3 inline-block text-sm font-semibold hover:underline underline-offset-4" style={{ color: GOLD_INK }}>
              L'équipe →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
