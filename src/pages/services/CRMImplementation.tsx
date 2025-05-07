
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/shared/CTABanner';
import { Button } from '@/components/ui/button';
import { Database, Users, Layers, Award } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const CRMImplementation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>CRM Implementation & Integration Services | Memphis TN | Prometheus</title>
        <meta 
          name="description" 
          content="Turn your database into a deal base. Prometheus provides expert CRM implementation, integration, and optimization services for HubSpot, Salesforce, and more." 
        />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <div className="bg-prometheus-navy text-white py-16">
          <div className="container">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              CRM Implementation: Your Database Becomes the Deal Base
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mb-8">
              Transform disconnected data into a unified customer view that drives revenue.
            </p>
            <Button asChild size="lg" className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
              <Link to="/book-audit">Book a CRM Assessment</Link>
            </Button>
          </div>
        </div>
        
        <div className="container py-16">
          <div className="mb-12">
            <p className="text-lg text-gray-600 mb-8 max-w-3xl">
              A properly implemented CRM is the command center of your Growth Engine—connecting marketing, sales, and service around a single view of your customer. We design, build, and optimize CRM systems that drive measurable business results, not just organize contacts.
            </p>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-8">
              Comprehensive CRM Services
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 flex gap-6">
                <div className="bg-prometheus-orange/10 rounded-full p-3 h-min">
                  <Database className="h-8 w-8 text-prometheus-orange" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-prometheus-navy mb-2">
                    CRM Selection & Strategy
                  </h3>
                  <p className="text-gray-600">
                    We help you choose and design the right CRM system based on your business goals, team capabilities, and existing technology.
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 flex gap-6">
                <div className="bg-prometheus-orange/10 rounded-full p-3 h-min">
                  <Layers className="h-8 w-8 text-prometheus-orange" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-prometheus-navy mb-2">
                    Implementation & Migration
                  </h3>
                  <p className="text-gray-600">
                    Our team handles the technical heavy lifting, from data migration and field mapping to workflow configuration and integration with your existing tools.
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 flex gap-6">
                <div className="bg-prometheus-orange/10 rounded-full p-3 h-min">
                  <Users className="h-8 w-8 text-prometheus-orange" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-prometheus-navy mb-2">
                    Training & Adoption
                  </h3>
                  <p className="text-gray-600">
                    We ensure your team not only knows how to use the system but embraces it as a vital part of their daily work.
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 flex gap-6">
                <div className="bg-prometheus-orange/10 rounded-full p-3 h-min">
                  <Award className="h-8 w-8 text-prometheus-orange" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-prometheus-navy mb-2">
                    Ongoing Optimization
                  </h3>
                  <p className="text-gray-600">
                    Regular reviews, updates, and enhancements keep your CRM aligned with your evolving business needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-8">
              Platform Expertise
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold text-prometheus-navy">HubSpot CRM</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    As a certified HubSpot Agency Partner, we specialize in implementing, integrating, and optimizing the complete HubSpot Growth Suite.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold text-prometheus-navy">Salesforce</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our Salesforce experts configure, customize, and integrate this powerful platform to meet your specific business requirements.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold text-prometheus-navy">Other CRM Platforms</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We also work with platforms like Microsoft Dynamics, Zoho, and industry-specific CRMs for restoration, manufacturing, and more.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-6">
              CRM Success Stories
            </h2>
            
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-prometheus-navy mb-6">Case Study: MidSouth Professional Services</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-medium text-prometheus-navy mb-3">Business Challenge:</h4>
                  <ul className="space-y-2 list-disc list-inside text-gray-600">
                    <li>Contact data spread across 5 different systems</li>
                    <li>No single view of client interactions</li>
                    <li>Manual reporting requiring 20+ hours monthly</li>
                    <li>Sales team reluctant to adopt previous CRM attempts</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-prometheus-navy mb-3">Solution Implemented:</h4>
                  <ul className="space-y-2 list-disc list-inside text-gray-600">
                    <li>Complete HubSpot CRM implementation</li>
                    <li>Data migration and cleansing from legacy systems</li>
                    <li>Custom workflow automation for lead routing and follow-up</li>
                    <li>Integration with accounting and project management tools</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-medium text-green-800 mb-4">Results After 90 Days:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg text-center border border-green-100">
                    <div className="text-2xl font-bold text-green-700 mb-1">100%</div>
                    <p className="text-sm text-gray-600">sales team adoption rate</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg text-center border border-green-100">
                    <div className="text-2xl font-bold text-green-700 mb-1">30%</div>
                    <p className="text-sm text-gray-600">increase in lead-to-client conversion</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg text-center border border-green-100">
                    <div className="text-2xl font-bold text-green-700 mb-1">85%</div>
                    <p className="text-sm text-gray-600">reduction in manual reporting time</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg text-center border border-green-100">
                    <div className="text-2xl font-bold text-green-700 mb-1">100%</div>
                    <p className="text-sm text-gray-600">visibility of client journey</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <CTABanner 
          title="Ready to Transform Your CRM?"
          description="Book a CRM Assessment to discover how we can turn your database into a deal-generating machine."
          buttonText="Book Your CRM Assessment"
          buttonLink="/book-audit"
        />
      </main>
      <Footer />
    </div>
  );
};

export default CRMImplementation;
