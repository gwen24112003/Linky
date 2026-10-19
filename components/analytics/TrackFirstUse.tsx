'use client';

import React, { useRef } from 'react';
import { track } from '@/lib/analytics';

/** Enregistre « Calculateur utilisé » à la première saisie dans le calculateur, une fois par visite de page. */
export const TrackFirstUse: React.FC<{ tool: string; children: React.ReactNode }> = ({ tool, children }) => {
  const done = useRef(false);
  const onFirstInput = () => {
    if (done.current) return;
    done.current = true;
    track('Calculateur utilisé', { outil: tool });
  };

  return (
    <div onInputCapture={onFirstInput} onChangeCapture={onFirstInput}>
      {children}
    </div>
  );
};
