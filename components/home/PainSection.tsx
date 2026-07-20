import React from 'react';
import { SectionKicker } from '@/components/ui/SectionKicker';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';
const RULE = 'rgba(26,35,50,0.14)';

const pains = [
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
    <section className="py-24 md:py-32 bg-white" aria-labelledby="pain-title">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-10 md:mb-12">
          <SectionKicker label="Le terrain" index="02" />
        </div>

        <h2
          id="pain-title"
          className="font-heading font-bold leading-[1.02] tracking-tight text-4xl md:text-5xl lg:text-6xl max-w-3xl"
          style={{ color: NAVY }}
        >
          Votre boîte tourne sur 6 outils qui ne se parlent pas.
        </h2>

        <p className="mt-7 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
          Devis dans Batappli, chantiers dans WhatsApp, factures dans Excel, relances que vous
          portez seul, photos dispersées, SAV oubliés six mois plus tard.{' '}
          <span className="font-medium" style={{ color: NAVY }}>
            On voit ça dans chaque boîte de second œuvre qu'on rencontre.
          </span>
        </p>

        <ul className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-14">
          {pains.map((p) => (
            <li
              key={p.n}
              className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-6 border-t"
              style={{ borderColor: RULE }}
            >
              <span
                className="font-heading font-bold text-base leading-none pt-1"
                style={{ color: GOLD }}
              >
                {p.n}
              </span>
              <div>
                <h3
                  className="font-semibold text-lg md:text-xl leading-snug mb-2"
                  style={{ color: NAVY }}
                >
                  {p.title}
                </h3>
                <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed">{p.desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <p
          className="mt-12 pt-8 border-t text-lg md:text-xl font-medium"
          style={{ color: NAVY, borderColor: RULE }}
        >
          Vous cochez 3 cases sur 6 ?{' '}
          <span style={{ color: GOLD }}>On a exactement ce qu'il faut.</span>
        </p>
      </div>
    </section>
  );
};
