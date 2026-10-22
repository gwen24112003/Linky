'use client';

import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Table2, Sigma, Layers, FileText, FolderOpen, Mail, Split, User, Clock, type LucideIcon } from 'lucide-react';
import { scenarios, type AppKey, type ScenarioKey, type ScenarioModule } from '@/lib/caseVisuals';
import { PauseButton } from '@/components/motion/PauseButton';

const APPS: Record<AppKey, { name: string; color: string; icon: LucideIcon; ink?: string }> = {
  airtable: { name: 'Airtable', color: '#2D7FF9', icon: Table2 },
  tools: { name: 'Tools', color: '#8B5CF6', icon: Sigma },
  aggregator: { name: 'Tools', color: '#8B5CF6', icon: Layers },
  docs: { name: 'Google Docs', color: '#4285F4', icon: FileText },
  drive: { name: 'Google Drive', color: '#F4B400', icon: FolderOpen, ink: '#3A2A00' },
  gmail: { name: 'Gmail', color: '#EA4335', icon: Mail },
  ifelse: { name: 'If-else', color: '#22A55B', icon: Split },
  qontoClient: { name: 'Qonto', color: '#1F2937', icon: User },
  qontoInvoice: { name: 'Qonto', color: '#1F2937', icon: FileText },
};

const W = 952; // largeur de la carte, en unités SVG (le dessin s'adapte à la largeur réelle)
const HEAD = 64;
const TOP = 40;
const ROW_H = 222;
const R = 44;
const GOLD = '#C9A84C';
const STEP_MS = 650;
const PAUSE_MS = 2200;

interface Placed { m: ScenarioModule; x: number; y: number; seg: string | null }

/** Découpe un libellé en lignes courtes (le SVG ne sait pas faire de retour à la ligne). */
function wrap(text: string, max: number): string[] {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(' ')) {
    if (line && (line + ' ' + word).length > max) {
      lines.push(line);
      line = word;
    } else line = line ? `${line} ${word}` : word;
  }
  if (line) lines.push(line);
  return lines;
}

function layout(key: ScenarioKey) {
  const s = scenarios[key];
  const colW = s.cols === 3 ? 260 : 200;
  const margin = (W - s.cols * colW) / 2;
  const cx = (c: number, w = colW) => margin + c * w + w / 2;
  const cy = (r: number) => HEAD + TOP + R + r * ROW_H;

  const placed: Placed[] = [];
  s.rows.forEach((row, r) =>
    row.forEach((m, c) => {
      const x = cx(c);
      const y = cy(r);
      const prev = placed[placed.length - 1];
      let seg: string | null = null;
      if (prev && c > 0) seg = `M${prev.x},${prev.y} L${x},${y}`;
      else if (prev) {
        const mid = prev.y + 142;
        seg = `M${prev.x},${prev.y} C${prev.x + 150},${prev.y} ${prev.x + 150},${mid} ${prev.x},${mid} L${x},${mid} C${x - 150},${mid} ${x - 150},${y} ${x},${y}`;
      }
      placed.push({ m, x, y, seg });
    }),
  );

  const parent = placed[placed.length - 1];
  const bw = (s.cols * colW) / s.branches.length;
  const split = parent.y + 142;
  const yb = cy(s.rows.length);
  const branches: Placed[] = s.branches.map((m, j) => {
    const x = margin + j * bw + bw / 2;
    return { m, x, y: yb, seg: `M${parent.x},${parent.y} L${parent.x},${split} L${x},${split} L${x},${yb}` };
  });

  return { s, placed, branches, height: yb + R + 120, wrapAt: s.cols === 3 ? 24 : 20 };
}

type State = 'static' | 'pending' | 'active' | 'done';

