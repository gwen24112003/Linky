'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { SectionKicker } from '@/components/ui/SectionKicker';

const GOLD = '#C9A84C';
// Or foncé pour le texte et les icônes sur fond clair : l'or d'origine y tombe à 2,1:1 de contraste.
const GOLD_INK = '#8A6A1C';
const NAVY = '#1A2332';
const PAPER = '#FAF7F0';
const RULE = 'rgba(26,35,50,0.16)';

interface ServiceData {
  id: string;
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
    tag: 'Sans engagement',
    title: 'Pré-audit gratuit',
    hook: 'Vous voyez ce que ça donne avant de décider quoi que ce soit.',
    description:
      "30 minutes en visio. Vous partagez votre écran et vous me montrez vos outils. Je repère 3 points de friction dans votre boîte et je vous montre en direct comment les régler. On travaille sur vos vrais outils, sans présentation.",
    deliverables: [
      'Un tour rapide de vos outils actuels',
      '3 points de friction repérés en direct',
      '1 automatisation montrée sur vos propres données',
      'Une recommandation honnête : continuer ou en rester là',
    ],
    price: 'Gratuit',
    duration: '30 min · Visio',
    cta: 'Réserver mon créneau',
  },
  {
    id: 'audit-stack',
    tag: 'Indépendant de tout éditeur',
    title: 'Audit Stack',
    hook: '990 €, 10 jours, et vous savez où vous en êtes.',
    description:
      "On cartographie vos outils et on repère les points de friction. Pour chaque outil, vous recevez une recommandation claire : l'ajouter, le remplacer ou le relier aux autres. On ne revend aucun logiciel, donc on n'a aucun intérêt à vous en placer un.",
    deliverables: [
      'La carte complète de vos outils actuels',
      'Les points de friction, par ordre de priorité',
      'Une recommandation pour chaque outil : ajouter, remplacer ou relier',
      'Le coût estimé de chaque chantier à mener',
    ],
    price: '990 €',
    priceNote: 'TVA non applicable · art. 293 B CGI',
    duration: '10 jours ouvrés',
    cta: 'Demander un Audit Stack',
  },
  {
    id: 'diagnostic',
    tag: 'Prix fixe',
    title: 'Diagnostic opérationnel',
    hook: 'On cartographie votre boîte et on chiffre ce que vous allez gagner.',
    description:
      "Deux à trois semaines pour comprendre comment tourne votre boîte : entretiens avec l'équipe, circuit des devis et des factures, outils en place. Vous recevez un plan précis et chiffré, avec le gain attendu. Si vous voulez qu'on l'applique, on s'en charge. Sinon, le plan vous appartient.",
    deliverables: [
      "La carte complète de l'existant",
      'Les 5 à 10 chantiers prioritaires',
      'La cible à 12 mois',
      "Le plan d'exécution chiffré, coûts et gains estimés",
      'Une restitution en direct avec votre équipe',
    ],
    price: '2 500 €',
    priceNote: 'TVA non applicable · art. 293 B CGI',
    duration: '2 à 3 semaines',
  },
  {
    id: 'implementation',
    tag: 'Un système qui tourne',
    title: 'Mise en œuvre système',
    hook: 'On installe le système, puis on forme vos équipes dessus.',
    description:
      "On met en place le système défini au diagnostic : paramétrage de votre logiciel métier (Batappli, Obat, Tolteck, EBP), automatisations avec Make ou n8n, dossier partagé des chantiers dans Notion ou Google Workspace, relié à WhatsApp Business. On teste sur vos vrais chantiers, on forme l'équipe et on vous laisse une documentation écrite.",
    deliverables: [
      'Votre logiciel métier paramétré et exploité à fond',
      'Les automatisations en service : relances, rapports, synchronisations',
      'Le dossier partagé des chantiers, relié à WhatsApp',
      "La formation de l'équipe, en français, sur vos données",
      'La documentation et les schémas du système',
    ],
    price: 'À partir de 5 500 €',
    priceNote: 'Selon le périmètre · chiffré précisément après le diagnostic',
    duration: '4 à 10 semaines',
  },
  {
    id: 'suivi',
    tag: 'Optionnel',
    title: 'Gardien du système',
    hook: 'Votre système suit les changements de votre boîte.',
    description:
      "Quelqu'un qui connaît votre système reste disponible. On fait un point chaque mois, on surveille les automatisations, on répare si quelque chose casse et on ajoute ce qui manque au fil de l'eau. Vous m'écrivez directement, sans ticket ni centre d'appel.",
    deliverables: [
      'La surveillance des automatisations, avec une alerte en cas de panne',
      'Un point par mois, en visio de 30 minutes ou par écrit',
      "2 à 4 heures d'évolutions comprises chaque mois",
      'Un accès direct par mail et WhatsApp',
      'La documentation tenue à jour',
    ],
    price: '400 à 1 500 €/mois',
    priceNote: 'Selon la taille du système · sans engagement (formule Premium : engagement de 12 mois)',
    duration: 'Mensuel',
  },
];

