
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { ArrowRight, ArrowLeft, Flag, Brain, BookOpen } from 'lucide-react';
import { useForm } from 'react-hook-form';
import HubSpotForm from '@/components/forms/HubSpotForm';
import ResultsPage from '@/components/forms/ResultsPage';
import { questions } from '@/data/aiQuotientQuestions';

const QuotientForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Using Vite's import.meta.env for environment variables
  const HUBSPOT_PORTAL_ID = import.meta.env.VITE_HUBSPOT_PORTAL_ID || "12345678";
  const HUBSPOT_FORM_ID = import.meta.env.VITE_HUBSPOT_FORM_ID || "abcdef12-3456-7890-abcd-ef1234567890";
  
  const form = useForm({
    defaultValues: {
      answer: ''
    }
  });
  
  const totalSteps = questions.length;
  const progress = ((currentStep) / totalSteps) * 100;
  
  const currentQuestion = questions[currentStep];
  
  useEffect(() => {
    // Pre-select the previous answer if it exists
    if (answers[currentStep]) {
      form.setValue('answer', answers[currentStep]);
    } else {
      form.setValue('answer', '');
    }
  }, [currentStep, form, answers]);
  
  const handleNext = (data: { answer: string }) => {
    // Save answer
    const newAnswers = { ...answers, [currentStep]: data.answer };
    setAnswers(newAnswers);
    
    // Calculate running score
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
        description: "Please complete the form to receive your personalized report.",
      });
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Create HubSpot custom data with assessment results
  const createHubSpotCustomData = () => {
    // Calculate percentage score
    const percentage = Math.round((score / (totalSteps * 4)) * 100);
    
    // Determine category based on score
    let category = '';
    if (percentage >= 80) {
      category = "AI Innovator";
    } else if (percentage >= 60) {
      category = "AI Ready";
    } else if (percentage >= 40) {
      category = "AI Emerging";
    } else {
      category = "AI Developing";
    }
    
    // Create object with all assessment data for HubSpot
    return {
      ai_quotient_score: score,
      ai_quotient_percentage: percentage,
      ai_quotient_category: category,
      ai_quotient_total_questions: totalSteps,
      ai_quotient_answers: JSON.stringify(answers),
      ai_quotient_completion_date: new Date().toISOString().split('T')[0]
    };
  };
  
  const handleHubSpotSubmit = () => {
    setIsSubmitting(true);
    // This function is called when the HubSpot form is submitted
    // The custom data is already passed to HubSpot via hidden fields
    toast({
      title: "Thank you!",
      description: "Your personalized AI Quotient report will be sent to your email shortly.",
    });
    setIsSubmitting(false);
  };
  
  if (showResults) {
    // Create custom data for HubSpot
    const hubspotCustomData = createHubSpotCustomData();

    return (
      <div className="space-y-8">
        <ResultsPage score={score} totalPossible={totalSteps * 4} />
        
        <Card className="p-6 bg-white shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">Get Your Detailed Report</h3>
          <p className="mb-6 text-gray-600">
            Complete the form below to receive your personalized AI Quotient report with actionable recommendations tailored to your score.
          </p>
          
          <HubSpotForm 
            portalId={HUBSPOT_PORTAL_ID}
            formId={HUBSPOT_FORM_ID}
            onFormSubmit={handleHubSpotSubmit}
            className="hubspot-ai-quotient-form"
            customData={hubspotCustomData}
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
          <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleNext)} className="space-y-6">
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="space-y-3"
                  >
                    {currentQuestion.options.map((option) => (
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
                disabled={currentStep === 0}
                className="flex gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Previous
              </Button>
              
              <Button 
                type="submit" 
                className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white flex gap-2"
                disabled={!form.watch('answer')}
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
