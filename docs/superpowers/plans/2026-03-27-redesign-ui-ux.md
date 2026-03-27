# Opus Advisor — Redesign UI/UX Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refonte visuelle complète du site Opus Advisor vers une direction "Éditorial Luxe" (crème/navy/or, Cormorant Garamond, animations sobres) tout en préservant le contenu existant et la stack React.

**Architecture:** Le design system est centralisé dans `src/theme/` et `src/index.css`. Les composants de page sont refaits un par un en suivant les tokens du design system. Les corrections UX transversales (text-selection, scrollbar, URL tabs, accessibilité) sont faites en parallèle des composants concernés.

**Tech Stack:** React 19 + TypeScript + Tailwind CSS 3 (CRACO) + Framer Motion + React Router DOM 7 + Google Fonts (Cormorant Garamond + Inter)

---

## File Map

### Modifiés
- `public/index.html` — ajout Cormorant Garamond dans Google Fonts
- `src/theme/colors.js` — ajout `cream`, `creamDark`, `separator`
- `src/theme/fonts.js` — ajout `serif`, remplacement `heading`/`subtitle` par `serif`
- `src/index.css` — suppression user-select none, scrollbar custom, global styles éditoriaux, animations
- `src/App.tsx` — React.lazy + Suspense + AnimatePresence page transitions
- `src/components/layout/Header.tsx` — refonte complète
- `src/components/layout/Footer.tsx` — refonte complète
- `src/components/ui/Button.tsx` — 3 nouvelles variantes (primary, link, outline)
- `src/pages/Home.tsx` — orchestration des nouvelles sections
- `src/components/home/HeroBanner.tsx` — refonte (2 colonnes, tabs URL state)
- `src/components/home/ArticlesSection.tsx` — refonte style éditorial
- `src/pages/Services.tsx` — refonte
- `src/pages/Team.tsx` — refonte
- `src/pages/Projects.tsx` — refonte
- `src/pages/ArticlesPage.tsx` — refonte
- `src/pages/ArticlePage.tsx` — refonte (layout éditorial + ToC sticky)
- `src/pages/Contact.tsx` — refonte + validation temps réel
- `src/pages/ExpertContact.tsx` — refonte

### Créés
- `src/hooks/useTabUrl.ts` — persistance état onglet dans URL (`?tab=`)
- `src/components/ui/SectionLabel.tsx` — label or uppercase réutilisable
- `src/components/ui/GoldSeparator.tsx` — ligne or 32px
- `src/components/ui/FadeIn.tsx` — wrapper animation fade-in au scroll
- `src/components/home/StatsSection.tsx` — section 3 stats
- `src/components/home/ServicesSection.tsx` — grille 2x2 services dark
- `src/components/home/ProcessSection.tsx` — 3 étapes
- `src/components/home/CtaSection.tsx` — CTA final dark

---

## Task 1: Design System — Fonts + Colors

**Files:**
- Modify: `public/index.html`
- Modify: `src/theme/colors.js`
- Modify: `src/theme/fonts.js`

- [ ] **Step 1: Ajouter Cormorant Garamond dans `public/index.html`**

