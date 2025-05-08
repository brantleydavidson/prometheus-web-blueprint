
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
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
  
  // Try multiple field name variations that might match what's in HubSpot
  // Sometimes HubSpot's internal field name is different from what's displayed in the UI
  const hubspotCustomData = {
    ...userInfo,
    // Try different variations of the field name - HubSpot sometimes normalizes field names
    aitest_score: String(score),
    ai_test_score: String(score),
    aitestscore: String(score),
    "ai test score": String(score),
    "ai_quotient_score": String(score),
    "ai quotient score": String(score),
    // Also try it directly in the properties field which sometimes works
    properties: {
      aitest_score: String(score),
      ai_test_score: String(score)
    }
  };

  // Log the data being sent to HubSpot for debugging
  useEffect(() => {
    console.log('HubSpot data prepared:', hubspotCustomData);
  }, [hubspotCustomData]);

  // Submit directly to HubSpot
  const submitDirectlyToHubSpot = async () => {
    if (!apiKey) {
      console.error('No HubSpot API key found');
      return;
    }
    
    try {
      setIsSubmitting(true);
      console.log('Starting HubSpot submission with data:', hubspotCustomData);
      
      // Format data for HubSpot API
      const fields = Object.entries(hubspotCustomData)
        .filter(([key]) => key !== 'properties') // Skip the properties field as we'll handle it separately
        .map(([name, value]) => ({
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
      
      // Now let's try to update the contact directly with the properties
      try {
        if (userInfo.email) {
          console.log('Attempting to update contact directly via email:', userInfo.email);
          // First get the contact by email to get the ID
          const contactSearchUrl = `https://api.hubapi.com/crm/v3/objects/contacts/search`;
          const searchResponse = await fetch(contactSearchUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              filterGroups: [
                {
                  filters: [
                    {
                      propertyName: "email",
                      operator: "EQ",
                      value: userInfo.email
                    }
                  ]
                }
              ]
            })
          });
          
          const searchData = await searchResponse.json();
          console.log('Contact search response:', searchData);
          
          if (searchData.results && searchData.results.length > 0) {
            const contactId = searchData.results[0].id;
            console.log('Found contact ID:', contactId);
            
            // Update the contact with the score
            const updateUrl = `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`;
            const updateResponse = await fetch(updateUrl, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
              },
              body: JSON.stringify({
                properties: {
                  aitest_score: String(score)
                }
              })
            });
            
            const updateData = await updateResponse.json();
            console.log('Contact update response:', updateData);
          }
        }
      } catch (contactUpdateError) {
        console.error('Error updating contact directly:', contactUpdateError);
        // Don't throw here, we still consider the form submission successful
      }
      
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
