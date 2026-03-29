import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ArticleCard } from '../components/ui/ArticleCard';
import { SEO } from '../components/SEO';
import articlesData from '../data/articles.json';

interface ArticleMetadata {
  id: number;
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  overlayImageSrc?: string;
}

export const ArticlesPage: React.FC = () => {
  const navigate = useNavigate();
  const articles: ArticleMetadata[] = articlesData;

  const articleListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": articles.map((article, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://opusadvisor.fr/article/${article.slug}`
    }))
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO
        title="Articles - Opus Advisor · Conseil en Organisation"
        description="Ressources et insights pour dirigeants : stratégie, optimisation des processus, outils et méthodes pour une croissance maîtrisée."
        url="https://opusadvisor.fr/articles"
        jsonLd={articleListJsonLd}
      />
      <Header />

      {/* ── Hero ── */}
      <section
        className="relative h-[50vh] flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1A2332, #2A3A50, #1A2332)',
          backgroundSize: '400% 400%',
          animation: 'mesh-shift 14s ease infinite',
        }}
      >
        <div className="absolute pointer-events-none opacity-20 hidden md:block"
          style={{ width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, #2dd4bf, transparent)', filter: 'blur(70px)', top: '-20%', right: '5%', animation: 'float 9s ease-in-out infinite' }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.10]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative z-10 text-center px-6 pt-20 md:pt-0">
          <motion.p
            className="text-sm font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: '#C9A84C' }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Ressources · Insights
          </motion.p>
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-white font-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Articles
          </motion.h1>
        </div>
      </section>

      {/* ── Grid articles ── */}
      <main className="flex-grow py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {articles.map((article, i) => (
              <motion.div
                key={article.id}
                className="w-full"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <ArticleCard
                  title={article.title}
                  description={article.description}
                  imageSrc={article.imageSrc}
                  overlayImageSrc={article.overlayImageSrc}
                  onClick={() => navigate(`/article/${article.slug}`)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