const Module: React.FC<{ p: Placed; state: State; wrapAt: number }> = ({ p, state, wrapAt }) => {
  const app = APPS[p.m.app];
  const Icon = app.icon;
  const nameW = app.name.length * 11.4;
  const badgeW = 14 + String(p.m.n).length * 8;
  const start = p.x - (nameW + 8 + badgeW) / 2;
  const nameY = p.y + R + 32;
  const pillW = p.m.pill ? p.m.pill.length * 8.6 + 20 : 0;
  const subY = nameY + (p.m.pill ? 50 : 24);
  return (
    <g style={{ opacity: state === 'pending' ? 0.32 : 1, transition: 'opacity 0.4s ease' }}>
      {state === 'active' && (
        <>
          <circle className="scenario-pulse" cx={p.x} cy={p.y} r={R + 4} fill="none" stroke={GOLD} strokeWidth={4} />
          <circle cx={p.x} cy={p.y} r={R + 7} fill="none" stroke={GOLD} strokeWidth={4} />
        </>
      )}
      <circle cx={p.x} cy={p.y} r={R} fill={app.color} />
      <Icon x={p.x - 18} y={p.y - 18} width={36} height={36} color={app.ink || '#FFFFFF'} strokeWidth={2} />
      {state === 'done' && (
        <g>
          <circle cx={p.x + 32} cy={p.y - 32} r={13} fill="#22A55B" stroke="#FFFFFF" strokeWidth={3} />
          <path d={`M${p.x + 26},${p.y - 32} l4,4 l8,-8`} fill="none" stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
      <text x={start} y={nameY} fontSize={20} fontWeight={700} fill="#111827">
        {app.name}
      </text>
      <rect x={start + nameW + 8} y={nameY - 15} width={badgeW} height={20} rx={10} fill="#E5E7EB" />
      <text x={start + nameW + 8 + badgeW / 2} y={nameY} fontSize={13} fontWeight={600} fill="#374151" textAnchor="middle">
        {p.m.n}
      </text>
      {p.m.pill && (
        <>
          <rect x={p.x - pillW / 2} y={nameY + 10} width={pillW} height={26} rx={6} fill="#FDE68A" />
          <text x={p.x} y={nameY + 28} fontSize={15} fontWeight={700} fill="#78350F" textAnchor="middle">
            {p.m.pill}
          </text>
        </>
      )}
      {p.m.sub && (
        <text x={p.x} y={subY} fontSize={16} fill="#4B5563" textAnchor="middle">
          {wrap(p.m.sub, wrapAt).map((l, i) => (
            <tspan key={i} x={p.x} dy={i === 0 ? 0 : 20}>
              {l}
            </tspan>
          ))}
        </text>
      )}
    </g>
  );
};

/**
 * Exécution animée d'un scénario façon Make : les modules s'allument un par un, une branche
 * différente du If-else à chaque passage, avec un bouton pause. Sans JavaScript, le schéma complet
 * s'affiche, immobile. Avec « réduire les animations », l'exécution tourne sans le halo qui pulse.
 */
export const ScenarioAnimation: React.FC<{ scenario: ScenarioKey }> = ({ scenario }) => {
  const { s, placed, branches, height, wrapAt } = useMemo(() => layout(scenario), [scenario]);
  const uid = useId().replace(/:/g, '');
  const box = useRef<SVGSVGElement>(null);
  const inView = useRef(false);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0); // module en cours ; placed.length = branche ; au-delà = terminé
  const [branch, setBranch] = useState(0);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const total = placed.length + 1;

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => (inView.current = e.isIntersecting), { threshold: 0.25 });
    if (box.current) io.observe(box.current);
    setRunning(true);
    let k = 0;
    let b = 0;
    let wait = 0;
    const id = setInterval(() => {
      if (pausedRef.current || !inView.current || document.hidden) return;
      if (k < total) k += 1;
      else {
        wait += STEP_MS;
        if (wait < PAUSE_MS) return;
        wait = 0;
        k = 0;
        b = (b + 1) % branches.length;
        setBranch(b);
      }
      setStep(k);
    }, STEP_MS);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, [total, branches.length]);

  const stateOf = (i: number): State => (!running ? 'static' : i < step ? 'done' : i === step ? 'active' : 'pending');
  const branchState = (j: number): State => (!running ? 'static' : j !== branch ? 'pending' : stateOf(placed.length));
  const finished = running && step >= total;

  return (
    <div>
      <svg
        ref={box}
        viewBox={`0 0 ${W} ${height}`}
        className="block w-full h-auto"
        role="img"
        aria-labelledby={`${uid}-t ${uid}-d`}
        style={{ fontFamily: 'inherit' }}
      >
        <title id={`${uid}-t`}>{s.title}</title>
        <desc id={`${uid}-d`}>{s.description}</desc>
        <defs>
          <clipPath id={`${uid}-clip`}>
            <rect width={W} height={height} rx={18} />
          </clipPath>
          <pattern id={`${uid}-dots`} width={20} height={20} patternUnits="userSpaceOnUse">
            <circle cx={2} cy={2} r={1.4} fill="#CBD0D8" />
          </pattern>
        </defs>
        <g clipPath={`url(#${uid}-clip)`}>
          <rect width={W} height={height} fill="#F3F4F6" />
          <rect y={HEAD} width={W} height={height - HEAD} fill={`url(#${uid}-dots)`} />
          <rect width={W} height={HEAD} fill="#FFFFFF" />
          <line x1={0} x2={W} y1={HEAD} y2={HEAD} stroke="#E5E7EB" />
          <text x={26} y={40} fontSize={21} fontWeight={700} fill="#111827">
            {s.title}
          </text>
          {running ? (
            <g>
              <circle cx={W - 26 - (finished || paused ? 168 : 196)} cy={34} r={6} fill={finished ? '#22A55B' : paused ? '#9CA3AF' : GOLD} />
              <text x={W - 26} y={40} fontSize={17} fill="#4B5563" textAnchor="end">
                {finished ? 'Exécution terminée' : paused ? 'Exécution en pause' : 'Exécution en cours…'}
              </text>
            </g>
          ) : (
            <g>
              <Clock x={W - 26 - s.schedule.length * 8.4 - 26} y={24} width={18} height={18} color="#6B7280" />
              <text x={W - 26} y={40} fontSize={17} fill="#4B5563" textAnchor="end">
                {s.schedule}
              </text>
            </g>
          )}

          {/* Liaisons : pointillés gris, puis dorés sur le chemin déjà parcouru */}
          <g fill="none" strokeLinecap="round">
            {[...placed, ...branches].map((p, i) =>
              p.seg ? <path key={`b${i}`} d={p.seg} stroke="#9CA3AF" strokeWidth={4} strokeDasharray="0.1 11" /> : null,
            )}
            {running &&
              placed.map((p, i) =>
                p.seg && i <= step ? <path key={`g${i}`} d={p.seg} stroke={GOLD} strokeWidth={5} strokeDasharray="0.1 11" /> : null,
              )}
            {running && step >= placed.length && (
              <path d={branches[branch].seg!} stroke={GOLD} strokeWidth={5} strokeDasharray="0.1 11" />
            )}
          </g>

          {placed.map((p, i) => (
            <Module key={`m${i}`} p={p} state={stateOf(i)} wrapAt={wrapAt} />
          ))}
          {branches.map((p, j) => (
            <Module key={`br${j}`} p={p} state={branchState(j)} wrapAt={wrapAt} />
          ))}
        </g>
      </svg>
      {/* Toujours rendu pour ne rien décaler au chargement ; masqué tant que l'exécution ne tourne pas. */}
      <div className={`mt-2 flex justify-end ${running ? '' : 'invisible'}`}>
        <PauseButton
          paused={paused}
          onToggle={() => {
            pausedRef.current = !pausedRef.current;
            setPaused(pausedRef.current);
          }}
        />
      </div>
    </div>
  );
};
