'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Linkedin, Youtube } from 'lucide-react';
import type { FooterSection } from '@/types';

const GOLD = '#C9A84C';
const FOOTER_BG = '#11161F';

// Icône X (Twitter)
const XIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Footer: React.FC = () => {
  const footerSections: FooterSection[] = [
    {
      title: 'Nos services',
      links: [
        { label: 'Pré-audit gratuit', href: '/services' },
        { label: 'Audit Stack', href: '/services#audit-stack' },
        { label: 'Diagnostic', href: '/services' },
        { label: 'Mise en œuvre', href: '/services' },
        { label: 'Gardien du système', href: '/services' },
        { label: 'Opus Pilotes', href: '/cas-clients' },
      ],
    },
    {
      title: 'Navigation',
      links: [
        { label: 'Cas clients', href: '/cas-clients' },
        { label: 'Articles', href: '/articles' },
        { label: 'Équipe', href: '/equipe' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/opusadvisor/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/enzo-monnier/', label: 'LinkedIn' },
    { icon: XIcon, href: 'https://x.com/opusadvisor', label: 'X' },
    { icon: Youtube, href: 'https://www.youtube.com', label: 'YouTube' },
  ];

  return (
    <footer
      className="text-white"
      style={{ background: FOOTER_BG, borderTop: '1px solid rgba(255,255,255,0.10)' }}
    >
      <div className="container mx-auto px-6 max-w-6xl py-16 md:py-20">
        {/* Haut : marque (gauche) + colonnes de liens (droite) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pb-12 border-b border-white/10">
          <div className="md:col-span-5">
            <img
              src="/images/opus-logo-white.png"
              alt="Opus Advisor"
              className="h-11 md:h-12 object-contain"
            />
            <p className="mt-5 text-sm md:text-[15px] text-white/55 leading-relaxed max-w-xs">
              Consultant ops pour les patrons du BTP second œuvre. On rend 10 h par semaine à votre
              entreprise.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="text-xs font-semibold uppercase tracking-[0.22em] mb-5" style={{ color: GOLD }}>
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm md:text-[15px] text-white/60 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bas : copyright + réseaux */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-xs md:text-sm text-white/40">
            © {new Date().getFullYear()} Opus Advisor · Consultant ops BTP second œuvre ·{' '}
            <Link href="/mentions-legales" className="hover:text-white transition-colors duration-200">
              Mentions légales
            </Link>
          </p>
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-white/45 hover:text-[#C9A84C] transition-colors duration-200"
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
