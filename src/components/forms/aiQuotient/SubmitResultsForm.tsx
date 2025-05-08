
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
  const { portalId, apiKey, formId, region, submissionDelay } = useHubSpot();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitAttempts, setSubmitAttempts] = useState(0);
  const { toast } = useToast();

  // Explicitly convert score to string for HubSpot
  const scoreAsString = String(score);
  
  // Log original score and string conversion to verify format
  console.log(`Original score: ${score}, Type: ${typeof score}`);
  console.log(`Converted score: ${scoreAsString}, Type: ${typeof scoreAsString}`);

  // IMPORTANT: Prioritizing 'aitest_score' field as specified by the user
  // Using a more targeted approach with fewer variations
  const hubspotCustomData = {
    ...userInfo,
    // Primary field name as specified by user (primary focus)
    aitest_score: scoreAsString,
    // Only include a few essential backups
    ai_test_score: scoreAsString,
    score: scoreAsString,
    // Also include directly in properties object for API calls
    properties: {
      aitest_score: scoreAsString
    }
  };

  // Log the data being sent to HubSpot for debugging
  useEffect(() => {
    console.log('HubSpot submission data:', hubspotCustomData);
    console.log('Using HubSpot region:', region || 'na1');
    console.log('Using submission delay:', submissionDelay || 8000, 'ms');
  }, [hubspotCustomData, region, submissionDelay]);

  // Directly call HubSpot API with the simplest possible payload
  const submitDirectlyToHubSpot = async () => {
    if (!apiKey) {
      console.error('No HubSpot API key found for API submission');
      return false;
    }
    
    try {
      setIsSubmitting(true);
      console.log('Starting direct HubSpot API submission for aitest_score');
      
      // Wait for HubSpot to be ready
      await new Promise(resolve => setTimeout(resolve, submissionDelay || 8000));
      
      // Create the simplest possible payload focusing on the aitest_score
      const simpleFields = [
        { name: "firstname", value: userInfo.firstname },
        { name: "lastname", value: userInfo.lastname },
        { name: "email", value: userInfo.email },
        { name: "company", value: userInfo.company },
        { name: "aitest_score", value: scoreAsString }
      ];

      console.log('Simplified fields for HubSpot API:', simpleFields);

      const payload = {
        submittedAt: Date.now(),
        fields: simpleFields,
        context: {
          hutk: getHubspotCookie(),
          pageUri: window.location.href,
          pageName: document.title
        }
      };
      
      console.log('Submitting to HubSpot API with simplified payload:', payload);
      
      // Use the HubSpot forms API
      const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const responseText = await response.text();
      console.log('HubSpot API response:', responseText);
      
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        console.log('Could not parse response as JSON:', e);
      }

      if (!response.ok) {
        throw new Error(responseData?.message || `Failed with status ${response.status}`);
      }
      
      console.log('HubSpot submission successful with aitest_score focus');
      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "Your assessment has been submitted successfully.",
      });
      onSubmit();
      
      return true;
    } catch (error) {
      console.error('HubSpot submission error:', error);
      toast({
        variant: "destructive",
        title: "Submission Warning",
        description: "Your results were saved locally but we had trouble submitting to our system. Please contact support.",
      });
      
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Try to get the HubSpot cookie for better tracking
  const getHubspotCookie = () => {
    const cookies = document.cookie.split(';');
    const hubspotCookie = cookies.find(c => c.trim().startsWith('hubspotutk='));
    return hubspotCookie ? hubspotCookie.trim().substring(11) : undefined;
  };
  
  // Try a direct properties API call to update the contact
  const tryContactPropertiesUpdate = async () => {
    if (!apiKey) {
      console.error('No HubSpot API key found for properties update');
      return false;
    }
    
    try {
      console.log('Attempting direct contact properties update');
      
      // First try to get the contact by email
      const emailEncoded = encodeURIComponent(userInfo.email);
      const searchUrl = `https://api.hubapi.com/crm/v3/objects/contacts/search`;
      
      const searchPayload = {
        filterGroups: [{
          filters: [{
            propertyName: 'email',
            operator: 'EQ',
            value: userInfo.email
          }]
        }]
      };
      
      console.log('Searching for contact with email:', userInfo.email);
      
      const searchResponse = await fetch(searchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(searchPayload)
      });
      
      const searchData = await searchResponse.json();
      console.log('Search response:', searchData);
      
      let contactId;
      
      if (searchData.results && searchData.results.length > 0) {
        contactId = searchData.results[0].id;
        console.log('Found existing contact with ID:', contactId);
      } else {
        console.log('Contact not found, will create during form submission');
        return false;
      }
      
      if (contactId) {
        // Update the contact properties directly
        const updateUrl = `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`;
        
        const updatePayload = {
          properties: {
            aitest_score: scoreAsString
          }
        };
        
        console.log('Updating contact with aitest_score:', updatePayload);
        
        const updateResponse = await fetch(updateUrl, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify(updatePayload)
        });
        
        const updateData = await updateResponse.json();
        console.log('Contact update response:', updateData);
        
        if (updateResponse.ok) {
          console.log('Successfully updated contact with aitest_score property');
          return true;
        } else {
          console.error('Failed to update contact:', updateData);
          return false;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Error updating contact properties:', error);
      return false;
    }
  };

  // Submit data with a focused approach
  useEffect(() => {
    const attemptSubmission = async () => {
      if (isSubmitted || isSubmitting || submitAttempts >= 3) return;
      
      setIsSubmitting(true);
      setSubmitAttempts(prev => prev + 1);
      
      console.log(`Focused submission attempt ${submitAttempts + 1} for aitest_score`);
      
      // First attempt - direct API submission with a focus on aitest_score
      const apiSuccess = await submitDirectlyToHubSpot();
      
      // If direct submission succeeded, also try to update the contact properties directly 
      if (apiSuccess) {
        console.log('First method succeeded, also attempting contact property update for redundancy');
        await tryContactPropertiesUpdate();
      } 
      // If first attempt failed, try the contact properties update as a fallback
      else if (!isSubmitted) {
        console.log('First method failed, trying direct contact property update instead');
        setTimeout(async () => {
          if (!isSubmitted) {
            const contactUpdateSuccess = await tryContactPropertiesUpdate();
            if (contactUpdateSuccess) {
              setIsSubmitted(true);
              onSubmit();
            }
          }
        }, 5000);
      }
      
      setIsSubmitting(false);
    };
    
    // Wait before initial submission attempt
    const timer = setTimeout(() => {
      attemptSubmission();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [submitAttempts, isSubmitted]);

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
        
        {(!isSubmitting && !isSubmitted && submitAttempts >= 3) && (
          <div className="text-center p-4">
            <p className="text-amber-600 font-medium">
              We're having trouble submitting your assessment. Your results are saved locally.
            </p>
            <button 
              onClick={() => setSubmitAttempts(0)} 
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
