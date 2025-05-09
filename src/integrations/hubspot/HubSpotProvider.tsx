
import React, { createContext, useContext, useEffect } from 'react';
import HubSpotScript from './hubspotScript';

interface HubSpotContextType {
  portalId: string;
  apiKey?: string;
  formId: string;
  region?: string;
  submissionDelay?: number;
  submitToHubSpot?: (fields: any[]) => Promise<boolean>;
  isDomainPrimary?: boolean;
}

const HubSpotContext = createContext<HubSpotContextType>({
  portalId: '',
  formId: '',
  region: 'na1',
  submissionDelay: 2000,
  isDomainPrimary: true,
});

export const useHubSpot = () => useContext(HubSpotContext);

interface HubSpotProviderProps {
  children: React.ReactNode;
}

const HubSpotProvider = ({ children }: HubSpotProviderProps) => {
  // Updated with production values provided by the user
  const HUBSPOT_PORTAL_ID = "40043781";
  // Updated Private App access token for production
  const HUBSPOT_API_KEY = "pat-na1-07fcb3a7-a84d-446e-bde2-dc26df387c72";
  const HUBSPOT_FORM_ID = "8309ec82-bc28-4185-bade-8e73f33d2b08";
  const HUBSPOT_REGION = "na1"; // Updated region to na1 based on API key format
  const SUBMISSION_DELAY = 20000; // Kept for backward compatibility
  
  // This site is the primary domain (not hosted on HubSpot)
  const IS_DOMAIN_PRIMARY = true;
  
  useEffect(() => {
    // When this site is primary, we need to notify HubSpot's tracking script
    if (IS_DOMAIN_PRIMARY && (window as any).hsq) {
      console.log('Setting up HubSpot tracking for primary domain');
      // Register this as primary domain for analytics
      (window as any).hsq.push(['setPath', window.location.pathname + window.location.search]);
    }
    
    // Add config verification logs
    console.log('====================================');
    console.log('HubSpot Provider Initialized with:');
    console.log('Portal ID:', HUBSPOT_PORTAL_ID);
    console.log('Form ID:', HUBSPOT_FORM_ID);
    console.log('Region:', HUBSPOT_REGION);
    console.log('Current Page:', window.location.pathname);
    console.log('Current URL:', window.location.href);
    console.log('====================================');
  }, []);
  
  // Get HubSpot tracking cookie
  const getHubspotCookie = () => {
    const cookies = document.cookie.split(';');
    const hubspotCookie = cookies.find(c => c.trim().startsWith('hubspotutk='));
    return hubspotCookie ? hubspotCookie.trim().substring(11) : undefined;
  };

  // Direct submission function that can be called immediately
  const submitToHubSpot = async (fields: any[]) => {
    try {
      console.log('==========================================');
      console.log('Starting direct submission to HubSpot...');
      console.log('Current page: ', window.location.pathname);
      console.log('Current URL: ', window.location.href);
      console.log('Using Portal ID:', HUBSPOT_PORTAL_ID);
      console.log('Using Form ID:', HUBSPOT_FORM_ID);
      console.log('API Key available:', HUBSPOT_API_KEY ? 'Yes (redacted for security)' : 'No');
      console.log('Submitting these fields to HubSpot:', JSON.stringify(fields, null, 2));
      
      // Clean and validate field values
      const processedFields = fields.map(field => {
        console.log(`Processing field: ${field.name} with value:`, field.value);
        
        // Make sure the value is a string and not null/undefined
        const value = field.value != null ? String(field.value) : "";
        
        return {
          name: field.name,
          value: value
        };
      });
      
      // Get HubSpot cookie for tracking
      const hubspotCookie = getHubspotCookie();
      console.log('HubSpot cookie found:', hubspotCookie ? 'Yes' : 'No');
      if (hubspotCookie) {
        console.log('HubSpot cookie value (partial):', hubspotCookie.substring(0, 5) + '...');
      }
      
      // Build the payload with the cookie for better tracking
      const payload = {
        submittedAt: Date.now(),
        fields: processedFields,
        context: {
          hutk: hubspotCookie,
          pageUri: window.location.href,
          pageName: document.title
        },
        legalConsentOptions: {
          consent: {
            consentToProcess: true,
            text: "I agree to allow this website to store and process my personal data."
          }
        }
      };
      
      // Submit to the forms API
      const url = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;
      console.log(`Submitting to URL: ${url}`);
      console.log('Payload:', JSON.stringify(payload, null, 2));
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const responseText = await response.text();
      console.log('HubSpot API response status:', response.status);
      console.log('HubSpot API response text:', responseText);
      
      let responseData;
      try {
        responseData = JSON.parse(responseText);
        console.log('HubSpot API response data:', responseData);
      } catch (e) {
        console.log('Could not parse response as JSON:', e);
      }

      if (!response.ok) {
        console.error(`HubSpot submission failed with status ${response.status}`);
        throw new Error(responseData?.message || `Failed with status ${response.status}`);
      }
      
      console.log('Form submission successful!');
      console.log('==========================================');
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      console.log('==========================================');
      return false;
    }
  };
  
  return (
    <HubSpotContext.Provider value={{ 
      portalId: HUBSPOT_PORTAL_ID,
      apiKey: HUBSPOT_API_KEY,
      formId: HUBSPOT_FORM_ID,
      region: HUBSPOT_REGION,
      submissionDelay: SUBMISSION_DELAY,
      submitToHubSpot,
      isDomainPrimary: IS_DOMAIN_PRIMARY
    }}>
      <HubSpotScript portalId={HUBSPOT_PORTAL_ID} />
      {children}
    </HubSpotContext.Provider>
  );
};

export default HubSpotProvider;
