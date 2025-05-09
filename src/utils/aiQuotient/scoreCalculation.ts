
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
  // Format to lowercase and replace spaces with underscores
  // For example: "Governance & Change Management" -> "governance_change_management"
  return pillar
    .toLowerCase()
    .replace(/&/g, '')  // Remove ampersands
    .replace(/[\s-]+/g, '_')  // Replace spaces and hyphens with underscores
    .replace(/[^a-z0-9_]/g, '') // Remove any other non-alphanumeric characters except underscores
    .trim(); // Trim any leading/trailing spaces
};
