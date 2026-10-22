import React from 'react';
import {
  User, FileText, Send, Workflow, LayoutDashboard, Eye, HelpCircle, ChevronRight, type LucideIcon,
} from 'lucide-react';

const NAVY = '#1A2332';
const GOLD_INK = '#8A6A1C';
const RULE = 'rgba(26,35,50,0.16)';

interface Chip {
  icon: LucideIcon;
  text: string;
}

interface Schema {
  before: { chips: Chip[]; note: string; arrows?: boolean };
  after: { chips: Chip[]; note: string; arrows?: boolean };
}

// Illustrations des missions réelles : la forme du changement, pas des chiffres.
const SCHEMAS: Record<string, Schema> = {
  'organisme-de-formation': {
    before: {
      chips: [
        { icon: User, text: 'Saisie' },
        { icon: User, text: 'Dossier' },
        { icon: User, text: 'Envoi' },
      ],
      note: 'Chaque étape à la main',
      arrows: true,
    },
    after: {
      chips: [
        { icon: Workflow, text: 'Saisie' },
        { icon: Workflow, text: 'Dossier' },
        { icon: Workflow, text: 'Envoi' },
      ],
      note: 'Tout s’enchaîne seul',
      arrows: true,
    },
  },
  conciergerie: {
    before: {
      chips: [
        { icon: Workflow, text: 'Propr. 1' },
        { icon: Workflow, text: 'Propr. 2' },
        { icon: Workflow, text: 'Propr. 3' },
        { icon: Workflow, text: '…' },
      ],
      note: 'Une automatisation par propriétaire',
    },
    after: {
      chips: [{ icon: Workflow, text: 'Tous les propriétaires' }],
      note: 'Une seule automatisation',
    },
  },
  'equipe-agents-immobiliers': {
    before: {
      chips: [
        { icon: User, text: 'Agents' },
        { icon: HelpCircle, text: 'Manager' },
      ],
      note: 'L’information à aller chercher',
      arrows: true,
    },
    after: {
      chips: [
        { icon: User, text: 'Agents' },
        { icon: LayoutDashboard, text: 'Tableau' },
        { icon: Eye, text: 'Manager' },
      ],
      note: 'Tout au même endroit',
      arrows: true,
    },
  },
};

const Row: React.FC<{ label: string; row: Schema['before']; after?: boolean }> = ({ label, row, after }) => (
  <div className={after ? 'schema-after' : undefined}>
    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-600">
      {label}
      <span className="normal-case tracking-normal font-normal">· {row.note}</span>
    </div>
    <div className="mt-2 flex flex-wrap items-center gap-1.5">
      {row.chips.map((c, i) => (
        <React.Fragment key={`${c.text}-${i}`}>
          {row.arrows && i > 0 && <ChevronRight size={14} aria-hidden="true" className="text-gray-500" />}
          <span
            className="inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium"
            style={
              after
                ? { borderColor: GOLD_INK, background: '#FAF7F0', color: NAVY }
                : { borderColor: RULE, background: '#FFFFFF', color: '#4b5563' }
            }
          >
            <c.icon size={13} aria-hidden="true" style={{ color: after ? GOLD_INK : '#6b7280' }} />
            {c.text}
          </span>
        </React.Fragment>
      ))}
    </div>
  </div>
);

/** Mini-schéma avant/après d'un cas client (décoratif : le texte du cas dit la même chose). */
export const CaseSchema: React.FC<{ slug: string }> = ({ slug }) => {
  const schema = SCHEMAS[slug];
  if (!schema) return null;
  return (
    <div className="mt-5 space-y-3 rounded-xl border p-3.5" style={{ borderColor: RULE }} aria-hidden="true">
      <Row label="Avant" row={schema.before} />
      <Row label="Après" row={schema.after} after />
    </div>
  );
};
