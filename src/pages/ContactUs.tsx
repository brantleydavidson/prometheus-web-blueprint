
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HubSpotForm from '@/components/forms/HubSpotForm';

const ContactUs = () => {
  // Replace with your actual HubSpot form ID
  const HUBSPOT_CONTACT_FORM_ID = "your-contact-form-id";
  const HUBSPOT_PORTAL_ID = "your-portal-id";
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Contact Prometheus Agency | Marketing Technology Experts</title>
        <meta 
          name="description" 
          content="Get in touch with Prometheus Agency's team of marketing technology experts to transform your tech chaos into controlled growth." 
        />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <div className="bg-prometheus-navy text-white py-16">
          <div className="container">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              Let's Connect
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mb-8">
              Ready to transform your tech chaos into controlled growth? Our team of experts is here to help.
            </p>
          </div>
        </div>
        
        <div className="container py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-6">
                Get in Touch
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form and one of our experts will get back to you within one business day. We're looking forward to learning about your business and how we can help.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-prometheus-orange/20 flex items-center justify-center text-prometheus-orange shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-prometheus-navy">Phone</h3>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-prometheus-orange/20 flex items-center justify-center text-prometheus-orange shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-prometheus-navy">Email</h3>
                    <p className="text-gray-600">contact@prometheusagency.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-prometheus-orange/20 flex items-center justify-center text-prometheus-orange shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-prometheus-navy">Location</h3>
                    <p className="text-gray-600">123 Tech Boulevard, Suite 456<br />Digital City, CA 90210</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-2xl font-semibold text-prometheus-navy mb-6">
                Contact Form
              </h2>
              
              <HubSpotForm 
                portalId={HUBSPOT_PORTAL_ID}
                formId={HUBSPOT_CONTACT_FORM_ID}
                className="hubspot-contact-form"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
