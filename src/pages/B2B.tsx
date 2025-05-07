
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/shared/CTABanner';
import { Button } from '@/components/ui/button';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

const B2B = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>B2B Growth Solutions | Manufacturing & Professional Services | Prometheus</title>
        <meta name="description" content="Transform your B2B tech stack into a unified growth engine. Prometheus helps manufacturing and professional services firms drive pipeline and close more deals." />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-prometheus-navy text-white py-16">
          <div className="container">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              Win More B2B Deals with Controlled Tech
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mb-8">
              Streamline complex B2B sales cycles and turn technology friction into a competitive advantage.
            </p>
            <Button asChild size="lg" className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
              <Link to="/book-audit">Request Your Free Audit</Link>
            </Button>
          </div>
        </div>
        
        <div className="container py-16">
          {/* Front-end Offer Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-6">
                Get Your Free B2B Tech Stack Audit
              </h2>
              <p className="text-gray-700 mb-6">
                Discover how your current marketing and sales technology compares to industry leaders. Our team will analyze your tech stack and identify opportunities to drive more qualified pipeline in the next 90 days.
              </p>
              <Button asChild size="lg" className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
                <Link to="/book-audit">Request Your Free Audit</Link>
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-prometheus-navy mb-6">
                Your Free B2B Tech Stack Audit Includes:
              </h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-prometheus-orange mt-0.5" />
                  <span>Comprehensive analysis of your current sales technology stack</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-prometheus-orange mt-0.5" />
                  <span>Identification of key friction points in your buyer's journey</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-prometheus-orange mt-0.5" />
                  <span>Actionable recommendations to shorten sales cycles</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-prometheus-orange mt-0.5" />
                  <span>Industry benchmarks and competitive analysis</span>
                </li>
              </ul>
              <Button asChild size="lg" className="w-full bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
                <Link to="/book-audit">Request Your Free Audit</Link>
              </Button>
            </div>
          </div>
          
          {/* Pain & Possibility Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="bg-red-50 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-prometheus-navy mb-6">The B2B Tech Challenge</h2>
              <p className="text-gray-700 mb-4">Most B2B companies struggle with disconnected systems, leading to:</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <span>Marketing campaigns that don't generate qualified leads</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <span>Sales teams that don't trust marketing data</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <span>Executive teams that can't see clear ROI</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <span>Tech investments that don't deliver expected returns</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-prometheus-navy mb-6">What If Your Tech Actually Worked?</h2>
              <p className="text-gray-700 mb-4">Imagine a B2B growth system where:</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Marketing and sales run from the same playbook</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Every campaign connects directly to pipeline value</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Your CRM becomes the single source of truth</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>AI automates follow-up and scoring, freeing your team to close</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Vertical Links Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-prometheus-navy mb-8 text-center">
              Industry-Specific Solutions
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-prometheus-navy mb-3">Manufacturing</h3>
                <p className="text-gray-600 mb-6">
                  Turn idle line-time into booked POs with tech that connects marketing to production capacity.
                </p>
                <Link to="/b2b/manufacturing" className="text-prometheus-orange hover:text-prometheus-orange/80 font-medium flex items-center">
                  Explore Manufacturing Solutions <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-prometheus-navy mb-3">Professional Services</h3>
                <p className="text-gray-600 mb-6">
                  Cut proposal cycles by 30% and connect marketing directly to billable hours.
                </p>
                <span className="text-gray-400 flex items-center">
                  Professional Services Solutions (Coming Soon) <ChevronRight className="ml-1 h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
          
          {/* Social Proof Carousel */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-8 text-center">
              B2B Success Stories
            </h2>
            
            <Carousel className="w-full max-w-4xl mx-auto">
              <CarouselContent>
                <CarouselItem>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                    <p className="text-gray-700 italic mb-4">
                      "Prometheus transformed our disconnected tech stack into a unified growth engine. Our sales cycle shortened by 35% and we've seen a 40% increase in qualified opportunities."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-prometheus-navy flex items-center justify-center text-white font-semibold">
                        JD
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">John Doe</p>
                        <p className="text-sm text-gray-500">CMO, Manufacturing Firm</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                
                <CarouselItem>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                    <p className="text-gray-700 italic mb-4">
                      "For the first time, our sales team actually trusts the leads coming from marketing. The unified approach that Prometheus implemented has transformed our business."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-prometheus-navy flex items-center justify-center text-white font-semibold">
                        JS
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">Jane Smith</p>
                        <p className="text-sm text-gray-500">Director of Sales, Professional Services</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                
                <CarouselItem>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                    <p className="text-gray-700 italic mb-4">
                      "The ROI from our tech investments has quadrupled since working with Prometheus. Their approach to unifying our systems has been game-changing."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-prometheus-navy flex items-center justify-center text-white font-semibold">
                        RJ
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">Robert Johnson</p>
                        <p className="text-sm text-gray-500">CEO, Manufacturing Solutions Inc.</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>
          
          {/* CTA Section */}
          <div className="bg-prometheus-navy text-white p-8 rounded-lg text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Ready to Win More B2B Deals?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Book a Growth Audit to discover how we can transform your tech stack into a pipeline-generating machine.
            </p>
            <Button asChild size="lg" className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
              <Link to="/book-audit">Book Your Growth Audit</Link>
            </Button>
          </div>
        </div>
        
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default B2B;
