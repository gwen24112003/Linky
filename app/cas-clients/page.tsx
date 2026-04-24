import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  Target,
  HeartHandshake,
  Flag,
  ArrowRight,
  MapPin,
  Users,
  Wrench,
  Clock,
  Check,
} from 'lucide-react';

const NAVY = '#1A2332';
const GOLD = '#C9A84C';

const PAGE_URL = 'https://opusadvisor.fr/cas-clients';
const PAGE_TITLE = 'Opus Pilotes — 3 boîtes pour construire la v1 ensemble';
const PAGE_DESCRIPTION =
  "On ouvre 3 places pilotes en Bretagne et Pays-de-la-Loire. Système complet à tarif pilote (-40%). En échange, on publie le cas après 6 mois. Candidatures ouvertes.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    type: 'website',
    images: [{ url: 'https://opusadvisor.fr/images/opus-banner.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['https://opusadvisor.fr/images/opus-banner.png'],
  },
};

const profilCriteria = [
  {
    icon: Wrench,
    label: 'Métier second œuvre',
    desc: 'Électricité, plomberie, chauffage-clim, ou multi-corps d\'état.',
  },
  {
    icon: Users,
    label: '5 à 20 salariés',
    desc: 'Une boîte assez grande pour que le système ait un impact, assez petite pour qu\'on soit encore agile.',
  },
  {
    icon: MapPin,
    label: 'Bretagne ou Pays-de-la-Loire',
    desc: 'À moins de 2h de Rennes. On vient sur site au moins 2 fois pendant la mission.',
  },
  {
    icon: Clock,
    label: 'Patron disponible',
    desc: 'Deux demi-journées sur 6 semaines, bloquées à l\'avance. Pas de "quand j\'aurai le temps".',
  },
];

const dealGive = [
  'Diagnostic complet de votre stack actuelle (valeur 2 500 €)',
  'Implémentation du système : logiciel BTP correctement paramétré, Notion/Drive chantiers, automatisations Make ou n8n',
  'Formation de votre équipe (2 sessions en visio + doc écrite)',
  'Suivi mensuel pendant 6 mois après la mise en prod',
  'Tarif pilote : 40% de moins que le catalogue standard',
];

const dealTake = [
  "Accès à vos données réelles pendant l'implémentation (chiffres, devis, chantiers)",
  'Autorisation de publier un cas détaillé après 6 mois, avec les chiffres avant/après',
  'Un témoignage vidéo de 3 à 5 minutes une fois le système en production (optionnel mais apprécié)',
  'Votre patience : on construit la v1 de la méthode Opus avec vous, pas à côté',
];

