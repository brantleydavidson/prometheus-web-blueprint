
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

  // Using "ai_quotient" as the primary field name format
  // + several variations to increase chances of success
  const hubspotCustomData = {
    ...userInfo,
    ai_quotient: String(score),
    aiQuotient: String(score),
    ai_quotient_score: String(score),
    aiQuotientScore: String(score),
    hs_ai_quotient_score: String(score),
    ai_test_score: String(score),
    aitest_score: String(score),
    score: String(score),
    // Also pass as a number format
    ai_quotient_numeric: score,
    // Include as properties as well for API calls
    properties: {
      ai_quotient: String(score),
      ai_quotient_score: String(score),
      aiQuotientScore: String(score),
      hs_ai_quotient_score: String(score),
      ai_test_score: String(score)
    }
  };

  // Log the data being sent to HubSpot for debugging
  useEffect(() => {
    console.log('HubSpot data prepared:', hubspotCustomData);
    console.log('Using HubSpot region:', region || 'na1');
    console.log('Using submission delay:', submissionDelay || 2000, 'ms');
  }, [hubspotCustomData, region, submissionDelay]);

  // Submit via embedded form script first to see if that works
  const submitViaEmbeddedScript = () => {
    if (!(window as any).hbspt || !(window as any).hbspt.forms) {
      console.error("HubSpot forms script not loaded");
      return false;
    }
    
    try {
      console.log("Submitting via embedded script with delay");
      
      // Create a hidden div to host the form
      const formContainerId = `hidden-form-${Date.now()}`;
      const formContainer = document.createElement('div');
      formContainer.id = formContainerId;
      formContainer.style.display = 'none';
      document.body.appendChild(formContainer);
      
      // Create the form with delay to ensure proper synchronization
      setTimeout(() => {
        console.log("Creating embedded form after delay");
        (window as any).hbspt.forms.create({
          region: region || 'na1',
          portalId: portalId,
          formId: formId,
          target: `#${formContainerId}`,
          inlineMessage: "Form submitted via script",
          onFormSubmit: () => {
            console.log("Embedded form submitted successfully");
            setTimeout(() => {
              if (formContainer.parentNode) {
                document.body.removeChild(formContainer);
              }
              setIsSubmitted(true);
              onSubmit();
            }, 1000);
            return true;
          },
          onFormReady: ($form) => {
            console.log("Form is ready, filling fields with data");
            // Fill in form fields with a delay to ensure proper state
            setTimeout(() => {
              try {
                // Standard fields
                Object.entries(userInfo).forEach(([key, value]) => {
                  const field = $form.find(`[name="${key}"]`);
                  if (field.length) {
                    console.log(`Setting field ${key} to ${value}`);
                    field.val(value);
                  } else {
                    console.log(`Field ${key} not found in form`);
                  }
                });
                
                // Try all possible score field names
                [
                  'ai_quotient', 
                  'ai_quotient_score', 
                  'aiQuotientScore', 
                  'hs_ai_quotient_score',
                  'ai_test_score',
                  'aitest_score',
                  'score'
                ].forEach(fieldName => {
                  const field = $form.find(`[name="${fieldName}"]`);
                  if (field.length) {
                    console.log(`Found score field: ${fieldName}, setting to ${score}`);
                    field.val(String(score));
                  }
                });
                
                // Submit the form with a slight delay
                console.log("Submitting form now...");
                $form.submit();
              } catch (error) {
                console.error("Error filling or submitting embedded form:", error);
              }
            }, 1000);
          }
        });
      }, submissionDelay || 2000);
      
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
      return false;
    }
    
    try {
      setIsSubmitting(true);
      console.log('Starting HubSpot API submission with data:', hubspotCustomData);
      
      // Wait a bit to ensure HubSpot is ready to receive the data
      await new Promise(resolve => setTimeout(resolve, submissionDelay || 2000));
      
      // Format data for HubSpot API
      const fields = Object.entries(hubspotCustomData)
        .filter(([key]) => key !== 'properties') // Skip properties field
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
  
  // Try a third method: using a synchronized form
  const trySynchronizedFormSubmission = () => {
    console.log("Attempting synchronized form submission");
    
    if (!(window as any).hbspt) {
      console.error("HubSpot script not loaded");
      return false;
    }
    
    try {
      // Create a pre-filled form using hidden inputs in the DOM
      const formDiv = document.createElement('div');
      formDiv.style.position = 'absolute';
      formDiv.style.left = '-9999px'; // Hide off-screen
      document.body.appendChild(formDiv);
      
      const form = document.createElement('form');
      form.id = `hubspot-sync-form-${Date.now()}`;
      formDiv.appendChild(form);
      
      // Add all user fields
      Object.entries(userInfo).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });
      
      // Add score field with all possible names
      [
        'ai_quotient', 
        'ai_quotient_score', 
        'aiQuotientScore', 
        'hs_ai_quotient_score', 
        'ai_test_score',
        'aitest_score',
        'score'
      ].forEach(fieldName => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = fieldName;
        input.value = String(score);
        form.appendChild(input);
      });
      
      // Submit synchronously with the HubSpot API
      const submitUrl = `https://forms.hsforms.com/submissions/v3/public/submit/formsnext/multipart/${portalId}/${formId}`;
      const formData = new FormData(form);
      
      console.log("Submitting synchronized form with data:", Object.fromEntries(formData));
      
      fetch(submitUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // This allows cross-origin submission without CORS issues
      })
      .then(() => {
        console.log("Synchronized form submitted (no-cors mode)");
        setTimeout(() => {
          document.body.removeChild(formDiv);
          setIsSubmitted(true);
          onSubmit();
        }, 1000);
      })
      .catch(err => {
        console.error("Error with synchronized form submission:", err);
        document.body.removeChild(formDiv);
        return false;
      });
      
      return true;
    } catch (error) {
      console.error("Error setting up synchronized form:", error);
      return false;
    }
  };

  // Submit data automatically with improved retry logic
  useEffect(() => {
    const attemptSubmission = async () => {
      if (isSubmitted || isSubmitting || submitAttempts >= 3) return;
      
      setIsSubmitting(true);
      setSubmitAttempts(prev => prev + 1);
      
      console.log(`Submission attempt ${submitAttempts + 1}`);
      
      // For first attempt, try both methods with delay between them
      if (submitAttempts === 0) {
        // First try the embedded script method
        const scriptSuccess = submitViaEmbeddedScript();
        
        // If that doesn't work, try the API method after a delay
        if (!scriptSuccess) {
          setTimeout(async () => {
            const apiSuccess = await submitDirectlyToHubSpot();
            
            // If API method also fails, try synchronized form method
            if (!apiSuccess) {
              setTimeout(() => {
                trySynchronizedFormSubmission();
              }, 1000);
            }
          }, submissionDelay || 2000);
        }
      } 
      // For second attempt, try API submission if not already submitted
      else if (submitAttempts === 1 && !isSubmitted) {
        setTimeout(async () => {
          const success = await submitDirectlyToHubSpot();
          
          if (!success) {
            setTimeout(() => {
              trySynchronizedFormSubmission();
            }, 1000);
          }
        }, submissionDelay || 2000);
      }
      // For third attempt, try synchronized form submission
      else if (submitAttempts === 2 && !isSubmitted) {
        setTimeout(() => {
          trySynchronizedFormSubmission();
        }, 1000);
      }
      
      setIsSubmitting(false);
    };
    
    // Don't auto-submit immediately - wait a bit to ensure everything is ready
    const timer = setTimeout(() => {
      attemptSubmission();
    }, 500);
    
    return () => clearTimeout(timer);
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
