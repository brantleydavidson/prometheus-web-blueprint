import React, { useEffect, useRef, useState } from 'react';
import { useHubSpot } from '@/integrations/hubspot/HubSpotProvider';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface HubSpotFormProps {
  portalId?: string;
  formId: string;
  targetId?: string;
  onFormSubmit?: () => void;
  region?: string;
  className?: string;
  customData?: Record<string, any>; // Custom data to pass to HubSpot
  useApi?: boolean; // Whether to use the API instead of the embedded form
  formFields?: Array<{
    name: string;
    label: string;
    type: 'text' | 'email' | 'number' | 'textarea' | 'checkbox' | 'select';
    required?: boolean;
    options?: Array<{value: string, label: string}>;
  }>;
}

const HubSpotForm = ({ 
  portalId: propPortalId, 
  formId, 
  targetId, 
  onFormSubmit, 
  region = 'na1',
  className = 'hubspot-form-container',
  customData = {},
  useApi = false,
  formFields = []
}: HubSpotFormProps) => {
  const { portalId: contextPortalId, apiKey } = useHubSpot();
  const portalId = propPortalId || contextPortalId;
  const { toast } = useToast();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const uniqueId = targetId || `hubspot-form-${formId}`;
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // If customData contains all the necessary user info, submit automatically
  useEffect(() => {
    const requiredFields = ['firstname', 'lastname', 'email', 'company'];
    const hasAllRequired = requiredFields.every(field => customData[field]);
    
    if (useApi && hasAllRequired && !isSubmitted) {
      submitFormToHubSpot();
    }
  }, [customData, useApi, isSubmitted]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const inputValue = isCheckbox ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: inputValue
    }));
  };

  const submitFormToHubSpot = async () => {
    if (!apiKey && useApi) {
      console.error('HubSpot API key is required for API submission');
      toast({
        title: "Configuration Error",
        description: "HubSpot API key is not configured. Please contact support.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Combine form data with custom data
      const submitData = {
        ...formData,
        ...customData,
      };

      // API endpoint for HubSpot form submissions
      const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;
      
      // Format data for HubSpot API
      const fields = Object.entries(submitData).map(([name, value]) => ({
        name,
        value: typeof value === 'object' ? JSON.stringify(value) : String(value)
      }));

      const payload = {
        fields,
        context: {
          pageUri: window.location.href,
          pageName: document.title
        }
      };

      console.log('Submitting to HubSpot URL:', url);
      console.log('Submitting with portalId:', portalId);
      console.log('Submitting with formId:', formId);
      console.log('Payload:', payload);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const responseText = await response.text();
      console.log('HubSpot API response text:', responseText);
      
      let responseData;
      try {
        responseData = JSON.parse(responseText);
        console.log('HubSpot API response data:', responseData);
      } catch (e) {
        console.log('Could not parse response as JSON:', e);
      }

      if (!response.ok) {
        throw new Error(responseData?.message || `Failed with status ${response.status}`);
      }

      // Clear form after successful submission
      setFormData({});
      setIsSubmitted(true);
      
      toast({
        title: "Success!",
        description: "Your information has been submitted successfully.",
      });

      if (onFormSubmit) {
        onFormSubmit();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "An error occurred while submitting the form.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFormToHubSpot();
  };

  // If already submitted or auto-submitted, show a thank you message
  if (isSubmitted) {
    return (
      <div className={className}>
        <div className="text-center p-6">
          <h3 className="text-xl font-semibold mb-3">Thank You!</h3>
          <p className="text-gray-600">Your assessment has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    // Only use the HubSpot embed script if not using API
    if (!useApi) {
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
    }
  }, [portalId, formId, uniqueId, region, onFormSubmit, customData, useApi]);

  if (useApi && formFields.length > 0) {
    return (
      <div className={className}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {formFields.map((field) => (
            <div key={field.name} className="form-field">
              <label htmlFor={field.name} className="block text-sm font-medium mb-1">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              
              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                  required={field.required}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ) : field.type === 'select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                  required={field.required}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select...</option>
                  {field.options?.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === 'checkbox' ? (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={field.name}
                    name={field.name}
                    checked={!!formData[field.name]}
                    onChange={handleInputChange}
                    required={field.required}
                    className="mr-2"
                  />
                  <label htmlFor={field.name}>{field.label}</label>
                </div>
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                  required={field.required}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              )}
            </div>
          ))}
          
          <Button 
            type="submit" 
            className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </div>
    );
  }

  return <div id={uniqueId} ref={formContainerRef} className={className} />;
};

export default HubSpotForm;
