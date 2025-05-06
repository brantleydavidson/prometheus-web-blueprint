
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const WhoWeHelp = () => {
  return (
    <div className="container py-16">
      <h2 className="text-2xl md:text-3xl font-semibold text-center text-prometheus-navy mb-4">
        Who We Help
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
            Streamline your B2B sales operations, reduce friction in the buyer journey, and close more deals with less effort.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-1 h-12 bg-prometheus-orange mt-1"></div>
              <div>
                <Link to="/b2b/manufacturing" className="text-lg font-medium text-prometheus-navy hover:text-prometheus-orange">
                  Manufacturing
                </Link>
                <p className="text-gray-600">"Turn idle line-time into booked POs."</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-1 h-12 bg-prometheus-orange mt-1"></div>
              <div>
                <Link to="/b2b/professional-services" className="text-lg font-medium text-prometheus-navy hover:text-prometheus-orange">
                  Professional Services
                </Link>
                <p className="text-gray-600">"Cut proposal cycles by 30%."</p>
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
            Capture more leads, increase conversion rates, and build lasting customer relationships through optimized DTC strategies.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-1 h-12 bg-prometheus-orange mt-1"></div>
              <div>
                <Link to="/dtc/restoration" className="text-lg font-medium text-prometheus-navy hover:text-prometheus-orange">
                  Restoration
                </Link>
                <p className="text-gray-600">"Surface 40% more emergency leads."</p>
              </div>
            </div>
            <div className="flex items-start gap-4 opacity-50">
              <div className="w-1 h-12 bg-gray-300 mt-1"></div>
              <div>
                <span className="text-lg font-medium text-prometheus-navy">
                  eCommerce
                </span>
                <p className="text-gray-600">"Lift repeat purchase rate by 25%."</p>
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