Remplacer la ligne Google Fonts existante (ligne 21) par :
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```
> Supprimer Bricolage Grotesque et Lexend — ils ne sont plus utilisés.

- [ ] **Step 2: Mettre à jour `src/theme/colors.js`**

```js
const colors = {
  navy: '#1A2332',
  gold: '#C9A84C',
  cream: '#faf9f7',
  creamDark: '#f0ede8',
  separator: '#e8e4dc',
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
  current: 'currentColor',
  overlay: 'rgba(0, 0, 0, 0.2)',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

module.exports = { colors };
```

- [ ] **Step 3: Mettre à jour `src/theme/fonts.js`**

```js
const fonts = {
  sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial'],
  serif: ['Cormorant Garamond', 'Georgia', 'ui-serif', 'serif'],
  // Garder heading/subtitle comme alias pour ne pas casser d'anciens usages
  heading: ['Cormorant Garamond', 'Georgia', 'ui-serif', 'serif'],
  subtitle: ['Inter', 'ui-sans-serif', 'system-ui'],
};

const fontSizes = {
  xs: ['0.75rem', { lineHeight: '1rem' }],
  sm: ['0.875rem', { lineHeight: '1.25rem' }],
  base: ['1rem', { lineHeight: '1.5rem' }],
  lg: ['1.125rem', { lineHeight: '1.75rem' }],
  xl: ['1.25rem', { lineHeight: '1.75rem' }],
  '2xl': ['1.5rem', { lineHeight: '2rem' }],
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  '5xl': ['3rem', { lineHeight: '1' }],
  '6xl': ['3.75rem', { lineHeight: '1' }],
  '7xl': ['4.5rem', { lineHeight: '1' }],
  '8xl': ['6rem', { lineHeight: '1' }],
  '9xl': ['8rem', { lineHeight: '1' }],
};

const fontWeights = {
  thin: '100', extralight: '200', light: '300', normal: '400',
  medium: '500', semibold: '600', bold: '700', extrabold: '800', black: '900',
};

module.exports = { fonts, fontSizes, fontWeights };
```

- [ ] **Step 4: Lancer le dev server et vérifier qu'il n'y a pas d'erreur de build**

```bash
npm start
```
Attendu : compilation réussie, pas d'erreur dans la console.

- [ ] **Step 5: Commit**

```bash
git add public/index.html src/theme/colors.js src/theme/fonts.js
git commit -m "feat: update design tokens — Cormorant Garamond serif + cream palette"
```

---

## Task 2: Global CSS — Styles éditoriaux + corrections UX

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Réécrire `src/index.css` complètement**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ─── Reset ─────────────────────────────────────────────── */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ─── Scrollbar discrète ─────────────────────────────────── */
html {
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: #e8e4dc transparent;
}
html::-webkit-scrollbar { width: 6px; }
html::-webkit-scrollbar-track { background: transparent; }
html::-webkit-scrollbar-thumb { background: #e8e4dc; border-radius: 3px; }

/* ─── Base ───────────────────────────────────────────────── */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: #faf9f7;
  color: #1A2332;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 400;
}

/* ─── Animations ─────────────────────────────────────────── */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.fade-in-up {
  animation: fadeInUp 0.5s ease forwards;
}

/* Respecter prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ─── Components ─────────────────────────────────────────── */
@layer components {
  /* Séparateur or */
  .gold-line {
    @apply w-8 h-px bg-gold;
  }

  /* Label or uppercase */
  .label-gold {
    @apply font-sans text-gold text-[9px] tracking-[3px] uppercase font-semibold;
  }

  /* Nav link hover underline */
  .nav-link {
    @apply relative font-sans text-[10px] tracking-[2px] uppercase text-gray-500
           transition-colors duration-200 hover:text-navy;
  }
  .nav-link::after {
    content: '';
    @apply absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-200;
  }
  .nav-link:hover::after { @apply w-full; }

  /* Bouton primaire */
  .btn-primary {
    @apply inline-flex items-center bg-navy text-white
           px-6 py-3 font-sans text-[9px] font-bold tracking-[2px] uppercase
           transition-opacity duration-200 hover:opacity-80;
  }

  /* Bouton lien avec flèche */
  .btn-link {
    @apply inline-flex items-center gap-2 border-b border-gray-300
           pb-0.5 font-sans text-[9px] tracking-[1.5px] uppercase text-gray-500
           transition-colors duration-200 hover:text-navy hover:border-navy;
  }

  /* Bouton outline */
  .btn-outline {
    @apply inline-flex items-center border border-separator text-gray-500
           px-5 py-2.5 font-sans text-[9px] tracking-[1.5px] uppercase
           transition-colors duration-200 hover:border-navy hover:text-navy;
  }

  /* Bouton CTA or (fond sombre) */
  .btn-cta {
    @apply inline-flex items-center bg-gold text-navy
           px-7 py-3 font-sans text-[9px] font-extrabold tracking-[2px] uppercase
           transition-opacity duration-200 hover:opacity-90;
  }

  /* Section padding standard */
  .section-pad {
    @apply px-8 py-16 md:px-12 lg:px-16;
  }

  /* Prose articles */
  .article-prose h2 {
    @apply font-serif text-2xl text-navy mt-10 mb-4;
  }
  .article-prose p {
    @apply font-sans text-[15px] text-gray-600 leading-[1.9] mb-5;
  }
}
```

- [ ] **Step 2: Vérifier visuellement dans le navigateur**

Ouvrir `http://localhost:3000`. Vérifier :
- Fond crème visible
- Police Inter sur le corps
- Scrollbar discrète à droite
- Texte sélectionnable (essayer de sélectionner du texte)

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: redesign global CSS — editorial styles, fix user-select and scrollbar"
```

---

## Task 3: Composants UI réutilisables

**Files:**
- Create: `src/components/ui/SectionLabel.tsx`
- Create: `src/components/ui/GoldSeparator.tsx`
- Create: `src/components/ui/FadeIn.tsx`
- Modify: `src/components/ui/Button.tsx`

- [ ] **Step 1: Créer `src/components/ui/SectionLabel.tsx`**

```tsx
import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ children, className = '' }) => (
  <p className={`label-gold ${className}`}>{children}</p>
);
```

- [ ] **Step 2: Créer `src/components/ui/GoldSeparator.tsx`**

```tsx
import React from 'react';

interface GoldSeparatorProps {
  className?: string;
}

export const GoldSeparator: React.FC<GoldSeparatorProps> = ({ className = '' }) => (
  <div className={`gold-line ${className}`} aria-hidden="true" />
);
```

- [ ] **Step 3: Créer `src/components/ui/FadeIn.tsx`**

```tsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};
```

- [ ] **Step 4: Réécrire `src/components/ui/Button.tsx`**

```tsx
import React from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'link' | 'outline' | 'cta';

interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  'aria-label'?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  href,
  to,
  onClick,
  children,
  className = '',
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
}) => {
  const variantClass: Record<ButtonVariant, string> = {
    primary: 'btn-primary',
    link: 'btn-link',
    outline: 'btn-outline',
    cta: 'btn-cta',
  };

  const cls = `${variantClass[variant]} ${className}`;

  if (to) return <Link to={to} className={cls} aria-label={ariaLabel}>{children}</Link>;
  if (href) return <a href={href} className={cls} aria-label={ariaLabel}>{children}</a>;
  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  );
};
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/SectionLabel.tsx src/components/ui/GoldSeparator.tsx \
        src/components/ui/FadeIn.tsx src/components/ui/Button.tsx
git commit -m "feat: redesign UI primitives — SectionLabel, GoldSeparator, FadeIn, Button"
```

---

## Task 4: Hook `useTabUrl`

**Files:**
- Create: `src/hooks/useTabUrl.ts`

- [ ] **Step 1: Créer `src/hooks/useTabUrl.ts`**

```ts
import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

type Tab = 'entreprises' | 'experts';

