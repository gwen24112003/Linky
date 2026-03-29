import React from 'react';
import { ShoppingCart, Users, FileCheck, TrendingUp, MessageSquare, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const useCases = [
  {
    icon: ShoppingCart,
    label: 'E-commerce',
    title: 'Zéro saisie sur les commandes',
    desc: 'Les nouvelles commandes WooCommerce enrichissent Airtable, déclenchent un email de suivi et créent une tâche dans Notion automatiquement.',
    tools: ['WooCommerce', 'Airtable', 'Notion'],
  },
  {
    icon: Users,
    label: 'Agence / Consultant',
    title: 'Relance automatique des leads',
    desc: 'Chaque lead Typeform est qualifié, ajouté au CRM et une séquence de relance est déclenchée, sans aucune action manuelle.',
    tools: ['Typeform', 'CRM', 'Make'],
  },
  {
    icon: FileCheck,
    label: 'Artisan / Prestataire',
    title: 'Dossier client en un clic',
    desc: 'Un devis signé déclenche la création du dossier client, l\'envoi du contrat et la facturation, sans intervention manuelle.',
    tools: ['Notion', 'Pennylane', 'n8n'],
  },
  {
    icon: TrendingUp,
    label: 'TPE en croissance',
    title: 'Reporting hebdomadaire automatique',
    desc: 'Un rapport est généré chaque lundi depuis les données Airtable et envoyé à l\'équipe par email. Zéro intervention.',
    tools: ['Airtable', 'Make', 'Gmail'],
  },
  {
    icon: MessageSquare,
    label: 'Cabinet / Indépendant',
    title: 'Assistant IA sur vos dossiers',
    desc: 'Un assistant IA interne répond aux questions sur vos dossiers et rédige des comptes-rendus depuis vos notes de réunion.',
    tools: ['Notion', 'GPT-4', 'n8n'],
  },
  {
    icon: Layers,
    label: 'PME multi-outils',
    title: 'Synchronisation complète',
    desc: 'Shopify + HubSpot + Google Sheets + Slack : chaque vente met à jour les tableaux, alerte l\'équipe et crée la facture en quelques secondes.',
    tools: ['Shopify', 'HubSpot', 'Slack'],
  },
];

export const UseCasesSection: React.FC = () => {
  return (
    <section className="py-20 bg-white" aria-labelledby="usecases-title">
      <div className="container mx-auto px-6">

        <motion.div
          className="max-w-2xl mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-sm font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: '#C9A84C' }}>
            Cas d'usage
          </p>
          <h2 id="usecases-title" className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Des stratégies d'automatisation adaptées à votre secteur
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Six situations réelles, six systèmes mis en place. À titre d'illustration de ce que nous construisons au quotidien.
          </p>
        </motion.div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((uc, index) => {
            const Icon = uc.icon;
            return (
              <motion.li
                key={uc.title}
                className="rounded-2xl p-6 flex flex-col gap-4"
                style={{ border: '1px solid rgba(26,35,50,0.1)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.06 * index, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(26,35,50,0.1)' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(201,168,76,0.12)' }}
                  >
                    <Icon size={18} style={{ color: '#C9A84C' }} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{uc.label}</span>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2 leading-snug">{uc.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{uc.desc}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {uc.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{
                        background: 'rgba(26,35,50,0.06)',
                        color: '#1A2332',
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
