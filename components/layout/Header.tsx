'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import type { NavLink } from '@/types';

const NAVY = '#1A2332';
const GOLD = '#C9A84C';

// "Contact" n'est plus un lien : c'est le bouton de réservation, toujours visible.
const navLinks: NavLink[] = [
  { label: 'Services', href: '/services' },
  { label: 'Secteurs', href: '/secteurs' },
  { label: 'Cas clients', href: '/cas-clients' },
  { label: 'Articles', href: '/articles' },
  { label: 'Outils', href: '/outils' },
  { label: 'Équipe', href: '/equipe' },
];

const mobileLinks: NavLink[] = [{ label: 'Accueil', href: '/' }, ...navLinks];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Ferme le menu lors d'un changement de route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Empêche le scroll du body quand le menu est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavClick = () => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  const isActive = (href: string) => {
    const currentPath = pathname ?? '/';
    const normalized =
      currentPath.endsWith('/') && currentPath !== '/' ? currentPath.slice(0, -1) : currentPath;
    return normalized === href || (href !== '/' && normalized.startsWith(href));
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <nav className="container mx-auto px-6 py-1 md:py-1.5">
          <div className="relative flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center z-10"
              aria-label="Retour à l'accueil"
              onClick={() => window.scrollTo(0, 0)}
            >
              <img
                src="/images/opus-logo-header.webp"
                alt="Logo Opus Advisor"
                width={240}
                height={48}
                className="h-10 w-[185px] md:h-12 md:w-[240px] object-cover object-center"
              />
            </Link>

            {/* Navigation ordinateur + bouton de réservation (en dessous de 1280 px : menu burger) */}
            <div className="hidden xl:flex items-center gap-8">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <div key={link.label} className="relative">
                    <Link
                      href={link.href}
                      onClick={handleNavClick}
                      className={`whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                        active ? 'text-[#1A2332]' : 'text-[#5b6472] hover:text-[#1A2332]'
                      }`}
                    >
                      {link.label}
                    </Link>
                    {active && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-1.5 left-0 right-0 h-0.5"
                        style={{ background: GOLD }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </div>
                );
              })}
              <Link
                href="/contact"
                onClick={handleNavClick}
                className="inline-flex items-center whitespace-nowrap px-5 py-2.5 rounded-md text-sm font-semibold bg-[#1A2332] text-[#FAF7F0] hover:bg-[#26334a] transition-colors"
              >
                Pré-audit gratuit
              </Link>
            </div>

            {/* Burger button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="xl:hidden transition-colors z-[60] text-gray-700"
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Overlay plein écran */}
      <div
        className={`fixed inset-0 z-[55] flex flex-col xl:hidden transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: NAVY }}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        <div className="flex flex-col items-center justify-center flex-1 gap-9 px-8">
          {mobileLinks.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={handleNavClick}
              className={`text-4xl font-bold text-white/80 hover:text-white transition-all duration-300 hover:scale-105 ${
                isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 80 + 100}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={handleNavClick}
            className={`mt-4 inline-flex items-center px-7 py-4 rounded-lg text-lg font-semibold transition-all duration-300 ${
              isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ background: GOLD, color: NAVY, transitionDelay: `${mobileLinks.length * 80 + 100}ms` }}
          >
            Réserver le pré-audit gratuit
          </Link>
        </div>

        <div className="pb-12 flex justify-center">
          <img
            src="/images/opus-icon.png"
            alt="Logo Opus Advisor"
            width={64}
            height={64}
            loading="lazy"
            className="h-16 w-16 object-contain opacity-30"
          />
        </div>
      </div>
    </>
  );
};
