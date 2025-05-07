
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [whoWeHelpOpen, setWhoWeHelpOpen] = useState(false);
  
  // Adding a delay before closing the dropdown
  const closeTimeout = React.useRef<NodeJS.Timeout | null>(null);
  
  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setWhoWeHelpOpen(true);
  };
  
  const handleMouseLeave = () => {
    // Set a timeout to close the dropdown with a longer delay
    closeTimeout.current = setTimeout(() => {
      setWhoWeHelpOpen(false);
    }, 600); // Increased from 300ms to 600ms for better user experience
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center">
            <img 
              src="https://dxufdcvoupjqvxnwnost.supabase.co/storage/v1/object/public/cms-assets/mwe5d71dr4.png" 
              alt="Prometheus Agency" 
              className="h-10"
            />
          </Link>
          
          <nav className="hidden md:flex gap-6">
            {/* Who We Help with hover card */}
            <div 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/who-we-help" className="flex items-center gap-1 text-base font-medium hover:text-prometheus-orange">
                Who We Help
                <ChevronDown className="h-4 w-4" />
              </Link>
              
              {whoWeHelpOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-96 bg-white rounded-md shadow-lg p-4 hover-card-fade"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
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
