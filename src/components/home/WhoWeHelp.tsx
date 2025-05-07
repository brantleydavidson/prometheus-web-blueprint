
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const WhoWeHelp = () => {
  return (
    <div className="container py-16">
      <h2 className="text-2xl md:text-3xl font-semibold text-center text-prometheus-navy mb-4">
        Solutions Built For Your Business
      </h2>
      <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
        Specialized solutions tailored to your industry's unique challenges and opportunities.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
          <h3 className="text-2xl font-semibold text-prometheus-navy mb-4">
            Win More B2B Deals
          </h3>
          <p className="text-gray-600 mb-6">
            We help manufacturers and professional service firms connect their tech stack to their sales pipeline, turning scattered data into predictable revenue.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-1 h-12 bg-prometheus-orange mt-1"></div>
              <div>
                <Link to="/b2b/manufacturing" className="text-lg font-medium text-prometheus-navy hover:text-prometheus-orange">
                  Manufacturing
                </Link>
                <p className="text-gray-600">Turn idle line-time into booked POs with integrated systems that align marketing with production capacity.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-1 h-12 bg-prometheus-orange mt-1"></div>
              <div>
                <Link to="/b2b/professional-services" className="text-lg font-medium text-prometheus-navy hover:text-prometheus-orange">
                  Professional Services
                </Link>
                <p className="text-gray-600">Connect marketing, sales, and service around a single view of your customer to drive growth.</p>
              </div>
            </div>
          </div>
          <Link to="/b2b" className="inline-flex items-center text-prometheus-orange hover:text-prometheus-orange/80 font-medium">
            Explore B2B Solutions <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
          <h3 className="text-2xl font-semibold text-prometheus-navy mb-4">
            Sell More Direct-to-Consumer
          </h3>
          <p className="text-gray-600 mb-6">
            For restoration companies and e-commerce brands, we build systems that capture every opportunity and turn one-time customers into lifetime value.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-1 h-12 bg-prometheus-orange mt-1"></div>
              <div>
                <Link to="/dtc/restoration" className="text-lg font-medium text-prometheus-navy hover:text-prometheus-orange">
                  Restoration
                </Link>
                <p className="text-gray-600">Surface 40% more emergency leads and optimize crew scheduling to maximize revenue without adding resources.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 opacity-50">
              <div className="w-1 h-12 bg-gray-300 mt-1"></div>
              <div>
                <span className="text-lg font-medium text-prometheus-navy">
                  eCommerce
                </span>
                <p className="text-gray-600">Turn browsers into buyers and buyers into advocates with optimized customer journeys.</p>
                <p className="text-xs text-gray-500">Coming soon</p>
              </div>
            </div>
          </div>
          <Link to="/dtc" className="inline-flex items-center text-prometheus-orange hover:text-prometheus-orange/80 font-medium">
            Explore DTC Solutions <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WhoWeHelp;
