
import React, { createContext, useContext } from 'react';
import HubSpotScript from './hubspotScript';

interface HubSpotContextType {
  portalId: string;
  apiKey?: string;
}

const HubSpotContext = createContext<HubSpotContextType>({
  portalId: '',
});

export const useHubSpot = () => useContext(HubSpotContext);

interface HubSpotProviderProps {
  children: React.ReactNode;
}

const HubSpotProvider = ({ children }: HubSpotProviderProps) => {
  // Using Vite's import.meta.env for environment variables
  const HUBSPOT_PORTAL_ID = import.meta.env.VITE_HUBSPOT_PORTAL_ID || "12345678";
  const HUBSPOT_API_KEY = import.meta.env.VITE_HUBSPOT_API_KEY;
  
  return (
    <HubSpotContext.Provider value={{ 
      portalId: HUBSPOT_PORTAL_ID,
      apiKey: HUBSPOT_API_KEY
    }}>
      <HubSpotScript portalId={HUBSPOT_PORTAL_ID} />
      {children}
    </HubSpotContext.Provider>
  );
};

export default HubSpotProvider;
