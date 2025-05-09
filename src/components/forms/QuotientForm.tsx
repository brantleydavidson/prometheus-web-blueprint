
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { questions, questionsByPillar } from '@/data/aiQuotientQuestions';
import UserInfoForm, { UserInfo } from './aiQuotient/UserInfoForm';
import QuestionsForm from './aiQuotient/QuestionsForm';
import SubmitResultsForm from './aiQuotient/SubmitResultsForm';
import { useHubSpot } from '@/integrations/hubspot/HubSpotProvider';

const QuotientForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(-1); // -1 is for user info page
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstname: '',
    lastname: '',
    email: '',
    company: ''
  });
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [score, setScore] = useState(0);
  const [pillarScores, setPillarScores] = useState<{[key: string]: number}>({});
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { portalId, formId, submitToHubSpot } = useHubSpot();
  
  // Log HubSpot configuration when component mounts
  useEffect(() => {
    console.log('==========================================');
    console.log('QuotientForm initialized with HubSpot config:');
    console.log('Portal ID:', portalId);
    console.log('Form ID:', formId);
    console.log('submitToHubSpot function available:', !!submitToHubSpot);
    console.log('==========================================');
  }, [portalId, formId, submitToHubSpot]);
  
  const totalSteps = questions.length;
  
  // Calculate maximum points possible for each pillar
  const maxPillarScores = Object.keys(questionsByPillar).reduce((acc, pillar) => {
    acc[pillar] = questionsByPillar[pillar].length * 4; // 4 points per question maximum
    return acc;
  }, {} as Record<string, number>);
  
  const handleUserInfoSubmit = (data: UserInfo) => {
    console.log('User info submitted:', data);
    setUserInfo(data);
    setCurrentStep(0); // Move to the first question
    toast({
      title: "Let's Begin!",
      description: "Now let's assess your AI readiness.",
    });
  };
  
  const handleNext = async (data: { answer: string }) => {
    // Save answer
    const newAnswers = { ...answers, [currentStep]: data.answer };
    setAnswers(newAnswers);
    
    // Calculate running score
    const currentQuestion = questions[currentStep];
    const questionValue = currentQuestion.options.find(
      option => option.id === data.answer
    )?.value || 0;
    
    // Update total score
    const newScore = score + questionValue;
    setScore(newScore);
    
    // Update pillar scores
    const pillar = currentQuestion.pillar;
    const newPillarScores = {
      ...pillarScores,
      [pillar]: (pillarScores[pillar] || 0) + questionValue
    };
    setPillarScores(newPillarScores);
    
    // Move to next question or finish
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // This is the last question - show results
      setShowResults(true);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      // Remove the score contribution from the current question when going back
      const currentQuestion = questions[currentStep];
      const currentAnswerId = answers[currentStep];
      
      if (currentAnswerId) {
        const pointValue = currentQuestion.options.find(
          option => option.id === currentAnswerId
        )?.value || 0;
        
        // Update total score
        setScore(score - pointValue);
        
        // Update pillar score
        const pillar = currentQuestion.pillar;
        setPillarScores({
          ...pillarScores,
          [pillar]: (pillarScores[pillar] || 0) - pointValue
        });
      }
      
      setCurrentStep(currentStep - 1);
    } else if (currentStep === 0) {
      setCurrentStep(-1); // Go back to user info page
    }
  };
  
  const handleSubmitResults = async () => {
    console.log('=== Starting AI Quotient results submission ===');
    console.log('Current page:', window.location.pathname);
    console.log('Current URL:', window.location.href);
    console.log('Using HubSpot Portal ID:', portalId);
    console.log('Using HubSpot Form ID:', formId);
    
    // Prevent multiple submissions
    if (isSubmitting || isSubmitted) {
      console.log('Submission already in progress or completed, skipping');
      return;
    }
    
    if (!submitToHubSpot) {
      console.error('HubSpot submitToHubSpot function is not available');
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "HubSpot integration is not available.",
      });
      return;
    }

    console.log('HubSpot integration available, proceeding with submission');
    setIsSubmitting(true);
    
    try {
      // Calculate the score percentage for a clearer metric (0-100 instead of raw score)
      const scorePercentage = Math.round((score / (totalSteps * 4)) * 100);
      
      // Log the values being sent to help with debugging
      console.log("Submitting to HubSpot with raw score:", score);
      console.log("Total possible score:", totalSteps * 4);
      console.log("Score percentage:", scorePercentage);
      console.log("Pillar scores:", pillarScores);
      
      // Ensure property names match exactly what's in HubSpot
      // These field names must exist in your HubSpot account
      const fields = [
        // Standard contact properties
        { name: "firstname", value: userInfo.firstname },
        { name: "lastname", value: userInfo.lastname },
        { name: "email", value: userInfo.email },
        { name: "company", value: userInfo.company },
        
        // Custom properties - make sure these exist in HubSpot with exact same names
        { name: "ai_readiness_score", value: String(score) },
        { name: "ai_readiness_percentage", value: String(scorePercentage) },
        { name: "requested_ai_report", value: "Yes" }
      ];
      
      // Add pillar scores as separate fields with standardized naming
      Object.entries(pillarScores).forEach(([pillar, pillarScore]) => {
        // Convert to snake_case for consistency in HubSpot
        const fieldName = `ai_pillar_${pillar.toLowerCase().replace(/\s+/g, '_')}`;
        fields.push({ name: fieldName, value: String(pillarScore) });
        
        // Also add percentage for each pillar
        const maxForPillar = maxPillarScores[pillar] || 0;
        if (maxForPillar > 0) {
          const pillarPercentage = Math.round((pillarScore / maxForPillar) * 100);
          fields.push({ 
            name: `${fieldName}_percentage`, 
            value: String(pillarPercentage) 
          });
        }
      });
      
      console.log("Submitting these fields to HubSpot:", JSON.stringify(fields, null, 2));
      console.log("Starting direct API submission to HubSpot...");
      const success = await submitToHubSpot(fields);
      
      if (success) {
        console.log("HubSpot submission successful");
        setIsSubmitted(true);
        toast({
          title: "Success!",
          description: "Your assessment has been submitted successfully.",
        });
      } else {
        console.error("HubSpot submission returned false");
        toast({
          variant: "destructive",
          title: "Submission Warning",
          description: "We had trouble submitting to our system. Please contact support.",
        });
      }
    } catch (error) {
      console.error("Error submitting to HubSpot:", error);
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "An error occurred while submitting your assessment.",
      });
    } finally {
      console.log('=== Finished AI Quotient results submission ===');
      setIsSubmitting(false);
    }
  };

  // Show user information collection form
  if (currentStep === -1) {
    return <UserInfoForm initialData={userInfo} onSubmit={handleUserInfoSubmit} />;
  }
  
  // Show results and submit to HubSpot
  if (showResults) {
    return (
      <SubmitResultsForm 
        score={score} 
        totalPossible={totalSteps * 4} 
        userInfo={userInfo}
        pillarScores={pillarScores}
        maxPillarScores={maxPillarScores}
        onSubmit={handleSubmitResults}
        isSubmitting={isSubmitting}
        isSubmitted={isSubmitted}
      />
    );
  }
  
  // Get the current pillar
  const currentPillar = currentStep >= 0 ? questions[currentStep].pillar : '';
  const pillarQuestionCount = currentPillar ? questionsByPillar[currentPillar]?.length || 0 : 0;
  const pillarProgress = currentPillar ? 
    questionsByPillar[currentPillar].findIndex(q => q.id === questions[currentStep].id) + 1 : 0;
  
  // Show questions form
  return (
    <>
      {currentPillar && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-prometheus-navy mb-2">{currentPillar}</h3>
          <p className="text-sm text-gray-500">
            Section {pillarProgress} of {pillarQuestionCount}
          </p>
        </div>
      )}
      <QuestionsForm 
        currentStep={currentStep} 
        answers={answers} 
        onNext={handleNext} 
        onPrevious={handlePrevious} 
      />
    </>
  );
};

export default QuotientForm;
