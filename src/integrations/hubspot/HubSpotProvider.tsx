
import React from 'react';
import HubSpotScript from './hubspotScript';

// Environment variables for HubSpot
// Replace with your actual HubSpot Portal ID or use an environment variable
const HUBSPOT_PORTAL_ID = 'your-portal-id';

interface HubSpotProviderProps {
  children: React.ReactNode;
}

const HubSpotProvider = ({ children }: HubSpotProviderProps) => {
  return (
    <>
      <HubSpotScript portalId={HUBSPOT_PORTAL_ID} />
      {children}
    </>
  );
};

export default HubSpotProvider;
