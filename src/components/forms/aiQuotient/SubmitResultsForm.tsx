
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
  const [submitAttempt, setSubmitAttempt] = useState(0);
  const { toast } = useToast();
  
  // Convert score to string for consistency with HubSpot expectations
  const scoreAsString = String(score);
  
  // Debug information
  console.log(`Score for submission: ${score} (${typeof score})`);
  console.log(`Score as string: ${scoreAsString} (${typeof scoreAsString})`);
  console.log(`Using HubSpot portalId: ${portalId}, formId: ${formId}, region: ${region}`);
  console.log(`Using submission delay: ${submissionDelay || 15000}ms`);

  // Get HubSpot tracking cookie
  const getHubspotCookie = () => {
    const cookies = document.cookie.split(';');
    const hubspotCookie = cookies.find(c => c.trim().startsWith('hubspotutk='));
    return hubspotCookie ? hubspotCookie.trim().substring(11) : undefined;
  };

  // Submit directly to HubSpot API - extremely simplified to focus on the score field
  const submitToHubSpot = async () => {
    if (!apiKey || !portalId || !formId) {
      console.error('Missing required HubSpot configuration');
      return false;
    }
    
    try {
      console.log(`Attempt ${submitAttempt + 1}: Starting submission to HubSpot...`);
      
      // Create focused fields array with ONLY what's absolutely necessary
      // Using aitest_score as the primary field name
      const fields = [
        { name: "firstname", value: userInfo.firstname },
        { name: "lastname", value: userInfo.lastname },
        { name: "email", value: userInfo.email },
        { name: "company", value: userInfo.company },
        { name: "aitest_score", value: scoreAsString }
      ];
      
      console.log('Submitting these fields to HubSpot:', fields);
      
      // Build the payload with the cookie for better tracking
      const payload = {
        submittedAt: Date.now(),
        fields: fields,
        context: {
          hutk: getHubspotCookie(),
          pageUri: window.location.href,
          pageName: document.title
        }
      };
      
      // Submit to the forms API
      const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;
      console.log(`Submitting to URL: ${url}`);
      
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
      
      console.log('Form submission successful! Attempting direct property update as well...');
      
      // Also try to update contact properties directly for redundancy
      await updateContactProperty();
      
      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "Your assessment has been submitted successfully.",
      });
      onSubmit();
      
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      return false;
    }
  };
  
  // Update contact property directly using the CRM API
  const updateContactProperty = async () => {
    if (!apiKey) return false;
    
    try {
      console.log('Attempting direct contact property update...');
      
      // First search for the contact by email
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
      
      // If contact exists, update their properties directly
      if (searchData.results && searchData.results.length > 0) {
        const contactId = searchData.results[0].id;
        console.log('Found existing contact with ID:', contactId);
        
        const updateUrl = `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`;
        const updatePayload = {
          properties: {
            aitest_score: scoreAsString
          }
        };
        
        console.log('Updating contact properties directly:', updatePayload);
        
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
          console.log('Successfully updated contact property');
          return true;
        }
      } else {
        // If contact doesn't exist yet, the form submission will create it
        console.log('No existing contact found - form submission will create a new contact');
      }
      
      return false;
    } catch (error) {
      console.error('Error updating contact property:', error);
      return false;
    }
  };

  // Submission logic with delay
  useEffect(() => {
    if (isSubmitted || isSubmitting) return;
    
    const attemptSubmission = async () => {
      setIsSubmitting(true);
      
      try {
        // Wait for HubSpot tracking to initialize
        console.log(`Waiting ${submissionDelay || 15000}ms before submitting...`);
        await new Promise(resolve => setTimeout(resolve, submissionDelay || 15000));
        
        // Try form submission
        const success = await submitToHubSpot();
        
        if (success) {
          console.log('Submission successful!');
        } else if (submitAttempt < 2) {
          console.log(`Attempt ${submitAttempt + 1} failed, will retry...`);
          setSubmitAttempt(prev => prev + 1);
        } else {
          console.log('All submission attempts failed');
          toast({
            variant: "destructive",
            title: "Submission Warning",
            description: "Your results were saved locally but we had trouble submitting to our system. Please contact support.",
          });
        }
      } finally {
        setIsSubmitting(false);
      }
    };
    
    // Start submission process
    attemptSubmission();
  }, [submitAttempt]);

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
        
        {(!isSubmitting && !isSubmitted && submitAttempt >= 2) && (
          <div className="text-center p-4">
            <p className="text-amber-600 font-medium">
              We're having trouble submitting your assessment. Your results are saved locally.
            </p>
            <button 
              onClick={() => setSubmitAttempt(0)} 
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
