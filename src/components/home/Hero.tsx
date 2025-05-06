
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [animatedKPI, setAnimatedKPI] = useState(0);
  const targetKPI = 62; // Example KPI value
  
  useEffect(() => {
    const duration = 1500; // Animation duration in ms
    const startTime = Date.now();
    
    const animateKPI = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      
      if (elapsed < duration) {
        const progress = elapsed / duration;
        setAnimatedKPI(Math.floor(targetKPI * progress));
        requestAnimationFrame(animateKPI);
      } else {
        setAnimatedKPI(targetKPI);
      }
    };
    
    requestAnimationFrame(animateKPI);
  }, []);

  return (
    <div className="py-16 md:py-24 container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="snap-into-place">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-prometheus-navy mb-6">
            Tame the Tech.<br />
            <span className="text-prometheus-orange">Unleash the Growth.</span>
          </h1>
          <p className="text-xl mb-8 text-gray-600">
            High-performance marketing operations that connect technology investments to revenue outcomes.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
              <Link to="/book-audit">Book Growth Audit</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-prometheus-navy text-prometheus-navy hover:bg-prometheus-navy/10">
              <Link to="/services">Explore Services</Link>
            </Button>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 flex flex-col items-center md:items-start snap-into-place">
          <div className="mb-8 w-full bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-prometheus-navy mb-2">Before Prometheus</h3>
            <div className="flex flex-col gap-3">
              <div className="w-full h-3 bg-red-100 rounded"></div>
              <div className="w-3/4 h-3 bg-red-100 rounded"></div>
              <div className="w-1/2 h-3 bg-red-100 rounded"></div>
            </div>
          </div>
          
          <div className="w-full bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-prometheus-navy mb-2">After Prometheus</h3>
            <div className="flex items-center gap-4">
              <span className="text-5xl font-bold text-prometheus-orange animate-counter">+{animatedKPI}%</span>
              <div className="text-sm text-gray-600">
                <p>Average</p>
                <p>Revenue Growth</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        <Link to="/b2b" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-100 text-center">
          <h3 className="text-xl font-semibold text-prometheus-navy mb-2">B2B</h3>
          <p className="text-sm text-gray-600">Win more deals with less friction</p>
        </Link>
        
        <Link to="/dtc" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-100 text-center">
          <h3 className="text-xl font-semibold text-prometheus-navy mb-2">DTC</h3>
          <p className="text-sm text-gray-600">Boost conversions and retention</p>
        </Link>
        
        <Link to="/services/ai-enablement" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-100 text-center">
          <h3 className="text-xl font-semibold text-prometheus-orange mb-2">AI Suite</h3>
          <p className="text-sm text-gray-600">Accelerate with AI-driven tools</p>
        </Link>
        
        <Link to="/services/consulting-gtm" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-100 text-center">
          <h3 className="text-xl font-semibold text-prometheus-gold mb-2">Consulting</h3>
          <p className="text-sm text-gray-600">Expert guidance for growth</p>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
