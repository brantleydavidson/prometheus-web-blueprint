
import React from 'react';
import { Separator } from '@/components/ui/separator';

const Blueprint = () => {
  return (
    <div className="container mx-auto py-12 max-w-4xl print:py-4">
      <div className="print:hidden mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-prometheus-navy">Prometheus Website Content Blueprint</h1>
        <button 
          onClick={() => window.print()} 
          className="bg-prometheus-navy text-white px-4 py-2 rounded hover:bg-prometheus-navy/90"
        >
          Export as PDF
        </button>
      </div>

      <div className="space-y-12 print:space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-prometheus-navy mb-4">Brand Voice Guidelines</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Professional but approachable:</strong> Authoritative without being condescending</li>
            <li><strong>Solutions-oriented:</strong> Focus on outcomes, not just features</li>
            <li><strong>Data-driven:</strong> Include specific metrics and results where possible</li>
            <li><strong>Industry-specific:</strong> Address unique pain points for each vertical</li>
            <li><strong>Confident but humble:</strong> Demonstrate expertise without sounding boastful</li>
          </ul>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold text-prometheus-navy mb-4">Homepage Content</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-prometheus-navy mb-2">Hero Section</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Headline:</strong> "Tame the Tech. Unleash the Growth."</li>
              <li><strong>Subheadline:</strong> High-performance marketing operations that connect technology investments to revenue outcomes</li>
              <li><strong>KPI Highlight:</strong> Client average revenue growth: +62%</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-prometheus-navy mb-2">Who We Help Section</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>B2B Copy:</strong> 2-3 sentences on solving B2B sales friction</li>
              <li><strong>DTC Copy:</strong> 2-3 sentences on increasing conversion rates</li>
              <li><strong>Manufacturing:</strong> "Turn idle line-time into booked POs."</li>
              <li><strong>Professional Services:</strong> "Cut proposal cycles by 30%."</li>
              <li><strong>Restoration:</strong> "Surface 40% more emergency leads."</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-prometheus-navy mb-2">Process Strip</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Map:</strong> 1-2 sentences on initial assessment and strategy</li>
              <li><strong>Build:</strong> 1-2 sentences on implementation and integration</li>
              <li><strong>Train:</strong> 1-2 sentences on knowledge transfer and ongoing support</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-prometheus-navy mb-2">Proof Ribbon</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>KPI Card 1:</strong> Specific metric with industry context</li>
              <li><strong>KPI Card 2:</strong> Specific metric with industry context</li>
              <li><strong>KPI Card 3:</strong> Specific metric with industry context</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-prometheus-navy mb-2">CTA Banner</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Headline:</strong> Ready to Transform Your Growth Strategy?</li>
              <li><strong>Subheadline:</strong> Schedule a free 30-minute Growth Audit with our team of experts</li>
            </ul>
          </div>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-prometheus-navy mb-4">B2B Page Content</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-prometheus-navy mb-2">Header</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Headline:</strong> Win More B2B Deals</li>
              <li><strong>Introduction:</strong> 2-3 sentences on streamlining complex B2B sales cycles</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-prometheus-navy mb-2">Pain to Possibility</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Pain:</strong> B2B companies struggle with disconnected sales and marketing systems</li>
              <li><strong>Possibility:</strong> Integrated approach that aligns marketing and sales</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-prometheus-navy mb-2">Verticals</h3>
            <h4 className="font-medium text-gray-700 mb-1">Manufacturing</h4>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Tagline:</strong> "Turn idle line-time into booked POs."</li>
              <li><strong>Solution 1:</strong> Optimize production scheduling based on real-time demand</li>
              <li><strong>Solution 2:</strong> Streamline quote-to-cash processes for faster closes</li>
              <li><strong>Solution 3:</strong> Implement AI-powered forecasting for resource planning</li>
            </ul>
            
            <h4 className="font-medium text-gray-700 mb-1">Professional Services</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Tagline:</strong> "Cut proposal cycles by 30%."</li>
              <li><strong>Solution 1:</strong> Automate proposal creation with intelligent templates</li>
              <li><strong>Solution 2:</strong> Implement value-based pricing strategies</li>
              <li><strong>Solution 3:</strong> Create seamless client onboarding experiences</li>
            </ul>
          </div>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-prometheus-navy mb-4">DTC Page Content</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-prometheus-navy mb-2">Header</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Headline:</strong> Sell More Direct-to-Consumer</li>
              <li><strong>Introduction:</strong> 2-3 sentences on capturing leads and building relationships</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-prometheus-navy mb-2">Pain to Possibility</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Pain:</strong> DTC businesses struggle with fragmented customer data</li>
              <li><strong>Possibility:</strong> Unified customer view with personalized journeys</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-prometheus-navy mb-2">Verticals</h3>
            <h4 className="font-medium text-gray-700 mb-1">Restoration</h4>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Tagline:</strong> "Surface 40% more emergency leads."</li>
              <li><strong>Solution 1:</strong> 24/7 lead capture optimization for emergency services</li>
              <li><strong>Solution 2:</strong> Local SEO and geographic targeting strategies</li>
              <li><strong>Solution 3:</strong> Insurance company relationship management systems</li>
            </ul>
            
            <h4 className="font-medium text-gray-700 mb-1">eCommerce (Coming Soon)</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Tagline:</strong> "Lift repeat purchase rate by 25%."</li>
              <li><strong>Solution 1:</strong> Personalized customer journey optimization</li>
              <li><strong>Solution 2:</strong> Subscription model development and implementation</li>
              <li><strong>Solution 3:</strong> Post-purchase engagement strategies</li>
            </ul>
          </div>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-prometheus-navy mb-4">Services Page Content</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <h3 className="text-lg font-medium text-prometheus-navy mb-2">AI Enablement & Integration</h3>
              <p className="text-sm text-gray-600">Leverage AI to automate workflows, enhance customer experiences, and drive data-driven decisions.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-prometheus-navy mb-2">Consulting & GTM Strategy</h3>
              <p className="text-sm text-gray-600">Develop and execute go-to-market strategies that align technology investments with business outcomes.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-prometheus-navy mb-2">CRM Implementation</h3>
              <p className="text-sm text-gray-600">Design, implement, and optimize CRM systems that drive adoption and deliver measurable ROI.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-prometheus-navy mb-2">Customer Journey Mapping</h3>
              <p className="text-sm text-gray-600">Map and optimize every touchpoint in your customer journey to reduce friction and increase conversions.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-prometheus-navy mb-2">Paid Media Management</h3>
              <p className="text-sm text-gray-600">Strategic campaign development and management that maximizes return on ad spend.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-prometheus-navy mb-2">Reporting & Analytics</h3>
              <p className="text-sm text-gray-600">Custom dashboards and reporting systems that transform data into actionable insights.</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium text-prometheus-navy mb-2">Process</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Map:</strong> We audit your current tech stack, map customer journeys, and identify opportunity gaps.</li>
              <li><strong>Build:</strong> We implement optimized systems, workflows, and integrations tailored to your goals.</li>
              <li><strong>Train:</strong> We ensure your team is equipped with the knowledge and resources to maintain growth.</li>
            </ul>
          </div>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-prometheus-navy mb-4">Who We Help Page Content</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-prometheus-navy mb-2">Introduction</h3>
            <p className="text-sm text-gray-600">2-3 sentences about industry-specific expertise and transformative results</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-prometheus-navy mb-2">B2B Verticals</h3>
            
            <h4 className="font-medium text-gray-700 mb-1">Manufacturing</h4>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Paragraph on unique manufacturing challenges</li>
              <li>3 bullet points of specific solutions offered</li>
              <li>Success metric or case study reference</li>
            </ul>
            
            <h4 className="font-medium text-gray-700 mb-1">Professional Services</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Paragraph on unique professional services challenges</li>
              <li>3 bullet points of specific solutions offered</li>
              <li>Success metric or case study reference</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-prometheus-navy mb-2">DTC Verticals</h3>
            
            <h4 className="font-medium text-gray-700 mb-1">Restoration</h4>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Paragraph on unique restoration challenges</li>
              <li>3 bullet points of specific solutions offered</li>
              <li>Success metric or case study reference</li>
            </ul>
            
            <h4 className="font-medium text-gray-700 mb-1">eCommerce (Coming Soon)</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Paragraph on unique eCommerce challenges</li>
              <li>3 bullet points of specific solutions offered</li>
              <li>Success metric or case study reference</li>
            </ul>
          </div>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-prometheus-navy mb-4">Content Requirements</h2>
          
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Specificity:</strong> Avoid generic marketing language; use specific industry terminology and concrete examples</li>
            <li><strong>Data Points:</strong> Include at least one verifiable metric or KPI for each major section</li>
            <li><strong>Consistency:</strong> Maintain voice and terminology across all pages</li>
            <li><strong>Brevity:</strong> Keep sentences and paragraphs short and impactful</li>
            <li><strong>Action-Oriented:</strong> Every page should have clear next steps for the reader</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Blueprint;
