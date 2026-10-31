import { getAllArticles } from '@/lib/articles';
import { cases } from '@/lib/cases';
import { faqs } from '@/lib/faqData';
import { tools } from '@/lib/tools';

const SITE_URL = 'https://opusadvisor.fr';

export const dynamic = 'force-static';

/** Réponse de FAQ en une ligne de texte brut (sans gras ni listes Markdown). */
const plain = (md: string) =>
  md
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/^- /gm, '')
    .replace(/\s*\n+\s*/g, ' ')
    .trim();

// Résumé du site pour les assistants IA (format llmstxt.org), régénéré à chaque build :
// articles, outils, cas clients et FAQ suivent automatiquement leurs fichiers de données.
export function GET() {
  const articles = getAllArticles()
    .map((a) => `- [${a.title}](${SITE_URL}/articles/${a.slug}/): ${a.description}`)
    .join('\n');

  const toolLines = tools
    .map((t) => `- [${t.title}](${SITE_URL}/outils/${t.slug}/): ${t.description}`)
    .join('\n');

  const caseLines = cases.map((c) => `- ${c.client} : ${c.title}. ${c.done} ${c.result}`).join('\n');

  const faqLines = faqs.map((f) => `### ${f.question}\n${plain(f.answer)}`).join('\n\n');

  const body = `# Opus Advisor

> Opus Advisor construit des systèmes de gestion complets et automatisés pour les petites entreprises, à l'image de chacune. Selon le besoin : des automatisations entre les outils déjà en place (logiciel métier, tableurs, mails, banque, comptabilité), une application centrale qui réunit ces outils, ou un système monté de A à Z. Secteurs : organismes de formation, immobilier et conciergerie, BTP second œuvre. Objectif annoncé : rendre 10 heures par semaine au dirigeant à partir du deuxième mois. Basé à Rennes, intervient partout en France. Indépendant de tout éditeur de logiciel.

## Comment on travaille
- Automatisations seules : quand les logiciels de l'entreprise font l'affaire, on automatise ce qui se fait encore à la main (documents, mails, relances, factures) avec Make ou n8n.
- Application centrale : les logiciels restent en place et une application plus simple à utiliser les réunit (base Airtable ou outil développé sur mesure). Chaque information y est saisie une fois et les automatisations partent de là. Exemple : une conciergerie avec un logiciel de réservation et un logiciel de facturation.
- Système complet : quand rien d'adapté n'est en place, on construit tout le système, du choix des outils à la formation de l'équipe.
- Tous les comptes et tous les outils restent au nom du client ; une documentation complète lui est remise.

## Offres (TVA non applicable, art. 293 B du CGI)
- [Pré-audit gratuit](${SITE_URL}/contact/): 30 minutes en visio pour repérer 3 points de friction dans les outils de l'entreprise. Gratuit et sans engagement.
- [Audit Stack](${SITE_URL}/services/#audit-stack): 990 €, 10 jours ouvrés. Cartographie des outils, recommandation pour chacun (l'ajouter, le remplacer ou le relier aux autres) et type de système à prévoir.
- [Diagnostic opérationnel](${SITE_URL}/services/#diagnostic): 2 500 €, 2 à 3 semaines. Plan chiffré, avec le gain attendu.
- [Mise en œuvre](${SITE_URL}/services/#implementation): à partir de 5 500 €, 4 à 10 semaines. Construction du système défini au diagnostic, tests sur les vrais dossiers, formation de l'équipe, documentation.
- [Gardien du système](${SITE_URL}/services/#suivi): 400 à 1 500 € par mois, sans engagement (formule Premium : 12 mois). Surveillance, point mensuel et évolutions du système.

## Secteurs
- [Organismes de formation](${SITE_URL}/secteurs/formation/): conventions, convocations, émargements, dossiers pour les financeurs, preuves Qualiopi, BPF.
- [Immobilier et conciergerie](${SITE_URL}/secteurs/immobilier/): facturation des propriétaires, plannings de ménage, factures prestataires, suivi des mandats et des agents.
- [BTP second œuvre](${SITE_URL}/secteurs/btp/): devis, relances d'impayés, suivi de chantier, facturation électronique.

## Cas clients (missions réelles, sans nom de client)
${caseLines}
- Programme Opus Pilotes : 3 places pour le BTP second œuvre en Bretagne et Pays-de-la-Loire.
Détails : ${SITE_URL}/cas-clients/

## Questions fréquentes
${faqLines}

## Outils gratuits
${toolLines}

## Articles
${articles}

## À propos
- [Équipe](${SITE_URL}/equipe/): Enzo Monnier (fondateur, ancien développeur, il code lui-même les systèmes) et Gwendoline (associée).
- [Consultant à Rennes](${SITE_URL}/consultant-rennes/): installés à Rennes, déplacements sur site pendant les missions à moins de deux heures de Rennes (Bretagne, Pays-de-la-Loire) ; pré-audit en visio partout en France.
- Contact : enzo@opusadvisor.fr
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
