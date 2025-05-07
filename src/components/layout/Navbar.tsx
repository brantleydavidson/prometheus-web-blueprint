import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [whoWeHelpOpen, setWhoWeHelpOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-prometheus-navy">Prometheus</span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            {/* Who We Help with hover card */}
            <div 
              className="relative"
              onMouseEnter={() => setWhoWeHelpOpen(true)}
              onMouseLeave={() => setWhoWeHelpOpen(false)}
            >
              <button className="flex items-center gap-1 text-base font-medium hover:text-prometheus-orange">
                Who We Help
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {whoWeHelpOpen && (
                <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-md shadow-lg p-4 hover-card-fade">
                  <div className="border-b border-gray-100 pb-4 mb-2">
                    <h3 className="text-sm font-bold text-gray-500 mb-2">Who We Help</h3>
                  </div>
                  
                  <div className="mb-4">
                    <Link to="/b2b" className="block group">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-prometheus-navy group-hover:text-prometheus-orange">Win More B2B Deals</span>
                        <ChevronDown className="h-4 w-4 group-hover:text-prometheus-orange rotate-270" />
                      </div>
                    </Link>
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>
                        <Link to="/b2b/manufacturing" className="text-sm text-gray-600 hover:text-prometheus-orange">
                          Manufacturing — "Turn idle line-time into booked POs."
                        </Link>
                      </li>
                      <li>
                        <Link to="/b2b/professional-services" className="text-sm text-gray-600 hover:text-prometheus-orange">
                          Professional Services — "Cut proposal cycles by 30%."
                        </Link>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <Link to="/dtc" className="block group">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-prometheus-navy group-hover:text-prometheus-orange">Sell More Direct-to-Consumer</span>
                        <ChevronDown className="h-4 w-4 group-hover:text-prometheus-orange rotate-270" />
                      </div>
                    </Link>
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>
                        <Link to="/dtc/restoration" className="text-sm text-gray-600 hover:text-prometheus-orange">
                          Restoration — "Surface 40% more emergency leads."
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            
            <Link to="/services" className="text-base font-medium hover:text-prometheus-orange">Services</Link>
            <Link to="/insights" className="text-base font-medium hover:text-prometheus-orange">Insights & Playbooks</Link>
            <Link to="/about" className="text-base font-medium hover:text-prometheus-orange">About</Link>
          </nav>
        </div>
        
        <Button asChild className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
          <Link to="/book-audit">Book Growth Audit</Link>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;

// Since we can't modify the Navbar component directly, let's add a note for the user
// To access the CMS, they should visit /admin or click a "CMS Login" link that would need
// to be added to their Navbar component. They can either manually add this link to their
// existing Navbar, or we could provide them with code to do so.

// The CMS is accessible at /login and /admin routes
