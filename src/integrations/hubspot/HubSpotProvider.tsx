
import React from 'react';
import HubSpotScript from './hubspotScript';

interface HubSpotProviderProps {
  children: React.ReactNode;
}

const HubSpotProvider = ({ children }: HubSpotProviderProps) => {
  // Using Vite's import.meta.env for environment variables
  const HUBSPOT_PORTAL_ID = import.meta.env.VITE_HUBSPOT_PORTAL_ID || "12345678";
  
  return (
    <>
      <HubSpotScript portalId={HUBSPOT_PORTAL_ID} />
      {children}
    </>
  );
};

export default HubSpotProvider;
