
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import HubSpotForm from '@/components/forms/HubSpotForm';
import { useHubSpot } from '@/integrations/hubspot/HubSpotProvider';
import ResultsPage from '@/components/forms/ResultsPage';
import { useToast } from '@/hooks/use-toast';

interface SubmitResultsFormProps {
  score: number;
  totalPossible: number;
  userInfo: {
    firstname: string;
    lastname: string;
    email: string;
    company: string;
  };
  onSubmit: () => void;
}

const SubmitResultsForm = ({ 
  score, 
  totalPossible, 
  userInfo, 
  onSubmit 
}: SubmitResultsFormProps) => {
  const { portalId, apiKey, formId } = useHubSpot();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  // Create HubSpot custom data with assessment results
  // Using ai_test_score instead of aitest_score - may need to match exactly what's in HubSpot
  const hubspotCustomData = {
    ...userInfo,
    // Try both common formats that HubSpot might recognize
    ai_test_score: String(score),  
    aitest_score: String(score),
    ai_quotient_score: String(score)
  };

  // Log the data being sent to HubSpot for debugging
  useEffect(() => {
    console.log('HubSpot data prepared:', hubspotCustomData);
  }, [hubspotCustomData]);

  // Determine if we can use the API approach
  const useApiApproach = !!apiKey;
  
  // Handle direct API submission to HubSpot
  const submitDirectlyToHubSpot = async () => {
    if (!apiKey) return;
    
    try {
      setIsSubmitting(true);
      
      // Format data for HubSpot API
      const fields = Object.entries(hubspotCustomData).map(([name, value]) => ({
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
      
      console.log('Submitting directly to HubSpot:', payload);
      
      // Submit to HubSpot API
      const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit to HubSpot');
      }
      
      const responseData = await response.json();
      console.log('HubSpot submission successful:', responseData);
      
      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "Your assessment has been submitted successfully.",
      });
      onSubmit();
    } catch (error) {
      console.error('HubSpot submission error:', error);
      toast({
        title: "Submission Error",
        description: error instanceof Error ? error.message : "Failed to submit assessment data.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle form submission through the HubSpotForm component
  const handleHubSpotSubmit = () => {
    console.log('HubSpot form submitted through component');
    setIsSubmitted(true);
    onSubmit();
  };

  // Auto-submit if we're using the API approach
  useEffect(() => {
    if (useApiApproach && !isSubmitted && !isSubmitting) {
      submitDirectlyToHubSpot();
    }
  }, [useApiApproach, isSubmitted]);

  return (
    <div className="space-y-8">
      <ResultsPage score={score} totalPossible={totalPossible} />
      
      <Card className="p-6 bg-white shadow-lg border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Your Assessment Is Complete</h3>
        <p className="mb-6 text-gray-600">
          Thank you for completing the AI Quotient assessment. Your data has been submitted successfully.
        </p>
        
        {!isSubmitted && !useApiApproach && (
          <HubSpotForm 
            portalId={portalId}
            formId={formId}
            onFormSubmit={handleHubSpotSubmit}
            className="hubspot-ai-quotient-form"
            customData={hubspotCustomData}
            useApi={false}
          />
        )}
        
        {(isSubmitting) && (
          <div className="text-center p-4">
            <p className="text-blue-600 font-medium">Submitting your assessment...</p>
          </div>
        )}
        
        {(isSubmitted) && (
          <div className="text-center p-4">
            <p className="text-green-600 font-medium">Your assessment has been submitted!</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SubmitResultsForm;