export default function CasClientsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        {/* Hero */}
        <section
          className="relative text-white overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20"
          style={{
            background: `linear-gradient(135deg, ${NAVY}, #223047 55%, ${NAVY})`,
          }}
        >
          <div
            className="absolute pointer-events-none opacity-40"
            style={{
              top: '-10%',
              left: '-10%',
              width: 500,
              height: 500,
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
            <div className="max-w-3xl">
              <p
                className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase mb-4"
                style={{ color: GOLD }}
              >
                Opus Pilotes · Candidatures ouvertes
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                3 places pour construire la v1 avec nous.
              </h1>
              <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl">
                On démarre Opus Advisor. Plutôt que d'inventer des cas clients bidons, on ouvre 3 places pilotes pour des boîtes du second œuvre en Bretagne et Pays-de-la-Loire. Système complet, tarif pilote, et on publie le cas après 6 mois de prod.
              </p>
            </div>
          </div>
        </section>

        {/* Section Profil recherché */}
        <section className="py-16 md:py-24 bg-[#FAF8F4]">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="mb-10 md:mb-14">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}55` }}
                >
                  <Target size={20} style={{ color: NAVY }} />
                </div>
                <p
                  className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase"
                  style={{ color: GOLD }}
                >
                  Pour qui
                </p>
              </div>
              <h2
                className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight"
                style={{ color: NAVY }}
              >
                Vous correspondez si...
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {profilCriteria.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="bg-white rounded-2xl p-6 md:p-7"
                    style={{
                      border: '1px solid rgba(26,35,50,0.08)',
                      boxShadow: '0 4px 20px rgba(26,35,50,0.04)',
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ background: `${NAVY}0D`, border: `1px solid ${NAVY}15` }}
                      >
                        <Icon size={20} style={{ color: NAVY }} />
                      </div>
                      <div>
                        <h3
                          className="text-base md:text-lg font-bold mb-1.5"
                          style={{ color: NAVY }}
                        >
                          {item.label}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section Le deal */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="mb-10 md:mb-14 text-center">
              <div className="inline-flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}55` }}
                >
                  <HeartHandshake size={20} style={{ color: NAVY }} />
                </div>
                <p
                  className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase"
                  style={{ color: GOLD }}
                >
                  Le deal
                </p>
              </div>
              <h2
                className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight"
                style={{ color: NAVY }}
              >
                Ce qu'on échange.
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Ce qu'on vous donne */}
              <div
                className="rounded-2xl p-8 md:p-10"
                style={{
                  background: `linear-gradient(135deg, ${NAVY}, #223047)`,
                  boxShadow: '0 12px 40px rgba(26,35,50,0.15)',
                }}
              >
                <p
                  className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
                  style={{ color: GOLD }}
                >
                  Ce qu'on vous donne
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
                  Un système complet, à tarif pilote.
                </h3>
                <ul className="space-y-3">
                  {dealGive.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm md:text-base text-white/85 leading-relaxed">
                      <Check size={18} style={{ color: GOLD }} className="mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ce qu'on vous demande */}
              <div
                className="rounded-2xl p-8 md:p-10 bg-white"
                style={{
                  border: '1px solid rgba(26,35,50,0.08)',
                  boxShadow: '0 4px 24px rgba(26,35,50,0.06)',
                }}
              >
                <p
                  className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
                  style={{ color: GOLD }}
                >
                  Ce qu'on vous demande
                </p>
                <h3 className="text-xl md:text-2xl font-bold mb-6" style={{ color: NAVY }}>
                  De la transparence, et un droit de publier.
                </h3>
                <ul className="space-y-3">
                  {dealTake.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm md:text-base text-gray-700 leading-relaxed">
                      <Check size={18} style={{ color: GOLD }} className="mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section Pourquoi ce format */}
        <section className="py-16 md:py-24 bg-[#FAF8F4]">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="mb-8 md:mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}55` }}
                >
                  <Flag size={20} style={{ color: NAVY }} />
                </div>
                <p
                  className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase"
                  style={{ color: GOLD }}
                >
                  Pourquoi ce format
                </p>
              </div>
              <h2
                className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight"
                style={{ color: NAVY }}
              >
                On refuse de vendre une méthode qu'on n'a pas validée sur du vrai.
              </h2>
            </div>

            <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                Plein de consultants vendent des frameworks sortis de webinaires LinkedIn. Nous, on part du postulat inverse : la méthode Opus doit se tester sur 3 boîtes réelles, avec de vraies contraintes métier, avant qu'on la passe au catalogue standard.
              </p>
              <p>
                C'est pour ça qu'on ouvre 3 places à tarif pilote. Vous gagnez un système complet pour 40% de moins. On gagne la validation terrain qu'il nous faut pour construire la suite sérieusement.
              </p>
            </div>

            <p className="mt-6 text-sm text-gray-500 italic">
              Places ouvertes jusqu'aux 3 premiers cas publiés. Les pilotes conservent leur tarif pendant les 6 mois de suivi.
            </p>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6">
            <div
              className="max-w-4xl mx-auto rounded-3xl overflow-hidden text-center relative"
              style={{
                background: `linear-gradient(135deg, ${NAVY}, #2A3A50)`,
                boxShadow: '0 24px 60px rgba(26,35,50,0.2)',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.08]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />
              <div className="relative z-10 px-6 md:px-12 py-14 md:py-20">
                <p
                  className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase mb-4"
                  style={{ color: GOLD }}
                >
                  Candidater
                </p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-5">
                  3 places. Pré-audit gratuit pour qualifier la compatibilité.
                </h2>
                <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto mb-8">
                  30 minutes en visio. Vous nous montrez vos outils et votre contexte. Si votre boîte colle au profil pilote, on vous envoie une proposition chiffrée sous 72h.
                </p>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm md:text-base transition-all duration-200 hover:scale-[1.02]"
                  style={{ background: GOLD, color: NAVY }}
                >
                  Postuler boîte pilote
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
