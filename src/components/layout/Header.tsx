import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NavLink } from '../../types';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks: NavLink[] = [
    { label: 'Accueil', href: '/' },
    { label: 'Le Cabinet', href: '/equipe' },
    { label: 'Expertise', href: '/services' },
    { label: 'Articles', href: '/articles' },
    // { label: 'Realisations', href: '/projets' },
    { label: 'Contact', href: '/contact' }
  ];

  // Ferme le menu lors d'un changement de route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Empêche le scroll du body quand le menu est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const handleNavClick = () => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="relative flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center z-10" aria-label="Retour a l'accueil" onClick={() => window.scrollTo(0, 0)}>
              <img
                src="/images/linky-logo.png"
                alt="Logo Linky"
                className="object-contain h-12 sm:h-16 md:h-20 w-auto"
              />
            </Link>

            {/* Desktop Navigation - centered absolutely */}
            <div className="hidden md:flex items-center gap-6 lg:gap-10 absolute left-1/2 transform -translate-x-1/2">
              {navLinks.map((link) => (
                link.href.startsWith('#') ? (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-base lg:text-lg text-gray-600 hover:text-teal-600 transition-colors duration-200 font-medium"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={handleNavClick}
                    className="text-base lg:text-lg text-gray-600 hover:text-teal-600 transition-colors duration-200 font-medium"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>

            {/* Burger button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-teal-600 transition-colors z-[60] p-2"
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Overlay plein ecran */}
      <div
        className={`fixed inset-0 z-[55] flex flex-col md:hidden transition-all duration-300 ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'linear-gradient(135deg, #0f766e 0%, #0e7490 100%)' }}
        aria-hidden={!isMenuOpen}
      >
        {/* Liens de navigation centres */}
        <div className="flex flex-col items-center justify-center flex-1 gap-8 px-8">
          {navLinks.map((link, index) => (
            link.href.startsWith('#') ? (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-3xl font-bold text-white/80 hover:text-white transition-all duration-300 ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 50 + 100}ms` }}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                onClick={handleNavClick}
                className={`text-3xl font-bold text-white/80 hover:text-white transition-all duration-300 ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 50 + 100}ms` }}
              >
                {link.label}
              </Link>
            )
          ))}
        </div>

        {/* Decoration bas */}
        <div className="pb-10 flex justify-center">
          <img
            src="/images/linky-logo.png"
            alt="Logo Linky"
            className="h-12 object-contain opacity-30"
          />
        </div>
      </div>
    </>
  );
};