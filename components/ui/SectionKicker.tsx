'use client';

import React from 'react';

const GOLD = '#C9A84C';
const NAVY = '#1A2332';

interface SectionKickerProps {
  label: string;
  index?: string;
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * En-tête de section unifié, façon éditoriale :  LABEL / NN  ───────────
 * Utilisé partout pour donner une grammaire visuelle commune.
 */
export const SectionKicker: React.FC<SectionKickerProps> = ({
  label,
  index,
  tone = 'light',
  className = '',
}) => {
  const ruleColor = tone === 'dark' ? 'rgba(255,255,255,0.22)' : 'rgba(26,35,50,0.16)';
  const indexColor = tone === 'dark' ? 'rgba(255,255,255,0.45)' : 'rgba(26,35,50,0.4)';

  return (
    <div className={`flex items-center gap-5 ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-[0.28em] whitespace-nowrap">
        <span style={{ color: GOLD }}>{label}</span>
        {index && <span style={{ color: indexColor }}> / {index}</span>}
      </span>
      <span className="flex-1 h-px" style={{ background: ruleColor }} />
    </div>
  );
};
