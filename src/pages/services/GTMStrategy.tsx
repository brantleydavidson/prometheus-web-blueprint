
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/shared/CTABanner';
import { Button } from '@/components/ui/button';
import { ChartLine, Target, Map, Users, Layers } from 'lucide-react';

const GTMStrategy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Marketing Strategy & GTM Consulting | Prometheus Agency</title>
        <meta 
          name="description" 
          content="Develop a clear roadmap from tech chaos to controlled growth. Prometheus provides expert go-to-market strategy and marketing technology consulting services." 
        />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <div className="bg-prometheus-navy text-white py-16">
          <div className="container">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              Consulting & GTM Strategy: Clarity from Complexity
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mb-8">
              Transform marketing chaos into controlled growth with a clear strategic roadmap.
            </p>
            <Button asChild size="lg" className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
              <Link to="/book-audit">Book a Strategy Session</Link>
            </Button>
          </div>
        </div>
        
        <div className="container py-16">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-6">
              Identify Your GTM Gaps in 3 Minutes
            </h2>
            <p className="text-gray-600 mb-8">
              Where are the biggest opportunities to improve your go-to-market strategy? Take our quick assessment to identify your highest-impact growth opportunities.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-8 text-center">
              <p className="text-gray-500 mb-4">Embedded Typeform Coming Soon</p>
              <Button asChild size="lg" className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
                <Link to="/book-audit">Take the GTM Gap Analyzer</Link>
              </Button>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-6">
              Our Strategy Framework
            </h2>
            <p className="text-gray-600 mb-8">
              Prometheus uses a proven methodology to transform marketing chaos into controlled growth:
            </p>
            
            <div className="relative">
              <div className="hidden md:block absolute left-0 top-1/2 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center relative">
                  <div className="bg-prometheus-orange text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    1
                  </div>
                  <h3 className="text-lg font-semibold text-prometheus-navy mb-2">Current State Analysis</h3>
                  <p className="text-sm text-gray-600">
                    We map your existing tech stack, data flows, and team capabilities
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
                  <div className="bg-prometheus-orange text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    2
                  </div>
                  <h3 className="text-lg font-semibold text-prometheus-navy mb-2">Customer Journey Mapping</h3>
                  <p className="text-sm text-gray-600">
                    Identify friction points and opportunities throughout the buyer's journey
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
                  <div className="bg-prometheus-orange text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    3
                  </div>
                  <h3 className="text-lg font-semibold text-prometheus-navy mb-2">Tech Stack Assessment</h3>
                  <p className="text-sm text-gray-600">
                    Evaluate your tools against your business goals and identify gaps
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
                  <div className="bg-prometheus-orange text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    4
                  </div>
                  <h3 className="text-lg font-semibold text-prometheus-navy mb-2">Growth Strategy Development</h3>
                  <p className="text-sm text-gray-600">
                    Create a clear roadmap for technology and process improvements
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
                  <div className="bg-prometheus-orange text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    5
                  </div>
                  <h3 className="text-lg font-semibold text-prometheus-navy mb-2">Implementation Planning</h3>
                  <p className="text-sm text-gray-600">
                    Define specific actions, timelines, and accountabilities
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Button asChild size="lg" className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
                <Link to="/book-audit">Download Our Strategy Framework</Link>
              </Button>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-6">
              Strategy in Action
            </h2>
            
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-prometheus-navy mb-6">
                Case Study: Southern Restoration Group
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-4 flex items-center">
                    <span className="bg-red-200 text-red-800 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs font-bold">1</span>
                    Before Prometheus
                  </h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span>Disconnected marketing and dispatch systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span>No visibility into marketing ROI</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span>Reactive approach to emergency restoration leads</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span>Tech investments failing to deliver expected returns</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-medium text-prometheus-navy mb-4 flex items-center">
                    <span className="bg-prometheus-navy text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs font-bold">2</span>
                    Strategy Development
                  </h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-prometheus-navy font-bold">•</span>
                      <span>Comprehensive tech stack audit and gap analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-prometheus-navy font-bold">•</span>
                      <span>Customer journey mapping for emergency and scheduled services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-prometheus-navy font-bold">•</span>
                      <span>Integration roadmap connecting marketing, sales, and operations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-prometheus-navy font-bold">•</span>
                      <span>AI implementation plan for lead scoring and routing</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-4 flex items-center">
                    <span className="bg-green-200 text-green-800 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs font-bold">3</span>
                    After Implementation
                  </h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">•</span>
                      <span>Single view of customer across all touchpoints</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">•</span>
                      <span>Real-time marketing ROI reporting by channel and campaign</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">•</span>
                      <span>40% increase in captured emergency leads</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">•</span>
                      <span>22% reduction in overall MarTech spend</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <CTABanner 
          title="Ready for Strategic Clarity?"
          description="Book a Strategy Session to begin developing your roadmap from tech chaos to controlled growth."
          buttonText="Book Your Strategy Session"
          buttonLink="/book-audit"
        />
      </main>
      <Footer />
    </div>
  );
};

export default GTMStrategy;
