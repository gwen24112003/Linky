'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Check, X, ArrowRight } from 'lucide-react';
import { SectionKicker } from '@/components/ui/SectionKicker';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';
const PAPER = '#FAF7F0';
const RULE = 'rgba(26,35,50,0.16)';

interface ServiceData {
  id: string;
  n: string;
  tag: string;
  title: string;
  hook: string;
  description: string;
  deliverables: string[];
  price: string;
  priceNote?: string;
  duration: string;
  cta?: string;
}

const services: ServiceData[] = [
  {
    id: 'pre-audit',
    n: '01',
    tag: 'Sans engagement',
    title: 'Pré-audit gratuit',
    hook: 'Vous voyez ce que ça donne avant de décider quoi que ce soit.',
    description:
      "30 minutes en visio. Vous me montrez vos outils en partage d'écran. J'identifie 3 points de friction concrets sur votre boîte, et je vous montre en direct comment on les règle. Pas de slide, pas de vente.",
    deliverables: [
      'Tour rapide de vos outils actuels',
      '3 points de friction identifiés en direct',
      '1 automation démontrée sur vos propres données',
      'Recommandation honnête : go / no-go',
    ],
    price: 'Gratuit',
    duration: '30 min · Visio',
    cta: 'Réserver mon créneau',
  },
  {
    id: 'audit-stack',
    n: '02',
    tag: 'Indépendant · revendeur de personne',
    title: 'Audit Stack',
    hook: 'Pour 990 €, en 10 jours, vous savez où vous en êtes.',
    description:
      "Cartographie de vos outils actuels et identification des points de friction. Préconisation explicite : faut-il ajouter un outil, en remplacer un, ou orchestrer ceux que vous avez déjà ? Indépendance totale : on n'est revendeur de personne.",
    deliverables: [
      'Cartographie complète de vos outils actuels',
      'Identification des points de friction prioritaires',
      'Préconisation explicite : ajouter / remplacer / orchestrer',
      'Estimation chiffrée des chantiers à mener',
    ],
    price: '990 € HT',
    priceNote: 'Livré en 10 jours ouvrés',
    duration: '10 jours ouvrés',
    cta: 'Demander un Audit Stack',
  },
  {
    id: 'diagnostic',
    n: '03',
    tag: 'Forfait fixe',
    title: 'Diagnostic opérationnel',
    hook: "On cartographie votre boîte et on chiffre ce qu'on vous fait gagner.",
    description:
      "Deux à trois semaines pour comprendre votre boîte de fond en comble. Interviews de l'équipe, cartographie des flux, analyse des outils en place. Livraison : un plan de consolidation précis, chiffré, avec ROI attendu. Si ça vous parle, on exécute. Sinon, vous gardez le plan.",
    deliverables: [
      "Cartographie complète de l'existant",
      'Identification des 5 à 10 chantiers prioritaires',
      'Vision cible sur 12 mois',
      "Plan d'exécution chiffré (coûts + gains estimés)",
      'Restitution live avec votre équipe',
    ],
    price: '2 500 €',
    priceNote: 'Forfait · TVA non applicable art. 293 B CGI',
    duration: '2 à 3 semaines',
  },
  {
    id: 'implementation',
    n: '04',
    tag: 'Livrable fonctionnel',
    title: 'Mise en œuvre système',
    hook: 'On configure, on connecte, on forme. Pas de livraison dans le vide.',
    description:
      "On met en œuvre le système défini au diagnostic. Configuration des outils métier (Batappli, Obat, Tolteck, EBP), mise en place des automations (Make, n8n), couche collaborative (Notion, Google Workspace, WhatsApp Business). Tests sur vos vrais chantiers, formation de l'équipe, documentation écrite.",
    deliverables: [
      'Outil métier BTP implémenté et optimisé',
      'Automations en production (relances, reporting, synchro)',
      'Couche collaborative connectée (Notion / Drive + WhatsApp)',
      'Formation équipe en français, sur vos données',
      'Documentation et schémas remis',
    ],
    price: '5 500 € à 25 000 €',
    priceNote: 'Selon périmètre · chiffré précisément après diagnostic',
    duration: '4 à 10 semaines',
  },
  {
    id: 'suivi',
    n: '05',
    tag: "Optionnel · l'opérateur qui reste à vos côtés",
    title: 'Gardien du système',
    hook: 'Votre système évolue avec votre boîte. On maintient, on ajuste, on ajoute.',
    description:
      "Un opérateur qui connaît votre système et reste à vos côtés. Check mensuel, monitoring des automations, corrections si panne, nouvelles briques au fil de l'eau. Pas de ticket dans un support offshore : vous m'écrivez, je réponds.",
    deliverables: [
      'Monitoring des automations (alertes en cas de panne)',
      'Point mensuel (30 min visio ou async)',
      "2 à 4 heures d'évolutions incluses / mois",
      'Accès direct par mail et WhatsApp',
      'Backup documentaire maintenu à jour',
    ],
    price: '400 à 1 500 €/mois',
    priceNote: 'Selon complexité du système · sans engagement (Premium sur engagement 12 mois)',
    duration: 'Mensuel',
  },
];

