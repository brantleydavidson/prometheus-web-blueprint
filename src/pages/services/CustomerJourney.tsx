
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/shared/CTABanner';
import { Button } from '@/components/ui/button';
import { Map, ChartBar, Users, Target } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const CustomerJourney = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Customer Journey Mapping & Optimization | Prometheus Agency</title>
        <meta 
          name="description" 
          content="Identify and address every friction point in your customer's path. Prometheus provides expert customer journey mapping and optimization services." 
        />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <div className="bg-prometheus-navy text-white py-16">
          <div className="container">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              Customer Journey Mapping: From Friction to Flow
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mb-8">
              Eliminate guesswork and identify critical friction points that cost you revenue.
            </p>
            <Button asChild size="lg" className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
              <Link to="/book-audit">Book a Journey Mapping Session</Link>
            </Button>
          </div>
        </div>
        
        <div className="container py-16">
          <div className="mb-12">
            <p className="text-lg text-gray-600 mb-8 max-w-3xl">
              Most businesses guess at how customers interact with their brand. We eliminate the guesswork by mapping the entire customer journey—from first awareness to loyal advocate—and identifying critical friction points that cost you revenue.
            </p>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-8">
              Our Customer Journey Mapping Process
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="bg-prometheus-orange/10 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold text-prometheus-orange">1</span>
                </div>
                <h3 className="text-lg font-semibold text-prometheus-navy mb-2">Discovery</h3>
                <p className="text-gray-600">
                  We interview stakeholders, customers, and team members to understand current experiences
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="bg-prometheus-orange/10 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold text-prometheus-orange">2</span>
                </div>
                <h3 className="text-lg font-semibold text-prometheus-navy mb-2">Data Analysis</h3>
                <p className="text-gray-600">
                  We analyze your CRM, website, and other data sources to identify patterns and bottlenecks
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="bg-prometheus-orange/10 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold text-prometheus-orange">3</span>
                </div>
                <h3 className="text-lg font-semibold text-prometheus-navy mb-2">Journey Visualization</h3>
                <p className="text-gray-600">
                  We create detailed maps of current customer paths across all touchpoints
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="bg-prometheus-orange/10 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold text-prometheus-orange">4</span>
                </div>
                <h3 className="text-lg font-semibold text-prometheus-navy mb-2">Friction Identification</h3>
                <p className="text-gray-600">
                  We highlight where customers get stuck, confused, or abandon their journey
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="bg-prometheus-orange/10 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold text-prometheus-orange">5</span>
                </div>
                <h3 className="text-lg font-semibold text-prometheus-navy mb-2">Optimization Planning</h3>
                <p className="text-gray-600">
                  We develop specific recommendations to remove friction and improve conversion
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="bg-prometheus-orange/10 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold text-prometheus-orange">6</span>
                </div>
                <h3 className="text-lg font-semibold text-prometheus-navy mb-2">Implementation Support</h3>
                <p className="text-gray-600">
                  We help execute the changes across technology, content, and process
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-8">
              Why Map Your Customer Journey?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-prometheus-orange/10 p-3 rounded-full">
                    <ChartBar className="h-6 w-6 text-prometheus-orange" />
                  </div>
                  <h3 className="text-xl font-semibold text-prometheus-navy">Increased Conversion Rates</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    By identifying and fixing friction points, we've helped clients improve conversion rates by 30-40% at key journey stages.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-prometheus-orange/10 p-3 rounded-full">
                    <Target className="h-6 w-6 text-prometheus-orange" />
                  </div>
                  <h3 className="text-xl font-semibold text-prometheus-navy">Reduced Customer Acquisition Costs</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    When your journey flows smoothly, you spend less on marketing to achieve the same results.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-prometheus-orange/10 p-3 rounded-full">
                    <Users className="h-6 w-6 text-prometheus-orange" />
                  </div>
                  <h3 className="text-xl font-semibold text-prometheus-navy">Improved Customer Retention</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Understanding post-purchase journeys helps increase repeat business and referrals.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-prometheus-orange/10 p-3 rounded-full">
                    <Map className="h-6 w-6 text-prometheus-orange" />
                  </div>
                  <h3 className="text-xl font-semibold text-prometheus-navy">Aligned Teams</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    A shared view of the customer journey gets marketing, sales, and service teams on the same page.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-prometheus-navy mb-6">
              Journey Mapping Success Stories
            </h2>
            
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-prometheus-navy mb-6">Case Study: Regional Restoration Company</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-medium text-prometheus-navy mb-3">Business Challenge:</h4>
                  <ul className="space-y-2 list-disc list-inside text-gray-600">
                    <li>40% of emergency calls not converting to booked jobs</li>
                    <li>Unclear why qualified leads weren't progressing</li>
                    <li>Inconsistent customer experience across locations</li>
                    <li>High customer acquisition costs</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-prometheus-navy mb-3">Solution Implemented:</h4>
                  <ul className="space-y-2 list-disc list-inside text-gray-600">
                    <li>Comprehensive mapping of emergency and scheduled service journeys</li>
                    <li>Analysis of call recordings and form submissions to identify friction</li>
                    <li>Technology audit to find system disconnections affecting the experience</li>
                    <li>Implementation of streamlined intake and dispatch process</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-medium text-green-800 mb-4">Results After Implementation:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg flex items-center gap-4 border border-green-100">
                    <div className="text-2xl font-bold text-green-700 w-16 text-center">35%</div>
                    <p className="text-gray-600">increase in emergency call conversion rate</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg flex items-center gap-4 border border-green-100">
                    <div className="text-2xl font-bold text-green-700 w-16 text-center">✓</div>
                    <p className="text-gray-600">Identified and fixed broken form submission process</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg flex items-center gap-4 border border-green-100">
                    <div className="text-2xl font-bold text-green-700 w-16 text-center">28%</div>
                    <p className="text-gray-600">reduction in customer acquisition costs</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg flex items-center gap-4 border border-green-100">
                    <div className="text-2xl font-bold text-green-700 w-16 text-center">✓</div>
                    <p className="text-gray-600">Consistent experience implemented across locations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <CTABanner 
          title="Ready to Optimize Your Customer Journey?"
          description="Book a Journey Mapping Session to identify friction points costing you revenue."
          buttonText="Book Your Journey Mapping Session"
          buttonLink="/book-audit"
        />
      </main>
      <Footer />
    </div>
  );
};

export default CustomerJourney;
