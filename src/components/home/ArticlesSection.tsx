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

const marqueeKeywords = [
  'Stratégie', 'Opérations', 'PME', 'Transformation', 'ETI',
  'Croissance', 'Organisation', 'Performance', 'Direction', 'Conseil',
  'Stratégie', 'Opérations', 'PME', 'Transformation', 'ETI',
  'Croissance', 'Organisation', 'Performance', 'Direction', 'Conseil',
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
          className="flex gap-8 whitespace-nowrap"
          style={{ animation: 'marquee 20s linear infinite' }}
        >
          {marqueeKeywords.map((kw, i) => (
            <span
              key={i}
              className="text-sm font-semibold tracking-[0.2em] uppercase flex-shrink-0"
              style={{ color: 'rgba(200, 169, 110, 0.5)' }}
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
                boxShadow: '0 24px 60px rgba(15,118,110,0.12)',
                border: '1px solid rgba(15,118,110,0.1)',
              }}
            >
              {/* Image de fond */}
              <div className="relative h-80 md:h-96 overflow-hidden">
                <img
                  src={featured.imageSrc}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay sombre dégradé */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />

                {/* Badge "Dernière publication" */}
                <div className="absolute top-6 left-6">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold text-teal-300 tracking-wider uppercase"
                    style={{ background: 'rgba(13,148,136,0.25)', border: '1px solid rgba(45,212,191,0.3)' }}
                  >
                    Dernière publication
                  </span>
                </div>
              </div>

              {/* Contenu en surimpression */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight group-hover:text-teal-200 transition-colors duration-300">
                  {featured.title}
                </h3>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mb-5">
                  {featured.description}
                </p>
                <div className="flex items-center gap-2 text-teal-400 font-semibold text-sm">
                  <span>Lire l'article</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
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
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-teal-200 text-teal-700 font-semibold text-base hover:bg-teal-50 hover:border-teal-400 transition-all duration-200 group"
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