export function useTabUrl(defaultTab: Tab = 'entreprises'): [Tab, (tab: Tab) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const raw = searchParams.get('tab');
  const activeTab: Tab = raw === 'experts' ? 'experts' : defaultTab;

  const setTab = useCallback((tab: Tab) => {
    setSearchParams({ tab }, { replace: true });
  }, [setSearchParams]);

  return [activeTab, setTab];
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useTabUrl.ts
git commit -m "feat: add useTabUrl hook — persist tab state in URL query param"
```

---

## Task 5: Header

**Files:**
- Modify: `src/components/layout/Header.tsx`

- [ ] **Step 1: Réécrire `src/components/layout/Header.tsx`**

```tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Cabinet', href: '/equipe' },
  { label: 'Projets', href: '/projets' },
  { label: 'Articles', href: '/articles' },
  { label: 'Experts', href: '/experts-contact' },
];

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Fermer le menu au changement de route
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  // Bloquer le scroll body quand menu ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-separator">
        <div className="flex items-center justify-between px-8 py-4 lg:px-12">
          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo(0, 0)} aria-label="Retour à l'accueil">
            <img src="/images/opus-logo.png" alt="Opus Advisor" className="h-8 object-contain" />
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={href} to={href} className="nav-link">
                {label}
              </Link>
            ))}
            <Link to="/contact" className="btn-primary text-[9px]">
              Contact
            </Link>
          </nav>

          {/* Hamburger mobile */}
          <button
            className="md:hidden text-navy p-1"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Menu mobile plein écran */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-navy flex flex-col justify-center items-center gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                className="font-serif text-3xl text-white/80 hover:text-white transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="btn-cta mt-4"
              onClick={() => setMenuOpen(false)}
            >
              Contact →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer pour compenser le header fixed */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
};
```

- [ ] **Step 2: Vérifier visuellement**

Ouvrir `http://localhost:3000`. Vérifier :
- Logo Opus visible en haut à gauche
- Liens nav en haut à droite, "Contact" en bouton navy
- Hover sur les liens : underline or
- Mobile (< 768px) : hamburger visible, menu plein écran navy au clic

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat: redesign Header — editorial style, logo left, gold hover, accessible"
```

---

## Task 6: Footer

**Files:**
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Réécrire `src/components/layout/Footer.tsx`**

```tsx
import React from 'react';
import { Link } from 'react-router-dom';

const FOOTER_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Cabinet', href: '/equipe' },
  { label: 'Projets', href: '/projets' },
  { label: 'Articles', href: '/articles' },
  { label: 'Contact', href: '/contact' },
];

export const Footer: React.FC = () => (
  <footer className="bg-gray-900">
    {/* Ligne or en haut */}
    <div className="h-px bg-gold" />
    <div className="px-8 py-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Logo */}
      <Link to="/" aria-label="Retour à l'accueil">
        <img src="/images/opus-logo-white.png" alt="Opus Advisor" className="h-6 object-contain" />
      </Link>

      {/* Liens */}
      <nav className="flex flex-wrap justify-center gap-6" aria-label="Navigation footer">
        {FOOTER_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            to={href}
            className="font-sans text-[9px] tracking-[1.5px] uppercase text-white/30 hover:text-white/70 transition-colors duration-200"
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Copyright */}
      <p className="font-sans text-[9px] text-white/20">
        © {new Date().getFullYear()} Opus Advisor
      </p>
    </div>
  </footer>
);
```

- [ ] **Step 2: Vérifier visuellement**

Aller en bas de n'importe quelle page. Vérifier :
- Ligne or fine en haut du footer
- Logo blanc à gauche
- Liens nav au centre, blancs semi-transparents
- Copyright à droite

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: redesign Footer — gold top line, logo white, editorial nav"
```

---

## Task 7: Sections Homepage — Stats, Services, Processus, CTA

**Files:**
- Create: `src/components/home/StatsSection.tsx`
- Create: `src/components/home/ServicesSection.tsx`
- Create: `src/components/home/ProcessSection.tsx`
- Create: `src/components/home/CtaSection.tsx`

- [ ] **Step 1: Créer `src/components/home/StatsSection.tsx`**

```tsx
import React from 'react';
import { FadeIn } from '../ui/FadeIn';

const STATS = [
  { value: '10+', label: 'Projets livrés' },
  { value: '2023', label: 'Fondé' },
  { value: '100%', label: 'Sur-mesure' },
];

export const StatsSection: React.FC = () => (
  <section className="border-y border-separator">
    <div className="grid grid-cols-1 md:grid-cols-3">
      {STATS.map(({ value, label }, i) => (
        <FadeIn key={label} delay={i * 0.1}>
          <div className={`py-8 text-center ${i < STATS.length - 1 ? 'border-b md:border-b-0 md:border-r border-separator' : ''}`}>
            <p className="font-serif text-4xl text-navy mb-1">{value}</p>
            <p className="label-gold">{label}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  </section>
);
```

- [ ] **Step 2: Créer `src/components/home/ServicesSection.tsx`**

```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../ui/FadeIn';
import { SectionLabel } from '../ui/SectionLabel';

const SERVICES = [
  { num: '01', title: 'Diagnostic & Stratégie', desc: 'Cartographier votre organisation, identifier les points de friction et co-construire une feuille de route claire.' },
  { num: '02', title: 'Optimisation des Processus', desc: 'Structurer et fluidifier vos opérations pour gagner en efficacité et réduire les points de friction.' },
  { num: '03', title: 'Accompagnement Long Terme', desc: 'Un partenaire de confiance dans la durée pour ancrer les changements et soutenir votre croissance.' },
  { num: '04', title: 'Excellence Opérationnelle', desc: 'Atteindre le meilleur niveau de performance durable à travers des méthodes éprouvées et sur-mesure.' },
];

export const ServicesSection: React.FC = () => (
  <section className="bg-navy section-pad">
    <FadeIn>
      <div className="flex items-baseline justify-between mb-10">
        <div>
          <SectionLabel className="text-gold/70 mb-2">Nos expertises</SectionLabel>
          <h2 className="font-serif text-2xl text-white">Ce que nous faisons pour vous</h2>
        </div>
        <Link to="/services" className="font-sans text-[9px] tracking-[1.5px] uppercase text-white/30 border-b border-gold/40 pb-0.5 hover:text-white/70 transition-colors">
          Voir tout →
        </Link>
      </div>
    </FadeIn>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
      {SERVICES.map(({ num, title, desc }, i) => (
        <FadeIn key={num} delay={i * 0.1}>
          <div className="bg-navy p-8">
            <p className="label-gold text-gold/70 mb-3">{num}</p>
            <h3 className="font-serif text-xl text-white mb-3">{title}</h3>
            <p className="font-sans text-[11px] text-white/45 leading-relaxed">{desc}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  </section>
);
```

