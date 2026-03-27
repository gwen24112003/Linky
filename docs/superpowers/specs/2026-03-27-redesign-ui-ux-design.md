# Opus Advisor — Redesign UI/UX · Design Spec
**Date :** 2026-03-27
**Stack :** React 19 + TypeScript + Tailwind CSS 3 + Framer Motion + React Router DOM 7
**Approche :** Refonte complète (rebuild visuel, structure JSX réécrite, contenu original préservé)

---

## 1. Contexte & Objectifs

**Site :** Opus Advisor — cabinet de conseil opérationnel (diagnostic, optimisation, accompagnement)
**Audience primaire :** Entreprises (dirigeants, ETI, PME en croissance)
**Audience secondaire :** Experts / Freelances (contacts importants mais non prioritaires)
**Chiffres clés :** 10+ projets livrés · Fondé en 2023 · 100% sur-mesure

**Trois objectifs simultanés :**
1. Refonte visuelle complète — sortir du look générique, aller vers un esthétique premium et distinctif
2. Correction des problèmes UX — text-selection désactivée, accessibilité, animations lourdes
3. Amélioration des conversions — hiérarchie CTA plus claire, parcours utilisateur fluide

---

## 2. Direction de Design : Éditorial Luxe

**Inspiration :** Roland Berger, Oliver Wyman — sobre, intemporel, ultra-crédible
**Principe :** Restraint typographique, espace généreux, détails intentionnels. Rien de générique.

### Palette de couleurs

| Nom | Hex | Usage |
|-----|-----|-------|
| Crème | `#faf9f7` | Fond principal |
| Crème foncé | `#f0ede8` | Sections alternées |
| Navy | `#1A2332` | Texte principal, sections dark, boutons primaires |
| Or | `#C9A84C` | Accent principal, labels, séparateurs, numéros |
| Séparateur | `#e8e4dc` | Bordures, lignes de séparation |

### Typographie

| Rôle | Police | Caractéristiques |
|------|--------|-----------------|
| Titres H1–H3 | Cormorant Garamond | Serif, weight 400, line-height 1.05–1.2 |
| Italique accent | Cormorant Garamond italic | Utilisé pour les phrases clés en or |
| Corps de texte | Inter | 12–14px, color #777–#888, line-height 1.8 |
| Labels / Nav | Inter | 9–10px, letter-spacing 2–3px, uppercase |

> **Note d'implémentation :** Cormorant Garamond n'est pas dans le projet actuel. L'ajouter via Google Fonts dans `public/index.html` : `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap')`. Déclarer dans `tailwind.config.js` sous `fontFamily.serif`. Inter est déjà présent — le conserver.

### Composants UI

**Bouton primaire :** `background #1A2332 · color white · padding 11px 24px · font 9px uppercase letter-spacing 2px`
**Bouton lien :** `text underline or avec flèche → · border-bottom 1px`
**Bouton secondaire :** `border 1px #e8e4dc · color #777`
**CTA section dark :** `background #C9A84C · color #1A2332 · font-weight 800`

**Cards services :** `border-top 2px #C9A84C · numéro or · titre serif · description Inter gris`
**Séparateur or :** `width 32px · height 1px · background #C9A84C`
**Tags :** `uppercase letter-spacing 1.5px · variants: navy filled / border / or filled`

### Animations (sobres)

- **Fade-in au scroll :** `opacity 0→1 + translateY 20px→0 · duration 0.5s · ease`
- **Hover nav :** underline qui glisse de gauche à droite, `0.2s`
- **Transition de page :** fade cross `0.3s` — pas de slide
- **prefers-reduced-motion :** toutes les animations désactivées si l'OS le demande (obligatoire)

---

## 3. Architecture des Pages

