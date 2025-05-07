
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Factory, ArrowRight, Clock, TrendingUp, Database } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/shared/CTABanner';

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
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-prometheus-navy to-prometheus-navy/90 text-white py-16 md:py-24">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-3/5">
                <h1 className="text-3xl md:text-5xl font-bold mb-6">
                  Manufacturing Solutions: Light Up Dark Factory Data
                </h1>
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                  Turn Idle Line-Time Into Booked POs
                </h2>
                <p className="text-lg mb-6">
                  Manufacturing companies face unique challenges: disconnected systems prevent marketing from knowing current production capacity, while sales teams lack visibility into the marketing pipeline. The result? Feast-or-famine cycles that hurt profitability.
                </p>
                <p className="text-lg mb-8">
                  Our manufacturing-specific solutions bring these systems together, ensuring your marketing efforts drive the right kind of business to maximize production efficiency and profit.
                </p>
                <Button size="lg" className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
                  <Link to="/book-audit">Book a Manufacturing Growth Audit</Link>
                </Button>
              </div>
              <div className="md:w-2/5">
                <div className="bg-white p-6 rounded-lg shadow-xl">
                  <Factory className="h-16 w-16 text-prometheus-orange mb-4" />
                  <h3 className="text-prometheus-navy text-xl font-bold mb-2">
                    Transform Your Manufacturing Tech Stack
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Connect your marketing, sales, and production data to drive more profitable growth.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-gray-700">
                      <TrendingUp className="h-5 w-5 text-prometheus-orange" />
                      <span>Turn idle capacity into revenue</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <Database className="h-5 w-5 text-prometheus-orange" />
                      <span>Connect production to marketing</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <Clock className="h-5 w-5 text-prometheus-orange" />
                      <span>Reduce lead-to-PO timeframes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* 7-Point ROI Roadmap */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-2xl md:text-4xl font-bold text-prometheus-navy text-center mb-12">
              Your 7-Point Manufacturing ROI Roadmap
            </h2>
            <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
              Our manufacturing clients follow a proven path to growth:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  number: 1,
                  title: "Current State Assessment",
                  description: "Map your existing tech stack, data flows, and production capacity tracking"
                },
                {
                  number: 2,
                  title: "CRM Optimization",
                  description: "Connect sales and production data into one source of truth"
                },
                {
                  number: 3,
                  title: "Lead Routing Automation",
                  description: "Ensure leads go to the right rep based on product line and capacity"
                },
                {
                  number: 4,
                  title: "AI-Powered Scoring",
                  description: "Prioritize prospects based on fit, capacity, and profitability"
                },
                {
                  number: 5,
                  title: "Real-time Dashboards",
                  description: "Show marketing, sales, and production data in one view"
                },
                {
                  number: 6,
                  title: "Process Documentation",
                  description: "Ensure your team knows how to use the new system"
                },
                {
                  number: 7,
                  title: "Ongoing Optimization",
                  description: "Regular reviews to continuously improve performance"
                }
              ].map((point) => (
                <Card key={point.number} className="border-t-4 border-t-prometheus-orange h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-prometheus-orange text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                        {point.number}
                      </div>
                      <h3 className="font-semibold text-lg text-prometheus-navy">{point.title}</h3>
                    </div>
                    <p className="text-gray-600">{point.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
              <Button size="lg" className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
                Get Your Free 7-Point ROI Roadmap
              </Button>
            </div>
          </div>
        </section>
        
        {/* Case Timeline Module */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-2xl md:text-4xl font-bold text-prometheus-navy text-center mb-4">
              From Tech Chaos to Manufacturing Control
            </h2>
            <p className="text-xl font-semibold text-center mb-12">Case Study: MidSouth Fabricators</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-12">
              <div>
                <div className="border-l-4 border-gray-300 pl-6 py-4 mb-12 relative">
                  <div className="absolute left-[-13px] top-0 w-6 h-6 rounded-full bg-gray-300 text-white flex items-center justify-center">
                    <span className="sr-only">Before</span>
                  </div>
                  <h3 className="font-bold text-xl mb-4 text-gray-700">Before Prometheus:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 font-bold">•</span>
                      <span>30% production capacity sitting idle</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 font-bold">•</span>
                      <span>Sales team unaware of quick-turn production availability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 font-bold">•</span>
                      <span>Marketing generating leads for over-capacity product lines</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 font-bold">•</span>
                      <span>45+ days from lead to purchase order</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-prometheus-orange pl-6 py-4 relative">
                  <div className="absolute left-[-13px] top-0 w-6 h-6 rounded-full bg-prometheus-orange text-white flex items-center justify-center">
                    <span className="sr-only">After</span>
                  </div>
                  <h3 className="font-bold text-xl mb-4 text-prometheus-navy">After Prometheus:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-prometheus-orange font-bold">•</span>
                      <span>Real-time production capacity visible to sales team</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-prometheus-orange font-bold">•</span>
                      <span>Marketing campaigns aligned with production availability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-prometheus-orange font-bold">•</span>
                      <span>AI lead routing based on capacity and profitability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-prometheus-orange font-bold">•</span>
                      <span className="font-semibold">28% increase in booked POs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-prometheus-orange font-bold">•</span>
                      <span className="font-semibold">22 days average from lead to purchase order</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-100 p-6 rounded-lg">
                <img 
                  src="https://dxufdcvoupjqvxnwnost.supabase.co/storage/v1/object/public/cms-assets/manufacturing-dashboard.png"
                  alt="Real-time manufacturing dashboard showing production capacity, marketing pipeline, and sales forecast"
                  className="w-full h-auto rounded shadow-lg mb-4"
                />
                <p className="text-sm text-gray-600 italic">
                  Integrated dashboard showing production capacity, marketing pipeline, and sales forecast
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
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