- [ ] **Step 3: Créer `src/components/home/ProcessSection.tsx`**

```tsx
import React from 'react';
import { FadeIn } from '../ui/FadeIn';
import { SectionLabel } from '../ui/SectionLabel';

const STEPS = [
  { num: 'Étape 01', title: 'Diagnostic', desc: "Nous analysons votre organisation en profondeur pour identifier les points bloquants et les opportunités cachées." },
  { num: 'Étape 02', title: 'Co-construction', desc: "Nous travaillons avec vos équipes pour concevoir des solutions adaptées à votre réalité terrain." },
  { num: 'Étape 03', title: 'Déploiement', desc: "Nous accompagnons la mise en œuvre et assurons l'ancrage des nouvelles pratiques dans la durée." },
];

export const ProcessSection: React.FC = () => (
  <section className="bg-creamDark section-pad">
    <FadeIn>
      <SectionLabel className="mb-2">Notre approche</SectionLabel>
      <h2 className="font-serif text-3xl text-navy mb-12">Un processus en 3 étapes claires</h2>
    </FadeIn>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
      {STEPS.map(({ num, title, desc }, i) => (
        <FadeIn key={num} delay={i * 0.1}>
          <div className={`${i < STEPS.length - 1 ? 'border-b md:border-b-0 md:border-r border-separator' : ''} ${i > 0 ? 'pt-10 md:pt-0 md:pl-10' : ''} pb-10 md:pb-0 ${i < STEPS.length - 1 ? 'md:pr-10' : ''}`}>
            <p className="label-gold mb-3">{num}</p>
            <h3 className="font-serif text-xl text-navy mb-3">{title}</h3>
            <p className="font-sans text-[12px] text-gray-500 leading-relaxed">{desc}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  </section>
);
```

- [ ] **Step 4: Créer `src/components/home/CtaSection.tsx`**

```tsx
import React from 'react';
import { FadeIn } from '../ui/FadeIn';
import { SectionLabel } from '../ui/SectionLabel';
import { Button } from '../ui/Button';

export const CtaSection: React.FC = () => (
  <section className="bg-navy section-pad text-center">
    <FadeIn>
      <SectionLabel className="text-gold/70 mb-3">Passons à l'action</SectionLabel>
      <h2 className="font-serif text-4xl text-white mb-4 leading-tight">
        Prêt à structurer<br />votre organisation ?
      </h2>
      <p className="font-sans text-[12px] text-white/45 max-w-md mx-auto mb-10 leading-relaxed">
        Échangeons sur votre situation. Un premier appel de 30 minutes suffit à identifier ensemble les priorités.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button variant="cta" to="/contact">Prendre rendez-vous →</Button>
        <Button variant="outline" to="/contact" className="border-white/20 text-white/60 hover:border-white/60 hover:text-white">
          Nous écrire
        </Button>
      </div>
    </FadeIn>
  </section>
);
```

- [ ] **Step 5: Commit**

```bash
git add src/components/home/StatsSection.tsx src/components/home/ServicesSection.tsx \
        src/components/home/ProcessSection.tsx src/components/home/CtaSection.tsx
git commit -m "feat: add homepage section components — Stats, Services, Process, CTA"
```

---

## Task 8: Homepage Hero + Page Home

**Files:**
- Modify: `src/components/home/HeroBanner.tsx`
- Modify: `src/components/home/ArticlesSection.tsx`
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Réécrire `src/components/home/HeroBanner.tsx`**

```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { GoldSeparator } from '../ui/GoldSeparator';
import { SectionLabel } from '../ui/SectionLabel';
import { Button } from '../ui/Button';
import { useTabUrl } from '../../hooks/useTabUrl';
import { TabEntreprise } from './tabEntreprise/TabEntreprise';
import { TabFreelance } from './tabFreelance/TabFreelance';

export const HeroBanner: React.FC = () => {
  const [activeTab, setTab] = useTabUrl('entreprises');

  return (
    <section className="border-b border-separator">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
        {/* Colonne gauche : tagline + CTAs */}
        <div className="section-pad border-b lg:border-b-0 lg:border-r border-separator">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionLabel className="mb-4">Cabinet de conseil opérationnel · Paris</SectionLabel>
            <GoldSeparator className="mb-6" />
            <h1 className="font-serif text-5xl lg:text-6xl text-navy leading-[1.05] mb-6">
              Donnez à votre Ambition<br />
              <em className="not-italic text-gold">la Structure qu'elle mérite.</em>
            </h1>
            <p className="font-sans text-[13px] text-gray-500 leading-[1.85] max-w-md mb-8">
              Nous accompagnons les dirigeants et leurs équipes pour structurer, clarifier et optimiser leur organisation — vers une croissance maîtrisée et durable.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary" to="/contact">Nous contacter</Button>
              <Button variant="link" to="/services">
                Découvrir nos expertises <span className="text-gold ml-1">→</span>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Colonne droite : onglets Entreprises / Experts */}
        <div className="section-pad">
          {/* Onglets */}
          <div className="flex mb-6" role="tablist" aria-label="Sélection audience">
            {(['entreprises', 'experts'] as const).map(tab => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setTab(tab)}
                className={`px-5 py-2.5 font-sans text-[9px] font-bold tracking-[2px] uppercase transition-colors duration-200 ${
                  activeTab === tab
                    ? 'bg-navy text-white'
                    : 'border border-separator text-gray-400 border-l-0 first:border-l hover:text-navy'
                }`}
              >
                {tab === 'entreprises' ? 'Entreprises' : 'Experts'}
              </button>
            ))}
          </div>

          {/* Contenu de l'onglet */}
          <div role="tabpanel" aria-label={activeTab === 'entreprises' ? 'Contenu Entreprises' : 'Contenu Experts'}>
            {activeTab === 'entreprises' ? <TabEntreprise /> : <TabFreelance />}
          </div>
        </div>
      </div>
    </section>
  );
};
```

