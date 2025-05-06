
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-prometheus-navy text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold">Prometheus</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Tame the Tech. Unleash the Growth.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Who We Help</h3>
            <ul className="space-y-2">
              <li><Link to="/b2b" className="text-gray-300 hover:text-prometheus-orange">B2B</Link></li>
              <li><Link to="/b2b/manufacturing" className="text-gray-300 hover:text-prometheus-orange">Manufacturing</Link></li>
              <li><Link to="/b2b/professional-services" className="text-gray-300 hover:text-prometheus-orange">Professional Services</Link></li>
              <li><Link to="/dtc" className="text-gray-300 hover:text-prometheus-orange">Direct-to-Consumer</Link></li>
              <li><Link to="/dtc/restoration" className="text-gray-300 hover:text-prometheus-orange">Restoration</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services/ai-enablement" className="text-gray-300 hover:text-prometheus-orange">AI Enablement & Integration</Link></li>
              <li><Link to="/services/consulting-gtm" className="text-gray-300 hover:text-prometheus-orange">Consulting & GTM Strategy</Link></li>
              <li><Link to="/services/crm-implementation" className="text-gray-300 hover:text-prometheus-orange">CRM Implementation</Link></li>
              <li><Link to="/services/customer-journey" className="text-gray-300 hover:text-prometheus-orange">Customer Journey</Link></li>
              <li><Link to="/services/paid-media" className="text-gray-300 hover:text-prometheus-orange">Paid Media</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-prometheus-orange">About</Link></li>
              <li><Link to="/insights" className="text-gray-300 hover:text-prometheus-orange">Insights & Playbooks</Link></li>
              <li><Link to="/book-audit" className="text-gray-300 hover:text-prometheus-orange">Book Growth Audit</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Prometheus Agency. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 text-sm hover:text-prometheus-orange">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 text-sm hover:text-prometheus-orange">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
