
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HubSpotForm from '@/components/forms/HubSpotForm';
import { CheckCircle } from 'lucide-react';

const BookAudit = () => {
  // Replace with your actual HubSpot form ID
  const HUBSPOT_AUDIT_FORM_ID = "your-audit-form-id";
  const HUBSPOT_PORTAL_ID = "your-portal-id";
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Book Your Growth Audit | Prometheus Agency</title>
        <meta 
          name="description" 
          content="Book a complimentary Growth Audit with Prometheus Agency's marketing technology experts to uncover hidden revenue opportunities in your tech stack." 
        />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <div className="bg-prometheus-navy text-white py-16">
          <div className="container">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              Book Your Growth Audit
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mb-8">
              Our experts will analyze your current tech stack and marketing systems to identify untapped revenue opportunities.
            </p>
          </div>
        </div>
        
        <div className="container py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-6">
                What to Expect
              </h2>
              <p className="text-gray-600 mb-8">
                Our Growth Audit is a comprehensive analysis of your current marketing technology ecosystem. 
                We'll identify gaps, inefficiencies, and opportunities for optimization.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-prometheus-orange shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-prometheus-navy">Tech Stack Review</h3>
                    <p className="text-gray-600">Comprehensive analysis of your current marketing and sales technology</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-prometheus-orange shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-prometheus-navy">Data Flow Mapping</h3>
                    <p className="text-gray-600">Visual mapping of how data moves through your organization</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-prometheus-orange shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-prometheus-navy">Gap Analysis</h3>
                    <p className="text-gray-600">Identification of missing tools, integrations, or processes</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-prometheus-orange shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-prometheus-navy">Actionable Roadmap</h3>
                    <p className="text-gray-600">Prioritized recommendations for immediate and long-term improvements</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-prometheus-navy mb-2">Client Success Story</h3>
                <blockquote className="text-gray-600 italic">
                  "The Growth Audit uncovered three major gaps in our tech stack that were causing us to lose 30% of our leads. After implementing the recommendations, we saw a 42% increase in qualified opportunities within 60 days."
                </blockquote>
                <p className="mt-3 text-sm text-gray-500">- Marketing Director, B2B Manufacturing Company</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-2xl font-semibold text-prometheus-navy mb-6">
                Schedule Your Audit
              </h2>
              
              <HubSpotForm 
                portalId={HUBSPOT_PORTAL_ID}
                formId={HUBSPOT_AUDIT_FORM_ID}
                className="hubspot-audit-form"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookAudit;
