
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/shared/CTABanner';
import { ChevronRight } from 'lucide-react';

const services = [
  {
    title: 'AI Enablement & Integration',
    description: 'Leverage AI to automate workflows, enhance customer experiences, and drive data-driven decisions.',
    color: 'bg-prometheus-orange',
    link: '/services/ai-enablement',
    highlight: true
  },
  {
    title: 'Consulting & GTM Strategy',
    description: 'Develop and execute go-to-market strategies that align technology investments with business outcomes.',
    color: 'bg-prometheus-gold',
    link: '/services/consulting-gtm',
    highlight: true
  },
  {
    title: 'CRM Implementation',
    description: 'Design, implement, and optimize CRM systems that drive adoption and deliver measurable ROI.',
    color: 'bg-prometheus-navy',
    link: '/services/crm-implementation',
    highlight: false
  },
  {
    title: 'Customer Journey Mapping',
    description: 'Map and optimize every touchpoint in your customer journey to reduce friction and increase conversions.',
    color: 'bg-prometheus-navy',
    link: '/services/customer-journey',
    highlight: false
  },
  {
    title: 'Paid Media Management',
    description: 'Strategic campaign development and management that maximizes return on ad spend.',
    color: 'bg-prometheus-navy',
    link: '/services/paid-media',
    highlight: false
  },
  {
    title: 'Reporting & Analytics',
    description: 'Custom dashboards and reporting systems that transform data into actionable insights.',
    color: 'bg-prometheus-navy',
    link: '/services/reporting-analytics',
    highlight: false
  }
];

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gray-50 py-16">
          <div className="container">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-prometheus-navy mb-6 text-center">
              Our Services
            </h1>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
              We deliver specialized expertise across key marketing technology domains to help you tame the tech and unleash growth.
            </p>
          </div>
        </div>
        
        <div className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg shadow-md border ${service.highlight ? 'border-gray-200 shadow-lg' : 'border-gray-100'}`}
              >
                <div className={`h-2 ${service.color} rounded-t-lg`}></div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-prometheus-navy mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <Link to={service.link} className="text-prometheus-orange hover:text-prometheus-orange/80 font-medium flex items-center">
                    Learn More <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white py-16 border-y border-gray-100">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-8 text-center">
              Our Process
            </h2>
            
            <div className="relative">
              <div className="hidden md:block absolute left-0 top-1/2 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-prometheus-navy text-white rounded-full flex items-center justify-center mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Map</h3>
                  <p className="text-gray-600">
                    We audit your current tech stack, map customer journeys, and identify opportunity gaps.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-prometheus-orange text-white rounded-full flex items-center justify-center mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Build</h3>
                  <p className="text-gray-600">
                    We implement optimized systems, workflows, and integrations tailored to your goals.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-prometheus-gold text-white rounded-full flex items-center justify-center mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Train</h3>
                  <p className="text-gray-600">
                    We ensure your team is equipped with the knowledge and resources to maintain growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
