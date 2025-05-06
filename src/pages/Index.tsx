
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import ProofRibbon from '@/components/home/ProofRibbon';
import WhoWeHelp from '@/components/home/WhoWeHelp';
import ProcessStrip from '@/components/home/ProcessStrip';
import CTABanner from '@/components/shared/CTABanner';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ProofRibbon />
        <WhoWeHelp />
        <ProcessStrip />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
