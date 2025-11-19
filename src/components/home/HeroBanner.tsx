import React from 'react';
import { Button } from '../ui/Button';

export const HeroBanner: React.FC = () => {
  return (
    <section
      className="relative text-white overflow-hidden flex items-center"
      style={{
        backgroundImage: `url('/images/linky-banner.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '50vh',
      }}
    >
  {/* Light overlay to ensure text contrast over the PNG (lighter per request) */}
  <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-8xl mb-10 leading-tight">
            Ce que vous imaginez,
            <br />
            nous le réalisons
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary">
              Nos services
            </Button>
            <Button variant="secondary">
              Nous contacter
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};