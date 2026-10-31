// Questions du diagnostic facture électronique (/diagnostic-facture-electronique).
// Partagé par la page et par le service qui enregistre les leads (services/lead-api) :
// les imports relatifs gardent leur extension .ts pour que Node exécute ce fichier tel quel.

export type Taille = 'micro' | 'pme' | 'grande';
export type Tva = 'franchise' | 'taxable' | 'exoneree' | 'mixte' | 'inconnu';
export type Client = 'entreprises' | 'particuliers' | 'etranger';
export type Secteur = 'btp' | 'formation' | 'immobilier' | 'autre';
export type Outil = 'bureautique' | 'logiciel' | 'comptable' | 'erp';
export type Pa = 'oui' | 'non' | 'inconnu';
export type Volume = '0-10' | '10-50' | '50-200' | '200+';

export interface Answers {
  q1_taille: Taille;
  q2_tva: Tva;
  q3_clients: Client[];
  q4_secteur: Secteur;
  q5_outil: Outil;
  /** Nom du logiciel de facturation, facultatif (réponse « Un logiciel de facturation »). */
  q5_outil_nom?: string;
  q6_pa: Pa;
  q7_volume: Volume;
}

export type QuestionId = Exclude<keyof Answers, 'q5_outil_nom'>;

export interface Question {
  id: QuestionId;
  label: string;
  hint?: string;
  multiple?: boolean;
  options: { value: string; label: string }[];
}

export const QUESTIONS: Question[] = [
  {
    id: 'q1_taille',
    label: 'Votre entreprise',
    options: [
      { value: 'micro', label: 'Micro-entreprise' },
      { value: 'pme', label: 'Entreprise individuelle au réel ou société de moins de 250 salariés' },
      { value: 'grande', label: "250 salariés ou plus, ou chiffre d'affaires supérieur à 50 M€" },
    ],
  },
  {
    id: 'q2_tva',
    label: 'Côté TVA',
    options: [
      { value: 'franchise', label: 'Franchise en base, je ne facture pas de TVA' },
      { value: 'taxable', label: 'Je facture la TVA' },
      { value: 'exoneree', label: 'Toute mon activité est exonérée (formation avec attestation, santé, enseignement...)' },
      { value: 'mixte', label: 'Une partie exonérée, une partie taxable' },
      { value: 'inconnu', label: 'Je ne sais pas' },
    ],
  },
  {
    id: 'q3_clients',
    label: 'Vous facturez',
    hint: 'Plusieurs réponses possibles.',
    multiple: true,
    options: [
      { value: 'entreprises', label: 'Des entreprises françaises' },
      { value: 'particuliers', label: 'Des particuliers' },
      { value: 'etranger', label: "Des clients à l'étranger" },
    ],
  },
  {
    id: 'q4_secteur',
    label: 'Votre secteur',
    options: [
      { value: 'btp', label: 'BTP' },
      { value: 'formation', label: 'Formation' },
      { value: 'immobilier', label: 'Immobilier ou conciergerie' },
      { value: 'autre', label: 'Autre' },
    ],
  },
  {
    id: 'q5_outil',
    label: "Vos factures aujourd'hui",
    options: [
      { value: 'bureautique', label: 'Word, Excel ou Canva' },
      { value: 'logiciel', label: 'Un logiciel de facturation' },
      { value: 'comptable', label: "C'est mon expert-comptable" },
      { value: 'erp', label: 'Un logiciel métier ou ERP' },
    ],
  },
  {
    id: 'q6_pa',
    label: 'Avez-vous désigné une plateforme agréée pour recevoir vos factures ?',
    options: [
      { value: 'oui', label: 'Oui' },
      { value: 'non', label: 'Non' },
      { value: 'inconnu', label: "Je ne sais pas ce que c'est" },
    ],
  },
  {
    id: 'q7_volume',
    label: 'Factures émises par mois à des professionnels',
    options: [
      { value: '0-10', label: '0 à 10' },
      { value: '10-50', label: '10 à 50' },
      { value: '50-200', label: '50 à 200' },
      { value: '200+', label: 'Plus de 200' },
    ],
  },
];

/** Libellé d'une réponse, pour les mails et l'export. */
export function answerLabel(id: QuestionId, value: string): string {
  return QUESTIONS.find((q) => q.id === id)?.options.find((o) => o.value === value)?.label ?? value;
}

const allowed = (id: QuestionId) => new Set(QUESTIONS.find((q) => q.id === id)!.options.map((o) => o.value));

/** Vérifie des réponses reçues de l'extérieur ; renvoie null si l'une d'elles est absente ou inconnue. */
export function parseAnswers(input: unknown): Answers | null {
  if (!input || typeof input !== 'object') return null;
  const a = input as Record<string, unknown>;
  for (const q of QUESTIONS) {
    const v = a[q.id];
    if (q.multiple) {
      if (!Array.isArray(v) || v.length === 0 || !v.every((x) => typeof x === 'string' && allowed(q.id).has(x))) return null;
    } else if (typeof v !== 'string' || !allowed(q.id).has(v)) {
      return null;
    }
  }
  const nom = typeof a.q5_outil_nom === 'string' ? a.q5_outil_nom.trim().slice(0, 80) : '';
  return {
    q1_taille: a.q1_taille as Taille,
    q2_tva: a.q2_tva as Tva,
    q3_clients: [...new Set(a.q3_clients as Client[])],
    q4_secteur: a.q4_secteur as Secteur,
    q5_outil: a.q5_outil as Outil,
    ...(a.q5_outil === 'logiciel' && nom ? { q5_outil_nom: nom } : {}),
    q6_pa: a.q6_pa as Pa,
    q7_volume: a.q7_volume as Volume,
  };
}
