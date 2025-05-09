
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import ResultsPage from '@/components/forms/ResultsPage';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useHubSpot } from '@/integrations/hubspot/HubSpotProvider';
import AdditionalInfoForm, { AdditionalInfoFormData } from './AdditionalInfoForm';
import SubmissionConfirmation from './SubmissionConfirmation';

interface SubmitResultsFormProps {
  score: number;
  totalPossible: number;
  userInfo: {
    firstname: string;
    lastname: string;
    email: string;
    company: string;
  };
  pillarScores?: Record<string, number>;
  maxPillarScores?: Record<string, number>;
  onSubmit: () => void;
  isSubmitting?: boolean;
  isSubmitted?: boolean;
}

const SubmitResultsForm = ({ 
  score, 
  totalPossible, 
  userInfo, 
  pillarScores = {},
  maxPillarScores = {},
  onSubmit,
  isSubmitting = false,
  isSubmitted = false
}: SubmitResultsFormProps) => {
  const { toast } = useToast();
  const { portalId, formId } = useHubSpot();
  const [showAdditionalForm, setShowAdditionalForm] = useState(false);
  const [localSubmitted, setLocalSubmitted] = useState(false);
  
  // Log configuration when component mounts
  useEffect(() => {
    console.log('==========================================');
    console.log('SubmitResultsForm initialized with:');
    console.log('User Info:', userInfo);
    console.log('Score:', score, 'of', totalPossible);
    console.log('Using HubSpot Portal ID:', portalId);
    console.log('Using HubSpot Form ID:', formId);
    console.log('==========================================');
  }, [userInfo, score, totalPossible, portalId, formId]);

  const handleRequestReport = () => {
    console.log('Report requested - opening additional form');
    setShowAdditionalForm(true);
  };
  
  const handleSubmitAdditionalInfo = (data: AdditionalInfoFormData) => {
    // Prevent multiple submissions
    if (localSubmitted || isSubmitted) {
      console.log('Form already submitted, preventing duplicate submission');
      return;
    }
    
    console.log('Additional info submitted:', data);
    console.log('Job Title:', data.jobTitle);
    console.log('Phone Number:', data.phoneNumber);
    console.log('Comments:', data.comments);
    
    // Set local submission state before submitting
    setLocalSubmitted(true);
    
    // Call parent's onSubmit method to handle HubSpot submission
    onSubmit();
    
    toast({
      title: "Request Received!",
      description: "We'll send your detailed report to your email shortly.",
    });
  };
  
  // Combine the component's local submitted state with the prop
  const effectivelySubmitted = localSubmitted || isSubmitted;
  
  return (
    <div className="space-y-8">
      <ResultsPage 
        score={score} 
        totalPossible={totalPossible} 
        pillarScores={pillarScores}
        maxPillarScores={maxPillarScores}
      />
      
      <Card className="p-6 bg-white shadow-lg border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Your Assessment Is Complete</h3>
        <p className="mb-6 text-gray-600">
          Thank you for completing the AI Quotient assessment. Your summary results are shown above.
          {!effectivelySubmitted && !isSubmitting && !showAdditionalForm && (
            <span className="block mt-2">To receive your <strong>detailed personalized report</strong> with actionable recommendations, please request it below.</span>
          )}
        </p>
        
        {isSubmitting && (
          <div className="text-center p-4">
            <p className="text-blue-600 font-medium">Processing your report request...</p>
          </div>
        )}
        
        {effectivelySubmitted && (
          <SubmissionConfirmation email={userInfo.email} />
        )}
        
        {!isSubmitting && !effectivelySubmitted && !showAdditionalForm && (
          <div className="text-center p-4">
            <Button 
              onClick={handleRequestReport} 
              className="px-6 py-2 bg-prometheus-orange text-white rounded hover:bg-prometheus-orange/90 transition-colors flex items-center gap-2"
            >
              Request Detailed Report <Download className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        {!isSubmitting && !effectivelySubmitted && showAdditionalForm && (
          <AdditionalInfoForm
            userInfo={userInfo}
            onSubmit={handleSubmitAdditionalInfo}
            onCancel={() => setShowAdditionalForm(false)}
            isSubmitting={isSubmitting}
            isSubmitted={isSubmitted}
          />
        )}
      </Card>
    </div>
  );
};

export default SubmitResultsForm;
