
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/shared/CTABanner';
import { Button } from '@/components/ui/button';
import { CheckCircle, Lightbulb, Award, Database, ChartLine } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

const AIEnablement = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>AI Enablement & Integration Services | AI Quotient™ | Prometheus Agency</title>
        <meta 
          name="description" 
          content="Score your AI Quotient™ in 2 minutes. Prometheus helps businesses implement practical AI solutions that deliver measurable ROI in as little as 30 days." 
        />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <div className="bg-prometheus-navy text-white py-16">
          <div className="container">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              AI Enablement & Integration: Practical Solutions, Not Promises
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mb-8">
              Implement AI solutions that deliver measurable results and ROI in as little as 30 days.
            </p>
            <Button asChild size="lg" className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
              <Link to="/book-audit">Take the AI Quotient™ Quiz</Link>
            </Button>
          </div>
        </div>
        
        <div className="container py-16">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-6">
              Score Your AI Quotient™ in Just 2 Minutes
            </h2>
            <p className="text-gray-600 mb-8">
              How ready is your business to benefit from practical AI implementation? Take our quick assessment to receive your custom AI Quotient™ score and recommendations.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-8 text-center">
              <p className="text-gray-500 mb-4">Embedded Typeform Quiz Coming Soon</p>
              <Button asChild size="lg" className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
                <Link to="/book-audit">Take the AI Quotient™ Quiz</Link>
              </Button>
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-8">
            Your Path to AI-Powered Growth
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold text-prometheus-navy">QuickStart-30</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  In just 30 days, we'll implement your first AI-powered workflow to automate routine tasks and free up at least 40 team hours per month. Perfect for businesses looking to validate AI's impact quickly.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>30-day implementation timeline</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>One focused AI-powered workflow</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Minimum 40 hours saved monthly</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
                  <Link to="/book-audit">Learn More About QuickStart-30</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold text-prometheus-navy">Lift-90</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Our comprehensive 90-day program identifies and implements multiple AI-powered workflows across marketing, sales, and operations. Clients typically see a 10× return on investment, audited and verified.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>90-day transformation program</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Multiple AI-powered workflows</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Typical 10× ROI, verified</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
                  <Link to="/book-audit">Learn More About Lift-90</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-6">
              AI That Works, Not Just Wows
            </h2>
            <p className="text-gray-600 mb-8">
              Unlike consultants who deliver slide decks about theoretical AI applications, we focus on practical implementations that drive immediate business value:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
                <div className="bg-prometheus-orange/10 rounded-full p-4 inline-flex mb-4">
                  <Lightbulb className="h-8 w-8 text-prometheus-orange" />
                </div>
                <h3 className="text-lg font-semibold text-prometheus-navy mb-2">1. Assess</h3>
                <p className="text-gray-600">
                  We identify high-impact, low-complexity opportunities for AI implementation
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
                <div className="bg-prometheus-orange/10 rounded-full p-4 inline-flex mb-4">
                  <Database className="h-8 w-8 text-prometheus-orange" />
                </div>
                <h3 className="text-lg font-semibold text-prometheus-navy mb-2">2. Build</h3>
                <p className="text-gray-600">
                  Our team configures, tests, and deploys AI solutions integrated with your existing systems
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
                <div className="bg-prometheus-orange/10 rounded-full p-4 inline-flex mb-4">
                  <ChartLine className="h-8 w-8 text-prometheus-orange" />
                </div>
                <h3 className="text-lg font-semibold text-prometheus-navy mb-2">3. Measure</h3>
                <p className="text-gray-600">
                  We track and report on specific KPIs to prove ROI
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
                <div className="bg-prometheus-orange/10 rounded-full p-4 inline-flex mb-4">
                  <Award className="h-8 w-8 text-prometheus-orange" />
                </div>
                <h3 className="text-lg font-semibold text-prometheus-navy mb-2">4. Optimize</h3>
                <p className="text-gray-600">
                  Continuous improvement ensures your AI solutions evolve with your business
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-6">
              AI Success Stories
            </h2>
            
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-prometheus-navy mb-4">Case Study: Memphis Manufacturing Group</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-medium text-prometheus-navy mb-2">Business Challenge:</h4>
                  <ul className="space-y-2 list-disc list-inside text-gray-600">
                    <li>Sales team spending 15+ hours weekly on proposal generation</li>
                    <li>Inconsistent pricing and specifications across quotes</li>
                    <li>72+ hour average response time to RFPs</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-prometheus-navy mb-2">AI Solution Implemented:</h4>
                  <ul className="space-y-2 list-disc list-inside text-gray-600">
                    <li>AI-powered proposal generator integrated with CRM</li>
                    <li>Automated data extraction from RFPs</li>
                    <li>Intelligent pricing recommendation engine</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-medium text-green-800 mb-3">Results After 90 Days:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg text-center border border-green-100">
                    <div className="text-2xl font-bold text-green-700 mb-1">80%</div>
                    <p className="text-sm text-gray-600">reduction in proposal creation time</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg text-center border border-green-100">
                    <div className="text-2xl font-bold text-green-700 mb-1">100%</div>
                    <p className="text-sm text-gray-600">consistency in pricing and specifications</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg text-center border border-green-100">
                    <div className="text-2xl font-bold text-green-700 mb-1">4 hrs</div>
                    <p className="text-sm text-gray-600">average response time to RFPs</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg text-center border border-green-100">
                    <div className="text-2xl font-bold text-green-700 mb-1">$420K</div>
                    <p className="text-sm text-gray-600">additional won business attributed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <CTABanner 
          title="Ready to Put AI to Work in Your Business?"
          description="Book an AI Strategy Session to explore how practical AI implementation can drive measurable results for your business."
          buttonText="Book Your AI Strategy Session"
          buttonLink="/book-audit"
        />
      </main>
      <Footer />
    </div>
  );
};

export default AIEnablement;
