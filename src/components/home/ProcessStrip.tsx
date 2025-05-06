
import React from 'react';
import { Map, Settings, BookOpen } from 'lucide-react';

const ProcessStrip = () => {
  return (
    <div className="bg-prometheus-navy py-16 text-white">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">
          Our Process: From Chaos to Control
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-prometheus-orange/20 rounded-full flex items-center justify-center mb-4">
              <Map className="h-8 w-8 text-prometheus-orange" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Map</h3>
            <p className="text-gray-300">
              We audit your current tech stack, map customer journeys, and identify opportunity gaps.
            </p>
          </div>
          
          <div className="relative text-center">
            <div className="hidden md:block absolute left-0 top-1/2 w-full h-1 bg-gradient-to-r from-prometheus-orange to-prometheus-gold -z-10 transform -translate-y-1/2"></div>
            <div className="w-16 h-16 mx-auto bg-prometheus-gold/20 rounded-full flex items-center justify-center mb-4">
              <Settings className="h-8 w-8 text-prometheus-gold" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Build</h3>
            <p className="text-gray-300">
              We implement optimized systems, workflows, and integrations tailored to your goals.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-prometheus-cyan/20 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-prometheus-cyan" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Train</h3>
            <p className="text-gray-300">
              We ensure your team is equipped with the knowledge and resources to maintain growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessStrip;
