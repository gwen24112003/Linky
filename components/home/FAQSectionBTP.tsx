'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '@/lib/faqData';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => (
  <div className="border-b last:border-b-0" style={{ borderColor: 'rgba(26,35,50,0.08)' }}>
    <button
      className="w-full flex items-start justify-between py-5 md:py-6 text-left gap-4 group"
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <span
        className="font-semibold text-base md:text-lg leading-snug group-hover:opacity-80 transition-opacity"
        style={{ color: NAVY }}
      >
        {question}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="flex-shrink-0 mt-1"
      >
        <ChevronDown size={22} style={{ color: GOLD }} />
      </motion.div>
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
          <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed pb-5 md:pb-6 pr-8">
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export const FAQSectionBTP: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-24 bg-[#FAF8F4]" aria-labelledby="faq-title">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="mb-10 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p
              className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase mb-3"
              style={{ color: GOLD }}
            >
              FAQ
            </p>
            <h2
              id="faq-title"
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: NAVY }}
            >
              Les questions qu'on nous pose souvent.
            </h2>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl px-6 md:px-10"
            style={{
              border: '1px solid rgba(26,35,50,0.08)',
              boxShadow: '0 4px 24px rgba(26,35,50,0.04)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
