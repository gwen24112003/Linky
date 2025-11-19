import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Testimonial } from '../../types';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Andy Antonucci',
      role: 'Co-founder',
      company: 'SAFER Nation',
      content: 'In the garden of life, some things are just very sweet. This is one of them.'
    },
    {
      id: '2',
      name: 'Wanja Singleton',
      role: 'Leadership at',
      company: 'Butcher',
      content: 'Your expectations will fly way high. I felt like I was soaring.'
    },
    {
      id: '3',
      name: 'Carl Carvalho',
      role: 'Growth at',
      company: 'Cannon & Co.',
      content: 'Using this felt like it transformed me completely.'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16 text-center">
          Ce que nos clients disent de nous
        </h2>

        <div className="relative">
          {/* Testimonials Grid - visible sur grand écran */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <p className="text-gray-700 mb-8 leading-relaxed text-sm">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">{testimonial.name}</p>
                  <p className="text-xs text-gray-500">
                    {testimonial.role} {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel - visible sur mobile et tablette */}
          <div className="lg:hidden">
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 max-w-lg mx-auto">
              <p className="text-gray-700 mb-8 leading-relaxed">
                "{testimonials[currentIndex].content}"
              </p>
              <div>
                <p className="font-semibold text-gray-900 mb-1">
                  {testimonials[currentIndex].name}
                </p>
                <p className="text-xs text-gray-500">
                  {testimonials[currentIndex].role} {testimonials[currentIndex].company}
                </p>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition-colors shadow-md"
                aria-label="Témoignage précédent"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition-colors shadow-md"
                aria-label="Témoignage suivant"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-teal-600 w-8' : 'bg-gray-300 w-2'
                  }`}
                  aria-label={`Aller au témoignage ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};