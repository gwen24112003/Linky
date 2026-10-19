'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';

/**
 * Compte les clics qui comptent pour l'activité, sur tout le site, sans toucher à chaque bouton :
 * demandes de pré-audit, prise de rendez-vous, téléphone et e-mail.
 */
export function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute('href') ?? '';
      const data = {
        page: window.location.pathname,
        lien: (link.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 60),
      };

      if (href.startsWith('/contact')) track('Clic pré-audit', data);
      else if (href.includes('cal.com/')) track('Clic prise de rendez-vous', data);
      else if (href.startsWith('tel:')) track('Clic téléphone', data);
      else if (href.startsWith('mailto:')) track('Clic e-mail', data);
    };

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
