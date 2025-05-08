
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { ArrowRight, ArrowLeft, Flag, Brain } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { questions } from '@/data/aiQuotientQuestions';

interface QuestionOption {
  id: string;
  text: string;
  value: number;
}

interface QuestionFormProps {
  currentStep: number;
  answers: { [key: number]: string };
  onNext: (data: { answer: string }) => void;
  onPrevious: () => void;
}

const QuestionsForm = ({ currentStep, answers, onNext, onPrevious }: QuestionFormProps) => {
  const totalSteps = questions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  
  const currentQuestion = currentStep >= 0 && currentStep < questions.length 
    ? questions[currentStep] 
    : null;
  
  const quizForm = useForm({
    defaultValues: {
      answer: answers[currentStep] || ''
    }
  });
  
  // Update form when currentStep changes
  useEffect(() => {
    if (answers[currentStep]) {
      quizForm.setValue('answer', answers[currentStep]);
    } else {
      quizForm.setValue('answer', '');
    }
  }, [currentStep, quizForm, answers]);

  if (!currentQuestion) return null;
  
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
        
        <Form {...quizForm}>
          <form onSubmit={quizForm.handleSubmit(onNext)} className="space-y-6">
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
                onClick={onPrevious}
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

export default QuestionsForm;
