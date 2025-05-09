
import React, { useEffect } from 'react';
import { useHubSpot } from './HubSpotProvider';

interface HubSpotScriptProps {
  portalId: string;
}

const HubSpotScript = ({ portalId }: HubSpotScriptProps) => {
  const { isDomainPrimary } = useHubSpot();

  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'hs-script-loader';
    script.async = true;
    script.defer = true;
    script.src = `//js.hs-scripts.com/${portalId}.js`;
    
    // For primary domain setup, we need to initialize the HubSpot queue
    if (isDomainPrimary) {
      // Initialize HubSpot queue for tracking
      if (!(window as any).hsq) {
        (window as any).hsq = (window as any).hsq || [];
      }
      
      // Configure HubSpot to understand this is a custom domain integration
      (window as any)._hsq = (window as any)._hsq || [];
      (window as any)._hsq.push(['setPortalId', portalId]);
    }
    
    // Append to document
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      const existingScript = document.getElementById('hs-script-loader');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [portalId, isDomainPrimary]);

  return null;
};

export default HubSpotScript;
