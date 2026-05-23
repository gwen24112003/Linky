'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { faqs } from '@/lib/faqData';
import { SectionKicker } from '@/components/ui/SectionKicker';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';
const RULE = 'rgba(26,35,50,0.16)';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => (
  <div className="border-t" style={{ borderColor: RULE }}>
    <button
      className="w-full flex items-start justify-between py-6 md:py-7 text-left gap-6 group"
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <span
        className="font-heading font-semibold text-xl md:text-2xl leading-snug transition-opacity group-hover:opacity-70"
        style={{ color: NAVY }}
      >
        {question}
      </span>
      <span className="flex-shrink-0 mt-1.5">
        {isOpen ? (
          <Minus size={22} style={{ color: GOLD }} strokeWidth={2.5} />
        ) : (
          <Plus size={22} style={{ color: GOLD }} strokeWidth={2.5} />
        )}
      </span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: 'hidden' }}
        >
          <div className="prose prose-sm md:prose-base max-w-none pb-7 pr-8 md:pl-0 text-gray-600 prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-li:my-1 prose-strong:text-[#1A2332] prose-strong:font-semibold">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export const FAQSectionBTP: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 bg-white" aria-labelledby="faq-title">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-10 md:mb-12">
          <SectionKicker label="Questions" index="09" className="mb-8" />
          <h2
            id="faq-title"
            className="font-heading font-bold leading-[1.02] tracking-tight text-4xl md:text-5xl lg:text-6xl"
            style={{ color: NAVY }}
          >
            Les questions qu'on nous pose souvent.
          </h2>
        </div>

        <div style={{ borderBottom: `1px solid ${RULE}` }}>
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
