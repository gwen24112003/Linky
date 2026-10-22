import React from 'react';
import { ScenarioAnimation } from '@/components/motion/ScenarioAnimation';
import { TeamDashboardDemo } from '@/components/motion/TeamDashboardDemo';

/** Visuel animé d'un cas client (page Cas clients), choisi selon la mission. */
export const CaseVisual: React.FC<{ slug: string }> = ({ slug }) => {
  if (slug === 'conciergerie') return <ScenarioAnimation scenario="conciergerie" />;
  if (slug === 'organisme-de-formation') return <ScenarioAnimation scenario="organisme-de-formation" />;
  if (slug === 'equipe-agents-immobiliers') return <TeamDashboardDemo />;
  return null;
};
