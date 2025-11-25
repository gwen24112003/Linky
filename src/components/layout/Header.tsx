import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavLink } from '../../types';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks: NavLink[] = [
    { label: 'Notre équipe', href: '/equipe' },
    { label: 'Nos projets', href: '/projets' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo: using inline style to force larger size since Tailwind classes are being overridden */}
          <Link to="/" className="flex items-center gap-0">
            <img
              src="/images/linky-logo.png"
              alt="Linky"
              className="object-contain"
              style={{ width: 'auto', height: '75px', maxHeight: '250px' }}
            />
            <span className="text-4xl font-bold text-gray-800 -ml-3">Linky</span>
          </Link>

          {/* Desktop Navigation - centered */}
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
                  className="text-xl text-gray-600 hover:text-teal-600 transition-colors duration-200 font-bold"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-teal-600"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                  onClick={() => setIsMenuOpen(false)}
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