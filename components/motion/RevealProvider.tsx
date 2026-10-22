'use client';

import { useEffect } from 'react';

/**
 * Fait apparaître en douceur les éléments [data-reveal] quand ils entrent à l'écran.
 *
 * Sûreté d'abord : un élément n'est masqué (classe reveal-armed) qu'au moment où il est confié à
 * l'observateur, et seulement s'il est hors de l'écran. Ce qui est déjà visible le reste, et un
 * élément que le script ne verrait pas n'est jamais masqué. Les pages ouvertes par navigation
 * interne sont prises en charge à leur insertion dans le DOM (MutationObserver).
 */
export function RevealProvider() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window) || !('MutationObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );

    const arm = (el: HTMLElement) => {
      if (el.dataset.revealSeen) return;
      el.dataset.revealSeen = '1';
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.95) return; // déjà à l'écran : on n'y touche pas
      el.classList.add('reveal-armed');
      io.observe(el);
    };
    const scan = (root: ParentNode) => root.querySelectorAll<HTMLElement>('[data-reveal]').forEach(arm);

    scan(document);
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) =>
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches('[data-reveal]')) arm(node);
          scan(node);
        }),
      );
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
