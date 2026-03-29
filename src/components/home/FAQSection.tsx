import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const faqs = [
  {
    question: "Qu'est-ce que l'automatisation no-code pour une PME ?",
    answer: "L'automatisation no-code permet de connecter vos outils et d'automatiser vos tâches répétitives sans écrire de code. Des plateformes comme Make ou n8n permettent de créer des workflows entre votre CRM, vos emails, vos tableurs et vos applications métier.",
  },
  {
    question: "Quels outils utilisez-vous pour automatiser ?",
    answer: "Nous utilisons principalement Make (ex-Integromat), n8n, Zapier, Airtable, Notion, Google Sheets ainsi que les APIs natives de vos outils. Le choix des outils dépend de votre situation, pas l'inverse.",
  },
  {
    question: "Comment se déroule une mission avec Opus Advisor ?",
    answer: "Chaque mission suit 4 étapes : Audit (cartographie de vos processus et identification des gains), Implémentation (mise en place des automatisations), Formation (vous et votre équipe maîtrisez les systèmes en place), puis Maintenance (suivi, optimisation et corrections dans le temps).",
  },
  {
    question: "Ai-je besoin d'un service informatique pour travailler avec vous ?",
    answer: "Non. C'est précisément l'intérêt du no-code : mettre en place des systèmes fonctionnels sans infrastructure technique lourde. Nous gérons la conception et l'implémentation, et vous formons pour que votre équipe soit autonome.",
  },
  {
    question: "Combien coûte une automatisation ?",
    answer: "Un audit de processus démarre à 300€. Une automatisation simple commence autour de 500€. Un système complet (intégration multi-outils, agents IA) peut aller de 1 500€ à 5 000€. Nous fournissons toujours un devis précis après un premier échange gratuit.",
  },
  {
    question: "Qu'est-ce que n8n et Make ?",
    answer: "Make (anciennement Integromat) et n8n sont des plateformes d'automatisation no-code. Elles permettent de connecter des applications et de déclencher des actions automatiques en fonction d'événements. n8n est open-source et hébergeable, Make est une solution SaaS avec une interface très accessible.",
  },
  {
    question: "Quels résultats concrets peut-on attendre ?",
    answer: "Les gains varient selon le processus automatisé : entre 2 et 10 heures par semaine économisées sur les tâches manuelles, réduction des erreurs de saisie, relances systématiques sans oubli, reporting automatique, synchronisation en temps réel entre outils.",
  },
  {
    question: "Que se passe-t-il si une automatisation tombe en panne ?",
    answer: "Les plateformes Make et n8n intègrent des alertes en cas d'erreur. Nous configurons des notifications et assurons la maintenance dans le cadre de notre offre de suivi. En cas de panne, nous diagnostiquons et corrigeons rapidement.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
    },
  })),
};

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => (
  <div
    className="border-b last:border-b-0"
    style={{ borderColor: 'rgba(26,35,50,0.1)' }}
  >
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
          <p className="text-gray-600 leading-relaxed pb-5 text-sm md:text-base">
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqJsonLd)}
        </script>
      </Helmet>

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
    </>
  );
};
