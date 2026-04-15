'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '@/lib/faqData';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => (
  <div className="border-b last:border-b-0" style={{ borderColor: 'rgba(26,35,50,0.1)' }}>
    <button
      className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <span className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors leading-snug">
        {question}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="flex-shrink-0"
      >
        <ChevronDown size={20} style={{ color: '#C9A84C' }} />
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
          <p className="text-gray-600 leading-relaxed pb-5 text-sm md:text-base">{answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-gray-50" aria-labelledby="faq-title">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="text-sm font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: '#C9A84C' }}>
              Questions fréquentes
            </p>
            <h2 id="faq-title" className="text-4xl md:text-5xl font-bold text-gray-900">
              Questions fréquentes sur nos services d'automatisation et de conseil
            </h2>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl px-6 md:px-10"
            style={{ border: '1px solid rgba(26,35,50,0.1)', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}
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
