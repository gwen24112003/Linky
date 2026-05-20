'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Rocket, BookOpen } from 'lucide-react';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';

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
      "1 automation démontrée sur vos propres données",
      "Recommandation honnête : go / no-go",
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
    hook: 'On cartographie votre boîte et on chiffre ce qu\'on vous fait gagner.',
    description:
      "Deux à trois semaines pour comprendre votre boîte de fond en comble. Interviews de l'équipe, cartographie des flux, analyse des outils en place. Livraison : un plan de consolidation précis, chiffré, avec ROI attendu. Si ça vous parle, on exécute. Sinon, vous gardez le plan.",
    deliverables: [
      "Cartographie complète de l'existant",
      'Identification des 5 à 10 chantiers prioritaires',
      'Vision cible sur 12 mois',
      'Plan d\'exécution chiffré (coûts + gains estimés)',
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
    hook: "On configure, on connecte, on forme. Pas de livraison dans le vide.",
    description:
      "On met en œuvre le système défini au diagnostic. Configuration des outils métier (Batappli, Obat, Tolteck, EBP), mise en place des automations (Make, n8n), couche collaborative (Notion, Google Workspace, WhatsApp Business). Tests sur vos vrais chantiers, formation de l'équipe, documentation écrite.",
    deliverables: [
      "Outil métier BTP implémenté et optimisé",
      'Automations en production (relances, reporting, synchro)',
      'Couche collaborative connectée (Notion / Drive + WhatsApp)',
      "Formation équipe en français, sur vos données",
      'Documentation et schémas remis',
    ],
    price: '5 500 € à 25 000 €',
    priceNote: 'Selon périmètre · chiffré précisément après diagnostic',
    duration: '4 à 10 semaines',
  },
  {
    id: 'suivi',
    n: '05',
    tag: 'Optionnel · l\'opérateur qui reste à vos côtés',
    title: 'Gardien du système',
    hook: "Votre système évolue avec votre boîte. On maintient, on ajuste, on ajoute.",
    description:
      "Un opérateur qui connaît votre système et reste à vos côtés. Check mensuel, monitoring des automations, corrections si panne, nouvelles briques au fil de l'eau. Pas de ticket dans un support offshore : vous m'écrivez, je réponds.",
    deliverables: [
      'Monitoring des automations (alertes en cas de panne)',
      'Point mensuel (30 min visio ou async)',
      '2 à 4 heures d\'évolutions incluses / mois',
      "Accès direct par mail et WhatsApp",
      'Backup documentaire maintenu à jour',
    ],
    price: '400 à 1 500 €/mois',
    priceNote: 'Selon complexité du système · sans engagement (Premium sur engagement 12 mois)',
    duration: 'Mensuel',
  },
];

