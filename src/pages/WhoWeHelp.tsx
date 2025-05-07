import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/shared/CTABanner';
import { ChevronRight, Factory, Truck, Briefcase, Store } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    quote: "Prometheus transformed how we connect marketing to sales. We've seen a 32% increase in qualified leads that actually convert to production orders.",
    author: "Michael Richardson",
    position: "VP of Marketing",
    company: "Precision Manufacturing Inc",
    segment: "Manufacturing"
  },
  {
    quote: "Before working with Prometheus, we were missing emergency calls because of poor systems. Now we capture 40% more leads and our scheduling is perfectly optimized.",
    author: "Sarah Johnson",
    position: "Operations Director",
    company: "Rapid Response Restoration",
    segment: "Restoration"
  },
  {
    quote: "The ROI on our marketing spend has completely transformed. We finally have visibility into which campaigns drive actual business.",
    author: "David Chen",
    position: "CEO",
    company: "Premier Professional Services",
    segment: "Professional Services"
  }
];

const WhoWeHelp = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Who We Help | B2B & DTC Growth Solutions | Prometheus Agency</title>
        <meta 
          name="description" 
          content="Prometheus Agency delivers specialized marketing technology solutions for Manufacturing, Restoration, and other mid-market businesses seeking controlled, measurable growth." 
        />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gray-50 py-16">
          <div className="container">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-prometheus-navy mb-6 text-center">
              Who We Help: Turning Tech Chaos Into Growth
            </h1>
            <div className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 space-y-4">
              <p>
                Mid-market businesses face unique challenges: too many tools, disconnected data, and teams that aren't aligned. We specialize in bringing order to this complexity through tailored solutions for both B2B and direct-to-consumer companies.
              </p>
              <p>
                Our approach transforms your tech stack into a unified Growth Engine that delivers measurable results—no matter your industry.
              </p>
            </div>
          </div>
        </div>
        
        {/* B2B & DTC Sections */}
        <div className="container py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold text-prometheus-navy mb-4 flex items-center">
              <Factory className="mr-2 text-prometheus-orange" /> B2B Solutions That Drive Pipeline
            </h2>
            <p className="text-gray-600 mb-8">
              For manufacturing firms and professional services companies, we build systems that connect marketing activities directly to sales outcomes. No more guesswork about which efforts are driving revenue.
            </p>
            <Button asChild className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
              <Link to="/b2b">Explore B2B Solutions</Link>
            </Button>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold text-prometheus-navy mb-4 flex items-center">
              <Store className="mr-2 text-prometheus-orange" /> DTC Solutions That Maximize Customer Value
            </h2>
            <p className="text-gray-600 mb-8">
              Restoration companies and e-commerce brands need to capture every lead and maximize customer lifetime value. Our systems ensure you never miss an opportunity and turn one-time buyers into loyal advocates.
            </p>
            <Button asChild className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
              <Link to="/dtc">Explore DTC Solutions</Link>
            </Button>
          </div>
        </div>
        
        {/* Vertical Expertise Section */}
        <div className="bg-gray-50 py-16">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-semibold text-center text-prometheus-navy mb-12">
              Industry-Specific Expertise
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <Factory className="h-10 w-10 text-prometheus-orange mb-4" />
                <h3 className="text-xl font-semibold text-prometheus-navy mb-2">Manufacturing</h3>
                <p className="text-gray-600 mb-4">
                  End the disconnect between marketing efforts and production capacity. Our manufacturing clients see idle line-time transformed into booked purchase orders.
                </p>
                <Link to="/b2b/manufacturing" className="text-prometheus-orange hover:text-prometheus-orange/80 font-medium flex items-center">
                  Learn More About Manufacturing Solutions <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <Truck className="h-10 w-10 text-prometheus-orange mb-4" />
                <h3 className="text-xl font-semibold text-prometheus-navy mb-2">Restoration</h3>
                <p className="text-gray-600 mb-4">
                  For restoration companies, we surface emergency leads faster and help you fill tomorrow's truck rolls today—turning chaos into controlled growth.
                </p>
                <Link to="/dtc/restoration" className="text-prometheus-orange hover:text-prometheus-orange/80 font-medium flex items-center">
                  Learn More About Restoration Solutions <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 opacity-75">
                <Briefcase className="h-10 w-10 text-prometheus-orange mb-4" />
                <h3 className="text-xl font-semibold text-prometheus-navy mb-2">Professional Services</h3>
                <p className="text-gray-600 mb-4">
                  Cut proposal cycles by 30% and connect marketing directly to billable hours.
                </p>
                <span className="text-gray-500 flex items-center">
                  Professional Services Solutions <span className="text-xs ml-2">(Coming Soon)</span>
                </span>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 opacity-75">
                <Store className="h-10 w-10 text-prometheus-orange mb-4" />
                <h3 className="text-xl font-semibold text-prometheus-navy mb-2">eCommerce</h3>
                <p className="text-gray-600 mb-4">
                  Lift repeat purchase rates by 25% and maximize customer lifetime value.
                </p>
                <span className="text-gray-500 flex items-center">
                  eCommerce Solutions <span className="text-xs ml-2">(Coming Soon)</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonial Carousel */}
        <div className="py-16 container">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-prometheus-navy mb-8">
            Real Results for Real Businesses
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
                      <div className="bg-gray-50 px-4 py-1 rounded inline-block mb-4 text-sm font-medium text-prometheus-navy">
                        {testimonial.segment}
                      </div>
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
        
        {/* CTA Section */}
        <div className="bg-prometheus-navy py-16">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Ready to Tame Your Tech?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Book a Growth Audit to discover how we can transform your tech stack into a revenue-generating machine.
            </p>
            <Button asChild size="lg" className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
              <Link to="/book-audit">Book Your Growth Audit</Link>
            </Button>
          </div>
        </div>
        
        <CTABanner 
          title="Find the Right Solution for Your Business"
          description="Explore our industry-specific approaches and discover how we can help you achieve measurable growth."
          buttonText="Book Your Growth Audit"
          buttonLink="/book-audit"
        />
      </main>
      <Footer />
    </div>
  );
};

export default WhoWeHelp;
