
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/shared/CTABanner';
import { Button } from '@/components/ui/button';
import { ChevronRight, AlertTriangle, CheckCircle, Award } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote: "Before working with Prometheus, we were missing emergency calls because of poor systems. Now we capture 40% more leads and our scheduling is perfectly optimized.",
    author: "Sarah Johnson",
    position: "Operations Director",
    company: "Rapid Response Restoration",
  },
  {
    quote: "The ROI on our marketing spend has completely transformed. We finally have visibility into which campaigns drive actual business.",
    author: "David Chen",
    position: "CEO",
    company: "Direct Consumer Brands",
  },
  {
    quote: "Our customer lifetime value has increased by 28% since implementing the solutions from Prometheus.",
    author: "Michael Rivera",
    position: "Marketing Director",
    company: "Coastal Restoration Services",
  }
];

const DTC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>DTC Growth Solutions | Restoration & eCommerce | Prometheus Agency</title>
        <meta 
          name="description" 
          content="Maximize customer value with unified DTC technology. Prometheus helps restoration companies and eCommerce brands capture more leads and increase retention." 
        />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <div className="bg-prometheus-navy text-white py-16">
          <div className="container">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              Sell More Direct-to-Consumer with Controlled Tech
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mb-8">
              Transform your tech stack into a customer-generating machine by unifying your marketing and service systems.
            </p>
            <Button asChild size="lg" className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
              <Link to="/book-audit">Book Free Tech Stack Audit</Link>
            </Button>
          </div>
        </div>
        
        <div className="container py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-6">
                Get Your Free DTC Tech Stack Audit
              </h2>
              <p className="text-gray-600 mb-6">
                Discover how your current marketing and customer service technology compares to industry leaders. Our team will analyze your tech stack and identify opportunities to surface more qualified leads in the next 90 days.
              </p>
              <Button asChild size="lg" className="w-full bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
                <Link to="/book-audit">Request Your Free Audit</Link>
              </Button>
            </div>
            
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-6">
                The DTC Tech Challenge
              </h2>
              
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400 flex gap-4">
                  <AlertTriangle className="h-6 w-6 text-red-500 shrink-0 mt-1" />
                  <p className="text-gray-700">
                    <strong>Missed opportunities</strong> due to slow follow-up
                  </p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400 flex gap-4">
                  <AlertTriangle className="h-6 w-6 text-red-500 shrink-0 mt-1" />
                  <p className="text-gray-700">
                    <strong>Disconnected customer data</strong> across multiple systems
                  </p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400 flex gap-4">
                  <AlertTriangle className="h-6 w-6 text-red-500 shrink-0 mt-1" />
                  <p className="text-gray-700">
                    <strong>Marketing that doesn't</strong> drive measurable revenue
                  </p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400 flex gap-4">
                  <AlertTriangle className="h-6 w-6 text-red-500 shrink-0 mt-1" />
                  <p className="text-gray-700">
                    <strong>Customer service teams</strong> working without full context
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 bg-gray-50 p-8 md:p-12 rounded-lg">
            <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-6">
              What If Your Tech Actually Worked?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex gap-4">
                <CheckCircle className="h-6 w-6 text-green-500 shrink-0 mt-1" />
                <p className="text-gray-700">
                  Every lead is captured and followed up within minutes
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex gap-4">
                <CheckCircle className="h-6 w-6 text-green-500 shrink-0 mt-1" />
                <p className="text-gray-700">
                  Customer information flows seamlessly between marketing and service
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex gap-4">
                <CheckCircle className="h-6 w-6 text-green-500 shrink-0 mt-1" />
                <p className="text-gray-700">
                  You track revenue per customer, not just clicks and calls
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex gap-4">
                <CheckCircle className="h-6 w-6 text-green-500 shrink-0 mt-1" />
                <p className="text-gray-700">
                  AI helps prioritize your highest-value opportunities
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <h3 className="text-xl md:text-2xl font-semibold text-prometheus-navy mb-6">
              Industry-Specific Solutions:
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <Award className="h-12 w-12 text-prometheus-orange mb-4" />
                <h3 className="text-xl font-semibold text-prometheus-navy mb-3">Restoration</h3>
                <p className="text-gray-600 mb-6">
                  Surface 40% more emergency leads and fill tomorrow's truck rolls today.
                </p>
                <Link to="/dtc/restoration" className="text-prometheus-orange hover:text-prometheus-orange/80 font-medium flex items-center">
                  Explore Restoration Solutions <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 opacity-60">
                <Award className="h-12 w-12 text-prometheus-orange mb-4" />
                <h3 className="text-xl font-semibold text-prometheus-navy mb-3">eCommerce</h3>
                <p className="text-gray-600 mb-6">
                  Lift repeat purchase rate by 25% and maximize lifetime customer value.
                </p>
                <p className="text-sm text-gray-500">
                  eCommerce Solutions (Coming Soon)
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-center text-prometheus-navy mb-8">
              DTC Success Stories
            </h2>
            
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="max-w-4xl mx-auto"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/1">
                    <div className="p-1">
                      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                        <blockquote className="text-gray-700 italic mb-6 text-lg">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-prometheus-orange/20 flex items-center justify-center text-prometheus-orange font-bold mr-4">
                            {testimonial.author.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-prometheus-navy">{testimonial.author}</div>
                            <div className="text-sm text-gray-600">
                              {testimonial.position}, {testimonial.company}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-8">
                <CarouselPrevious className="static transform-none" />
                <CarouselNext className="static transform-none" />
              </div>
            </Carousel>
          </div>
        </div>
        
        <CTABanner 
          title="Ready to Sell More Direct-to-Consumer?"
          description="Book a Growth Audit to discover how we can transform your tech stack into a customer-generating machine."
          buttonText="Book Your Growth Audit"
          buttonLink="/book-audit"
        />
      </main>
      <Footer />
    </div>
  );
};

export default DTC;
