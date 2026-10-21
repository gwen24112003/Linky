import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Faq } from '@/lib/faqData';

const NAVY = '#1A2332';
const RULE = 'rgba(26,35,50,0.16)';

// Accordéon natif <details> : toutes les réponses sont dans le HTML (lisibles par Google,
// par les moteurs d'IA et sans JavaScript), et l'ouverture marche au clavier sans code.
export const FAQSection: React.FC<{ items: Faq[]; title?: string; background?: string }> = ({
  items,
  title = 'Vos questions',
  background = '#FFFFFF',
}) => {
  return (
    <section className="py-24 md:py-32" style={{ background }} aria-labelledby="faq-title">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2
          id="faq-title"
          className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl mb-10 md:mb-12"
          style={{ color: NAVY }}
        >
          {title}
        </h2>

        <div style={{ borderBottom: `1px solid ${RULE}` }}>
          {items.map((faq, index) => (
            <details key={faq.question} open={index === 0} className="group border-t" style={{ borderColor: RULE }}>
              <summary className="flex items-start justify-between gap-6 py-6 md:py-7 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span
                  className="font-heading font-semibold text-xl md:text-2xl leading-snug group-hover:opacity-70 transition-opacity"
                  style={{ color: NAVY }}
                >
                  {faq.question}
                </span>
                <span
                  className="flex-shrink-0 mt-1 text-2xl leading-none text-[#8A6A1C] transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div className="prose prose-sm md:prose-base max-w-none pb-7 pr-8 text-gray-600 prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-li:my-1 prose-strong:text-[#1A2332] prose-strong:font-semibold">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{faq.answer}</ReactMarkdown>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
