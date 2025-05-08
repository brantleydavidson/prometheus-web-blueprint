
import React, { createContext, useContext } from 'react';
import HubSpotScript from './hubspotScript';

interface HubSpotContextType {
  portalId: string;
  apiKey?: string;
  formId: string;
  region?: string;
  submissionDelay?: number;
}

const HubSpotContext = createContext<HubSpotContextType>({
  portalId: '',
  formId: '',
  region: 'na1',
  submissionDelay: 2000,
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
  const SUBMISSION_DELAY = 5000; // Increased delay to 5 seconds to ensure HubSpot has time to process
  
  return (
    <HubSpotContext.Provider value={{ 
      portalId: HUBSPOT_PORTAL_ID,
      apiKey: HUBSPOT_API_KEY,
      formId: HUBSPOT_FORM_ID,
      region: HUBSPOT_REGION,
      submissionDelay: SUBMISSION_DELAY
    }}>
      <HubSpotScript portalId={HUBSPOT_PORTAL_ID} />
      {children}
    </HubSpotContext.Provider>
  );
};

export default HubSpotProvider;
