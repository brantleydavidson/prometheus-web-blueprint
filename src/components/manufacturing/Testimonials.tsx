
import React from 'react';

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-4xl">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
          <blockquote className="text-lg md:text-xl text-gray-700 italic mb-6">
            "The Prometheus team has been an exceptional partner. From their transparency of ability, to communication of deliverables, and the ability to be a true strategic partner have been of the highest quality. After working with multiple vendors in the past, the Prometheus team has been a breath of fresh air."
          </blockquote>
          <div className="flex items-center">
            <div>
              <p className="font-semibold text-prometheus-navy">Cory Truett</p>
              <p className="text-gray-600">Program Manager, Copperweld</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
