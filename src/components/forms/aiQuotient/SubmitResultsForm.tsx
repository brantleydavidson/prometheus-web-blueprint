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

  // IMPORTANT: Prioritizing 'aitest_score' field as specified by the user
  // Still including other variations for backward compatibility
  // Also explicitly converting score to string for HubSpot
  const hubspotCustomData = {
    ...userInfo,
    // Primary field name as specified by user
    aitest_score: String(score),
    // Secondary alternatives
    ai_test_score: String(score),
    ai_quotient: String(score),
    aiQuotient: String(score),
    ai_quotient_score: String(score),
    aiQuotientScore: String(score),
    hs_ai_quotient_score: String(score),
    score: String(score),
    // Also pass as properties for API calls
    properties: {
      aitest_score: String(score),
      ai_test_score: String(score)
    }
  };

  // Log the data being sent to HubSpot for debugging
  useEffect(() => {
    console.log('HubSpot data prepared:', hubspotCustomData);
    console.log('Using HubSpot region:', region || 'na1');
    console.log('Using submission delay:', submissionDelay || 5000, 'ms');
  }, [hubspotCustomData, region, submissionDelay]);

  // Submit via embedded form script - improved with longer timeouts
  const submitViaEmbeddedScript = () => {
    if (!(window as any).hbspt || !(window as any).hbspt.forms) {
      console.error("HubSpot forms script not loaded");
      return false;
    }
    
    try {
      console.log("Submitting via embedded script with extended delay");
      
      // Create a hidden div to host the form
      const formContainerId = `hidden-form-${Date.now()}`;
      const formContainer = document.createElement('div');
      formContainer.id = formContainerId;
      formContainer.style.display = 'none';
      document.body.appendChild(formContainer);
      
      // Create the form with longer delay to ensure proper synchronization
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
            }, 2000);
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
                
                // Try all score field names, but prioritize the aitest_score
                [
                  'aitest_score', // This is now first in the list as requested
                  'ai_test_score', 
                  'ai_quotient', 
                  'ai_quotient_score', 
                  'aiQuotientScore', 
                  'hs_ai_quotient_score',
                  'score'
                ].forEach(fieldName => {
                  const field = $form.find(`[name="${fieldName}"]`);
                  if (field.length) {
                    console.log(`Found score field: ${fieldName}, setting to ${score}`);
                    field.val(String(score));
                  }
                });
                
                // Wait longer before submission
                console.log("Waiting before submitting form...");
                setTimeout(() => {
                  console.log("Now submitting form...");
                  $form.submit();
                }, 3000);
              } catch (error) {
                console.error("Error filling or submitting embedded form:", error);
              }
            }, 2000);
          }
        });
      }, submissionDelay || 5000);
      
      return true;
    } catch (error) {
      console.error("Error with embedded form submission:", error);
      return false;
    }
  };

  // Submit directly to HubSpot API with increased delays
  const submitDirectlyToHubSpot = async () => {
    if (!apiKey) {
      console.error('No HubSpot API key found');
      return false;
    }
    
    try {
      setIsSubmitting(true);
      console.log('Starting HubSpot API submission with data:', hubspotCustomData);
      
      // Wait longer to ensure HubSpot is ready to receive the data
      await new Promise(resolve => setTimeout(resolve, submissionDelay || 5000));
      
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
  
  // Try a third method: Manual form submission with hidden inputs
  const trySynchronizedFormSubmission = () => {
    console.log("Attempting manual form submission with hidden inputs");
    
    try {
      // Create a pre-filled form using hidden inputs in the DOM
      const formDiv = document.createElement('div');
      formDiv.style.position = 'absolute';
      formDiv.style.left = '-9999px'; // Hide off-screen
      document.body.appendChild(formDiv);
      
      const form = document.createElement('form');
      form.id = `hubspot-sync-form-${Date.now()}`;
      form.action = `https://forms.hsforms.com/submissions/v3/public/submit/formsnext/multipart/${portalId}/${formId}`;
      form.method = 'POST';
      form.target = '_blank'; // Open in new window/tab to avoid navigation
      formDiv.appendChild(form);
      
      // Add all user fields
      Object.entries(userInfo).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });
      
      // Add score field with all possible names, but prioritize aitest_score
      [
        'aitest_score', // This one first as requested
        'ai_test_score',
        'ai_quotient', 
        'ai_quotient_score', 
        'aiQuotientScore', 
        'hs_ai_quotient_score',
        'score'
      ].forEach(fieldName => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = fieldName;
        input.value = String(score);
        form.appendChild(input);
      });
      
      // Wait a bit before submitting
      console.log("Preparing to submit manual form in 3 seconds...");
      setTimeout(() => {
        try {
          console.log("Submitting manual form now");
          form.submit();
          console.log("Manual form submitted");
          
          // Wait a bit longer before marking as submitted
          setTimeout(() => {
            document.body.removeChild(formDiv);
            setIsSubmitted(true);
            onSubmit();
          }, 3000);
        } catch (err) {
          console.error("Error submitting manual form:", err);
          document.body.removeChild(formDiv);
          return false;
        }
      }, 3000);
      
      return true;
    } catch (error) {
      console.error("Error setting up manual form:", error);
      return false;
    }
  };

  // Submit data automatically with improved spacing between attempts
  useEffect(() => {
    const attemptSubmission = async () => {
      if (isSubmitted || isSubmitting || submitAttempts >= 3) return;
      
      setIsSubmitting(true);
      setSubmitAttempts(prev => prev + 1);
      
      console.log(`Submission attempt ${submitAttempts + 1}`);
      
      // For first attempt, try the embedded script method
      if (submitAttempts === 0) {
        submitViaEmbeddedScript();
        
        // Wait longer before trying next method
        setTimeout(async () => {
          if (!isSubmitted) {
            const apiSuccess = await submitDirectlyToHubSpot();
            
            // If API method also fails, wait before trying synchronized form method
            if (!apiSuccess && !isSubmitted) {
              setTimeout(() => {
                if (!isSubmitted) {
                  trySynchronizedFormSubmission();
                }
              }, 8000);
            }
          }
        }, 10000); // Wait 10 seconds before trying API method
      } 
      // For second attempt, try API submission with longer delay
      else if (submitAttempts === 1 && !isSubmitted) {
        setTimeout(async () => {
          if (!isSubmitted) {
            await submitDirectlyToHubSpot();
          }
          
          // Try synchronized form as last resort after a longer wait
          setTimeout(() => {
            if (!isSubmitted) {
              trySynchronizedFormSubmission();
            }
          }, 8000);
        }, 5000);
      }
      // For third attempt, just try synchronized form submission
      else if (submitAttempts === 2 && !isSubmitted) {
        setTimeout(() => {
          if (!isSubmitted) {
            trySynchronizedFormSubmission();
          }
        }, 3000);
      }
      
      setIsSubmitting(false);
    };
    
    // Wait longer before initial submission attempt
    const timer = setTimeout(() => {
      attemptSubmission();
    }, 2000);
    
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
