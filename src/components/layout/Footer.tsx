import React from 'react';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import { FooterSection } from '../../types';

export const Footer: React.FC = () => {
  const footerSections: FooterSection[] = [
    {
      title: 'Produits',
      links: [
        { label: 'Pro méthode', href: '#' },
        { label: 'Intégrations', href: '#' }
      ]
    },
    {
      title: 'Learn more',
      links: [
        { label: 'Case studies', href: '#' },
        { label: 'Glossaire', href: '#' },
        { label: 'Best practices', href: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact', href: '#' },
        { label: 'Support', href: '#' },
        { label: 'Legal', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  return (
    <footer className="bg-gray-900 text-white rounded-t-3xl py-16 container mx-auto px-6">
      <div className="max-w-[75%] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Namedlly</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Découvrez les solutions pour concevoir, lancer et gérer votre site web.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-5 text-white">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};