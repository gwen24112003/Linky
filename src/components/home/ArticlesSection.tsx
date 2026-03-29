import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import articlesData from '../../data/articles.json';

interface ArticleMetadata {
  id: number;
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  overlayImageSrc?: string;
}

const baseKeywords = [
  'Stratégie', 'Opérations', 'PME', 'Transformation', 'ETI',
  'Croissance', 'Organisation', 'Performance', 'Direction', 'Conseil',
  'Automatisation', 'No-Code', 'IA', 'Workflow', 'Processus',
];

const marqueeKeywords = [
  ...baseKeywords, ...baseKeywords, ...baseKeywords, ...baseKeywords,
  ...baseKeywords, ...baseKeywords, ...baseKeywords, ...baseKeywords,
];

export const ArticlesSection: React.FC = () => {
  const navigate = useNavigate();
  const articles: ArticleMetadata[] = articlesData;
  const [featured] = articles;

  const handleArticleClick = (slug: string) => {
    navigate(`/article/${slug}`);
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      {/* Marquee ticker */}
      <div className="mb-14 relative overflow-hidden">
        <div
          className="flex whitespace-nowrap min-w-max"
          style={{ animation: 'marquee 60s linear infinite' }}
        >
          {marqueeKeywords.map((kw, i) => (
            <span
              key={i}
              className="text-sm font-semibold tracking-[0.2em] uppercase flex-shrink-0 text-navy opacity-50 pr-8"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6">
        {/* ── Article vedette ── */}
        {featured && (
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={() => handleArticleClick(featured.slug)}
              className="w-full text-left group relative rounded-3xl overflow-hidden block"
              style={{
                boxShadow: '0 24px 60px rgba(26,35,50,0.12)',
                border: '1px solid rgba(26,35,50,0.1)',
              }}
            >
              {/* Fond dégradé gold */}
              <div
                className="h-80 md:h-96 flex flex-col justify-between p-8 md:p-10"
                style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #e8c96a 50%, #C9A84C 100%)' }}
              >
                {/* Badge "Dernière publication" */}
                <div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase"
                    style={{ color: '#7a5c1e', background: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.5)' }}
                  >
                    Dernière publication
                  </span>
                </div>

                {/* Contenu */}
                <div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight transition-colors duration-300 group-hover:opacity-80">
                    {featured.title}
                  </h3>
                  <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-2xl mb-5">
                    {featured.description}
                  </p>
                  <div className="flex items-center gap-2 font-semibold text-sm text-white">
                    <span>Lire l'article</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            </button>

            {/* Bouton voir tous les articles */}
            <motion.div
              className="flex justify-center mt-10"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                to="/articles"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 group"
                style={{ border: '1px solid #C9A84C', color: '#C9A84C' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(201,168,76,0.08)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = ''; }}
              >
                Voir tous les articles
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
