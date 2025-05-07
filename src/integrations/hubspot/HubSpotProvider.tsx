
import React from 'react';
import HubSpotScript from './hubspotScript';

// Environment variables for HubSpot
// Replace with your actual HubSpot Portal ID
const HUBSPOT_PORTAL_ID = 'dKzffLw7ttkED8XRG9R1'; // Using the Prerender token as a placeholder, replace with actual HubSpot ID

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
