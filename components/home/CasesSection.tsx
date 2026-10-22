import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ClientCase } from '@/lib/cases';
import { CaseSchema } from '@/components/motion/CaseSchema';

const NAVY = '#1A2332';
const GOLD_INK = '#8A6A1C';
const RULE = 'rgba(26,35,50,0.16)';

interface CasesSectionProps {
  cases: ClientCase[];
  title: string;
  intro?: string;
  background?: string;
  link?: { href: string; label: string };
  /** Affiche le grand visuel de chaque cas (page Cas clients) au lieu du mini-schéma. */
  showVisuals?: boolean;
}

/** Missions réelles : le point de départ, ce qu'on a fait, ce qui a changé. */
export const CasesSection: React.FC<CasesSectionProps> = ({ cases, title, intro, background = '#FFFFFF', link, showVisuals = false }) => (
  <section className="py-24 md:py-32" style={{ background }} aria-labelledby="cases-title">
    <div className="container mx-auto px-6 max-w-6xl">
      <div data-reveal>
        <h2
          id="cases-title"
          className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl max-w-3xl"
          style={{ color: NAVY }}
        >
          {title}
        </h2>
        {intro && <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">{intro}</p>}
      </div>

      <ul className="mt-12">
        {cases.map((c, i) => (
          <li
            key={c.slug}
            data-reveal
            data-reveal-delay={String(i % 3)}
            className="py-9 border-t grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-5"
            style={{ borderColor: RULE }}
          >
            <div className="lg:col-span-4">
              <span className="block text-sm font-semibold" style={{ color: GOLD_INK }}>
                {c.client}
              </span>
              <h3 className="mt-2 font-heading font-bold text-xl md:text-2xl leading-snug" style={{ color: NAVY }}>
                {c.title}
              </h3>
              {!(showVisuals && c.visual) && <CaseSchema slug={c.slug} />}
            </div>
            <dl className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
              {[
                ['Avant', c.before],
                ['Ce qu’on a fait', c.done],
                ['Aujourd’hui', c.result],
              ].map(([label, text]) => (
                <div key={label}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">{label}</dt>
                  <dd className="mt-2 text-base text-gray-700 leading-relaxed">{text}</dd>
                </div>
              ))}
            </dl>
            {showVisuals && c.visual && (
              <figure className="lg:col-span-8 lg:col-start-5 mt-4">
                <div className="rounded-2xl overflow-hidden" style={{ background: NAVY }}>
                  <img
                    src={c.visual.src}
                    width={c.visual.width}
                    height={c.visual.height}
                    alt={c.visual.alt}
                    loading="lazy"
                    decoding="async"
                    className="block w-full h-auto"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-gray-600">{c.visual.caption}</figcaption>
              </figure>
            )}
          </li>
        ))}
        <li className="border-t" style={{ borderColor: RULE }} aria-hidden="true" />
      </ul>

      {link && (
        <div className="mt-10">
          <Link href={link.href} className="group inline-flex items-center gap-2 font-semibold text-base" style={{ color: NAVY }}>
            {link.label}
            <ArrowRight size={18} style={{ color: GOLD_INK }} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  </section>
);
