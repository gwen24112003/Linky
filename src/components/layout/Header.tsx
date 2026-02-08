import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavLink } from '../../types';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks: NavLink[] = [
    { label: 'Accueil', href: '/' },
    { label: 'Le Cabinet', href: '/equipe' },
    { label: 'Expertise', href: '/services' },
    // { label: 'Réalisations', href: '/projets' },
    { label: 'Contact', href: '/contact' }
  ];

  const handleNavClick = () => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/75 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="relative flex items-center justify-between">
          {/* Logo: aligned to the start */}
          <Link to="/" className="flex items-center z-10" aria-label="Retour à l'accueil">
            <img
              src="/images/linky-logo.png"
              alt="Logo Linky"
              className="object-contain" // Retaining specific dimensions as requested
              style={{ width: 'auto', height: '75px', maxHeight: '250px' }}
            />
          </Link>

          {/* Desktop Navigation - centered absolutely */}
          <div className="hidden md:flex items-center gap-10 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              link.href.startsWith('#') ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xl text-gray-600 hover:text-teal-600 transition-colors duration-200 font-bold"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={handleNavClick}
                  className="text-xl text-gray-600 hover:text-teal-600 transition-colors duration-200 font-bold"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 hover:text-teal-600 transition-colors z-10"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-gray-100 pt-4">
            {navLinks.map((link) => (
              link.href.startsWith('#') ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-gray-600 hover:text-teal-600 transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block text-sm text-gray-600 hover:text-teal-600 transition-colors duration-200 font-medium"
                  onClick={handleNavClick}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};