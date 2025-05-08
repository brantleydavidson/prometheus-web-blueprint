
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
  const { portalId, apiKey, formId, region } = useHubSpot();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitAttempts, setSubmitAttempts] = useState(0);
  const { toast } = useToast();
  
  // Create data object for HubSpot with multiple formats to increase chances of success
  const hubspotCustomData = {
    ...userInfo,
    // Try every possible field name variation
    aitest_score: String(score),
    ai_test_score: String(score),
    aitestscore: String(score),
    "ai test score": String(score),
    "ai_quotient_score": String(score),
    "ai quotient score": String(score),
    "aiquotientscore": String(score),
    // Try numeric versions too
    aitest_score_numeric: score,
    ai_test_score_numeric: score,
    // Include as properties as well
    properties: {
      aitest_score: String(score),
      ai_test_score: String(score)
    }
  };

  // Log the data being sent to HubSpot for debugging
  useEffect(() => {
    console.log('HubSpot data prepared:', hubspotCustomData);
    console.log('Using HubSpot region:', region || 'na1');
  }, [hubspotCustomData, region]);

  // Submit via embedded form script first to see if that works
  const submitViaEmbeddedScript = () => {
    if (!(window as any).hbspt || !(window as any).hbspt.forms) {
      console.error("HubSpot forms script not loaded");
      return false;
    }
    
    try {
      console.log("Attempting submission via embedded script");
      
      // Create a hidden div to host the form
      const formContainerId = `hidden-form-${Date.now()}`;
      const formContainer = document.createElement('div');
      formContainer.id = formContainerId;
      formContainer.style.display = 'none';
      document.body.appendChild(formContainer);
      
      // Create the form and submit it programmatically
      (window as any).hbspt.forms.create({
        region: region || 'na1',
        portalId: portalId,
        formId: formId,
        target: `#${formContainerId}`,
        inlineMessage: "Form submitted via script",
        onFormSubmit: () => {
          console.log("Embedded form submitted successfully");
          document.body.removeChild(formContainer);
          return true;
        },
        onFormReady: ($form) => {
          // Fill in form fields
          Object.entries(userInfo).forEach(([key, value]) => {
            const field = $form.find(`[name="${key}"]`);
            if (field.length) {
              field.val(value);
            }
          });
          
          // Add custom score field if it exists
          ['aitest_score', 'ai_test_score', 'aitestscore', 'ai quotient score'].forEach(fieldName => {
            const field = $form.find(`[name="${fieldName}"]`);
            if (field.length) {
              field.val(String(score));
            }
          });
          
          // Submit the form
          setTimeout(() => {
            $form.submit();
          }, 500);
        }
      });
      
      return true;
    } catch (error) {
      console.error("Error with embedded form submission:", error);
      return false;
    }
  };

  // Submit directly to HubSpot API
  const submitDirectlyToHubSpot = async () => {
    if (!apiKey) {
      console.error('No HubSpot API key found');
      return;
    }
    
    try {
      setIsSubmitting(true);
      console.log('Starting HubSpot API submission with data:', hubspotCustomData);
      
      // Format data for HubSpot API
      const fields = Object.entries(hubspotCustomData)
        .filter(([key]) => key !== 'properties') // Skip the properties field as we'll handle it separately
        .map(([name, value]) => ({
          name,
          value: typeof value === 'object' ? JSON.stringify(value) : String(value)
        }));

      console.log('Formatted fields for HubSpot:', fields);

      const payload = {
        submittedAt: Date.now(),
        fields,
        context: {
          hutk: getHubspotCookie(),
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
      
      // Try to update the contact directly with the properties as well
      try {
        await updateContactDirectly();
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
  
  // Get the HubSpot cookie for better tracking
  const getHubspotCookie = () => {
    const cookies = document.cookie.split(';');
    const hubspotCookie = cookies.find(c => c.trim().startsWith('hubspotutk='));
    return hubspotCookie ? hubspotCookie.trim().substring(11) : undefined;
  };
  
  // Update contact directly via CRM API
  const updateContactDirectly = async () => {
    if (!apiKey || !userInfo.email) return;
    
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
      
      // Try multiple field names when updating the contact
      const updateUrl = `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`;
      const updateResponse = await fetch(updateUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          properties: {
            aitest_score: String(score),
            ai_test_score: String(score),
            aitestscore: String(score),
            "ai_quotient_score": String(score)
          }
        })
      });
      
      const updateData = await updateResponse.json();
      console.log('Contact update response:', updateData);
      return updateData;
    }
    
    return null;
  };

  // Submit data automatically with retry logic
  useEffect(() => {
    const attemptSubmission = async () => {
      if (isSubmitted || isSubmitting || submitAttempts >= 3) return;
      
      setIsSubmitting(true);
      setSubmitAttempts(prev => prev + 1);
      
      console.log(`Submission attempt ${submitAttempts + 1}`);
      
      // Try embedded form script first
      let success = submitViaEmbeddedScript();
      
      // If that fails, try API submission
      if (!success) {
        setTimeout(async () => {
          success = await submitDirectlyToHubSpot();
          
          if (!success && submitAttempts < 2) {
            // Wait and try again later
            setTimeout(attemptSubmission, 3000);
          }
        }, 1000);
      } else {
        setIsSubmitted(true);
        toast({
          title: "Success!",
          description: "Your assessment has been submitted successfully.",
        });
        onSubmit();
      }
      
      setIsSubmitting(false);
    };
    
    attemptSubmission();
  }, [submitAttempts]);

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
