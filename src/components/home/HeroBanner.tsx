import React from 'react';
import { Button } from '../ui/Button';

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-700 text-white py-24 md:py-32 overflow-hidden">
      {/* Background Pattern avec des formes abstraites style maquette */}
      <div className="absolute inset-0 opacity-20">
        {/* Formes arrondies inspirées du design */}
        <div className="absolute top-0 left-[10%] w-40 h-96 bg-teal-500 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-[25%] w-32 h-80 bg-cyan-500 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-[15%] w-36 h-96 bg-teal-400 rounded-full blur-3xl"></div>
        <div className="absolute top-16 right-[30%] w-40 h-88 bg-cyan-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-[40%] w-32 h-80 bg-teal-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-[20%] w-36 h-72 bg-cyan-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10 leading-tight">
            Ce que vous imaginez,
            <br />
            nous le réalisons
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary">
              Your main offer
            </Button>
            <Button variant="secondary">
              Optional second
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};