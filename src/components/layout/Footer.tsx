import React from 'react';
import { Instagram, Linkedin, Youtube } from 'lucide-react';
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
        // { label: 'Nos projets', href: '/projets' }
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
      <div className="w-[95%] mx-auto bg-gray-900 text-white rounded-t-2xl sm:rounded-t-3xl py-10 sm:py-14 lg:py-16 px-4 sm:px-6 pb-24 sm:pb-32">
        <div className="flex flex-col items-center text-center max-w-7xl mx-auto gap-10 sm:gap-14">
          {/* Logo Linky centre en haut */}
          <div className="flex justify-center">
            <img
              src="/images/logo-blanc.png"
              alt="Logo Linky - Solutions no-code et automatisation"
              className="h-12 sm:h-16 md:h-20 object-contain"
            />
          </div>

          {/* Footer Sections - 3 colonnes centrees */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-20 justify-center w-full">
            {footerSections.map((section) => (
              <div key={section.title} className="w-full md:w-auto text-center md:text-left">
                <h4 className="font-semibold mb-4 text-white text-xl sm:text-2xl md:text-3xl font-lexend">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-base sm:text-lg inline-block"
                        aria-label={`Aller a ${link.label}`}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Reseaux sociaux centres en bas */}
          <div className="flex gap-4 sm:gap-6 justify-center">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon size={18} className="sm:w-5 sm:h-5" />
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
};