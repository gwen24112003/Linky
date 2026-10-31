// Calcul du diagnostic facture électronique : fonction pure, sans accès au réseau ni à l'horloge
// (la date du jour est passée en paramètre). Testée dans diagnostic.test.ts.

import type { Answers } from './questions.ts';
import { AMENDES, DATES, TEXTS, VERDICT_LABELS, VOLUME_MILIEU, dateFr, euros } from './rules.ts';

export type Verdict = keyof typeof VERDICT_LABELS;
export type Concerne = 'oui' | 'partiel' | 'a_verifier' | 'non';

export interface PlanStep {
  /** Date limite, au format AAAA-MM-JJ. */
  date: string;
  titre: string;
  detail: string;
  /** Vrai pour une échéance réglementaire (« Le 1er septembre 2027 ») ; sinon une action à faire avant la date. */
  echeance?: boolean;
}

export interface Diagnostic {
  verdict: Verdict;
  verdictLabel: string;
  titre: string;
  resume: string;
  reception: { statut: 'ok' | 'en_retard'; texte: string; risque: string | null };
  emission: { concerne: Concerne; date: string; enVigueur: boolean; texte: string };
  ereporting: { concerne: boolean; date: string; enVigueur: boolean; texte: string | null };
  /** Ordre de grandeur annuel de l'amende d'émission ; null si l'émission ne vous concerne pas. */
  amende: { montant: number; texte: string } | null;
  recommandation: string;
  /** 3 à 5 étapes datées, dans l'ordre chronologique. */
  plan: PlanStep[];
}

const iso = (d: Date) => d.toISOString().slice(0, 10);

function addDays(day: string, n: number): string {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return iso(d);
}

function addMonths(day: string, n: number): string {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCMonth(d.getUTCMonth() + n);
  return iso(d);
}

export function computeDiagnostic(answers: Answers, today: Date = new Date()): Diagnostic {
  const now = iso(today);
  const { q1_taille: taille, q2_tva: tva, q3_clients: clients, q5_outil: outil, q6_pa: pa } = answers;

  // Réception : toutes les entreprises, sans exception.
  const receptionEnVigueur = now >= DATES.reception;
  const enRetard = pa !== 'oui' && receptionEnVigueur;
  const reception = {
    statut: (pa === 'oui' ? 'ok' : 'en_retard') as 'ok' | 'en_retard',
    texte: pa === 'oui' ? TEXTS.reception.ok : pa === 'inconnu' ? TEXTS.reception.inconnu : TEXTS.reception.retard,
    risque: pa === 'oui' ? null : TEXTS.reception.risque,
  };

  // Émission : ventes aux entreprises françaises, selon la taille et le régime de TVA.
  const dateEmission = taille === 'grande' ? DATES.emissionGrandes : DATES.emissionPme;
  const emissionEnVigueur = now >= dateEmission;
  const exoneree = tva === 'exoneree';
  const b2b = clients.includes('entreprises');
  const concerne: Concerne =
    !b2b || exoneree ? 'non' : tva === 'mixte' ? 'partiel' : tva === 'inconnu' ? 'a_verifier' : 'oui';

  let emissionTexte: string;
  if (exoneree) emissionTexte = TEXTS.emission.exoneree;
  else if (!b2b) emissionTexte = TEXTS.emission.sansEntreprises(dateFr(dateEmission));
  else {
    emissionTexte = (emissionEnVigueur ? TEXTS.emission.enVigueur : TEXTS.emission.aVenir)(dateFr(dateEmission));
    if (tva === 'franchise') emissionTexte += ` ${TEXTS.emission.franchise}`;
    if (tva === 'mixte') emissionTexte += ` ${TEXTS.emission.mixte}`;
    if (tva === 'inconnu') emissionTexte += ` ${TEXTS.emission.inconnu}`;
  }

  // E-reporting : ventes aux particuliers ou à l'étranger, sauf activité entièrement exonérée.
  const particuliers = clients.includes('particuliers');
  const etranger = clients.includes('etranger');
  const ereportingConcerne = (particuliers || etranger) && !exoneree;
  const qui = particuliers && etranger ? TEXTS.ereporting.qui.lesDeux : particuliers ? TEXTS.ereporting.qui.particuliers : TEXTS.ereporting.qui.etranger;
  const ereporting = {
    concerne: ereportingConcerne,
    date: dateEmission,
    enVigueur: emissionEnVigueur,
    texte: ereportingConcerne
      ? (emissionEnVigueur ? TEXTS.ereporting.enVigueur : TEXTS.ereporting.aVenir)(qui, dateFr(dateEmission))
      : null,
  };

  // Amende d'émission indicative : milieu de la tranche × 12 mois × montant par facture, plafonné.
  const montant = Math.min(VOLUME_MILIEU[answers.q7_volume] * 12 * AMENDES.parFacture, AMENDES.plafondAnnuel);
  const amende = concerne === 'non' ? null : { montant, texte: TEXTS.amende(euros(montant)) };

  const recommandation =
    concerne === 'non' && !ereportingConcerne
      ? TEXTS.recommandation.receptionSeule
      : outil === 'logiciel'
        ? TEXTS.recommandation.logiciel(answers.q5_outil_nom ?? '')
        : TEXTS.recommandation[outil];

  // Verdict global.
  const resteAFaire = concerne !== 'non' || ereportingConcerne;
  const verdict: Verdict = enRetard ? 'EN_RETARD' : resteAFaire ? 'A_PREPARER' : 'EN_REGLE';
  let titre: string;
  let resume: string;
  if (verdict === 'EN_RETARD') {
    titre = TEXTS.verdict.retardTitre;
    resume = exoneree ? TEXTS.verdict.retardResumeExonere : TEXTS.verdict.retardResume;
  } else if (verdict === 'A_PREPARER') {
    const date = dateFr(dateEmission);
    titre = emissionEnVigueur
      ? TEXTS.verdict.preparerTitreEnVigueur(date)
      : concerne === 'non'
        ? TEXTS.verdict.preparerTitreEreporting(date)
        : TEXTS.verdict.preparerTitre(date);
    resume = emissionEnVigueur ? TEXTS.verdict.preparerResumeEnVigueur : TEXTS.verdict.preparerResume;
  } else {
    titre = TEXTS.verdict.regleTitre;
    resume = exoneree ? TEXTS.verdict.regleResumeExonere : TEXTS.verdict.regleResume;
  }

  return {
    verdict,
    verdictLabel: VERDICT_LABELS[verdict],
    titre,
    resume,
    reception,
    emission: { concerne, date: dateEmission, enVigueur: emissionEnVigueur, texte: emissionTexte },
    ereporting,
    amende,
    recommandation,
    plan: buildPlan({ now, enRetard, concerne, ereportingConcerne, emissionEnVigueur, dateEmission, tvaInconnue: tva === 'inconnu', recommandation }),
  };
}

