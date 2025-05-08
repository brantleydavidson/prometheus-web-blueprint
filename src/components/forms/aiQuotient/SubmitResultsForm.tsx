
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
  
  // Use the exact field name as configured in the HubSpot form
  const hubspotCustomData = {
    ...userInfo,
    aitest_score: String(score)  // Use the same field name you configured in HubSpot
  };

  // Log the data being sent to HubSpot for debugging
  useEffect(() => {
    console.log('HubSpot data prepared:', hubspotCustomData);
  }, [hubspotCustomData]);

  // Always use the API approach for more reliable submission
  const submitDirectlyToHubSpot = async () => {
    if (!apiKey) {
      console.error('No HubSpot API key found');
      return;
    }
    
    try {
      setIsSubmitting(true);
      console.log('Starting HubSpot submission with data:', hubspotCustomData);
      
      // Format data for HubSpot API
      const fields = Object.entries(hubspotCustomData).map(([name, value]) => ({
        name,
        value: typeof value === 'object' ? JSON.stringify(value) : String(value)
      }));

      console.log('Formatted fields for HubSpot:', fields);

      const payload = {
        fields,
        context: {
          pageUri: window.location.href,
          pageName: document.title
        }
      };
      
      console.log('Submitting to HubSpot API with payload:', payload);
      
      // Submit to HubSpot API
      const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const responseText = await response.text();
      console.log('Raw HubSpot response:', responseText);
      
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        console.log('Could not parse response as JSON:', e);
      }

      if (!response.ok) {
        throw new Error(responseData?.message || `Failed with status ${response.status}`);
      }
      
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

  // Auto-submit when component mounts
  useEffect(() => {
    if (!isSubmitted && !isSubmitting) {
      console.log('Auto-submitting to HubSpot...');
      submitDirectlyToHubSpot();
    }
  }, []);

  return (
    <div className="space-y-8">
      <ResultsPage score={score} totalPossible={totalPossible} />
      
      <Card className="p-6 bg-white shadow-lg border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Your Assessment Is Complete</h3>
        <p className="mb-6 text-gray-600">
          Thank you for completing the AI Quotient assessment.
        </p>
        
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
