'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

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
    id: 'diagnostic',
    n: '02',
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
    n: '03',
    tag: 'Livrable fonctionnel',
    title: 'Implémentation système',
    hook: "On configure, on connecte, on forme. Pas de livraison dans le vide.",
    description:
      "On déploie le système défini au diagnostic. Configuration des outils métier (Batappli, Obat, Tolteck, EBP), mise en place des automations (Make, n8n), couche collaborative (Notion, Google Workspace, WhatsApp Business). Tests sur vos vrais chantiers, formation de l'équipe, documentation écrite.",
    deliverables: [
      "Outil métier BTP implémenté et optimisé",
      'Automations en production (relances, reporting, synchro)',
      'Couche collaborative connectée (Notion / Drive + WhatsApp)',
      "Formation équipe en français, sur vos données",
      'Documentation et schémas remis',
    ],
    price: '5 000 € à 15 000 €',
    priceNote: 'Selon périmètre · chiffré précisément après diagnostic',
    duration: '4 à 10 semaines',
  },
  {
    id: 'suivi',
    n: '04',
    tag: 'Optionnel · engagement 3 mois',
    title: 'Suivi mensuel',
    hook: "Votre système évolue avec votre boîte. On maintient, on ajuste, on ajoute.",
    description:
      "Un interlocuteur qui connaît votre système. Check mensuel, monitoring des automations, corrections si panne, nouvelles briques au fil de l'eau. Pas de ticket dans un support offshore : vous m'écrivez, je réponds.",
    deliverables: [
      'Monitoring des automations (alertes en cas de panne)',
      'Point mensuel (30 min visio ou async)',
      '2 à 4 heures d\'évolutions incluses / mois',
      "Accès direct par mail et WhatsApp",
      'Backup documentaire maintenu à jour',
    ],
    price: '400 à 600 €/mois',
    priceNote: 'Selon complexité du système · engagement 3 mois minimum',
    duration: 'Mensuel',
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
              Quatre offres claires, chiffrées, sans surprise.
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

      {/* CTA bas */}
      <section className="py-16 md:py-20 bg-white">
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