> **Note :** `TabEntreprise` et `TabFreelance` sont les composants existants dans `src/components/home/tabEntreprise/` et `src/components/home/tabFreelance/`. Leurs imports sont à adapter selon leur export réel. Le contenu textuel de ces composants est conservé tel quel — seul le wrapper Hero change.

- [ ] **Step 2: Adapter `src/components/home/ArticlesSection.tsx` au style éditorial**

Identifier les props reçues par `ArticlesSection` (articles, lien vers tous les articles), puis réécrire le rendu avec le style éditorial. Conserver toute la logique de données existante, remplacer uniquement le JSX :

```tsx
// Dans ArticlesSection, remplacer le rendu des cards par :
// — border-top 2px gold pour le premier article, separator pour les autres
// — label catégorie + titre serif + temps de lecture
// Exemple de card :
<div className={`border-t-2 pt-4 ${i === 0 ? 'border-gold' : 'border-separator'}`}>
  <p className="label-gold mb-2">{article.category}</p>
  <h3 className="font-serif text-lg text-navy leading-snug mb-2">{article.title}</h3>
  <p className="font-sans text-[10px] text-gray-400">{article.readTime} de lecture</p>
</div>
```

- [ ] **Step 3: Réécrire `src/pages/Home.tsx`**

```tsx
import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { HeroBanner } from '../components/home/HeroBanner';
import { StatsSection } from '../components/home/StatsSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { ProcessSection } from '../components/home/ProcessSection';
import { ArticlesSection } from '../components/home/ArticlesSection';
import { CtaSection } from '../components/home/CtaSection';
import { SEO } from '../components/SEO';

export const Home: React.FC = () => (
  <>
    <SEO
      title="Opus Advisor — Cabinet de conseil opérationnel"
      description="Nous accompagnons les dirigeants pour structurer, clarifier et optimiser leur organisation vers une croissance maîtrisée."
    />
    <Header />
    <main>
      <HeroBanner />
      <StatsSection />
      <ServicesSection />
      <ProcessSection />
      <ArticlesSection />
      <CtaSection />
    </main>
    <Footer />
  </>
);
```

- [ ] **Step 4: Vérifier visuellement**

Ouvrir `http://localhost:3000`. Vérifier :
- Hero 2 colonnes (empilées sur mobile)
- Onglets Entreprises/Experts fonctionnels et reflétés dans l'URL (`?tab=experts`)
- Sections Stats, Services dark, Processus, Articles, CTA visibles en défilant
- Animations fade-in au scroll

- [ ] **Step 5: Commit**

```bash
git add src/components/home/HeroBanner.tsx src/components/home/ArticlesSection.tsx src/pages/Home.tsx
git commit -m "feat: redesign Homepage — editorial hero, tab URL state, sections assembly"
```

---

## Task 9: Page Services

**Files:**
- Modify: `src/pages/Services.tsx`

- [ ] **Step 1: Réécrire `src/pages/Services.tsx`**

Lire le fichier existant pour récupérer le contenu textuel exact (descriptions, listes de livrables), puis réécrire avec le layout suivant :

```tsx
import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SectionLabel } from '../components/ui/SectionLabel';
import { GoldSeparator } from '../components/ui/GoldSeparator';
import { FadeIn } from '../components/ui/FadeIn';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/SEO';

// Reprendre le contenu exact du fichier existant
const SERVICES = [
  { num: '01', title: 'Diagnostic & Stratégie', desc: '...texte original...', deliverables: ['...', '...'] },
  { num: '02', title: 'Optimisation des Processus', desc: '...texte original...', deliverables: ['...', '...'] },
  { num: '03', title: 'Accompagnement Long Terme', desc: '...texte original...', deliverables: ['...', '...'] },
  { num: '04', title: 'Excellence Opérationnelle', desc: '...texte original...', deliverables: ['...', '...'] },
];

export const Services: React.FC = () => (
  <>
    <SEO title="Expertises — Opus Advisor" description="Diagnostic, optimisation et accompagnement opérationnel sur-mesure." />
    <Header />
    <main>
      {/* Header page */}
      <section className="section-pad border-b border-separator">
        <FadeIn>
          <SectionLabel className="mb-3">Nos expertises</SectionLabel>
          <GoldSeparator className="mb-6" />
          <h1 className="font-serif text-5xl text-navy leading-tight max-w-2xl">
            Un accompagnement complet, du diagnostic à l'exécution.
          </h1>
        </FadeIn>
      </section>

      {/* Sections alternées */}
      {SERVICES.map(({ num, title, desc, deliverables }, i) => (
        <FadeIn key={num}>
          <section className={`section-pad border-b border-separator ${i % 2 === 1 ? 'bg-creamDark' : 'bg-cream'}`}>
            <div className="max-w-3xl">
              <p className="label-gold mb-3">{num}</p>
              <h2 className="font-serif text-3xl text-navy mb-4">{title}</h2>
              <p className="font-sans text-[13px] text-gray-500 leading-relaxed mb-6">{desc}</p>
              <ul className="flex flex-col gap-2">
                {deliverables.map(d => (
                  <li key={d} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" aria-hidden="true" />
                    <span className="font-sans text-[12px] text-gray-600">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </FadeIn>
      ))}

      {/* CTA */}
      <section className="bg-navy section-pad text-center">
        <FadeIn>
          <h2 className="font-serif text-3xl text-white mb-4">Parlons de votre projet</h2>
          <p className="font-sans text-[12px] text-white/45 max-w-sm mx-auto mb-8 leading-relaxed">
            Un premier échange de 30 minutes pour évaluer ensemble comment nous pouvons vous aider.
          </p>
          <Button variant="cta" to="/contact">Prendre rendez-vous →</Button>
        </FadeIn>
      </section>
    </main>
    <Footer />
  </>
);
```

