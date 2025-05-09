
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import ResultsPage from '@/components/forms/ResultsPage';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Send, Mail, Download, CheckCircle } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { useHubSpot } from '@/integrations/hubspot/HubSpotProvider';

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

interface AdditionalInfoForm {
  jobTitle: string;
  phoneNumber: string;
  comments: string;
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
  
  const additionalForm = useForm<AdditionalInfoForm>({
    defaultValues: {
      jobTitle: '',
      phoneNumber: '',
      comments: ''
    }
  });

  const handleRequestReport = () => {
    console.log('Report requested - opening additional form');
    setShowAdditionalForm(true);
  };
  
  const handleSubmitAdditionalInfo = (data: AdditionalInfoForm) => {
    // Prevent multiple submissions
    if (localSubmitted || isSubmitted) {
      console.log('Form already submitted, preventing duplicate submission');
      return;
    }
    
    console.log('Additional info submitted:', data);
    setLocalSubmitted(true);
    
    // We're ONLY calling onSubmit here, not in multiple places
    // This ensures we only submit to HubSpot once
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
          <div className="text-center p-4 space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-2">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-medium text-green-600">Report Request Confirmed!</h4>
            <p className="text-gray-600">We'll be sending your detailed AI readiness report to {userInfo.email} within one business day.</p>
            <p className="text-sm text-gray-500 mt-4">A member of our team may reach out to discuss strategic recommendations for your organization.</p>
          </div>
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
          <div className="p-4 border rounded-lg bg-gray-50">
            <h4 className="font-medium text-lg mb-4">Complete Your Report Request</h4>
            <p className="text-sm text-gray-600 mb-4">Please provide a few additional details to help us customize your report:</p>
            
            <Form {...additionalForm}>
              <form onSubmit={additionalForm.handleSubmit(handleSubmitAdditionalInfo)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <Input value={userInfo.firstname} disabled className="bg-gray-100" />
                    </FormItem>
                  </div>
                  
                  <div>
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <Input value={userInfo.lastname} disabled className="bg-gray-100" />
                    </FormItem>
                  </div>
                  
                  <div>
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <Input value={userInfo.email} disabled className="bg-gray-100" />
                    </FormItem>
                  </div>
                  
                  <div>
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <Input value={userInfo.company} disabled className="bg-gray-100" />
                    </FormItem>
                  </div>
                  
                  <div>
                    <FormField
                      control={additionalForm.control}
                      name="jobTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Your role in the company" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div>
                    <FormField
                      control={additionalForm.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Best number to reach you" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <FormField
                  control={additionalForm.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Comments (optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any specific areas of interest or questions you have about AI implementation" 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end space-x-3 pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowAdditionalForm(false)}
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white flex items-center gap-2"
                    disabled={localSubmitted || isSubmitted}
                  >
                    Submit Report Request <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SubmitResultsForm;
