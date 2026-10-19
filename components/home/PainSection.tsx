import React from 'react';
import { PainChecklist, type Pain } from '@/components/home/PainChecklist';

const NAVY = '#1A2332';
const PAPER = '#FAF7F0';

const pains: Pain[] = [
  {
    n: '01',
    title: '10-15 h/semaine sur la paperasse',
    desc: "Vous faites vos devis le soir. Les relances le weekend. La compta quand vous pouvez. Votre vrai métier, c'est pas ça.",
  },
  {
    n: '02',
    title: 'Impayés qui plombent la trésorerie',
    desc: "1 patron sur 3 subit des retards de paiement. Moyenne d'un impayé BTP : 3 000 €. Quand on oublie de relancer, le cash dort.",
  },
  {
    n: '03',
    title: 'Marge chantier jamais claire',
    desc: "Votre dernier job, rentable ou pas ? Vous sauriez pas dire. Les heures réelles, les achats hors devis, les reprises : tout se perd entre Batappli, Excel et les tickets de caisse dans le camion.",
  },
  {
    n: '04',
    title: 'Suivi chantier dans WhatsApp',
    desc: "Les photos, les imprévus, les demandes de devis complémentaires… tout remonte dans des boucles WhatsApp perdues. Un employé part, l'info part avec.",
  },
  {
    n: '05',
    title: 'Planning équipes en Excel',
    desc: "Qui est où demain ? Vous, votre conjoint(e) et la cheffe d'équipe avez chacun votre version du planning. Quelqu'un se trompe. C'est le chantier qui en pâtit.",
  },
  {
    n: '06',
    title: 'Leads entrants qui fuient',
    desc: 'Un appel raté, un formulaire du site pas traité, un devis demandé jamais envoyé. Chaque lead perdu = 2 à 10 k€ qui partent ailleurs.',
  },
];

export const PainSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32" style={{ background: PAPER }} aria-labelledby="pain-title">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2
          id="pain-title"
          className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl max-w-3xl"
          style={{ color: NAVY }}
        >
          Votre boîte tourne sur 6 outils qui ne se parlent pas.
        </h2>

        <p className="mt-7 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
          Devis dans Batappli, chantiers dans WhatsApp, factures dans Excel, relances que vous
          portez seul, photos dispersées, SAV oubliés six mois plus tard.{' '}
          <span className="font-medium" style={{ color: NAVY }}>
            C'est le quotidien de la plupart des boîtes du second œuvre.
          </span>
        </p>

        <PainChecklist pains={pains} />
      </div>
    </section>
  );
};
