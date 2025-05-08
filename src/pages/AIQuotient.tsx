
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import QuotientForm from '@/components/forms/QuotientForm';
import EnhancedCTABanner from '@/components/shared/EnhancedCTABanner';

const AIQuotient = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>AI Quotient Assessment | Prometheus Agency</title>
        <meta 
          name="description" 
          content="Discover your organization's AI readiness with our comprehensive AI Quotient assessment. Get a personalized report with actionable insights." 
        />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <div className="bg-prometheus-navy text-white py-16">
          <div className="container max-w-4xl mx-auto px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              What's Your AI Quotient?
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mb-4">
              Discover how ready your organization is to implement and benefit from AI technologies.
            </p>
            <p className="text-lg text-gray-400">
              Complete our assessment to receive a personalized report with actionable insights.
            </p>
          </div>
        </div>
        
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <QuotientForm />
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
    </div>
  );
};

export default AIQuotient;
