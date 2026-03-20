import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Home } from './pages/Home';
import { Team } from './pages/Team';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import { Services } from './pages/Services';
import { ArticlePage } from './pages/ArticlePage';
import { ExpertContact } from './pages/ExpertContact';
import { ArticlesPage } from './pages/ArticlesPage';
import { SEO } from './components/SEO';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <SEO />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/equipe" element={<Team />} />
          <Route path="/projets" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/experts-contact" element={<ExpertContact />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}