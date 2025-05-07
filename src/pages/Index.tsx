
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import ProofRibbon from '@/components/home/ProofRibbon';
import WhoWeHelp from '@/components/home/WhoWeHelp';
import ProcessStrip from '@/components/home/ProcessStrip';
import ClientReviews from '@/components/home/ClientReviews';
import EnhancedCTABanner from '@/components/shared/EnhancedCTABanner';

const Index = () => {
  // Add effect to help with prerender detection
  useEffect(() => {
    // Signal to Prerender that the page is ready
    const prerenderReady = () => {
      if (window.prerenderReady === undefined) {
        window.prerenderReady = true;
      }
      
      // Log for verification purposes
      console.log('Prerender Ready state set:', window.prerenderReady);
      
      // Update the hidden status div
      const statusDiv = document.getElementById('prerender-status');
      if (statusDiv) {
        statusDiv.textContent = 'Page Ready for Prerender';
      }
    };
    
    // Trigger ready state after components have mounted
    prerenderReady();
    
    // Clean up
    return () => {
      if (window.prerenderReady !== undefined) {
        window.prerenderReady = false;
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Prometheus Agency | Tame Your Tech. Unleash Growth. | CRM & Marketing Experts</title>
        <meta name="description" content="Prometheus Agency helps B2B and DTC businesses transform tech chaos into controlled growth through AI enablement, CRM integration, and revenue-focused marketing strategies." />
        <link rel="canonical" href="https://www.teamprometheus.io/" />
        
        {/* Enhanced Prerender verification meta tags */}
        <meta name="prerender-status-code" content="200" />
        <meta name="prerender-token" content="dKzffLw7ttkED8XRG9R1" />
        <meta name="fragment" content="!" />
        <meta name="prerender" content="prerender-verification-success" />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ProofRibbon />
        <WhoWeHelp />
        <ProcessStrip />
        <ClientReviews />
        <EnhancedCTABanner 
          title="Stop Drowning in Disconnected Tools"
          description="Ready to transform your tech chaos into controlled growth? Book a Growth Audit and discover how our team can help."
          buttonText="Book Your Growth Audit Today"
          buttonLink="/book-audit"
        />
      </main>
      <Footer />
    </div>
  );
};

// Add typescript declaration for window.prerenderReady
declare global {
  interface Window {
    prerenderReady?: boolean;
  }
}

export default Index;
