# Opus Advisory - Site Web

Site vitrine d'**Opus Advisory**, consultant ops pour les patrons du BTP second œuvre (électricité, plomberie, chauffage-clim).

On rend 10h/semaine aux patrons en centralisant leurs outils : devis, chantiers, relances, facturation 2027.

## Stack

- **Next.js** 15 (App Router) + TypeScript
- **React** 19
- **Tailwind CSS** 3.4 + `@tailwindcss/typography`
- **Framer Motion** pour les animations
- **Lucide React** pour les icônes
- **react-markdown** + `gray-matter` pour les articles
- **EmailJS** pour le formulaire de contact

## Prérequis

- Node.js 18.17+ (recommandé : 20 LTS)
- npm (fourni avec Node.js)

Vérifier :
```bash
node --version
npm --version
```

## Installation

```bash
git clone <repo-url>
cd Linky
npm install
```

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement sur `http://localhost:3000` |
| `npm run build` | Build de production |
| `npm start` | Lance le serveur de production (après `build`) |
| `npm run lint` | Lint Next.js |

## Structure

```
Linky/
├── app/                        # App Router Next.js 15
│   ├── layout.tsx              # Root layout + metadata + JSON-LD
│   ├── page.tsx                # Page d'accueil
│   ├── globals.css
│   ├── services/
│   ├── cas-clients/
│   ├── equipe/
│   ├── articles/
│   └── contact/
├── components/
│   ├── home/                   # Sections de la home
│   ├── pages/                  # Vues par route
│   └── layout/                 # Header, Footer
├── lib/                        # Helpers (faqData, etc.)
├── public/
│   ├── images/                 # Logos, photos équipe, OG
│   └── articles/               # Articles markdown
├── types/                      # Types TypeScript partagés
├── tailwind.config.ts
└── next.config.mjs
```

## Pages

- **`/`** — Home : hero, piliers système, urgence 2027, témoignages, FAQ, CTA
- **`/services`** — Offre (pré-audit, diagnostic, implémentation, suivi mensuel)
- **`/cas-clients`** — Études de cas
- **`/articles`** — Blog / veille métier BTP
- **`/equipe`** — Enzo + Gwendoline
- **`/contact`** — Pré-audit gratuit (Cal.com) + coordonnées

## Déploiement

Projet optimisé pour **Vercel** (déploiement natif Next.js). Fonctionne aussi sur Netlify ou tout hébergeur supportant Node.js 18+.

```bash
npm install -g vercel
vercel --prod
```

## Contact

- **Site** : [opusadvisor.fr](https://opusadvisor.fr)
- **Email** : enzo@opusadvisor.fr
- **LinkedIn** : [Enzo Monnier](https://www.linkedin.com/in/enzo-monnier-7524ab205/)
- **Instagram** : [@opusadvisor](https://www.instagram.com/opusadvisor/)
- **X** : [@opusadvisor](https://x.com/opusadvisor)

## Licence

Propriété d'Opus Advisory. Tous droits réservés.
