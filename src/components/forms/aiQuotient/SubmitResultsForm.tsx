
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import HubSpotForm from '@/components/forms/HubSpotForm';
import { useHubSpot } from '@/integrations/hubspot/HubSpotProvider';
import ResultsPage from '@/components/forms/ResultsPage';

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
  
  // Create HubSpot custom data with assessment results
  const hubspotCustomData = {
    ...userInfo,
    aitest_score: score,
  };

  // Use the API approach if we have an API key
  const useApiApproach = !!apiKey;
  
  const handleHubSpotSubmit = () => {
    setIsSubmitting(true);
    onSubmit();
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8">
      <ResultsPage score={score} totalPossible={totalPossible} />
      
      <Card className="p-6 bg-white shadow-lg border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Your Assessment Is Complete</h3>
        <p className="mb-6 text-gray-600">
          Thank you for completing the AI Quotient assessment. Your data has been submitted successfully.
        </p>
        
        <HubSpotForm 
          portalId={portalId}
          formId={formId}
          onFormSubmit={handleHubSpotSubmit}
          className="hubspot-ai-quotient-form"
          customData={hubspotCustomData}
          useApi={useApiApproach}
        />
      </Card>
    </div>
  );
};

export default SubmitResultsForm;
