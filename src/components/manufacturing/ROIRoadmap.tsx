
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ROIRoadmap = () => {
  const roadmapPoints = [
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
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-2xl md:text-4xl font-bold text-prometheus-navy text-center mb-12">
          Your 7-Point Manufacturing ROI Roadmap
        </h2>
        <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
          Our manufacturing clients follow a proven path to growth:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {roadmapPoints.map((point) => (
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
  );
};

export default ROIRoadmap;
