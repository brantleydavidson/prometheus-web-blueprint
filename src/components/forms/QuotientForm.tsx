
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { questions } from '@/data/aiQuotientQuestions';
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
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { submitToHubSpot } = useHubSpot();
  
  const totalSteps = questions.length;
  
  const handleUserInfoSubmit = (data: UserInfo) => {
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
    
    const newScore = score + questionValue;
    setScore(newScore);
    
    // Move to next question or finish
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // This is the last question - show results without submitting to HubSpot
      setShowResults(true);
      // Note: We're NOT submitting to HubSpot here anymore
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (currentStep === 0) {
      setCurrentStep(-1); // Go back to user info page
    }
  };
  
  const handleSubmitResults = async () => {
    if (!submitToHubSpot) {
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "HubSpot integration is not available.",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create focused fields array with ONLY what's absolutely necessary
      const fields = [
        { name: "firstname", value: userInfo.firstname },
        { name: "lastname", value: userInfo.lastname },
        { name: "email", value: userInfo.email },
        { name: "company", value: userInfo.company },
        { name: "aitest_score", value: String(score) }
      ];
      
      console.log("Submitting to HubSpot with score:", score);
      const success = await submitToHubSpot(fields);
      
      if (success) {
        setIsSubmitted(true);
        toast({
          title: "Success!",
          description: "Your assessment has been submitted successfully.",
        });
      } else {
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
        onSubmit={handleSubmitResults}
        isSubmitting={isSubmitting}
        isSubmitted={isSubmitted}
      />
    );
  }
  
  // Show questions form
  return (
    <QuestionsForm 
      currentStep={currentStep} 
      answers={answers} 
      onNext={handleNext} 
      onPrevious={handlePrevious} 
    />
  );
};

export default QuotientForm;
