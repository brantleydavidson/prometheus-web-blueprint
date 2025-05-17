
import React from 'react';

const CaseTimeline = () => {
  return (
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
  );
};

export default CaseTimeline;
