import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import QuotientForm from '@/components/forms/QuotientForm';
import EnhancedCTABanner from '@/components/shared/EnhancedCTABanner';

const AIQuotient = () => {
  // Add effect to help with prerender detection
  useEffect(() => {
    // Signal to Prerender that the page is ready
    const prerenderReady = () => {
      if (window.prerenderReady === undefined) {
        window.prerenderReady = true;
      }
      
      // Log for verification purposes
      console.log('Prerender Ready state set on AIQuotient page');
      
      // Update the hidden status div
      const statusDiv = document.getElementById('prerender-status');
      if (statusDiv) {
        statusDiv.textContent = 'AIQuotient Page Ready for Prerender';
      }
    };
    
    // Set a timeout to ensure content is fully loaded before marking ready
    setTimeout(() => {
      prerenderReady();
    }, 1000);
    
    // Clean up
    return () => {
      if (window.prerenderReady !== undefined) {
        window.prerenderReady = false;
      }
    };
  }, []);
  
  // Log when the page component mounts
  useEffect(() => {
    console.log('AIQuotient page mounted');
    console.log('Current URL:', window.location.href);
    console.log('Current route: /ai-quotient');
    
    // Check for any domain issues
    const isDomainIssue = window.location.hostname === 'undefined' || 
                         window.location.hostname === '' || 
                         !window.location.hostname.includes('.');
    
    if (isDomainIssue) {
      console.error('Domain issue detected on AIQuotient page');
    }
    
    return () => {
      console.log('AIQuotient page unmounted');
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>AI Quotient Assessment | Get Your AI Readiness Score | Prometheus Agency</title>
        <meta 
          name="description" 
          content="Take our quick 25-question AI Quotient assessment to receive your personalized AI readiness score and detailed recommendations across five key pillars of AI implementation." 
        />
        {/* Add canonical URL to ensure proper SEO with domain changes */}
        <link rel="canonical" href="https://teamprometheus.io/ai-quotient" />
        
        {/* Enhanced Prerender verification meta tags */}
        <meta name="prerender-status-code" content="200" />
        <meta name="prerender-token" content="dKzffLw7ttkED8XRG9R1" />
        <meta name="fragment" content="!" />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <div className="bg-prometheus-navy text-white py-16">
          <div className="container max-w-4xl mx-auto px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              What's Your AI Quotient?
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mb-6">
              Take our quick assessment to discover how ready your organization is to implement and benefit from AI technologies across five key pillars.
            </p>
            <div className="bg-white/10 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-prometheus-orange rounded-full h-10 w-10 flex items-center justify-center text-white font-bold">
                  1
                </div>
                <h2 className="text-xl font-semibold">Complete the 25-question assessment (5 minutes)</h2>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-prometheus-orange rounded-full h-10 w-10 flex items-center justify-center text-white font-bold">
                  2
                </div>
                <h2 className="text-xl font-semibold">Get your instant AI Quotient score</h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-prometheus-orange rounded-full h-10 w-10 flex items-center justify-center text-white font-bold">
                  3
                </div>
                <h2 className="text-xl font-semibold">Receive a detailed analysis and action plan</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-8">
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-semibold text-white">Data Spine Health</h3>
                <p className="text-gray-300">The foundation of AI success: your data infrastructure and quality</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-semibold text-white">Funnel Intelligence & Attribution</h3>
                <p className="text-gray-300">How well you track, attribute and optimize your marketing and sales funnel</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-semibold text-white">Automation Maturity</h3>
                <p className="text-gray-300">The sophistication of your existing automation and workflows</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-semibold text-white">AI-Ready Content Operations</h3>
                <p className="text-gray-300">How prepared your content systems are for AI enhancement</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg md:col-span-2">
                <h3 className="font-semibold text-white">Governance & Change Management</h3>
                <p className="text-gray-300">Your organizational readiness to adopt and govern AI technologies</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-prometheus-navy mb-6 text-center">Start Your AI Quotient Assessment</h2>
            <QuotientForm />
          </div>
        </div>
        
        {/* Additional CTA at the bottom of the page */}
        <EnhancedCTABanner 
          title="Accelerate Your AI Journey with Prometheus"
          description="Let our team help you implement AI solutions tailored to your business needs."
          buttonText="Contact Us"
          buttonLink="/contact-us"
        />
      </main>
      <Footer />
      
      {/* Hidden marker for Prerender verification */}
      <div id="prerender-marker" data-testid="prerender-verification" style={{position: 'absolute', bottom: 0, right: 0, opacity: 0.1}}>
        Prerender Verification: dKzffLw7ttkED8XRG9R1
      </div>
    </div>
  );
};

// Add typescript declaration for window.prerenderReady
declare global {
  interface Window {
    prerenderReady?: boolean;
  }
}

export default AIQuotient;
