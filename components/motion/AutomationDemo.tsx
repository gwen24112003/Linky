'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  UserPlus, FileText, Send, BellRing, CalendarCheck, Sparkles, Calculator, Mail, PenLine, FolderOpen,
  LayoutDashboard, BarChart3, FileSignature, Hammer, Receipt, AlarmClock, Check, type LucideIcon,
} from 'lucide-react';
import { demoFlows, type DemoIcon, type DemoKey } from '@/lib/demoFlows';
import { PauseButton } from '@/components/motion/PauseButton';

const NAVY = '#1A2332';
const GOLD = '#C9A84C';
const GOLD_INK = '#8A6A1C';
const RULE = 'rgba(26,35,50,0.14)';

const ICONS: Record<DemoIcon, LucideIcon> = {
  userPlus: UserPlus, fileText: FileText, send: Send, bell: BellRing,
  calendarCheck: CalendarCheck, sparkles: Sparkles, calculator: Calculator, mail: Mail,
  penLine: PenLine, folderOpen: FolderOpen, layoutDashboard: LayoutDashboard, barChart: BarChart3,
  fileSignature: FileSignature, hammer: Hammer, receipt: Receipt, alarmClock: AlarmClock,
};

const STEP_MS = 1300;
const PAUSE_TICKS = 2; // temps d'arrêt quand toutes les étapes sont cochées

interface AutomationDemoProps {
  /** Déroulés proposés, dans l'ordre ; un seul déroulé = pas d'onglets. Par défaut : tous. */
  keys?: DemoKey[];
}

/**
 * Démonstration d'une automatisation : les étapes s'allument l'une après l'autre, avec un bouton pause.
 * Sans JavaScript, toutes les étapes sont affichées, cochées. Avec « réduire les animations », le déroulé
 * tourne quand même, sans le léger glissement de l'étape en cours.
 */
export const AutomationDemo: React.FC<AutomationDemoProps> = ({ keys }) => {
  const flows = keys ? demoFlows.filter((f) => keys.includes(f.key)) : demoFlows;
  const initial = flows[0].key;
  const [key, setKey] = useState<DemoKey>(initial);
  // -1 = état statique (tout coché) ; 0..n-1 = étape en cours ; n = tout coché, en pause.
  const [step, setStep] = useState(-1);
  const [animate, setAnimate] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const box = useRef<HTMLDivElement>(null);
  const inView = useRef(true);
  const pinned = useRef(flows.length === 1);
  const stepRef = useRef(0);
  const keyRef = useRef<DemoKey>(initial);
  keyRef.current = key;

  const flow = flows.find((f) => f.key === key) ?? flows[0];

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setAnimate(true);
    stepRef.current = 0;
    setStep(0);

    const io = new IntersectionObserver(([e]) => (inView.current = e.isIntersecting), { threshold: 0.2 });
    if (box.current) io.observe(box.current);

    let pause = 0;
    const id = setInterval(() => {
      if (pausedRef.current || !inView.current || document.hidden) return; // en pause : bouton, hors écran, onglet masqué
      const len = (flows.find((f) => f.key === keyRef.current) ?? flows[0]).steps.length;
      let s = stepRef.current;
      if (s < len) {
        s += 1;
      } else {
        pause += 1;
        if (pause < PAUSE_TICKS) return;
        pause = 0;
        s = 0;
        // Si le visiteur n'a choisi aucun secteur, on passe au suivant.
        if (!pinned.current && flows.length > 1) {
          const i = flows.findIndex((f) => f.key === keyRef.current);
          setKey(flows[(i + 1) % flows.length].key);
        }
      }
      stepRef.current = s;
      setStep(s);
    }, STEP_MS);

    return () => {
      clearInterval(id);
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const choose = (k: DemoKey) => {
    pinned.current = true;
    setKey(k);
    if (animate) {
      stepRef.current = 0;
      setStep(0);
    }
  };

  const togglePause = () => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
  };

  const state = (i: number) => (!animate || step === -1 || i < step ? 'done' : i === step ? 'active' : 'todo');

  return (
    <div ref={box} className="rounded-2xl border bg-white p-5 md:p-6" style={{ borderColor: RULE }}>
      <p className="sr-only">
        Exemple de déroulé automatique : chaque étape se déclenche toute seule après la précédente.
      </p>
      {flows.length > 1 && (
        <div className="flex flex-wrap gap-1.5 mb-5" role="group" aria-label="Choisir un secteur">
          {flows.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => choose(f.key)}
              aria-pressed={f.key === key}
              className="px-2.5 py-1.5 rounded-full text-xs font-semibold border transition-colors whitespace-nowrap"
              style={
                f.key === key
                  ? { background: NAVY, color: '#FAF7F0', borderColor: NAVY }
                  : { background: 'transparent', color: '#4b5563', borderColor: RULE }
              }
            >
              {f.tab}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between gap-3 mb-4">
        <p className="text-sm text-gray-600">{flow.trigger}</p>
        {/* Toujours rendu pour ne rien décaler au chargement ; masqué tant que l'animation ne tourne pas. */}
        <PauseButton paused={paused} onToggle={togglePause} className={animate ? 'shrink-0' : 'shrink-0 invisible'} />
      </div>

      <ol>
        {flow.steps.map((s, i) => {
          const Icon = ICONS[s.icon];
          const st = state(i);
          return (
            <li key={`${flow.key}-${s.title}`} className="relative">
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="block w-0.5 h-4 ml-[19px] transition-colors duration-500"
                  style={{ background: st === 'todo' ? RULE : GOLD }}
                />
              )}
              <div
                className="flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-all duration-500"
                style={{
                  borderColor: st === 'active' ? GOLD : RULE,
                  background: st === 'active' ? '#FAF7F0' : '#FFFFFF',
                  transform: st === 'active' && !reduce ? 'translateX(4px)' : 'none',
                }}
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-500"
                  style={{ background: st === 'todo' ? '#F3F4F6' : NAVY, color: st === 'todo' ? '#6b7280' : '#FAF7F0' }}
                >
                  <Icon size={18} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold leading-snug" style={{ color: st === 'todo' ? '#6b7280' : NAVY }}>
                    {s.title}
                  </span>
                  <span className={`block text-xs ${st === 'todo' ? 'text-gray-500' : 'text-gray-600'}`}>{s.detail}</span>
                </span>
                <Check
                  size={18}
                  aria-hidden="true"
                  className="ml-auto shrink-0 transition-opacity duration-300"
                  style={{ color: GOLD_INK, opacity: st === 'done' ? 1 : 0 }}
                />
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-5 pt-4 border-t text-xs text-gray-600 flex items-center justify-between gap-3" style={{ borderColor: RULE }}>
        <span>Exemple de déroulé, sans ressaisie</span>
        <span className="font-semibold" style={{ color: GOLD_INK }}>
          Un système qui tourne tout seul
        </span>
      </p>
    </div>
  );
};
