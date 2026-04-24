'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  Wallet,
  Calculator,
  MessageSquare,
  CalendarClock,
  PhoneMissed,
} from 'lucide-react';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';

const pains = [
  {
    icon: Clock,
    title: '10-15h/semaine sur la paperasse',
    desc: "Vous faites vos devis le soir. Les relances le weekend. La compta quand vous pouvez. Votre vrai métier, c'est pas ça.",
  },
  {
    icon: Wallet,
    title: 'Impayés qui plombent la trésorerie',
    desc: "1 artisan sur 3 subit des retards de paiement. Moyenne d'un impayé BTP : 3 000 €. Quand on oublie de relancer, le cash dort.",
  },
  {
    icon: Calculator,
    title: 'Marge chantier jamais claire',
    desc: "Votre dernier job, rentable ou pas ? Vous sauriez pas dire. Les heures réelles, les achats hors devis, les reprises : tout se perd entre Batappli, Excel et les tickets de caisse dans le camion.",
  },
  {
    icon: MessageSquare,
    title: 'Suivi chantier dans WhatsApp',
    desc: "Les photos, les imprévus, les demandes de devis complémentaires… tout remonte dans des boucles WhatsApp perdues. Un employé part, l'info part avec.",
  },
  {
    icon: CalendarClock,
    title: 'Planning équipes en Excel',
    desc: "Qui est où demain ? Vous, votre conjoint(e) et la cheffe d'équipe avez chacun votre version du planning. Quelqu'un se trompe. C'est le chantier qui en pâtit.",
  },
  {
    icon: PhoneMissed,
    title: 'Leads entrants qui fuient',
    desc: 'Un appel raté, un formulaire du site pas traité, un devis demandé jamais envoyé. Chaque lead perdu = 2 à 10 k€ qui partent ailleurs.',
  },
];

export const PainSection: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-[#FAF8F4]" aria-labelledby="pain-title">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p
            className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase mb-3"
            style={{ color: GOLD }}
          >
            Ce qu'on voit sur le terrain
          </p>
          <h2
            id="pain-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5"
            style={{ color: NAVY }}
          >
            Votre boîte tourne sur 6 outils qui ne se parlent pas.
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            Vos devis dans Batappli (ou Tolteck, ou Obat). Vos chantiers dans WhatsApp. Vos factures dans Excel. Vos relances dans votre tête. Vos photos de chantier dispersées. Vos SAV oubliés 6 mois plus tard.
            <br />
            <span className="font-medium" style={{ color: NAVY }}>
              On connaît. On voit ça dans chaque boîte de second œuvre qu'on rencontre.
            </span>
          </p>
        </motion.div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {pains.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.li
                key={p.title}
                className="bg-white rounded-2xl p-6 flex flex-col gap-3"
                style={{
                  border: '1px solid rgba(26,35,50,0.08)',
                  boxShadow: '0 2px 12px rgba(26,35,50,0.04)',
                }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, boxShadow: '0 10px 28px rgba(26,35,50,0.1)' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}44` }}
                  >
                    <Icon size={20} style={{ color: NAVY }} />
                  </div>
                  <h3 className="font-bold text-lg leading-snug" style={{ color: NAVY }}>
                    {p.title}
                  </h3>
                </div>
                <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed">
                  {p.desc}
                </p>
              </motion.li>
            );
          })}
        </ul>

        <motion.p
          className="mt-10 text-center text-base md:text-lg font-medium"
          style={{ color: NAVY }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Vous cochez 3 cases sur 6 ? On a exactement ce qu'il faut.
        </motion.p>
      </div>
    </section>
  );
};
