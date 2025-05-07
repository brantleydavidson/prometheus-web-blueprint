
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [whoWeHelpOpen, setWhoWeHelpOpen] = useState(false);
  const isMobile = useIsMobile();
  
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

  const MobileNavLinks = () => (
    <div className="flex flex-col space-y-6 pt-6">
      <Link 
        to="/who-we-help" 
        className="text-lg font-medium hover:text-prometheus-orange"
      >
        Who We Help
      </Link>
      <div className="pl-4 flex flex-col space-y-3">
        <Link to="/b2b" className="text-lg font-medium hover:text-prometheus-orange">
          B2B Solutions
        </Link>
        <Link to="/b2b/manufacturing" className="text-md text-gray-600 pl-2 hover:text-prometheus-orange">
          Manufacturing
        </Link>
        <Link to="/dtc" className="text-lg font-medium hover:text-prometheus-orange">
          DTC Solutions
        </Link>
        <Link to="/dtc/restoration" className="text-md text-gray-600 pl-2 hover:text-prometheus-orange">
          Restoration
        </Link>
      </div>
      
      <Link to="/services" className="text-lg font-medium hover:text-prometheus-orange">Services</Link>
      <div className="pl-4 flex flex-col space-y-3">
        <Link to="/services/ai-enablement" className="text-md text-gray-600 pl-2 hover:text-prometheus-orange">
          AI Enablement
        </Link>
        <Link to="/services/consulting-gtm" className="text-md text-gray-600 pl-2 hover:text-prometheus-orange">
          GTM Strategy
        </Link>
        <Link to="/services/crm-implementation" className="text-md text-gray-600 pl-2 hover:text-prometheus-orange">
          CRM Implementation
        </Link>
        <Link to="/services/customer-journey" className="text-md text-gray-600 pl-2 hover:text-prometheus-orange">
          Customer Journey
        </Link>
      </div>
      
      <Link to="/insights" className="text-lg font-medium hover:text-prometheus-orange">Insights & Playbooks</Link>
      <Link to="/about" className="text-lg font-medium hover:text-prometheus-orange">About</Link>
      
      <div className="pt-4">
        <Button asChild className="w-full bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
          <Link to="/book-audit">Book Growth Audit</Link>
        </Button>
      </div>
    </div>
  );

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
        
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm bg-white p-6">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                  <Link to="/" className="flex items-center">
                    <img 
                      src="https://dxufdcvoupjqvxnwnost.supabase.co/storage/v1/object/public/cms-assets/mwe5d71dr4.png" 
                      alt="Prometheus Agency" 
                      className="h-8"
                    />
                  </Link>
                </div>
                <MobileNavLinks />
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <Button asChild className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
            <Link to="/book-audit">Book Growth Audit</Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