interface PlanInput {
  now: string;
  enRetard: boolean;
  concerne: Concerne;
  ereportingConcerne: boolean;
  emissionEnVigueur: boolean;
  dateEmission: string;
  tvaInconnue: boolean;
  recommandation: string;
}

/** Plan d'action daté : 3 à 5 étapes, de la plus proche à la plus lointaine. */
function buildPlan(p: PlanInput): PlanStep[] {
  const P = TEXTS.plan;
  const steps: PlanStep[] = [];
  // Chaque étape tombe après la précédente : les étapes immédiates à quinze jours d'intervalle,
  // les étapes liées à une échéance à leur date (ou quinze jours plus tard si elle est déjà passée).
  let cursor = p.now;
  const push = (date: string, step: Omit<PlanStep, 'date'>) => {
    cursor = date > cursor ? date : addDays(cursor, 14);
    steps.push({ date: cursor, ...step });
  };
  const soon = (step: Omit<PlanStep, 'date'>) => push(addDays(cursor, 14), step);

  if (p.enRetard) soon(P.designer);
  if (p.tvaInconnue) soon(P.tva);

  const emettre = p.concerne !== 'non';
  if (!emettre && !p.ereportingConcerne) {
    // Activité exonérée : la réception, puis l'arrivée des factures électroniques de vos fournisseurs.
    if (!p.enRetard) soon(P.annuaire);
    soon(P.exoneration);
    push(DATES.emissionPme, { ...P.fournisseurs, echeance: true });
  } else if (p.emissionEnVigueur) {
    // Grandes entreprises : l'émission et l'e-reporting s'appliquent déjà.
    if (!p.enRetard) soon(P.annuaire);
    if (emettre) soon(P.controler);
    if (p.ereportingConcerne) soon(P.ereportingEnVigueur);
    soon(P.documenter);
  } else {
    // PME et micro-entreprises : on prépare l'échéance à rebours.
    const choisir = emettre ? P.choisir : P.choisirEreporting;
    const echeance = emettre
      ? { titre: P.echeance.titre, detail: p.ereportingConcerne ? P.echeance.detailEreporting : P.echeance.detail, echeance: true }
      : { ...P.echeanceEreporting, echeance: true };
    if (steps.length < 2) {
      soon({ titre: P.outil.titre, detail: p.recommandation });
      push(addMonths(p.dateEmission, -6), choisir);
    } else {
      // Au-delà de 5 étapes, le point sur l'outil rejoint le choix de la solution.
      push(addMonths(p.dateEmission, -6), { titre: choisir.titre, detail: `${choisir.detail} ${p.recommandation}` });
    }
    push(addMonths(p.dateEmission, -2), P.tester);
    push(p.dateEmission, echeance);
  }

  return steps;
}
