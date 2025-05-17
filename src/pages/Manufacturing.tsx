
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/shared/CTABanner';
import HeroSection from '@/components/manufacturing/HeroSection';
import ROIRoadmap from '@/components/manufacturing/ROIRoadmap';
import CaseTimeline from '@/components/manufacturing/CaseTimeline';
import Testimonials from '@/components/manufacturing/Testimonials';

const Manufacturing = () => {
  return (
    <>
      <Helmet>
        <title>Manufacturing Marketing Technology Solutions | Prometheus Agency</title>
        <meta 
          name="description" 
          content="Turn idle line-time into booked POs. Prometheus Agency helps manufacturing companies connect marketing efforts directly to production capacity and revenue growth." 
        />
      </Helmet>

      <Navbar />
      
      <main>
        <HeroSection />
        <ROIRoadmap />
        <CaseTimeline />
        <Testimonials />
        
        <CTABanner 
          title="Ready to Light Up Your Dark Factory Data?"
          description="Book a Growth Audit specifically tailored for manufacturing companies. We'll identify opportunities to connect your marketing, sales, and production data to drive more profitable growth."
          buttonText="Book Your Manufacturing Growth Audit"
          buttonLink="/book-audit"
        />
      </main>
      
      <Footer />
    </>
  );
};

export default Manufacturing;
