
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import HubSpotForm from '@/components/forms/HubSpotForm';

interface EnhancedCTABannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  hubspotFormId?: string;
  showInlineForm?: boolean;
}

const EnhancedCTABanner = ({ 
  title, 
  description, 
  buttonText, 
  buttonLink,
  hubspotFormId,
  showInlineForm = false
}: EnhancedCTABannerProps) => {
  // Use a default portal ID if environment variable is not available
  // This prevents errors when the environment variable is not set
  const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID || "12345678"; // Using a placeholder value
  
  return (
    <section className="py-16 bg-prometheus-navy text-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
            <p className="text-lg mb-8">{description}</p>
            
            {showInlineForm && hubspotFormId ? (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <HubSpotForm 
                  portalId={HUBSPOT_PORTAL_ID}
                  formId={hubspotFormId}
                  className="hubspot-cta-form" 
                />
              </div>
            ) : (
              <Button size="lg" className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
                <Link to={buttonLink}>{buttonText}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedCTABanner;