const differentiators = [
  {
    vs: 'Vs un éditeur de logiciel BTP',
    lead: 'Un éditeur vend son outil et passe à la boîte suivante.',
    bold: 'On ne vend rien. On orchestre ce que vous avez déjà.',
    tail: "Votre Batappli, votre Obat, votre EBP — on les fait parler ensemble plutôt que d'en ajouter un onzième.",
  },
  {
    vs: 'Vs un cabinet de conseil classique',
    lead: "Un cabinet livre une feuille de route et vous laisse l'appliquer.",
    bold: "On l'applique avec vous.",
    tail: 'Pas de PowerPoint sans action. Chaque mission produit un système qui tourne, pas un document à activer.',
  },
  {
    vs: 'Vs un freelance Make ou Zapier',
    lead: 'Un freelance facture des journées.',
    bold: 'On vend un système qui tient.',
    tail: 'Documentation complète, formation de vos équipes, Gardien optionnel à 400 €/mois pour ne jamais vous retrouver seul face à un système qui plante.',
  },
  {
    vs: 'Vs un programme France Num gratuit',
    lead: 'Un programme financé accompagne 1500 entreprises avec la même méthode.',
    bold: 'On bosse pour la vôtre, pas pour la moyenne.',
    tail: 'Recommandations basées sur vos outils réels, votre activité réelle, vos contraintes réelles.',
  },
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
      <section
        className="relative text-white overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20"
        style={{ background: `linear-gradient(135deg, ${NAVY}, #223047 55%, ${NAVY})` }}
      >
        <div
          className="absolute pointer-events-none opacity-40"
          style={{
            top: '-10%',
            left: '-10%',
            width: 600,
            height: 600,
            background: `radial-gradient(circle, ${GOLD}33 0%, transparent 70%)`,
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase mb-4"
              style={{ color: GOLD }}
            >
              Nos services
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Cinq étapes claires, chiffrées, sans surprise.
            </h1>
            <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl">
              Vous payez ce qui est dit. Vous savez combien ça coûte avant de signer. Vous sortez quand vous voulez.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 md:py-20 bg-[#FAF8F4]">
        <div className="container mx-auto px-6 max-w-6xl space-y-10 md:space-y-14">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              id={s.id}
              className="bg-white rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 scroll-mt-28"
              style={{
                border: '1px solid rgba(26,35,50,0.08)',
                boxShadow: '0 12px 40px rgba(26,35,50,0.06)',
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Colonne gauche — num + meta */}
              <div
                className="lg:col-span-4 p-8 md:p-10 flex flex-col justify-between gap-8"
                style={{ background: i === 0 ? `${GOLD}12` : NAVY, color: i === 0 ? NAVY : 'white' }}
              >
                <div>
                  <span
                    className="text-7xl md:text-8xl font-bold leading-none"
                    style={{ color: i === 0 ? GOLD : `${GOLD}99`, opacity: i === 0 ? 0.6 : 1 }}
                  >
                    {s.n}
                  </span>
                  <p
                    className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: i === 0 ? NAVY : 'rgba(255,255,255,0.55)' }}
                  >
                    {s.tag}
                  </p>
                  <h2
                    className="text-2xl md:text-3xl font-bold mt-2 leading-tight"
                    style={{ color: i === 0 ? NAVY : 'white' }}
                  >
                    {s.title}
                  </h2>
                  <p
                    className="text-sm md:text-base mt-3 leading-relaxed italic"
                    style={{ color: i === 0 ? 'rgba(26,35,50,0.75)' : 'rgba(255,255,255,0.75)' }}
                  >
                    « {s.hook} »
                  </p>
                </div>

                <div
                  className="pt-5 border-t"
                  style={{
                    borderColor: i === 0 ? 'rgba(26,35,50,0.15)' : 'rgba(255,255,255,0.15)',
                  }}
                >
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-1"
                    style={{ color: i === 0 ? 'rgba(26,35,50,0.5)' : 'rgba(255,255,255,0.5)' }}
                  >
                    {s.duration}
                  </p>
                  <p
                    className="text-2xl md:text-3xl font-bold"
                    style={{ color: i === 0 ? NAVY : 'white' }}
                  >
                    {s.price}
                  </p>
                  {s.priceNote && (
                    <p
                      className="text-xs mt-1"
                      style={{ color: i === 0 ? 'rgba(26,35,50,0.5)' : 'rgba(255,255,255,0.5)' }}
                    >
                      {s.priceNote}
                    </p>
                  )}
                </div>
              </div>

              {/* Colonne droite — description + livrables */}
              <div className="lg:col-span-8 p-8 md:p-10 flex flex-col gap-6">
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  {s.description}
                </p>

                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-[0.18em] mb-4"
                    style={{ color: GOLD }}
                  >
                    Ce qui est livré
                  </p>
                  <ul className="space-y-3">
                    {s.deliverables.map((d, di) => (
                      <li key={di} className="flex items-start gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: `${GOLD}22`, border: `1px solid ${GOLD}66` }}
                        >
                          <Check size={11} style={{ color: NAVY }} strokeWidth={3} />
                        </div>
                        <span className="text-sm md:text-[15px] text-gray-700 leading-snug">
                          {d}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {s.cta && (
                  <div
                    className="pt-4 mt-auto border-t"
                    style={{ borderColor: 'rgba(26,35,50,0.08)' }}
                  >
                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-200 hover:scale-[1.02]"
                      style={{ background: GOLD, color: NAVY }}
                    >
                      {s.cta}
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pourquoi Opus Advisor — différenciants vs concurrents */}
      <section className="py-16 md:py-20 bg-white border-t" style={{ borderColor: 'rgba(26,35,50,0.06)' }}>
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-2xl mb-10 md:mb-12">
            <p
              className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase mb-3"
              style={{ color: GOLD }}
            >
              Pourquoi Opus Advisor
            </p>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight"
              style={{ color: NAVY }}
            >
              Ce qui change avec nous.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {differentiators.map((d) => (
              <div
                key={d.vs}
                className="rounded-2xl p-7 md:p-8"
                style={{ background: '#FAF8F4', border: '1px solid rgba(26,35,50,0.08)' }}
              >
                <h3 className="text-lg md:text-xl font-bold mb-3" style={{ color: NAVY }}>
                  {d.vs}
                </h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {d.lead} <strong style={{ color: GOLD }}>{d.bold}</strong> {d.tail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pour aller plus loin — internal linking */}
      <section className="py-16 md:py-20 bg-white border-t" style={{ borderColor: 'rgba(26,35,50,0.06)' }}>
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-2xl mb-10">
            <p
              className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase mb-3"
              style={{ color: GOLD }}
            >
              Pour aller plus loin
            </p>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight"
              style={{ color: NAVY }}
            >
              Avant de décider, prenez deux minutes.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Opus Pilotes */}
            <Link
              href="/cas-clients"
              className="group relative rounded-3xl p-8 md:p-10 transition-all duration-200 hover:-translate-y-1"
              style={{
                background: `${GOLD}10`,
                border: `1px solid ${GOLD}44`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: GOLD, color: NAVY }}
              >
                <Rocket size={22} strokeWidth={2.2} />
              </div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.18em] mb-2"
                style={{ color: GOLD }}
              >
                Programme pilote · 3 places
              </p>
              <h3
                className="text-xl md:text-2xl font-bold mb-3 leading-tight"
                style={{ color: NAVY }}
              >
                Opus Pilotes — construisez la v1 avec nous
              </h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-5">
                Trois boîtes du second œuvre, tarif pilote -40 %, accès direct. En échange,
                on documente ensemble ce qui marche. Si vous voulez être dans les premiers,
                c'est maintenant.
              </p>
              <span
                className="inline-flex items-center gap-2 font-semibold text-sm md:text-base"
                style={{ color: NAVY }}
              >
                Voir le programme
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </Link>

            {/* Articles */}
            <Link
              href="/articles"
              className="group relative rounded-3xl p-8 md:p-10 transition-all duration-200 hover:-translate-y-1"
              style={{
                background: '#FAF8F4',
                border: '1px solid rgba(26,35,50,0.08)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: NAVY, color: GOLD }}
              >
                <BookOpen size={22} strokeWidth={2.2} />
              </div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.18em] mb-2"
                style={{ color: NAVY, opacity: 0.5 }}
              >
                Conseils & retours terrain
              </p>
              <h3
                className="text-xl md:text-2xl font-bold mb-3 leading-tight"
                style={{ color: NAVY }}
              >
                Articles — comment on procède, concrètement
              </h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-5">
                Méthodes de consolidation, outils BTP comparés, facturation électronique,
                automatisations testées sur le terrain. Lecture courte, sans jargon.
              </p>
              <span
                className="inline-flex items-center gap-2 font-semibold text-sm md:text-base"
                style={{ color: NAVY }}
              >
                Lire les articles
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA bas */}
      <section className="py-16 md:py-20 bg-[#FAF8F4]">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-5"
            style={{ color: NAVY }}
          >
            Vous hésitez sur l'offre qui colle à votre boîte ?
          </h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
            Commencez par le pré-audit. Il est gratuit, il dure 30 min, et vous en ressortez avec
            3 points de friction identifiés. On décide ensuite, ensemble, si on continue ou pas.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-6 py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-200 hover:scale-[1.02] btn-shimmer"
            style={{ background: GOLD, color: NAVY }}
          >
            Réserver mon pré-audit
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </section>
    </main>
  );
};
