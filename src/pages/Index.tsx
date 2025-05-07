
import React from 'react';
import { Helmet } from 'react-helmet-async';
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
      <Helmet>
        <title>Prometheus Agency | Tame Your Tech. Unleash Growth. | CRM & Marketing Experts</title>
        <meta name="description" content="Prometheus Agency helps B2B and DTC businesses transform tech chaos into controlled growth through AI enablement, CRM integration, and revenue-focused marketing strategies." />
      </Helmet>
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
