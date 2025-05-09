import { questionsByPillar } from '@/data/aiQuotientQuestions';

/**
 * Calculate the maximum possible score for each pillar
 * @returns Object with pillar names as keys and max scores as values
 */
export const calculateMaxPillarScores = (): Record<string, number> => {
  return Object.keys(questionsByPillar).reduce((acc, pillar) => {
    // 4 points per question maximum
    acc[pillar] = questionsByPillar[pillar].length * 4;
    return acc;
  }, {} as Record<string, number>);
};

/**
 * Calculate the AI readiness category based on score percentage
 * @param scorePercentage The score percentage (0-100)
 * @returns Category name string
 */
export const getAIReadinessCategory = (scorePercentage: number): string => {
  if (scorePercentage >= 80) {
    return "AI Innovator";
  } else if (scorePercentage >= 60) {
    return "AI Ready";
  } else if (scorePercentage >= 40) {
    return "AI Emerging";
  } else {
    return "AI Developing";
  }
};

/**
 * Calculate the score percentage
 * @param score Current score
 * @param totalPossible Maximum possible score
 * @returns Percentage as a number (0-100)
 */
export const calculateScorePercentage = (score: number, totalPossible: number): number => {
  return Math.round((score / totalPossible) * 100);
};

/**
 * Format pillar name to match HubSpot property naming convention
 * @param pillar Original pillar name
 * @returns Formatted pillar name for HubSpot
 */
export const formatPillarNameForHubSpot = (pillar: string): string => {
  // Exact mapping for known pillars to ensure correct property names
  const pillarMapping: Record<string, string> = {
    "Data Spine Health": "dataspinehealth",
    "Funnel Intelligence & Attribution": "funnelintelligenceattribution",
    "Automation Maturity": "automationmaturity",
    "AI-Ready Content Operations": "aireadycontentoperations",
    "Governance & Change Management": "governancechangemanagement"
  };
  
  // If we have an exact mapping, use it
  if (pillarMapping[pillar]) {
    return pillarMapping[pillar];
  }
  
  // Otherwise, fall back to the generic formatting
  return pillar
    .toLowerCase()
    .replace(/&/g, '')  // Remove ampersands
    .replace(/[\s-]+/g, '')  // Remove spaces and hyphens
    .replace(/[^a-z0-9]/g, '') // Remove any other non-alphanumeric characters
    .trim(); // Trim any leading/trailing spaces
};
