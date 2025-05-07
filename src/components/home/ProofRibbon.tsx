
import React from 'react';

// Placeholder logos - in a real implementation, these would be actual client logos
const logos = [
  { name: 'Client 1', industry: 'Manufacturing' },
  { name: 'Client 2', industry: 'Professional Services' },
  { name: 'Client 3', industry: 'Restoration' },
  { name: 'Client 4', industry: 'B2B' },
  { name: 'Client 5', industry: 'DTC' },
];

const kpiCards = [
  { stat: '28%', label: 'Revenue lift in 6 months', industry: 'Manufacturing' },
  { stat: '40%', label: 'More leads surfaced', industry: 'Restoration' },
  { stat: '30%', label: 'Faster sales cycles', industry: 'Professional Services' },
  { stat: '22%', label: 'Cost reduction in MarTech spend', industry: 'B2B' },
];

const ProofRibbon = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-prometheus-navy mb-12">
          Trusted by Industry Leaders
        </h2>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-12">
          {logos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center">
              <div className="h-12 w-32 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-500 font-medium">{logo.name}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiCards.map((card, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow border border-gray-100 text-center">
              <span className="text-4xl font-bold text-prometheus-orange block mb-2">{card.stat}</span>
              <p className="text-gray-600">{card.label}</p>
              <p className="text-sm text-prometheus-navy mt-2">{card.industry} Client</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProofRibbon;