### Header (global)
- Logo `opus-logo.png` en haut à gauche (height 30px)
- Navigation centrée-droite : Services · Cabinet · Projets · Articles · Experts
- Bouton "Contact" navy à droite
- `position: sticky · backdrop-filter: blur(8px) · background rgba(250,249,247,0.95)`
- Bordure bottom `1px #e8e4dc`
- Mobile : menu plein écran navy (même comportement qu'actuellement)

### Footer (global)
- Background `#111827`
- Logo blanc (`opus-logo-white.png`) à gauche
- Liens nav au centre
- Copyright à droite
- Supprimer le gradient gold décoratif actuel → remplacer par une ligne `1px #C9A84C` en haut du footer

---

### Page : Homepage `/`

**Section Hero**
- Grid 2 colonnes (1.2fr / 1fr), séparées par `border-left 1px #e8e4dc`
- Colonne gauche : label or + séparateur or + H1 serif (tagline originale) + description + CTAs
- Colonne droite : onglets `Entreprises | Experts` + accroche + liste à puces (dots or)
- H1 : *"Donnez à votre Ambition la Structure qu'elle mérite."*
- L'état de l'onglet est persisté dans l'URL : `?tab=entreprises` / `?tab=experts`

**Section Stats**
- Grid 3 colonnes avec `border-right 1px #e8e4dc`
- 10+ Projets livrés · 2023 Fondé · 100% Sur-mesure
- Chiffres en serif 36px, labels Inter uppercase 9px gris

**Section Services (dark)**
- Background `#1A2332`
- Titre section + lien "Voir tout →"
- Grid 2×2, séparées par `1px rgba(255,255,255,0.08)`
- Chaque service : numéro or + titre serif blanc + description gris clair

**Section Processus**
- Background `#f0ede8` (crème foncé)
- 3 étapes en grid : Diagnostic · Co-construction · Déploiement
- Séparées par `border-right 1px #e8e4dc`
- Numéro or, titre serif, description Inter

**Section Articles**
- Background `#faf9f7`
- 3 articles en aperçu : `border-top 2px` (or pour le premier, `#e8e4dc` pour les suivants)
- Catégorie + titre + temps de lecture

**CTA Final**
- Background `#1A2332`, centré
- Titre serif blanc + description + bouton or "Prendre rendez-vous" + bouton outline "Nous écrire"

---

### Page : Services `/services`

- Intro header : label or + H1 serif + description
- 4 sections détaillées alternées (`#faf9f7` / `#f0ede8`)
- Chaque section : numéro + titre + description longue + liste de livrables (dots or)
- CTA contact en dark en bas

---

### Page : Cabinet `/equipe`

- Intro : présentation du cabinet (texte original)
- Section équipe : grid de profils (photo + nom + rôle + bio courte)
- Section valeurs : grid 3 colonnes, fond crème foncé
- CTA en dark

---

### Page : Projets `/projets`

- Grid de case studies : catégorie or + titre serif + description courte
- Hover : `border-top 2px #C9A84C` apparaît progressivement
- Pas de modal — chaque projet est une card non-cliquable si aucune page dédiée n'existe dans le contenu actuel

---

### Page : Articles `/articles`

- Liste éditoriale (pas de cards avec ombres) : `border-top 1px #e8e4dc`
- Chaque article : catégorie + titre serif + extrait + temps de lecture + date
- Filtre par catégorie (labels cliquables, uppercase)

---

### Page : Article `/article/:slug`

- Mise en page éditoriale : colonne centrale large (max-width 680px), table des matières sticky à droite
- H1 serif grand (40–48px), chapeau Inter 16px gris
- Body : Inter 15px, line-height 1.9, titres H2 serif
- Articles liés en bas de page (même style que section Articles)

---

### Page : Contact `/contact`

- Split layout : info gauche (`#f0ede8`) + formulaire droite (blanc)
- Gauche : logo + email + téléphone + adresse + liens sociaux
- Formulaire : inputs `border-bottom 1px #e8e4dc` uniquement (style épuré)
- Select service : composant custom sobre
- Validation en temps réel (feedback immédiat, pas uniquement au submit)
- Succès : message inline élégant, pas de dismiss automatique

---

### Page : Experts Contact `/experts-contact`

- Même structure que Contact mais avec champs adaptés aux experts
- Intro spécifique : accroche pour les freelances/experts

---

## 4. Responsive (Mobile)

Toutes les grids multi-colonnes se stackent verticalement sur mobile (`< 768px`) :

| Section | Desktop | Mobile |
|---------|---------|--------|
| Hero | 2 colonnes | 1 colonne, onglets au-dessus |
| Stats | 3 colonnes | 1 colonne, séparateurs horizontaux |
| Services | 2×2 grid | 1 colonne |
| Processus | 3 colonnes | 1 colonne, numéros verticaux |
| Articles preview | 3 colonnes | 1 colonne |
| Contact split | 2 colonnes | 1 colonne (infos en haut, form en bas) |

Header mobile : même comportement qu'actuellement (menu plein écran navy, hamburger icon).

---

## 5. Corrections UX Transversales

| Problème actuel | Correction |
|----------------|------------|
| `user-select: none` sur tout le site | Supprimer — texte sélectionnable partout |
| Scrollbar cachée | Scrollbar discrète visible (custom CSS, couleur `#e8e4dc`) |
| État onglet non persisté | `?tab=entreprises` / `?tab=experts` dans l'URL |
| Pas de `prefers-reduced-motion` | Toutes animations respectent ce media query |
| Pas d'ARIA sur éléments animés | ARIA labels + rôles sur tous les éléments interactifs |
| Validation formulaire post-submit uniquement | Validation en temps réel sur blur |
| Pas de code splitting | `React.lazy` + `Suspense` sur chaque route |

---

## 5. Ce qui NE change PAS

- Stack technique : React 19 + TypeScript + Tailwind CSS 3 + Framer Motion + React Router DOM 7
- Structure des routes (`App.tsx`)
- Intégration EmailJS pour le formulaire de contact
- SEO via React Helmet Async
- Rendu Markdown des articles (`react-markdown`)
- Contenu textuel de toutes les pages (préservé à l'identique)
- Fichiers logo (`opus-logo.png`, `opus-logo-white.png`, `opus-icon.png`)
