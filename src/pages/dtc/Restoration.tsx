
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EnhancedCTABanner from '@/components/shared/EnhancedCTABanner';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Map, Award } from 'lucide-react';

const Restoration = () => {
  // Replace with your actual HubSpot Form ID for the restoration vertical
  const RESTORATION_FORM_ID = "your-restoration-form-id";

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Restoration Marketing Technology Solutions | Prometheus Agency</title>
        <meta 
          name="description" 
          content="Surface every lost job lead. Prometheus Agency helps restoration companies capture more emergency calls, optimize dispatch, and maximize revenue per crew." 
        />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <div className="bg-prometheus-navy text-white py-16">
          <div className="container">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              Restoration Solutions: Surface Every Lost Job Lead
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mb-8">
              Transform your tech stack into a lead-generating machine that captures every emergency call and optimizes dispatch.
            </p>
            <Button asChild size="lg" className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
              <Link to="/book-audit">Book Restoration Growth Audit</Link>
            </Button>
          </div>
        </div>
        
        <div className="container py-16">
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-6">
              Fill Tomorrow's Truck Rolls Today
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <p className="text-gray-600">
                Restoration companies face a unique challenge: emergency leads need immediate response, while your crews and equipment have limited capacity. Missing a call or delaying follow-up means lost revenue that you can't get back.
              </p>
              <p className="text-gray-600">
                Our restoration-specific solutions ensure you capture every lead, respond instantly, and optimize your crew scheduling to maximize revenue without sacrificing quality.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-200 mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-6">
              Our 48-Hour Pipeline Surge Guarantee
            </h2>
            <p className="text-gray-600 mb-8">
              We're so confident in our ability to improve your lead capture and response that we offer a guarantee: Within 48 hours of implementing our initial recommendations, you'll see a measurable increase in qualified restoration leads—or we'll work for free until you do.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm flex gap-4">
                <Clock className="h-6 w-6 text-prometheus-orange shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-prometheus-navy mb-2">Immediate Audit</h3>
                  <p className="text-gray-600">Comprehensive audit of your current lead capture system</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm flex gap-4">
                <CheckCircle className="h-6 w-6 text-prometheus-orange shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-prometheus-navy mb-2">Rapid Response</h3>
                  <p className="text-gray-600">Implementation of rapid-response protocols</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm flex gap-4">
                <Map className="h-6 w-6 text-prometheus-orange shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-prometheus-navy mb-2">Connected Tracking</h3>
                  <p className="text-gray-600">Connection of call tracking to dispatch software</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm flex gap-4">
                <Award className="h-6 w-6 text-prometheus-orange shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-prometheus-navy mb-2">Smart Prioritization</h3>
                  <p className="text-gray-600">AI-powered lead prioritization based on job type and location</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Button asChild size="lg" className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
                <Link to="/book-audit">Claim Your 48-Hour Pipeline Surge</Link>
              </Button>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-6">
              Hear From Restoration Leaders Like You
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 mb-6 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Video Testimonial Coming Soon</p>
              </div>
              <blockquote className="text-gray-700 italic mb-6 text-lg">
                "Before working with Prometheus, we were missing at least 30% of our emergency calls during peak seasons. Their system not only captured those leads but helped us prioritize dispatch based on job value and crew availability. We've increased revenue by 42% without adding a single truck."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-prometheus-orange/20 flex items-center justify-center text-prometheus-orange font-bold mr-4">
                  MJ
                </div>
                <div>
                  <div className="font-medium text-prometheus-navy">Michael Johnson</div>
                  <div className="text-sm text-gray-600">
                    Operations Director, Mid-South Restoration
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <EnhancedCTABanner 
          title="Ready to Surface Every Lost Job Lead?"
          description="Book a Growth Audit specifically tailored for restoration companies. We'll identify opportunities to capture more emergency leads and optimize your dispatch and follow-up processes."
          buttonText="Book Your Restoration Growth Audit"
          buttonLink="/book-audit"
          hubspotFormId={RESTORATION_FORM_ID}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Restoration;
