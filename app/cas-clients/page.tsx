import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionKicker } from '@/components/ui/SectionKicker';
import { ArrowRight, Check } from 'lucide-react';

const NAVY = '#1A2332';
const GOLD = '#C9A84C';
const PAPER = '#FAF7F0';
const RULE = 'rgba(26,35,50,0.16)';

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
    images: [{ url: 'https://opusadvisor.fr/images/opus-icon.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['https://opusadvisor.fr/images/opus-icon.png'],
  },
};

const profilCriteria = [
  {
    n: '01',
    label: 'Métier second œuvre',
    desc: "Électricité, plomberie, chauffage-clim, ou multi-corps d'état.",
  },
  {
    n: '02',
    label: '8 à 60+ collaborateurs',
    desc: 'Des artisans structurés aux PME multi-agences. Assez de volume pour que le système ait un impact mesurable.',
  },
  {
    n: '03',
    label: 'Bretagne ou Pays-de-la-Loire',
    desc: 'À moins de 2h de Rennes. On vient sur site au moins 2 fois pendant la mission.',
  },
  {
    n: '04',
    label: 'Patron disponible',
    desc: "Deux demi-journées sur 6 semaines, bloquées à l'avance. Pas de \"quand j'aurai le temps\".",
  },
];

const dealGive = [
  'Diagnostic complet de votre stack actuelle (valeur 2 500 €)',
  'Mise en œuvre du système : logiciel BTP correctement paramétré, Notion/Drive chantiers, automatisations Make ou n8n',
  'Formation de votre équipe (2 sessions en visio + doc écrite)',
  'Gardien du système pendant 6 mois après la mise en prod',
  'Tarif pilote : 40% de moins que le catalogue standard',
];

const dealTake = [
  "Accès à vos données réelles pendant la mise en œuvre (chiffres, devis, chantiers)",
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
        <section className="pt-36 pb-20 md:pt-44 md:pb-24" style={{ background: NAVY }}>
          <div className="container mx-auto px-6 max-w-5xl">
            <SectionKicker label="Opus Pilotes · Candidatures ouvertes" tone="dark" className="mb-8" />
            <h1 className="font-heading font-bold leading-[1.0] tracking-tight text-5xl md:text-6xl lg:text-7xl text-white">
              3 places pour construire la v1 avec nous.
            </h1>
            <p className="mt-7 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">
              On démarre Opus Advisor. Plutôt que d'inventer des cas clients bidons, on ouvre 3
              places pilotes pour des boîtes du second œuvre en Bretagne et Pays-de-la-Loire. Système
              complet, tarif pilote, et on publie le cas après 6 mois de prod.
            </p>
          </div>
        </section>

        {/* Profil recherché */}
        <section className="py-20 md:py-28" style={{ background: PAPER }}>
          <div className="container mx-auto px-6 max-w-5xl">
            <SectionKicker label="Pour qui" className="mb-8" />
            <h2 className="font-heading font-bold leading-[1.02] tracking-tight text-4xl md:text-5xl mb-12" style={{ color: NAVY }}>
              Vous correspondez si…
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14">
              {profilCriteria.map((item) => (
                <div key={item.n} className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-7 border-t" style={{ borderColor: RULE }}>
                  <span className="font-heading font-bold text-base leading-none pt-1" style={{ color: GOLD }}>
                    {item.n}
                  </span>
                  <div>
                    <h3 className="font-semibold text-lg md:text-xl leading-snug mb-2" style={{ color: NAVY }}>
                      {item.label}
                    </h3>
                    <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Le deal */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-6 max-w-5xl">
            <SectionKicker label="Le deal" className="mb-8" />
            <h2 className="font-heading font-bold leading-[1.02] tracking-tight text-4xl md:text-5xl mb-12" style={{ color: NAVY }}>
              Ce qu'on échange.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
              <div className="border-t pt-7" style={{ borderColor: NAVY }}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: GOLD }}>
                  Ce qu'on vous donne
                </p>
                <ul className="space-y-3.5">
                  {dealGive.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-sm md:text-[15px] text-gray-700 leading-relaxed">
                      <Check size={15} strokeWidth={3} className="mt-1 shrink-0" style={{ color: GOLD }} />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-7" style={{ borderColor: RULE }}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: 'rgba(26,35,50,0.45)' }}>
                  Ce qu'on vous demande
                </p>
                <ul className="space-y-3.5">
                  {dealTake.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-sm md:text-[15px] text-gray-700 leading-relaxed">
                      <Check size={15} strokeWidth={3} className="mt-1 shrink-0" style={{ color: GOLD }} />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pourquoi ce format */}
        <section className="py-20 md:py-28" style={{ background: PAPER }}>
          <div className="container mx-auto px-6 max-w-3xl">
            <SectionKicker label="Pourquoi ce format" className="mb-8" />
            <h2 className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-4xl lg:text-5xl mb-8" style={{ color: NAVY }}>
              On refuse de vendre une méthode qu'on n'a pas validée sur du vrai.
            </h2>
            <div className="space-y-5 text-lg text-gray-700 leading-relaxed">
              <p>
                Plein de consultants vendent des frameworks sortis de webinaires LinkedIn. Nous, on
                part du postulat inverse : la méthode Opus doit se tester sur 3 boîtes réelles, avec
                de vraies contraintes métier, avant qu'on la passe au catalogue standard.
              </p>
              <p>
                C'est pour ça qu'on ouvre 3 places à tarif pilote. Vous gagnez un système complet
                pour 40% de moins. On gagne la validation terrain qu'il nous faut pour construire la
                suite sérieusement.
              </p>
            </div>
            <p className="mt-8 pt-6 border-t text-sm text-gray-500 italic" style={{ borderColor: RULE }}>
              Places ouvertes jusqu'aux 3 premiers cas publiés. Les pilotes conservent leur tarif
              pendant les 6 mois de suivi.
            </p>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-20 md:py-28" style={{ background: NAVY }}>
          <div className="container mx-auto px-6 max-w-5xl">
            <SectionKicker label="Candidater" tone="dark" className="mb-8" />
            <h2 className="font-heading font-bold leading-[1.02] tracking-tight text-4xl md:text-5xl text-white max-w-3xl">
              3 places. Pré-audit gratuit pour qualifier la compatibilité.
            </h2>
            <p className="mt-6 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">
              30 minutes en visio. Vous nous montrez vos outils et votre contexte. Si votre boîte
              colle au profil pilote, on vous envoie une proposition chiffrée sous 72h.
            </p>
            <Link
              href="/contact"
              className="group mt-9 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm md:text-base transition-all duration-200 hover:scale-[1.02]"
              style={{ background: GOLD, color: NAVY }}
            >
              Postuler boîte pilote
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