- [ ] **Step 2: Vérifier que tout le contenu original est présent**

Comparer avec l'ancienne page : tous les titres, descriptions et livrables doivent être identiques.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Services.tsx
git commit -m "feat: redesign Services page — alternating sections, editorial layout"
```

---

## Task 10: Page Cabinet (Team)

**Files:**
- Modify: `src/pages/Team.tsx`

- [ ] **Step 1: Lire le fichier existant**

```bash
cat src/pages/Team.tsx
```
Relever : texte de présentation du cabinet, membres de l'équipe (nom, rôle, bio), valeurs.

- [ ] **Step 2: Réécrire avec le layout éditorial**

```tsx
import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SectionLabel } from '../components/ui/SectionLabel';
import { GoldSeparator } from '../components/ui/GoldSeparator';
import { FadeIn } from '../components/ui/FadeIn';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/SEO';

// Reprendre le contenu exact du fichier existant
export const Team: React.FC = () => (
  <>
    <SEO title="Le Cabinet — Opus Advisor" description="Découvrez l'équipe Opus Advisor." />
    <Header />
    <main>
      {/* Intro */}
      <section className="section-pad border-b border-separator">
        <FadeIn>
          <SectionLabel className="mb-3">Le Cabinet</SectionLabel>
          <GoldSeparator className="mb-6" />
          <h1 className="font-serif text-5xl text-navy leading-tight max-w-2xl mb-6">
            {/* Titre original */}
          </h1>
          <p className="font-sans text-[13px] text-gray-500 leading-relaxed max-w-xl">
            {/* Description originale */}
          </p>
        </FadeIn>
      </section>

      {/* Équipe */}
      <section className="section-pad border-b border-separator bg-creamDark">
        <FadeIn>
          <SectionLabel className="mb-8">L'équipe</SectionLabel>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Pour chaque membre : */}
          {/* <FadeIn delay={i * 0.1}>
            <div className="border-t-2 border-gold pt-4">
              <div className="w-16 h-16 rounded-full bg-separator mb-4 overflow-hidden">
                {photo ? <img src={photo} alt={name} className="w-full h-full object-cover" /> :
                  <span className="flex items-center justify-center h-full font-serif text-xl text-navy">{initials}</span>}
              </div>
              <p className="label-gold mb-1">{role}</p>
              <h3 className="font-serif text-xl text-navy mb-2">{name}</h3>
              <p className="font-sans text-[11px] text-gray-500 leading-relaxed">{bio}</p>
            </div>
          </FadeIn> */}
        </div>
      </section>

      {/* Valeurs */}
      <section className="section-pad border-b border-separator">
        <FadeIn>
          <SectionLabel className="mb-8">Nos valeurs</SectionLabel>
        </FadeIn>
        {/* Grid de valeurs avec le même pattern : label or + titre serif + description */}
      </section>

      {/* CTA */}
      <section className="bg-navy section-pad text-center">
        <FadeIn>
          <h2 className="font-serif text-3xl text-white mb-6">Travaillons ensemble</h2>
          <Button variant="cta" to="/contact">Prendre rendez-vous →</Button>
        </FadeIn>
      </section>
    </main>
    <Footer />
  </>
);
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/Team.tsx
git commit -m "feat: redesign Team page — editorial grid, gold borders"
```

---

## Task 11: Page Projets

**Files:**
- Modify: `src/pages/Projects.tsx`

- [ ] **Step 1: Lire le fichier existant**

```bash
cat src/pages/Projects.tsx
```
Relever les projets existants (titre, catégorie, description, éventuellement image).

- [ ] **Step 2: Réécrire**

```tsx
import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SectionLabel } from '../components/ui/SectionLabel';
import { GoldSeparator } from '../components/ui/GoldSeparator';
import { FadeIn } from '../components/ui/FadeIn';
import { SEO } from '../components/SEO';

