
import { UserInfo } from '@/components/forms/aiQuotient/UserInfoForm';
import { formatPillarNameForHubSpot } from './scoreCalculation';

interface HubSpotField {
  name: string;
  value: string;
}

/**
 * Extract form data from additional info form
 * @returns Object with extracted values
 */
export const extractAdditionalFormData = (): {
  jobTitle: string;
  phoneNumber: string;
  comments: string;
} => {
  const additionalFormData = document.querySelector('form[data-additional-info-form="true"]');
  let jobTitle = "";
  let phoneNumber = "";
  let comments = "";
  
  if (additionalFormData) {
    const jobTitleInput = additionalFormData.querySelector('input[name="jobTitle"]') as HTMLInputElement;
    const phoneNumberInput = additionalFormData.querySelector('input[name="phoneNumber"]') as HTMLInputElement;
    const commentsInput = additionalFormData.querySelector('textarea[name="comments"]') as HTMLTextAreaElement;
    
    if (jobTitleInput && jobTitleInput.value) {
      jobTitle = jobTitleInput.value;
    }
    
    if (phoneNumberInput && phoneNumberInput.value) {
      phoneNumber = phoneNumberInput.value;
    }
    
    if (commentsInput && commentsInput.value) {
      comments = commentsInput.value;
    }
  }
  
  return { jobTitle, phoneNumber, comments };
};

/**
 * Prepare the fields for HubSpot submission
 * @param userInfo User info from form
 * @param score Total score
 * @param scorePercentage Score percentage
 * @param categoryName AI readiness category
 * @param pillarScores Pillar scores
 * @param maxPillarScores Max pillar scores
 * @returns Array of fields for HubSpot
 */
export const prepareHubSpotFields = (
  userInfo: UserInfo,
  score: number,
  scorePercentage: number,
  categoryName: string,
  pillarScores: Record<string, number>,
  maxPillarScores: Record<string, number>,
): HubSpotField[] => {
  // Extract additional form data
  const { jobTitle, phoneNumber, comments } = extractAdditionalFormData();
  
  // Prepare the basic fields - use exact HubSpot property names
  const fields: HubSpotField[] = [
    // Standard contact properties - these must match HubSpot exactly
    { name: "firstname", value: userInfo.firstname },
    { name: "lastname", value: userInfo.lastname },
    { name: "email", value: userInfo.email },
    { name: "company", value: userInfo.company },
    
    // Add job title and phone if provided - use exact HubSpot property names
    { name: "jobtitle", value: jobTitle },
    { name: "phone", value: phoneNumber },
    
    // Custom properties for AI Quotient - ensure these match HubSpot exactly
    { name: "ai_test_score", value: String(score) },
    { name: "ai_test_score_percentage", value: String(scorePercentage) },
    { name: "ai_readiness_category", value: categoryName },
  ];
  
  // Add comments if provided - use exact HubSpot property name
  if (comments) {
    fields.push({ name: "message", value: comments });
  }
  
  // Add pillar scores and percentages - ensure format matches HubSpot property names
  Object.entries(pillarScores).forEach(([pillar, pillarScore]) => {
    // Format pillar name for HubSpot using proper underscores
    const formattedPillar = formatPillarNameForHubSpot(pillar);
    
    // Add the raw score with proper property name
    fields.push({ 
      name: `pillar_${formattedPillar}`, 
      value: String(pillarScore) 
    });
    
    // Add percentage for each pillar with proper property name
    const maxForPillar = maxPillarScores[pillar] || 0;
    if (maxForPillar > 0) {
      const pillarPercentage = Math.round((pillarScore / maxForPillar) * 100);
      fields.push({ 
        name: `pillar_${formattedPillar}_percentage`, 
        value: String(pillarPercentage) 
      });
    }
  });
  
  // Flag that this is a detailed report request
  fields.push({ name: "requested_detailed_report", value: "Yes" });
  
  return fields;
};

/**
 * Log detailed information about the submission
 * @param score Total score
 * @param totalPossible Maximum possible score
 * @param scorePercentage Score percentage
 * @param categoryName AI readiness category
 * @param pillarScores Pillar scores
 * @param fields Fields to be submitted to HubSpot
 */
export const logSubmissionDetails = (
  score: number,
  totalPossible: number,
  scorePercentage: number,
  categoryName: string,
  pillarScores: Record<string, number>,
  fields: HubSpotField[]
): void => {
  console.log('=== Starting AI Quotient results submission ===');
  console.log('Current page:', window.location.pathname);
  console.log('Current URL:', window.location.href);
  console.log("Submitting to HubSpot with raw score:", score);
  console.log("Total possible score:", totalPossible);
  console.log("Score percentage:", scorePercentage);
  console.log("AI readiness category:", categoryName);
  console.log("Pillar scores:", pillarScores);
  console.log("Submitting these fields to HubSpot:", JSON.stringify(fields, null, 2));
};
