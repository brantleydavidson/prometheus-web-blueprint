
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTABanner = () => {
  return (
    <div className="bg-gradient-to-r from-prometheus-navy to-prometheus-navy/90 py-12 text-white">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">
              Stop Drowning in Disconnected Tools
            </h2>
            <p className="text-gray-300">
              Ready to transform your tech chaos into controlled growth? Book a Growth Audit and discover how our team can help.
            </p>
          </div>
          
          <Button asChild size="lg" className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
            <Link to="/book-audit" className="flex items-center gap-2">
              Book Your Growth Audit Today <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CTABanner;
