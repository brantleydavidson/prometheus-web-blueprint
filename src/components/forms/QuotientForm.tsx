
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { questions } from '@/data/aiQuotientQuestions';
import UserInfoForm, { UserInfo } from './aiQuotient/UserInfoForm';
import QuestionsForm from './aiQuotient/QuestionsForm';
import SubmitResultsForm from './aiQuotient/SubmitResultsForm';

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
  
  const totalSteps = questions.length;
  
  const handleUserInfoSubmit = (data: UserInfo) => {
    setUserInfo(data);
    setCurrentStep(0); // Move to the first question
    toast({
      title: "Let's Begin!",
      description: "Now let's assess your AI readiness.",
    });
  };
  
  const handleNext = (data: { answer: string }) => {
    // Save answer
    const newAnswers = { ...answers, [currentStep]: data.answer };
    setAnswers(newAnswers);
    
    // Calculate running score
    const currentQuestion = questions[currentStep];
    const questionValue = currentQuestion.options.find(
      option => option.id === data.answer
    )?.value || 0;
    
    setScore(prevScore => prevScore + questionValue);
    
    // Move to next question or finish
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
      toast({
        title: "Assessment Complete!",
        description: "Your assessment has been completed successfully.",
      });
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (currentStep === 0) {
      setCurrentStep(-1); // Go back to user info page
    }
  };
  
  const handleSubmitResults = () => {
    toast({
      title: "Thank you!",
      description: "Your assessment has been submitted successfully.",
    });
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
