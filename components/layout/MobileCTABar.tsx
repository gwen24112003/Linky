'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAVY = '#1A2332';
const GOLD = '#C9A84C';

/**
 * Barre de réservation fixée en bas de l'écran, sur mobile et tablette uniquement.
 * Elle apparaît une fois le haut de page dépassé (il a déjà ses propres boutons)
 * et n'est pas affichée sur /contact, où elle ferait doublon.
 */
export const MobileCTABar: React.FC = () => {
  const pathname = usePathname() ?? '/';
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (pathname.startsWith('/contact')) return null;

  return (
    <div
      className={`xl:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ background: NAVY, paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-hidden={!visible}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-3">
        <p className="text-xs leading-snug text-white/75">
          Pré-audit de 30 min
          <br />
          gratuit, sans engagement
        </p>
        <Link
          href="/contact"
          tabIndex={visible ? 0 : -1}
          className="shrink-0 px-5 py-2.5 rounded-md text-sm font-semibold"
          style={{ background: GOLD, color: NAVY }}
        >
          Réserver
        </Link>
      </div>
    </div>
  );
};
