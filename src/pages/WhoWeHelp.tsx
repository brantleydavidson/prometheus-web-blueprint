
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/shared/CTABanner';
import { ChevronRight } from 'lucide-react';

const WhoWeHelp = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gray-50 py-16">
          <div className="container">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-prometheus-navy mb-6 text-center">
              Industry-Specific Growth Solutions
            </h1>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
              We've developed specialized expertise across key industries to deliver transformative results for your unique challenges.
            </p>
          </div>
        </div>
        
        <div className="container py-16">
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-8 flex items-center">
              <span className="w-1 h-8 bg-prometheus-orange mr-3 inline-block"></span>
              B2B Solutions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-prometheus-navy mb-3">Manufacturing</h3>
                <p className="text-gray-600 mb-6">
                  "Turn idle line-time into booked POs."
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-prometheus-orange mt-0.5" />
                    <span>Optimize production scheduling based on real-time demand</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-prometheus-orange mt-0.5" />
                    <span>Streamline quote-to-cash processes for faster closes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-prometheus-orange mt-0.5" />
                    <span>Implement AI-powered forecasting for resource planning</span>
                  </li>
                </ul>
                <Link to="/b2b/manufacturing" className="text-prometheus-orange hover:text-prometheus-orange/80 font-medium flex items-center">
                  Learn More <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-prometheus-navy mb-3">Professional Services</h3>
                <p className="text-gray-600 mb-6">
                  "Cut proposal cycles by 30%."
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-prometheus-orange mt-0.5" />
                    <span>Automate proposal creation with intelligent templates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-prometheus-orange mt-0.5" />
                    <span>Implement value-based pricing strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-prometheus-orange mt-0.5" />
                    <span>Create seamless client onboarding experiences</span>
                  </li>
                </ul>
                <Link to="/b2b/professional-services" className="text-prometheus-orange hover:text-prometheus-orange/80 font-medium flex items-center">
                  Learn More <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link to="/b2b" className="inline-flex items-center text-prometheus-navy hover:text-prometheus-orange font-medium">
                View All B2B Solutions <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-8 flex items-center">
              <span className="w-1 h-8 bg-prometheus-orange mr-3 inline-block"></span>
              Direct-to-Consumer Solutions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-prometheus-navy mb-3">Restoration</h3>
                <p className="text-gray-600 mb-6">
                  "Surface 40% more emergency leads."
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-prometheus-orange mt-0.5" />
                    <span>24/7 lead capture optimization for emergency services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-prometheus-orange mt-0.5" />
                    <span>Local SEO and geographic targeting strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-prometheus-orange mt-0.5" />
                    <span>Insurance company relationship management systems</span>
                  </li>
                </ul>
                <Link to="/dtc/restoration" className="text-prometheus-orange hover:text-prometheus-orange/80 font-medium flex items-center">
                  Learn More <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 opacity-60">
                <h3 className="text-xl font-semibold text-prometheus-navy mb-3">eCommerce</h3>
                <p className="text-gray-600 mb-6">
                  "Lift repeat purchase rate by 25%."
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-prometheus-orange mt-0.5" />
                    <span>Personalized customer journey optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-prometheus-orange mt-0.5" />
                    <span>Subscription model development and implementation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-prometheus-orange mt-0.5" />
                    <span>Post-purchase engagement strategies</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-500">Coming soon</p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link to="/dtc" className="inline-flex items-center text-prometheus-navy hover:text-prometheus-orange font-medium">
                View All DTC Solutions <ChevronRight className="ml-1 h-4 w-4" />
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

export default WhoWeHelp;
