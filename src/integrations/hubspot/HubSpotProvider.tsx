
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
  // Using specific values provided by the user
  const HUBSPOT_PORTAL_ID = "242669200";
  // Using Private App access token which works with the newest APIs
  const HUBSPOT_API_KEY = "pat-na2-57ad6ebd-c3d3-4855-9af3-20217e0c57bb";
  const HUBSPOT_FORM_ID = "90ea34b5-d0e9-40e4-a98c-b31b4dc6f445";
  const HUBSPOT_REGION = "na2"; // Explicitly set region to na2 based on API key format
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
      console.log('Starting direct submission to HubSpot...');
      console.log('Submitting these fields to HubSpot:', fields);
      
      // Ensure all fields have string values
      const processedFields = fields.map(field => ({
        ...field,
        value: String(field.value) // Convert all values to strings
      }));
      
      // Build the payload with the cookie for better tracking
      const payload = {
        submittedAt: Date.now(),
        fields: processedFields,
        context: {
          hutk: getHubspotCookie(),
          pageUri: window.location.href,
          pageName: document.title
        }
      };
      
      // Submit to the forms API
      const url = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;
      console.log(`Submitting to URL: ${url}`);
      console.log('Payload:', JSON.stringify(payload));
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const responseText = await response.text();
      console.log('HubSpot API response text:', responseText);
      
      let responseData;
      try {
        responseData = JSON.parse(responseText);
        console.log('HubSpot API response data:', responseData);
      } catch (e) {
        console.log('Could not parse response as JSON:', e);
      }

      if (!response.ok) {
        throw new Error(responseData?.message || `Failed with status ${response.status}`);
      }
      
      console.log('Form submission successful!');
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
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
