
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ArrowRight, ArrowLeft, Flag, Brain, User, Building, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import HubSpotForm from '@/components/forms/HubSpotForm';
import ResultsPage from '@/components/forms/ResultsPage';
import { questions } from '@/data/aiQuotientQuestions';
import { useHubSpot } from '@/integrations/hubspot/HubSpotProvider';

const QuotientForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(-1); // -1 is for user info page
  const [userInfo, setUserInfo] = useState({
    firstname: '',
    lastname: '',
    email: '',
    company: ''
  });
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { portalId, apiKey, formId } = useHubSpot();
  
  // Form for collecting user information
  const userInfoForm = useForm({
    defaultValues: userInfo
  });

  // Form for the quiz questions
  const quizForm = useForm({
    defaultValues: {
      answer: ''
    }
  });
  
  const totalSteps = questions.length;
  const progress = currentStep < 0 ? 0 : ((currentStep) / totalSteps) * 100;
  
  const currentQuestion = currentStep >= 0 && currentStep < questions.length ? questions[currentStep] : null;
  
  useEffect(() => {
    // Pre-select the previous answer if it exists
    if (currentStep >= 0 && answers[currentStep]) {
      quizForm.setValue('answer', answers[currentStep]);
    } else if (currentStep >= 0) {
      quizForm.setValue('answer', '');
    }
  }, [currentStep, quizForm, answers]);
  
  const handleUserInfoSubmit = (data: typeof userInfo) => {
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
    const questionValue = currentQuestion?.options.find(
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
  
  // Create HubSpot custom data with assessment results
  const createHubSpotCustomData = () => {
    return {
      ...userInfo,
      aitest_score: score, // Using the specific field name requested
    };
  };
  
  const handleHubSpotSubmit = () => {
    setIsSubmitting(true);
    toast({
      title: "Thank you!",
      description: "Your assessment has been submitted successfully.",
    });
    setIsSubmitting(false);
  };

  // Render user information collection page
  if (currentStep === -1) {
    return (
      <div className="space-y-8">
        <Card className="p-6 shadow-md">
          <div className="flex items-start gap-3 mb-6">
            <User className="h-6 w-6 text-prometheus-orange mt-1" />
            <h2 className="text-xl font-semibold">Let's start with your information</h2>
          </div>
          
          <Form {...userInfoForm}>
            <form onSubmit={userInfoForm.handleSubmit(handleUserInfoSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={userInfoForm.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your first name" required {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={userInfoForm.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your last name" required {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={userInfoForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" required {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={userInfoForm.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your company name" required {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end pt-4">
                <Button 
                  type="submit" 
                  className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white flex gap-2"
                >
                  Start Assessment <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    );
  }

  if (showResults) {
    // Create custom data for HubSpot
    const hubspotCustomData = createHubSpotCustomData();

    // Use the API approach since we have an API key
    const useApiApproach = !!apiKey;

    return (
      <div className="space-y-8">
        <ResultsPage score={score} totalPossible={totalSteps * 4} />
        
        <Card className="p-6 bg-white shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">Your Assessment Is Complete</h3>
          <p className="mb-6 text-gray-600">
            Thank you for completing the AI Quotient assessment. Your data has been submitted successfully.
          </p>
          
          <HubSpotForm 
            portalId={portalId}
            formId={formId}
            onFormSubmit={handleHubSpotSubmit}
            className="hubspot-ai-quotient-form"
            customData={hubspotCustomData}
            useApi={useApiApproach}
          />
        </Card>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-500">Question {currentStep + 1} of {totalSteps}</div>
        <div className="text-sm font-medium">{Math.round(progress)}% Complete</div>
      </div>
      
      <Progress value={progress} className="h-2" />
      
      <Card className="p-6 shadow-md">
        <div className="flex items-start gap-3 mb-6">
          <Brain className="h-6 w-6 text-prometheus-orange mt-1" />
          <h2 className="text-xl font-semibold">{currentQuestion?.question}</h2>
        </div>
        
        <Form {...quizForm}>
          <form onSubmit={quizForm.handleSubmit(handleNext)} className="space-y-6">
            <FormField
              control={quizForm.control}
              name="answer"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="space-y-3"
                  >
                    {currentQuestion?.options.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2 rounded-md border border-gray-200 p-3 hover:bg-gray-50 transition-colors">
                        <RadioGroupItem value={option.id} id={option.id} />
                        <FormLabel htmlFor={option.id} className="flex-grow cursor-pointer font-normal">
                          {option.text}
                        </FormLabel>
                      </div>
                    ))}
                  </RadioGroup>
                </FormItem>
              )}
            />
            
            <div className="flex justify-between pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handlePrevious}
                className="flex gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Previous
              </Button>
              
              <Button 
                type="submit" 
                className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white flex gap-2"
                disabled={!quizForm.watch('answer')}
              >
                {currentStep === totalSteps - 1 ? (
                  <>Finish <Flag className="h-4 w-4" /></>
                ) : (
                  <>Next <ArrowRight className="h-4 w-4" /></>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default QuotientForm;
