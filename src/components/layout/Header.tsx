import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NavLink } from '../../types';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

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

  // Scroll-driven header transparency
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  const transparent = isHome && !isScrolled;
  const navColor = transparent ? 'text-white/90 hover:text-white' : 'text-gray-600 hover:text-teal-600';
  const burgerColor = transparent ? 'text-white' : 'text-gray-700 hover:text-teal-600';

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        animate={{
          backgroundColor: transparent ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.75)',
          backdropFilter: transparent ? 'blur(0px)' : 'blur(12px)',
          borderBottomColor: transparent ? 'rgba(255,255,255,0)' : 'rgba(243,244,246,1)',
        }}
        style={{ borderBottomWidth: 1, borderBottomStyle: 'solid' }}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="relative flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center z-10" aria-label="Retour à l'accueil" onClick={() => window.scrollTo(0, 0)}>
              <img
                src="/images/linky-logo.png"
                alt="Logo Linky"
                className="object-contain"
                style={{ width: 'auto', height: '75px', maxHeight: '250px' }}
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
                      className={`text-xl transition-colors duration-200 font-bold ${
                        isActive
                          ? transparent ? 'text-white' : 'text-teal-600'
                          : navColor
                      }`}
                    >
                      {link.label}
                    </Link>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                        style={{ background: transparent ? 'rgba(255,255,255,0.8)' : '#0d9488' }}
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
        style={{ background: 'linear-gradient(135deg, #0f766e 0%, #0e7490 100%)' }}
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
            src="/images/linky-logo.png"
            alt="Logo Linky"
            className="h-16 object-contain opacity-30"
          />
        </div>
      </div>
    </>
  );
};