export const Projects: React.FC = () => (
  <>
    <SEO title="Projets — Opus Advisor" description="Nos réalisations et cas clients." />
    <Header />
    <main>
      {/* Header page */}
      <section className="section-pad border-b border-separator">
        <FadeIn>
          <SectionLabel className="mb-3">Nos projets</SectionLabel>
          <GoldSeparator className="mb-6" />
          <h1 className="font-serif text-5xl text-navy leading-tight">Réalisations & cas clients</h1>
        </FadeIn>
      </section>

      {/* Grille projets */}
      <section className="section-pad">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pour chaque projet : */}
          {/* <FadeIn delay={i * 0.1}>
            <div className="group border-t-2 border-separator pt-4 hover:border-gold transition-colors duration-300">
              <p className="label-gold mb-2">{category}</p>
              <h3 className="font-serif text-xl text-navy mb-2">{title}</h3>
              <p className="font-sans text-[12px] text-gray-500 leading-relaxed">{description}</p>
            </div>
          </FadeIn> */}
        </div>
      </section>
    </main>
    <Footer />
  </>
);
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/Projects.tsx
git commit -m "feat: redesign Projects page — editorial grid with gold hover"
```

---

## Task 12: Page Articles + Article détail

**Files:**
- Modify: `src/pages/ArticlesPage.tsx`
- Modify: `src/pages/ArticlePage.tsx`

- [ ] **Step 1: Lire les deux fichiers existants**

```bash
cat src/pages/ArticlesPage.tsx
cat src/pages/ArticlePage.tsx
```
Relever : structure des données d'articles (slug, titre, catégorie, extrait, date, temps de lecture), logique de rendu Markdown.

- [ ] **Step 2: Réécrire `src/pages/ArticlesPage.tsx`**

```tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SectionLabel } from '../components/ui/SectionLabel';
import { GoldSeparator } from '../components/ui/GoldSeparator';
import { FadeIn } from '../components/ui/FadeIn';
import { SEO } from '../components/SEO';
// Conserver l'import des articles existant (données)

