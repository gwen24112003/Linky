import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { bannerStyles, bannerOverlayClass } from '../../theme/bannerStyles';

export const HeroBanner: React.FC = () => {
  return (
    <section
      className="relative text-white overflow-hidden flex items-center"
      style={bannerStyles}
    >
  {/* Light overlay to ensure text contrast over the PNG (lighter per request) */}
  <div className={bannerOverlayClass} aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-8xl mb-10 leading-tight">
            De l'idée à l'application
            <br />
            Ce que vous imaginez, nous le réalisons
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services">
              <Button variant="primary">
                Nos services
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary">
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};