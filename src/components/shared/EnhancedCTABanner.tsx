
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import HubSpotForm from '@/components/forms/HubSpotForm';
import { useHubSpot } from '@/integrations/hubspot/HubSpotProvider';

interface EnhancedCTABannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  hubspotFormId?: string;
  showInlineForm?: boolean;
  customData?: Record<string, any>;
  useApi?: boolean;
  formFields?: Array<{
    name: string;
    label: string;
    type: 'text' | 'email' | 'number' | 'textarea' | 'checkbox' | 'select';
    required?: boolean;
    options?: Array<{value: string, label: string}>;
  }>;
}

const EnhancedCTABanner = ({ 
  title, 
  description, 
  buttonText, 
  buttonLink,
  hubspotFormId,
  showInlineForm = false,
  customData = {},
  useApi = false,
  formFields = []
}: EnhancedCTABannerProps) => {
  const { portalId, formId } = useHubSpot();
  // Use the formId from props or from the context
  const actualFormId = hubspotFormId || formId;
  
  return (
    <section className="py-16 bg-prometheus-navy text-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
            <p className="text-lg mb-8">{description}</p>
            
            {showInlineForm && actualFormId ? (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <HubSpotForm 
                  formId={actualFormId}
                  className="hubspot-cta-form" 
                  customData={customData}
                  useApi={useApi}
                  formFields={formFields}
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
