
import React from 'react';
import { Card } from '@/components/ui/card';
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
  isSubmitting?: boolean;
  isSubmitted?: boolean;
}

const SubmitResultsForm = ({ 
  score, 
  totalPossible, 
  userInfo, 
  onSubmit,
  isSubmitting = false,
  isSubmitted = false
}: SubmitResultsFormProps) => {
  const { toast } = useToast();
  
  // Display submission status based on props (now controlled by parent)
  
  return (
    <div className="space-y-8">
      <ResultsPage score={score} totalPossible={totalPossible} />
      
      <Card className="p-6 bg-white shadow-lg border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Your Assessment Is Complete</h3>
        <p className="mb-6 text-gray-600">
          Thank you for completing the AI Quotient assessment.
        </p>
        
        {isSubmitting && (
          <div className="text-center p-4">
            <p className="text-blue-600 font-medium">Submitting your assessment...</p>
          </div>
        )}
        
        {isSubmitted && (
          <div className="text-center p-4">
            <p className="text-green-600 font-medium">Your assessment has been submitted!</p>
          </div>
        )}
        
        {!isSubmitting && !isSubmitted && (
          <div className="text-center p-4">
            <p className="text-amber-600 font-medium">
              We're having trouble submitting your assessment. Your results are saved locally.
            </p>
            <button 
              onClick={onSubmit} 
              className="mt-2 px-4 py-2 bg-prometheus-orange text-white rounded hover:bg-prometheus-orange/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SubmitResultsForm;
