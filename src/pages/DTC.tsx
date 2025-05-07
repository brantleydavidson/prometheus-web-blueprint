import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/shared/CTABanner';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const DTC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-prometheus-navy text-white py-16">
          <div className="container">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              Sell More Direct-to-Consumer
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mb-8">
              Capture more leads, increase conversion rates, and build lasting customer relationships.
            </p>
            <Button asChild size="lg" className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
              <Link to="/book-audit">Book Free UX Audit</Link>
            </Button>
          </div>
        </div>
        
        <div className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-6">
                From Pain to Possibility
              </h2>
              <div className="space-y-6">
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                  <h3 className="font-medium text-red-800 mb-1">The Pain</h3>
                  <p className="text-gray-700">
                    DTC businesses struggle with fragmented customer data, inconsistent lead 
                    generation, and difficulty building lasting customer relationships.
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                  <h3 className="font-medium text-green-800 mb-1">The Possibility</h3>
                  <p className="text-gray-700">
                    A unified customer view with personalized journeys that convert more leads, 
                    increase average order values, and foster brand loyalty.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-prometheus-navy mb-6">
                Free UX/Website Audit
              </h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="bg-prometheus-orange/20 rounded-full p-1 mt-0.5">
                    <ChevronRight className="h-4 w-4 text-prometheus-orange" />
                  </div>
                  <span>Detailed analysis of your conversion funnel and user experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-prometheus-orange/20 rounded-full p-1 mt-0.5">
                    <ChevronRight className="h-4 w-4 text-prometheus-orange" />
                  </div>
                  <span>Identification of critical drop-off points in your customer journey</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-prometheus-orange/20 rounded-full p-1 mt-0.5">
                    <ChevronRight className="h-4 w-4 text-prometheus-orange" />
                  </div>
                  <span>Actionable recommendations to improve lead capture and conversion</span>
                </li>
              </ul>
              <Button asChild size="lg" className="w-full bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
                <Link to="/book-audit">Book Your Free Audit</Link>
              </Button>
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-8 text-center">
            DTC Vertical Expertise
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold text-prometheus-navy mb-3">Restoration</h3>
              <p className="text-gray-600 mb-6">
                "Surface 40% more emergency leads."
              </p>
              <Link to="/dtc/restoration" className="text-prometheus-orange hover:text-prometheus-orange/80 font-medium flex items-center">
                View Restoration Solutions <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 opacity-60">
              <h3 className="text-xl font-semibold text-prometheus-navy mb-3">eCommerce</h3>
              <p className="text-gray-600 mb-6">
                "Lift repeat purchase rate by 25%."
              </p>
              <p className="text-sm text-gray-500">Coming soon</p>
            </div>
          </div>
        </div>
        
        <CTABanner 
          title="Ready to Increase Your Direct Sales?"
          description="Book a free UX/Website audit to discover how we can transform your customer journey into a conversion machine."
          buttonText="Book Free UX Audit"
          buttonLink="/book-audit"
        />
      </main>
      <Footer />
    </div>
  );
};

export default DTC;
