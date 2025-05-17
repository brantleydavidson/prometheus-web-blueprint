
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Factory, TrendingUp, Database, Clock } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-prometheus-navy to-prometheus-navy/90 text-white py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-3/5">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Manufacturing Solutions: Light Up Dark Factory Data
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              Turn Idle Line-Time Into Booked POs
            </h2>
            <p className="text-lg mb-6">
              Manufacturing companies face unique challenges: disconnected systems prevent marketing from knowing current production capacity, while sales teams lack visibility into the marketing pipeline. The result? Feast-or-famine cycles that hurt profitability.
            </p>
            <p className="text-lg mb-8">
              Our manufacturing-specific solutions bring these systems together, ensuring your marketing efforts drive the right kind of business to maximize production efficiency and profit.
            </p>
            <Button size="lg" className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
              <Link to="/book-audit">Book a Manufacturing Growth Audit</Link>
            </Button>
          </div>
          <div className="md:w-2/5">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <Factory className="h-16 w-16 text-prometheus-orange mb-4" />
              <h3 className="text-prometheus-navy text-xl font-bold mb-2">
                Transform Your Manufacturing Tech Stack
              </h3>
              <p className="text-gray-600 mb-4">
                Connect your marketing, sales, and production data to drive more profitable growth.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-gray-700">
                  <TrendingUp className="h-5 w-5 text-prometheus-orange" />
                  <span>Turn idle capacity into revenue</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <Database className="h-5 w-5 text-prometheus-orange" />
                  <span>Connect production to marketing</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <Clock className="h-5 w-5 text-prometheus-orange" />
                  <span>Reduce lead-to-PO timeframes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
