
import React, { useEffect } from 'react';
import { useHubSpot } from './HubSpotProvider';

interface HubSpotScriptProps {
  portalId: string;
}

const HubSpotScript = ({ portalId }: HubSpotScriptProps) => {
  const { isDomainPrimary } = useHubSpot();

  useEffect(() => {
    console.log('==========================================');
    console.log('Setting up HubSpot tracking script');
    console.log('Portal ID:', portalId);
    console.log('Is Primary Domain:', isDomainPrimary);
    console.log('Current URL:', window.location.href);
    console.log('Current pathname:', window.location.pathname);
    console.log('==========================================');
    
    // Create script element
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'hs-script-loader';
    script.async = true;
    script.defer = true;
    script.src = `//js.hs-scripts.com/${portalId}.js`;
    
    // For primary domain setup, we need to initialize the HubSpot queue
    if (isDomainPrimary) {
      console.log('Setting up HubSpot tracking for primary domain');
      // Initialize HubSpot queue for tracking
      if (!(window as any).hsq) {
        (window as any).hsq = (window as any).hsq || [];
      }
      
      // Configure HubSpot to understand this is a custom domain integration
      (window as any)._hsq = (window as any)._hsq || [];
      (window as any)._hsq.push(['setPortalId', portalId]);
      console.log('HubSpot tracking initialized with setPortalId');
      
      // Set the current path for tracking
      (window as any)._hsq.push(['setPath', window.location.pathname + window.location.search]);
      console.log('HubSpot tracking initialized with setPath:', window.location.pathname + window.location.search);
    }
    
    // Append to document
    document.body.appendChild(script);
    console.log('HubSpot tracking script appended to document body');

    // Cleanup function
    return () => {
      const existingScript = document.getElementById('hs-script-loader');
      if (existingScript) {
        document.body.removeChild(existingScript);
        console.log('HubSpot tracking script removed from document body');
      }
    };
  }, [portalId, isDomainPrimary]);

  return null;
};

export default HubSpotScript;