const differentiators = [
  {
    n: '01',
    vs: 'Vs un éditeur de logiciel BTP',
    lead: 'Un éditeur vend son outil et passe à la boîte suivante.',
    bold: 'On ne vend rien. On orchestre ce que vous avez déjà.',
    tail: "Votre Batappli, votre Obat, votre EBP — on les fait parler ensemble plutôt que d'en ajouter un onzième.",
  },
  {
    n: '02',
    vs: 'Vs un cabinet de conseil classique',
    lead: "Un cabinet livre une feuille de route et vous laisse l'appliquer.",
    bold: "On l'applique avec vous.",
    tail: 'Pas de PowerPoint sans action. Chaque mission produit un système qui tourne, pas un document à activer.',
  },
  {
    n: '03',
    vs: 'Vs un freelance Make ou Zapier',
    lead: 'Un freelance facture des journées.',
    bold: 'On vend un système qui tient.',
    tail: 'Documentation complète, formation de vos équipes, Gardien optionnel à 400 €/mois pour ne jamais vous retrouver seul face à un système qui plante.',
  },
  {
    n: '04',
    vs: 'Vs un programme France Num gratuit',
    lead: 'Un programme financé accompagne 1500 entreprises avec la même méthode.',
    bold: 'On bosse pour la vôtre, pas pour la moyenne.',
    tail: 'Recommandations basées sur vos outils réels, votre activité réelle, vos contraintes réelles.',
  },
];

const identity = [
  { est: 'Un opérateur spécialisé BTP second œuvre', nest: 'Un cabinet de conseil généraliste' },
  { est: "Un orchestrateur d'outils existants", nest: 'Un revendeur de logiciels' },
  { est: 'Un partenaire long terme (Gardien)', nest: 'Un prestataire one-shot au TJM' },
  { est: 'Un système qui rend du temps mesurable', nest: 'Une promesse de transformation digitale floue' },
  { est: 'Indépendant de tout éditeur', nest: 'Affilié à Batappli, Obat, EBP ou autre' },
  { est: 'Concret : des automatisations qui tournent', nest: 'Théorique : des feuilles de route à activer' },
];

const reveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const ServicesView: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.hash) {
      const sectionId = window.location.hash.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          const navbarHeight = 100;
          const offsetPosition =
            element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <main className="flex-grow">
      {/* Hero */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-24" style={{ background: NAVY }}>
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionKicker label="Services & tarifs" tone="dark" className="mb-8" />
          <h1 className="font-heading font-bold leading-[1.0] tracking-tight text-5xl md:text-6xl lg:text-7xl text-white">
            Cinq étapes claires, chiffrées, sans surprise.
          </h1>
          <p className="mt-7 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">
            Vous payez ce qui est dit. Vous savez combien ça coûte avant de signer. Vous sortez quand
            vous voulez.
          </p>
        </div>
      </section>

      {/* Offres — ledger éditorial */}
      <section className="py-20 md:py-28" style={{ background: PAPER }}>
        <div className="container mx-auto px-6 max-w-5xl">
          {services.map((s) => (
            <motion.div
              key={s.id}
              id={s.id}
              className="border-t scroll-mt-28"
              style={{ borderColor: RULE }}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className="py-10 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
                {/* Gauche */}
                <div className="md:col-span-5">
                  <div className="flex items-start gap-5">
                    <span className="font-heading font-bold text-4xl md:text-5xl leading-none" style={{ color: GOLD }}>
                      {s.n}
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: 'rgba(26,35,50,0.45)' }}>
                        {s.tag}
                      </p>
                      <h2 className="font-heading font-bold text-2xl md:text-3xl leading-tight" style={{ color: NAVY }}>
                        {s.title}
                      </h2>
                      <p className="mt-3 text-base text-gray-500 italic leading-relaxed">{s.hook}</p>
                    </div>
                  </div>

                  <div className="mt-7 md:pl-[3.6rem]">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 mb-1">
                      {s.duration}
                    </p>
                    <p className="font-heading font-bold text-2xl md:text-3xl" style={{ color: NAVY }}>
                      {s.price}
                    </p>
                    {s.priceNote && <p className="text-xs text-gray-400 mt-1.5 max-w-xs">{s.priceNote}</p>}
                  </div>
                </div>

                {/* Droite */}
                <div className="md:col-span-7">
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">{s.description}</p>

                  <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: GOLD }}>
                    Ce qui est livré
                  </p>
                  <ul className="space-y-2.5">
                    {s.deliverables.map((d, di) => (
                      <li key={di} className="flex items-start gap-3">
                        <Check size={15} strokeWidth={3} className="mt-1 shrink-0" style={{ color: GOLD }} />
                        <span className="text-sm md:text-[15px] text-gray-700 leading-snug">{d}</span>
                      </li>
                    ))}
                  </ul>

                  {s.cta && (
                    <Link
                      href="/contact"
                      className="group mt-7 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm md:text-base transition-all duration-200 hover:scale-[1.02]"
                      style={{ background: GOLD, color: NAVY }}
                    >
                      {s.cta}
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          <div className="border-t" style={{ borderColor: RULE }} />
        </div>
      </section>

      {/* Différenciants */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionKicker label="Pourquoi Opus Advisor" className="mb-8" />
          <h2 className="font-heading font-bold leading-[1.02] tracking-tight text-4xl md:text-5xl mb-12" style={{ color: NAVY }}>
            Ce qui change avec nous.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14">
            {differentiators.map((d) => (
              <div key={d.n} className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-7 border-t" style={{ borderColor: RULE }}>
                <span className="font-heading font-bold text-base leading-none pt-1" style={{ color: GOLD }}>
                  {d.n}
                </span>
                <div>
                  <h3 className="font-semibold text-lg md:text-xl leading-snug mb-2" style={{ color: NAVY }}>
                    {d.vs}
                  </h3>
                  <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed">
                    {d.lead} <strong style={{ color: GOLD }}>{d.bold}</strong> {d.tail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Identité — ce qu'on est / n'est pas */}
      <section id="identite" className="py-20 md:py-28 scroll-mt-28" style={{ background: PAPER }}>
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionKicker label="En une phrase" className="mb-8" />
          <h2 className="font-heading font-bold leading-[1.02] tracking-tight text-4xl md:text-5xl mb-12" style={{ color: NAVY }}>
            Ce qu'on est, ce qu'on n'est pas.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-14">
            {/* EST */}
            <div>
              <div className="pb-3 border-b-2" style={{ borderColor: GOLD }}>
                <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                  Opus Advisor est
                </span>
              </div>
              <ul>
                {identity.map((r) => (
                  <li
                    key={r.est}
                    className="flex items-start gap-3 py-4 border-t"
                    style={{ borderColor: RULE }}
                  >
                    <Check size={16} strokeWidth={3} className="mt-1 shrink-0" style={{ color: GOLD }} />
                    <span className="text-base md:text-lg font-semibold" style={{ color: NAVY }}>
                      {r.est}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* N'EST PAS */}
            <div>
              <div className="pb-3 border-b-2" style={{ borderColor: 'rgba(26,35,50,0.25)' }}>
                <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'rgba(26,35,50,0.45)' }}>
                  Opus Advisor n'est pas
                </span>
              </div>
              <ul>
                {identity.map((r) => (
                  <li
                    key={r.nest}
                    className="flex items-start gap-3 py-4 border-t"
                    style={{ borderColor: RULE }}
                  >
                    <X size={16} strokeWidth={2.5} className="mt-1 shrink-0 text-gray-400" />
                    <span className="text-base md:text-lg italic text-gray-500">{r.nest}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pour aller plus loin */}
      <section className="py-20 md:py-28" style={{ background: PAPER }}>
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionKicker label="Pour aller plus loin" className="mb-8" />
          <h2 className="font-heading font-bold leading-[1.02] tracking-tight text-4xl md:text-5xl mb-12" style={{ color: NAVY }}>
            Avant de décider, prenez deux minutes.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14">
            <Link href="/cas-clients" className="group py-7 border-t flex flex-col" style={{ borderColor: NAVY }}>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: GOLD }}>
                Programme pilote · 3 places
              </span>
              <h3 className="font-heading font-bold text-xl md:text-2xl leading-snug mb-3" style={{ color: NAVY }}>
                Opus Pilotes — construisez la v1 avec nous
              </h3>
              <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed mb-5 flex-1">
                Trois boîtes du second œuvre, tarif pilote -40 %, accès direct. En échange, on
                documente ensemble ce qui marche.
              </p>
              <span className="inline-flex items-center gap-2 font-semibold text-sm md:text-base" style={{ color: NAVY }}>
                Voir le programme
                <ArrowRight size={18} style={{ color: GOLD }} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link href="/articles" className="group py-7 border-t flex flex-col" style={{ borderColor: NAVY }}>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: 'rgba(26,35,50,0.45)' }}>
                Conseils & retours terrain
              </span>
              <h3 className="font-heading font-bold text-xl md:text-2xl leading-snug mb-3" style={{ color: NAVY }}>
                Articles — comment on procède, concrètement
              </h3>
              <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed mb-5 flex-1">
                Méthodes de consolidation, outils BTP comparés, facturation électronique,
                automatisations testées sur le terrain. Lecture courte, sans jargon.
              </p>
              <span className="inline-flex items-center gap-2 font-semibold text-sm md:text-base" style={{ color: NAVY }}>
                Lire les articles
                <ArrowRight size={18} style={{ color: GOLD }} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA bas */}
      <section className="py-20 md:py-28" style={{ background: NAVY }}>
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionKicker label="Démarrer" tone="dark" className="mb-8" />
          <h2 className="font-heading font-bold leading-[1.02] tracking-tight text-4xl md:text-5xl text-white max-w-3xl">
            Vous hésitez sur l'offre qui colle à votre boîte ?
          </h2>
          <p className="mt-6 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">
            Commencez par le pré-audit. Gratuit, 30 minutes, et vous en ressortez avec 3 points de
            friction identifiés. On décide ensuite, ensemble, si on continue ou pas.
          </p>
          <Link
            href="/contact"
            className="group mt-9 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm md:text-base transition-all duration-200 hover:scale-[1.02]"
            style={{ background: GOLD, color: NAVY }}
          >
            Réserver mon pré-audit
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
};
