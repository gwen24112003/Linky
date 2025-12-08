import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { RelatedArticles } from '../components/home/RelatedArticles';
import { TableOfContents } from '../components/ui/TableOfContents';
import articlesData from '../data/articles.json';

interface ArticleMetadata {
  id: number;
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  overlayImageSrc?: string;
}

export const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<ArticleMetadata | null>(null);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [tocPosition, setTocPosition] = useState<'absolute' | 'fixed' | 'absolute-bottom'>('absolute');
  
  const articleSectionRef = useRef<HTMLDivElement>(null);
  const tocRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const foundArticle = articlesData.find((a) => a.slug === slug);
    
    if (!foundArticle) {
      navigate('/');
      return;
    }

    setArticle(foundArticle);

    // Load markdown content
    fetch(`/articles/${slug}.md`)
      .then((response) => response.text())
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading article:', error);
        setContent('Erreur lors du chargement de l\'article.');
        setLoading(false);
      });
  }, [slug, navigate]);

  // Handle TOC sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      if (!articleSectionRef.current || !tocRef.current) return;

      const articleSection = articleSectionRef.current;
      const articleRect = articleSection.getBoundingClientRect();
      const tocHeight = tocRef.current.offsetHeight;
      
      // Position where TOC should start being sticky (at the top of article section)
      const stickyStartOffset = 96; // 24 * 4 = 96px (top-24 in Tailwind)
      
      // Check if we're above the article section
      if (articleRect.top > stickyStartOffset) {
        setTocPosition('absolute');
      }
      // Check if we're at the bottom of the article section
      else if (articleRect.bottom < tocHeight + stickyStartOffset) {
        setTocPosition('absolute-bottom');
      }
      // We're in the middle, make it sticky
      else {
        setTocPosition('fixed');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [content]); // Re-run when content changes

  if (loading || !article) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-600">Chargement...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      {/* Article Content */}
      <main className="min-h-screen bg-white">
        {/* Article Section with TOC - includes header */}
        <div className="relative py-12" ref={articleSectionRef}>
          {/* TOC with dynamic positioning */}
          <div 
            ref={tocRef}
            className={`hidden xl:block xl:w-64 2xl:w-80 ${
              tocPosition === 'fixed' 
                ? 'fixed left-8 top-28' 
                : tocPosition === 'absolute-bottom'
                ? 'absolute left-8 bottom-4'
                : 'absolute left-8 top-12'
            }`}
            style={{
              transition: 'none' // Disable transition for instant positioning
            }}
          >
            <TableOfContents content={content} />
          </div>

          {/* Article Header and Content - Centered */}
          <div className="container mx-auto px-6 max-w-4xl">
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                {article.title}
              </h1>
              <p className="text-lg text-gray-600">
                {article.description}
              </p>
            </header>

            <article className="prose prose-lg max-w-none
              prose-headings:text-gray-800 prose-headings:font-bold
              prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
              prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8
              prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-6
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-lg
              prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
              prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
              prose-li:text-gray-700 prose-li:text-lg prose-li:leading-relaxed
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline
              prose-code:text-teal-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-hr:my-8 prose-hr:border-gray-300
            ">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSlug]}
              >
                {content}
              </ReactMarkdown>
            </article>
          </div>
        </div>

        {/* Related Articles - Centered */}
        <RelatedArticles currentArticleId={article.id} />
      </main>

      <Footer />
    </>
  );
};
