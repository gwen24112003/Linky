import React, { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Wait for content to be rendered, then extract h2 headings from the actual DOM
    const timer = setTimeout(() => {
      const h2Elements = document.querySelectorAll('article h2');
      const extractedHeadings: Heading[] = [];
      
      h2Elements.forEach((h2) => {
        const id = h2.getAttribute('id');
        const text = h2.textContent;
        
        if (id && text) {
          extractedHeadings.push({
            id,
            text,
            level: 2,
          });
        }
      });

      setHeadings(extractedHeadings);
    }, 100); // Small delay to ensure ReactMarkdown has rendered

    return () => clearTimeout(timer);
  }, [content]);

  useEffect(() => {
    // Track active heading on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="w-full bg-gray-50 border border-gray-200 rounded-lg p-6">
      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
        Sommaire
      </h3>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`block text-sm md:text-base lg:text-lg transition-colors duration-200 py-1 ${
                activeId === heading.id
                  ? 'text-teal-600 font-semibold border-l-2 border-teal-600 pl-3'
                  : 'text-gray-600 hover:text-teal-500 pl-3'
              }`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(heading.id);
                if (element) {
                  // Get the element's position
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - 100; // 100px offset for header
                  
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
