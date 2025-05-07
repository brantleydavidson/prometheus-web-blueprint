
import React, { useEffect } from 'react';

interface HubSpotScriptProps {
  portalId: string;
}

const HubSpotScript = ({ portalId }: HubSpotScriptProps) => {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'hs-script-loader';
    script.async = true;
    script.defer = true;
    script.src = `//js.hs-scripts.com/${portalId}.js`;
    
    // Append to document
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      const existingScript = document.getElementById('hs-script-loader');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [portalId]);

  return null;
};

export default HubSpotScript;
