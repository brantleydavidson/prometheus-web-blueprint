
import { useState } from 'react';
import { UserInfo } from '@/components/forms/aiQuotient/UserInfoForm';
import { questions, questionsByPillar } from '@/data/aiQuotientQuestions';
import { calculateMaxPillarScores, getAIReadinessCategory, calculateScorePercentage } from '@/utils/aiQuotient/scoreCalculation';
import { prepareHubSpotFields, logSubmissionDetails } from '@/utils/aiQuotient/hubspotSubmission';
import { useHubSpot } from '@/integrations/hubspot/HubSpotProvider';
import { useToast } from '@/hooks/use-toast';

// TESTING MODE: Set to false to use all questions for normal operation
const TESTING_MODE = false;
const TESTING_QUESTION_COUNT = 1;

export interface AssessmentState {
  currentStep: number;
  userInfo: UserInfo;
  answers: {[key: number]: string};
  score: number;
  pillarScores: {[key: string]: number};
  showResults: boolean;
  isSubmitting: boolean;
  isSubmitted: boolean;
}

export const useAIQuotientAssessment = () => {
  const { toast } = useToast();
  const { submitToHubSpot, portalId, formId } = useHubSpot();
  
  // State for the assessment
  const [currentStep, setCurrentStep] = useState<number>(-1); // -1 is for user info page
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstname: '',
    lastname: '',
    email: '',
    company: ''
  });
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [score, setScore] = useState<number>(0);
  const [pillarScores, setPillarScores] = useState<{[key: string]: number}>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  
  // Use all questions for logic like max score calculation, but limit shown questions in test mode
  const totalSteps = TESTING_MODE ? TESTING_QUESTION_COUNT : questions.length;
  const maxPillarScores = calculateMaxPillarScores();
  
  // Handle user info submission
  const handleUserInfoSubmit = (data: UserInfo) => {
    console.log('User info submitted:', data);
    setUserInfo(data);
    setCurrentStep(0); // Move to first question
    toast({
      title: "Let's Begin!",
      description: "Now let's assess your AI readiness.",
    });
  };
  
  // Handle next button click
  const handleNext = async (data: { answer: string }) => {
    // Save answer
    const newAnswers = { ...answers, [currentStep]: data.answer };
    setAnswers(newAnswers);
    
    // Calculate running score
    const questionIndex = currentStep;
    const currentQuestion = questions[questionIndex];
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
      // In testing mode, we need to simulate data for all pillars
      // to ensure all fields are sent to HubSpot
      if (TESTING_MODE) {
        console.log('[TESTING MODE] Simulating completion of all questions');
        
        // Get all unique pillars from the full question set
        const allPillars = Object.keys(questionsByPillar);
        const updatedPillarScores = { ...newPillarScores };
        
        // Assign a simulated score to each pillar that doesn't have one yet
        allPillars.forEach(pillar => {
          if (!updatedPillarScores[pillar]) {
            updatedPillarScores[pillar] = 3; // Default test score
            console.log(`[TESTING MODE] Adding simulated score for pillar: ${pillar}`);
          }
        });
        
        // Update pillar scores with the simulated data
        setPillarScores(updatedPillarScores);
        
        // In testing mode, adjust the total score to be more realistic
        // This ensures the AI readiness category is also reasonable
        const simulatedTotalScore = 15; // Middle-range score for testing
        setScore(simulatedTotalScore);
        
        console.log('[TESTING MODE] Using simulated total score:', simulatedTotalScore);
        console.log('[TESTING MODE] Simulated pillar scores:', updatedPillarScores);
      }
      
      // This is the last question - show results
      setShowResults(true);
    }
  };
  
  // Handle previous button click
  const handlePrevious = () => {
    if (currentStep > 0) {
      // Remove the score contribution from the current question when going back
      const questionIndex = currentStep;
      const currentQuestion = questions[questionIndex];
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
  
  // Handle submit results
  const handleSubmitResults = async () => {
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
      // For testing mode, ensure we're calculating based on the full test
      // not just the single question
      const totalPossible = TESTING_MODE 
        ? questions.length * 4  // Use all questions for percentage calculation
        : totalSteps * 4;       // Use active questions in normal mode
        
      // Calculate score percentage and determine category
      const scorePercentage = calculateScorePercentage(score, totalPossible);
      const categoryName = getAIReadinessCategory(scorePercentage);
      
      // Debug the pillar scores
      console.log('[DEBUG] Original pillar names and scores:', pillarScores);
      console.log('[DEBUG] Score percentage:', scorePercentage);
      console.log('[DEBUG] AI readiness category:', categoryName);
      
      // Prepare fields for HubSpot
      const fields = prepareHubSpotFields(
        userInfo,
        score,
        scorePercentage,
        categoryName,
        pillarScores,
        maxPillarScores
      );
      
      // Log submission details
      logSubmissionDetails(
        score,
        totalPossible,
        scorePercentage,
        categoryName,
        pillarScores,
        fields
      );
      
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
  
  // Get current pillar and progress information
  const getPillarProgress = () => {
    if (currentStep < 0) return { currentPillar: '', pillarQuestionCount: 0, pillarProgress: 0 };
    
    const questionIndex = currentStep;
    const currentPillar = questions[questionIndex].pillar;
    const pillarQuestionCount = currentPillar ? questionsByPillar[currentPillar]?.length || 0 : 0;
    const pillarProgress = currentPillar ? 
      questionsByPillar[currentPillar].findIndex(q => q.id === questions[questionIndex].id) + 1 : 0;
    
    return { currentPillar, pillarQuestionCount, pillarProgress };
  };

  return {
    state: {
      currentStep,
      userInfo,
      answers,
      score,
      pillarScores,
      showResults,
      isSubmitting,
      isSubmitted,
      totalSteps,
      maxPillarScores
    },
    actions: {
      handleUserInfoSubmit,
      handleNext,
      handlePrevious,
      handleSubmitResults
    },
    getPillarProgress
  };
};
