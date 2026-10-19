import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const NAVY = '#1A2332';
const GOLD = '#C9A84C';
const GOLD_INK = '#8A6A1C';
const PAPER = '#FAF7F0';
const RULE = 'rgba(26,35,50,0.16)';

// Outils réels d'une boîte du second œuvre : on ne les remplace pas, on les relie.
const tools = ['Excel', 'WhatsApp', 'Batappli', 'Emails', 'Papiers', 'Banque'];

// Chiffres repris de l'offre elle-même : aucune statistique inventée.
const keyFigures = [
  { value: '10 h', label: 'rendues chaque semaine' },
  { value: '30 min', label: 'de pré-audit gratuit, en visio' },
  { value: '2 500 €', label: 'le diagnostic, prix fixe' },
];

// Schéma « 6 outils → 1 système », dessiné à plat (repère : viewBox 300 × 220).
const BOX_W = 96;
const BOX_H = 26;
const HUB = { x: 206, y: 88, w: 94, h: 44 };
const hubCenterY = HUB.y + HUB.h / 2;

export const HeroBTP: React.FC = () => {
  return (
    <section
      className="pt-28 md:pt-36"
      style={{ background: PAPER, color: NAVY }}
      aria-label="Opus Advisor — Consultant ops pour les patrons du BTP second œuvre"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          {/* Colonne texte */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <p
                className="text-xs font-semibold uppercase tracking-[0.24em] sm:whitespace-nowrap"
                style={{ color: GOLD_INK }}
              >
                Second œuvre · Élec · Plomberie · Chauffage-clim
              </p>
              <span className="hidden sm:block flex-1 h-px" style={{ background: RULE }} />
            </div>

            <h1 className="font-heading font-bold leading-[1.02] tracking-tight text-[2.6rem] sm:text-6xl lg:text-[4.25rem] mt-6">
              On rend{' '}
              <span
                className="sm:whitespace-nowrap"
                style={{
                  textDecorationLine: 'underline',
                  textDecorationColor: GOLD,
                  textDecorationThickness: '6px',
                  textUnderlineOffset: '7px',
                  textDecorationSkipInk: 'none',
                }}
              >
                10 h par semaine
              </span>{' '}
              aux patrons du second œuvre.
            </h1>

            <p className="mt-7 text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
              Relances automatiques, chantiers centralisés, devis qui ne traînent plus. On garde vos
              outils, on les fait parler ensemble.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold text-base bg-[#1A2332] text-[#FAF7F0] hover:bg-[#26334a] transition-colors"
              >
                Réserver le pré-audit gratuit
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="self-start sm:self-auto font-semibold text-base border-b pb-0.5 hover:opacity-70 transition-opacity"
                style={{ color: GOLD_INK, borderColor: GOLD_INK }}
              >
                Voir les tarifs
              </Link>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              Visio · Sans engagement · 3 points de friction identifiés en direct
            </p>
          </div>

          {/* Schéma : les mêmes outils, reliés à un seul système */}
          <figure className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none">
            <svg
              viewBox="0 0 300 220"
              className="w-full h-auto"
              role="img"
              aria-label="Excel, WhatsApp, Batappli, emails, papiers et banque reliés à un seul système"
            >
              {tools.map((tool, i) => {
                const y = 4 + i * 36;
                const cy = y + BOX_H / 2;
                return (
                  <g key={tool}>
                    <path
                      d={`M${BOX_W} ${cy} C 150 ${cy}, 150 ${hubCenterY}, ${HUB.x} ${hubCenterY}`}
                      fill="none"
                      stroke={GOLD}
                      strokeWidth="1.5"
                    />
                    <rect
                      x="0.5"
                      y={y}
                      width={BOX_W}
                      height={BOX_H}
                      rx="2"
                      fill={PAPER}
                      stroke={NAVY}
                      strokeOpacity="0.35"
                    />
                    <text x="10" y={cy + 4} fontSize="12" fill={NAVY}>
                      {tool}
                    </text>
                  </g>
                );
              })}
              <rect x={HUB.x} y={HUB.y} width={HUB.w} height={HUB.h} rx="2" fill={NAVY} />
              <text x={HUB.x + HUB.w / 2} y={hubCenterY - 4} fontSize="12" textAnchor="middle" fill={PAPER}>
                Un seul
              </text>
              <text x={HUB.x + HUB.w / 2} y={hubCenterY + 12} fontSize="12" textAnchor="middle" fill={GOLD}>
                système
              </text>
            </svg>
            <figcaption className="mt-4 text-sm text-gray-500">
              Les mêmes outils, enfin reliés entre eux.
            </figcaption>
          </figure>
        </div>

        {/* Chiffres clés */}
        <div className="mt-16 md:mt-20 grid grid-cols-3 border-t" style={{ borderColor: NAVY }}>
          {keyFigures.map((f, i) => (
            <div
              key={f.value}
              className={`py-5 md:py-7 pr-3 ${i > 0 ? 'pl-3 md:pl-8 border-l' : ''}`}
              style={i > 0 ? { borderColor: RULE } : undefined}
            >
              <p className="font-heading font-bold text-2xl md:text-4xl leading-none">{f.value}</p>
              <p className="mt-2 text-xs md:text-sm text-gray-600 leading-snug">{f.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
