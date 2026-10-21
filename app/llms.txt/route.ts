import { getAllArticles } from '@/lib/articles';
import { tools } from '@/lib/tools';

const SITE_URL = 'https://opusadvisor.fr';

export const dynamic = 'force-static';

// Résumé du site pour les assistants IA (format llmstxt.org), régénéré à chaque build :
// la liste des articles suit automatiquement lib/articles.json.
export function GET() {
  const articles = getAllArticles()
    .map((a) => `- [${a.title}](${SITE_URL}/articles/${a.slug}/): ${a.description}`)
    .join('\n');

  const toolLines = tools
    .map((t) => `- [${t.title}](${SITE_URL}/outils/${t.slug}/): ${t.description}`)
    .join('\n');

  const body = `# Opus Advisor

> Opus Advisor organise et automatise la gestion des petites entreprises à partir des outils qu'elles utilisent déjà (logiciel métier, tableurs, mails, banque, comptabilité). Secteurs : organismes de formation, immobilier et conciergerie, BTP second œuvre. Objectif annoncé : rendre 10 heures par semaine au dirigeant à partir du deuxième mois. Basé à Rennes, intervient partout en France. Indépendant de tout éditeur de logiciel.

## Offres
- [Pré-audit gratuit](${SITE_URL}/contact/): 30 minutes en visio pour repérer 3 points de friction dans les outils de l'entreprise. Gratuit et sans engagement.
- [Audit Stack](${SITE_URL}/services/#audit-stack): 990 € HT, 10 jours ouvrés. Cartographie des outils et recommandation pour chacun : l'ajouter, le remplacer ou le relier aux autres.
- [Diagnostic opérationnel](${SITE_URL}/services/#diagnostic): 2 500 € HT, 2 à 3 semaines. Plan de consolidation chiffré, avec le gain attendu.
- [Mise en œuvre](${SITE_URL}/services/#implementation): à partir de 5 500 € HT, 4 à 10 semaines. Paramétrage du logiciel métier, automatisations (Make, n8n), documents partagés, formation de l'équipe.
- [Gardien du système](${SITE_URL}/services/#suivi): 400 à 1 500 € HT par mois. Surveillance, point mensuel et évolutions du système.

## Outils gratuits
${toolLines}

## Articles
${articles}

## À propos
- [Équipe](${SITE_URL}/equipe/): Enzo Monnier (fondateur, ancien développeur) et Gwendoline (associée).
- [Consultant à Rennes](${SITE_URL}/consultant-rennes/): installés à Rennes, déplacements sur site pendant les missions à moins de deux heures de Rennes (Bretagne, Pays-de-la-Loire) ; pré-audit en visio partout en France.
- [Cas clients](${SITE_URL}/cas-clients/): dossiers de financement automatisés pour un organisme de formation, facturation de tous les propriétaires d'une conciergerie en une seule automatisation, outil de suivi pour un manager d'agents immobiliers. Programme Opus Pilotes : 3 places pour le BTP second œuvre en Bretagne et Pays-de-la-Loire.
- [Secteurs](${SITE_URL}/secteurs/): [formation](${SITE_URL}/secteurs/formation/), [immobilier et conciergerie](${SITE_URL}/secteurs/immobilier/), [BTP second œuvre](${SITE_URL}/secteurs/btp/).
- Contact : enzo@opusadvisor.fr
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
