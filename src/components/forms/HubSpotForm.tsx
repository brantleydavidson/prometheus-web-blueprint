
import React, { useEffect, useRef } from 'react';

interface HubSpotFormProps {
  portalId: string;
  formId: string;
  targetId?: string;
  onFormSubmit?: () => void;
  region?: string;
  className?: string;
  customData?: Record<string, any>; // Custom data to pass to HubSpot
}

const HubSpotForm = ({ 
  portalId, 
  formId, 
  targetId, 
  onFormSubmit, 
  region = 'na1',
  className = 'hubspot-form-container',
  customData = {}
}: HubSpotFormProps) => {
  const formContainerRef = useRef<HTMLDivElement>(null);
  const uniqueId = targetId || `hubspot-form-${formId}`;

  useEffect(() => {
    // Make sure HubSpot script is loaded
    if (!(window as any).hbspt) {
      const script = document.createElement('script');
      script.src = '//js.hsforms.net/forms/embed/v2.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => createForm();
    } else {
      createForm();
    }

    // Function to create HubSpot form
    function createForm() {
      if (!(window as any).hbspt || !(window as any).hbspt.forms) {
        console.error('HubSpot Forms script not loaded yet');
        return;
      }
      
      (window as any).hbspt.forms.create({
        region,
        portalId,
        formId,
        target: `#${uniqueId}`,
        onFormSubmit: onFormSubmit ? () => onFormSubmit() : undefined,
        // Add hidden fields for custom data
        ...(Object.keys(customData).length > 0 && {
          hiddenFields: Object.entries(customData).reduce((acc, [key, value]) => {
            acc[key] = String(value);
            return acc;
          }, {} as Record<string, string>)
        })
      });
    }

    return () => {
      // Cleanup if needed
      if (formContainerRef.current) {
        formContainerRef.current.innerHTML = '';
      }
    };
  }, [portalId, formId, uniqueId, region, onFormSubmit, customData]);

  return <div id={uniqueId} ref={formContainerRef} className={className} />;
};

export default HubSpotForm;