export const ArticlesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  // Conserver toute la logique de filtrage existante

  return (
    <>
      <SEO title="Articles — Opus Advisor" description="Insights et ressources sur l'organisation et la croissance." />
      <Header />
      <main>
        {/* Header page */}
        <section className="section-pad border-b border-separator">
          <FadeIn>
            <SectionLabel className="mb-3">Ressources</SectionLabel>
            <GoldSeparator className="mb-6" />
            <h1 className="font-serif text-5xl text-navy leading-tight">Articles & Insights</h1>
          </FadeIn>
        </section>

        {/* Filtres catégories */}
        <section className="px-8 py-4 lg:px-12 border-b border-separator flex gap-4 flex-wrap">
          {/* Pour chaque catégorie unique : */}
          {/* <button
            onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
            className={`font-sans text-[9px] tracking-[2px] uppercase px-3 py-1.5 transition-colors ${
              activeCategory === cat ? 'bg-navy text-white' : 'border border-separator text-gray-400 hover:text-navy'
            }`}
          >{cat}</button> */}
        </section>

        {/* Liste éditoriale */}
        <section className="section-pad">
          <div className="divide-y divide-separator">
            {/* Pour chaque article filtré : */}
            {/* <FadeIn delay={i * 0.05}>
              <Link to={`/article/${article.slug}`} className="group flex items-start gap-8 py-8 hover:opacity-70 transition-opacity">
                <div className="flex-1">
                  <p className="label-gold mb-2">{article.category}</p>
                  <h2 className="font-serif text-2xl text-navy leading-snug mb-2 group-hover:text-gold transition-colors">{article.title}</h2>
                  <p className="font-sans text-[12px] text-gray-500 leading-relaxed mb-3">{article.excerpt}</p>
                  <p className="font-sans text-[10px] text-gray-400">{article.date} · {article.readTime} de lecture</p>
                </div>
              </Link>
            </FadeIn> */}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
```

- [ ] **Step 3: Réécrire `src/pages/ArticlePage.tsx`**

Conserver la logique de rendu Markdown existante, adapter uniquement le layout :

```tsx
// Layout éditorial :
// — Max-width 680px pour le body
// — TableOfContents sticky à droite (existant dans src/components/ui/TableOfContents.tsx)
// — H1 serif 48px, chapeau Inter 16px gris
// — Articles liés en bas

// Structure JSX :
<main className="section-pad">
  <div className="max-w-5xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12">
      {/* Corps article */}
      <article>
        <p className="label-gold mb-4">{article.category}</p>
        <h1 className="font-serif text-5xl text-navy leading-tight mb-6">{article.title}</h1>
        <p className="font-sans text-base text-gray-500 leading-relaxed mb-8">{article.excerpt}</p>
        <div className="h-px bg-separator mb-8" />
        {/* Rendu Markdown existant avec className="article-prose" */}
        <div className="article-prose">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </article>
      {/* Table des matières sticky */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <p className="label-gold mb-4">Sommaire</p>
          <TableOfContents /> {/* composant existant */}
        </div>
      </aside>
    </div>
    {/* Articles liés */}
    <RelatedArticles /> {/* composant existant */}
  </div>
</main>
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/ArticlesPage.tsx src/pages/ArticlePage.tsx
git commit -m "feat: redesign Articles pages — editorial list, sticky ToC, category filters"
```

---

## Task 13: Pages Contact + ExpertContact

**Files:**
- Modify: `src/pages/Contact.tsx`
- Modify: `src/pages/ExpertContact.tsx`

- [ ] **Step 1: Lire les fichiers existants**

```bash
cat src/pages/Contact.tsx
cat src/pages/ExpertContact.tsx
```
Relever : champs du formulaire, logique EmailJS (serviceId, templateId, publicKey), texte des labels, sélection de service.

- [ ] **Step 2: Réécrire `src/pages/Contact.tsx`**

Conserver toute la logique EmailJS. Réécrire uniquement le JSX :

```tsx
// Layout split : info gauche (bg-creamDark) + formulaire droite (bg-white)
// Validation en temps réel sur onBlur de chaque champ

// Structure des inputs : border-bottom uniquement
// className="w-full border-b border-separator bg-transparent py-3 font-sans text-[13px] text-navy
//            placeholder-gray-400 focus:outline-none focus:border-navy transition-colors"

// Validation temps réel : état d'erreur par champ
// const [errors, setErrors] = useState<Record<string, string>>({});
// const validate = (name: string, value: string) => {
//   if (!value.trim()) return 'Ce champ est requis';
//   if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) return 'Email invalide';
//   return '';
// };
// const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//   const { name, value } = e.target;
//   setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
// };

// Message succès : inline, sans auto-dismiss
// {submitted && (
//   <div className="border-t-2 border-gold pt-4 mt-6">
//     <p className="font-sans text-[12px] text-navy">
//       Votre message a bien été envoyé. Nous vous répondons sous 48h.
//     </p>
//   </div>
// )}
```

- [ ] **Step 3: Réécrire `src/pages/ExpertContact.tsx`**

Même structure que Contact mais avec les champs spécifiques aux experts (existants dans le fichier original). Conserver la logique EmailJS.

- [ ] **Step 4: Vérifier le formulaire**

- Remplir un champ et le quitter vide → message d'erreur immédiat
- Soumettre le formulaire → message de succès inline
- Vérifier que l'email arrive bien (tester avec une vraie adresse)

- [ ] **Step 5: Commit**

```bash
git add src/pages/Contact.tsx src/pages/ExpertContact.tsx
git commit -m "feat: redesign Contact pages — split layout, real-time validation, no auto-dismiss"
```

---

## Task 14: App.tsx — Code splitting + transitions de page

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Réécrire `src/App.tsx`**

```tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { SEO } from './components/SEO';

// Lazy loading de chaque page
const Home          = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Team          = lazy(() => import('./pages/Team').then(m => ({ default: m.Team })));
const Projects      = lazy(() => import('./pages/Projects').then(m => ({ default: m.Projects })));
const Contact       = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Services      = lazy(() => import('./pages/Services').then(m => ({ default: m.Services })));
const ArticlePage   = lazy(() => import('./pages/ArticlePage').then(m => ({ default: m.ArticlePage })));
const ExpertContact = lazy(() => import('./pages/ExpertContact').then(m => ({ default: m.ExpertContact })));
const ArticlesPage  = lazy(() => import('./pages/ArticlesPage').then(m => ({ default: m.ArticlesPage })));

// Wrapper fade entre pages
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"                element={<PageTransition><Home /></PageTransition>} />
        <Route path="/equipe"          element={<PageTransition><Team /></PageTransition>} />
        <Route path="/projets"         element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/services"        element={<PageTransition><Services /></PageTransition>} />
        <Route path="/contact"         element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/articles"        element={<PageTransition><ArticlesPage /></PageTransition>} />
        <Route path="/article/:slug"   element={<PageTransition><ArticlePage /></PageTransition>} />
        <Route path="/experts-contact" element={<PageTransition><ExpertContact /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <SEO />
        <Suspense fallback={<div className="min-h-screen bg-cream" />}>
          <AnimatedRoutes />
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}
```

- [ ] **Step 2: Vérifier les transitions**

Naviguer entre plusieurs pages : un fade doux doit apparaître entre chaque page.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add lazy loading + page fade transitions in App.tsx"
```

---

## Task 15: QA final — Accessibilité + Responsive

- [ ] **Step 1: Vérifier l'accessibilité**

Dans Chrome DevTools > Accessibility Tree, vérifier :
- `<header>` a `role="banner"` (implicite avec `<header>`)
- `<nav>` a `aria-label`
- `<main>` présent sur chaque page
- Les boutons sans texte ont `aria-label`
- Les onglets ont `role="tab"` + `aria-selected`
- Les images ont `alt` renseigné

- [ ] **Step 2: Vérifier le responsive sur 3 breakpoints**

Redimensionner la fenêtre du navigateur à :
- **375px** (mobile) : hero en 1 colonne, menu hamburger, stats empilés
- **768px** (tablet) : grille 2 colonnes si prévu, menu desktop visible
- **1280px** (desktop) : hero 2 colonnes, ToC visible

- [ ] **Step 3: Vérifier prefers-reduced-motion**

Dans Chrome DevTools > Rendering > Emulate CSS media feature `prefers-reduced-motion: reduce`. Vérifier qu'aucune animation ne se déclenche.

- [ ] **Step 4: Build de production**

```bash
npm run build
```
Attendu : build réussi sans erreur ni warning TypeScript.

- [ ] **Step 5: Commit final**

```bash
git add -A
git commit -m "feat: complete Opus Advisor UI/UX redesign — editorial luxe direction"
```

---

## Résumé des commits attendus

1. `feat: update design tokens — Cormorant Garamond serif + cream palette`
2. `feat: redesign global CSS — editorial styles, fix user-select and scrollbar`
3. `feat: redesign UI primitives — SectionLabel, GoldSeparator, FadeIn, Button`
4. `feat: add useTabUrl hook — persist tab state in URL query param`
5. `feat: redesign Header — editorial style, logo left, gold hover, accessible`
6. `feat: redesign Footer — gold top line, logo white, editorial nav`
7. `feat: add homepage section components — Stats, Services, Process, CTA`
8. `feat: redesign Homepage — editorial hero, tab URL state, sections assembly`
9. `feat: redesign Services page — alternating sections, editorial layout`
10. `feat: redesign Team page — editorial grid, gold borders`
11. `feat: redesign Projects page — editorial grid with gold hover`
12. `feat: redesign Articles pages — editorial list, sticky ToC, category filters`
13. `feat: redesign Contact pages — split layout, real-time validation, no auto-dismiss`
14. `feat: add lazy loading + page fade transitions in App.tsx`
15. `feat: complete Opus Advisor UI/UX redesign — editorial luxe direction`
