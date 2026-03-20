import React from 'react';
import { Instagram, Linkedin, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';
import { FooterSection } from '../../types';

// Composant personnalisé pour l'icône X (Twitter)
const XIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Footer: React.FC = () => {
  const footerSections: FooterSection[] = [
    {
      title: 'Nos services',
      links: [
        { label: 'Diagnostic & Architecture', href: '/services#creation' },
        { label: 'Optimisation des Processus', href: '/services#automatisation' },
        { label: 'Accompagnement', href: '/services#maintenance' }
      ]
    },
    {
      title: 'En savoir plus',
      links: [
        { label: 'Notre équipe', href: '/equipe' },
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact', href: '/contact' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/linky4u_app/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/enzo-monnier-7524ab205/', label: 'LinkedIn' },
    { icon: XIcon, href: 'https://x.com/linky4u_app', label: 'X' },
    { icon: Youtube, href: 'https://www.youtube.com', label: 'YouTube' }
  ];

  return (
    <footer>
      <div className="w-[95%] mx-auto bg-gray-900 text-white rounded-t-3xl pt-24 pb-12 px-6 md:px-12 relative overflow-hidden">

        {/* Ligne gradient teal en haut */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, #0d9488, #2dd4bf, #0d9488, transparent)',
          }}
        />

        {/* Lueur ambiante teal en fond */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(13,148,136,0.12) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />

        <div className="flex flex-col items-center text-center max-w-7xl mx-auto gap-16 relative z-10">

          {/* Logo flottant */}
          <div className="flex justify-center">
            <img
              src="/images/logo-blanc.png"
              alt="Logo Linky - Solutions no-code et automatisation"
              className="h-16 md:h-20 lg:h-24 object-contain"
              style={{ animation: 'float 6s ease-in-out infinite' }}
            />
          </div>

          {/* Footer Sections */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 justify-center">
            {footerSections.map((section) => (
              <div key={section.title} className="w-full md:w-auto text-left">
                <h4 className="font-semibold mb-6 text-white text-3xl md:text-4xl lg:text-5xl font-lexend whitespace-nowrap">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-xl md:text-2xl lg:text-2xl font-meera whitespace-nowrap inline-block"
                        aria-label={`Aller à ${link.label}`}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Réseaux sociaux */}
          <div className="flex gap-8 justify-center">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-teal-400 hover:bg-gray-700 transition-colors duration-200"
                whileHover={{
                  scale: 1.15,
                  boxShadow: '0 0 22px rgba(13,148,136,0.55)',
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon size={32} />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="w-full border-t border-gray-800 pt-8">
            <p className="text-gray-600 text-sm text-center">
              © {new Date().getFullYear()} Linky4U. Tous droits réservés.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};
