
import React, { useEffect, useRef } from 'react';

interface HubSpotFormProps {
  portalId: string;
  formId: string;
  targetId?: string;
  onFormSubmit?: () => void;
  region?: string;
  className?: string;
}

const HubSpotForm = ({ 
  portalId, 
  formId, 
  targetId, 
  onFormSubmit, 
  region = 'na1',
  className = 'hubspot-form-container'
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
      });
    }

    return () => {
      // Cleanup if needed
      if (formContainerRef.current) {
        formContainerRef.current.innerHTML = '';
      }
    };
  }, [portalId, formId, uniqueId, region, onFormSubmit]);

  return <div id={uniqueId} ref={formContainerRef} className={className} />;
};

export default HubSpotForm;
