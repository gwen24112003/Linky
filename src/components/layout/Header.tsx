import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NavLink } from '../../types';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks: NavLink[] = [
    { label: 'Accueil', href: '/' },
    { label: 'Le Cabinet', href: '/equipe' },
    { label: 'Expertise', href: '/services' },
    { label: 'Articles', href: '/articles' },
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

  const navColor = 'text-gray-600';
  const burgerColor = 'text-gray-700';

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        animate={{
          backgroundColor: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(12px)',
          borderBottomColor: 'rgba(243,244,246,1)',
        }}
        style={{ borderBottomWidth: 1, borderBottomStyle: 'solid' }}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="relative flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center z-10" aria-label="Retour à l'accueil" onClick={() => window.scrollTo(0, 0)}>
              <img
                src="/images/opus-logo.png"
                alt="Logo Opus Advisor"
                className="object-contain"
                style={{ width: 'auto', height: '110px', maxHeight: '250px' }}
              />
            </Link>

            {/* Desktop Navigation - centered absolutely */}
            <div className="hidden md:flex items-center gap-10 absolute left-1/2 transform -translate-x-1/2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href ||
                  (link.href !== '/' && location.pathname.startsWith(link.href));
                return link.href.startsWith('#') ? (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`text-xl transition-colors duration-200 font-bold ${navColor}`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <div key={link.label} className="relative">
                    <Link
                      to={link.href}
                      onClick={handleNavClick}
                      className={`text-xl transition-colors duration-200 font-bold ${isActive ? '' : navColor}`}
                      style={isActive ? { color: '#C9A84C' } : undefined}
                    >
                      {link.label}
                    </Link>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                        style={{ background: '#C9A84C' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Burger button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden transition-colors z-[60] ${burgerColor}`}
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Overlay plein écran */}
      <div
        className={`fixed inset-0 z-[55] flex flex-col md:hidden transition-all duration-500 ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: '#1A2332' }}
        aria-hidden={!isMenuOpen}
      >
        {/* Liens de navigation centrés */}
        <div className="flex flex-col items-center justify-center flex-1 gap-10 px-8">
          {navLinks.map((link, index) => (
            link.href.startsWith('#') ? (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-4xl font-bold text-white/80 hover:text-white transition-all duration-300 hover:scale-105 ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 80 + 100}ms` }}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                onClick={handleNavClick}
                className={`text-4xl font-bold text-white/80 hover:text-white transition-all duration-300 hover:scale-105 ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 80 + 100}ms` }}
              >
                {link.label}
              </Link>
            )
          ))}
        </div>

        {/* Décoration bas */}
        <div className="pb-12 flex justify-center">
          <img
            src="/images/opus-icon.png"
            alt="Logo Opus Advisor"
            className="h-16 object-contain opacity-30"
          />
        </div>
      </div>
    </>
  );
};