
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/shared/CTABanner';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const B2B = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-prometheus-navy text-white py-16">
          <div className="container">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              Win More B2B Deals
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mb-8">
              Streamline complex B2B sales cycles and turn technology friction into a competitive advantage.
            </p>
            <Button asChild size="lg" className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
              <Link to="/book-audit">Book Free B2B Teardown</Link>
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
                    B2B companies struggle with disconnected sales and marketing systems, 
                    resulting in lost opportunities and extended sales cycles.
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                  <h3 className="font-medium text-green-800 mb-1">The Possibility</h3>
                  <p className="text-gray-700">
                    An integrated, technology-enabled approach that aligns marketing and sales,
                    removes buyer friction, and accelerates deal velocity.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-prometheus-navy mb-6">
                Free B2B Sales Teardown
              </h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="bg-prometheus-orange/20 rounded-full p-1 mt-0.5">
                    <ChevronRight className="h-4 w-4 text-prometheus-orange" />
                  </div>
                  <span>Comprehensive analysis of your current sales technology stack</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-prometheus-orange/20 rounded-full p-1 mt-0.5">
                    <ChevronRight className="h-4 w-4 text-prometheus-orange" />
                  </div>
                  <span>Identification of key friction points in your buyer's journey</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-prometheus-orange/20 rounded-full p-1 mt-0.5">
                    <ChevronRight className="h-4 w-4 text-prometheus-orange" />
                  </div>
                  <span>Actionable recommendations to shorten sales cycles</span>
                </li>
              </ul>
              <Button asChild size="lg" className="w-full bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
                <Link to="/book-audit">Book Your Free Teardown</Link>
              </Button>
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-8 text-center">
            B2B Vertical Expertise
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold text-prometheus-navy mb-3">Manufacturing</h3>
              <p className="text-gray-600 mb-6">
                "Turn idle line-time into booked POs."
              </p>
              <Link to="/b2b/manufacturing" className="text-prometheus-orange hover:text-prometheus-orange/80 font-medium flex items-center">
                View Manufacturing Solutions <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold text-prometheus-navy mb-3">Professional Services</h3>
              <p className="text-gray-600 mb-6">
                "Cut proposal cycles by 30%."
              </p>
              <Link to="/b2b/professional-services" className="text-prometheus-orange hover:text-prometheus-orange/80 font-medium flex items-center">
                View Professional Services Solutions <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default B2B;