const comparisons = [
  {
    vs: 'Face à un éditeur de logiciel BTP',
    text: "Un éditeur vend son outil, puis passe à l'entreprise suivante. Nous, on ne vend aucun logiciel : on relie votre Batappli, votre Obat ou votre EBP à vos autres outils, plutôt que d'en ajouter un onzième.",
  },
  {
    vs: 'Face à un cabinet de conseil',
    text: "Un cabinet livre une feuille de route et vous laisse l'appliquer. On l'applique avec vous, jusqu'à ce que le système tourne dans votre boîte.",
  },
  {
    vs: 'Face à un freelance Make ou Zapier',
    text: 'Un freelance facture des journées. On livre un système complet, avec sa documentation et la formation de vos équipes, puis le Gardien à partir de 400 €/mois si quelque chose casse.',
  },
  {
    vs: 'Face à un programme France Num gratuit',
    text: 'Un programme financé accompagne 1 500 entreprises avec la même méthode. On part de vos outils et de la façon dont votre boîte tourne vraiment.',
  },
];

const summary = [
  'Spécialisés dans le second œuvre, et rien d’autre',
  'On travaille avec les outils que vous avez déjà',
  'On reste après la mise en œuvre, avec le Gardien',
  'On mesure le temps gagné, sur vos chiffres',
  'Indépendants de tous les éditeurs de logiciels',
  'Les automatisations tournent chez vous dès la mise en œuvre',
];

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
          <SectionKicker label="Services et tarifs" tone="dark" className="mb-8" />
          <h1 className="font-heading font-bold leading-[1.0] tracking-tight text-5xl md:text-6xl lg:text-7xl text-white">
            Cinq étapes, avec leur prix.
          </h1>
          <p className="mt-7 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">
            Vous connaissez le prix de chaque étape avant de signer, et vous pouvez vous arrêter à la
            fin de chacune.
          </p>
        </div>
      </section>

      {/* Offres */}
      <section className="py-20 md:py-28" style={{ background: PAPER }}>
        <div className="container mx-auto px-6 max-w-5xl">
          {services.map((s, i) => (
            <div key={s.id} id={s.id} className="border-t scroll-mt-28" style={{ borderColor: RULE }}>
              <div className="py-10 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
                {/* Gauche */}
                <div className="md:col-span-5">
                  <p className="text-sm text-gray-500">
                    Étape {i + 1} sur {services.length} · {s.tag}
                  </p>
                  <h2 className="mt-2 font-heading font-bold text-2xl md:text-3xl leading-tight" style={{ color: NAVY }}>
                    {s.title}
                  </h2>
                  <p className="mt-3 text-base text-gray-600 leading-relaxed">{s.hook}</p>

                  <div className="mt-7">
                    <p className="text-sm text-gray-500 mb-1">{s.duration}</p>
                    <p className="font-heading font-bold text-2xl md:text-3xl" style={{ color: NAVY }}>
                      {s.price}
                    </p>
                    {s.priceNote && <p className="text-xs text-gray-500 mt-1.5 max-w-xs">{s.priceNote}</p>}
                  </div>
                </div>

                {/* Droite */}
                <div className="md:col-span-7">
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">{s.description}</p>

                  <p className="mt-7 text-sm font-semibold mb-4" style={{ color: NAVY }}>
                    Ce que vous recevez
                  </p>
                  <ul className="space-y-2.5">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-3">
                        <Check size={15} strokeWidth={3} className="mt-1 shrink-0" style={{ color: GOLD_INK }} />
                        <span className="text-sm md:text-[15px] text-gray-700 leading-snug">{d}</span>
                      </li>
                    ))}
                  </ul>

                  {s.cta && (
                    <Link
                      href="/contact"
                      className="group mt-7 inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm md:text-base transition-colors"
                      style={{ background: GOLD, color: NAVY }}
                    >
                      {s.cta}
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="border-t" style={{ borderColor: RULE }} />
        </div>
      </section>

      {/* Comparaisons */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl mb-12" style={{ color: NAVY }}>
            Par rapport aux autres options
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14">
            {comparisons.map((c) => (
              <div key={c.vs} className="py-7 border-t" style={{ borderColor: RULE }}>
                <h3 className="font-semibold text-lg md:text-xl leading-snug mb-2" style={{ color: NAVY }}>
                  {c.vs}
                </h3>
                <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* En résumé */}
      <section id="identite" className="py-20 md:py-28 scroll-mt-28" style={{ background: PAPER }}>
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl mb-12" style={{ color: NAVY }}>
            En résumé
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-14">
            {summary.map((line) => (
              <li
                key={line}
                className="py-4 border-t text-base md:text-lg font-semibold"
                style={{ borderColor: RULE, color: NAVY }}
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pour aller plus loin */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl mb-12" style={{ color: NAVY }}>
            Avant de décider, prenez deux minutes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14">
            <Link href="/cas-clients" className="group py-7 border-t flex flex-col" style={{ borderColor: NAVY }}>
              <span className="text-sm text-gray-500 mb-3">Programme pilote · 3 places</span>
              <h3 className="font-heading font-bold text-xl md:text-2xl leading-snug mb-3" style={{ color: NAVY }}>
                Opus Pilotes : construisez la première version avec nous
              </h3>
              <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed mb-5 flex-1">
                Trois boîtes du second œuvre, 40 % moins cher que le tarif normal, avec un accès direct.
                En échange, on documente ensemble ce qui marche.
              </p>
              <span className="inline-flex items-center gap-2 font-semibold text-sm md:text-base" style={{ color: NAVY }}>
                Voir le programme
                <ArrowRight size={18} style={{ color: GOLD_INK }} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link href="/articles" className="group py-7 border-t flex flex-col" style={{ borderColor: NAVY }}>
              <span className="text-sm text-gray-500 mb-3">Conseils et retours terrain</span>
              <h3 className="font-heading font-bold text-xl md:text-2xl leading-snug mb-3" style={{ color: NAVY }}>
                Nos articles, pour voir comment on travaille
              </h3>
              <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed mb-5 flex-1">
                Facturation électronique, relances, marge chantier, outils comparés : des articles
                courts, écrits pour des patrons du second œuvre.
              </p>
              <span className="inline-flex items-center gap-2 font-semibold text-sm md:text-base" style={{ color: NAVY }}>
                Lire les articles
                <ArrowRight size={18} style={{ color: GOLD_INK }} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA bas */}
      <section className="py-20 md:py-28" style={{ background: NAVY }}>
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl text-white max-w-3xl">
            Vous hésitez sur l'offre qui colle à votre boîte ?
          </h2>
          <p className="mt-6 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">
            Commencez par le pré-audit. C'est gratuit, ça dure 30 minutes, et vous repartez avec 3
            points de friction identifiés. Ensuite, on décide ensemble si on continue.
          </p>
          <Link
            href="/contact"
            className="group mt-9 inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm md:text-base transition-colors"
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
