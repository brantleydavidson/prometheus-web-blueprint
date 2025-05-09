
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
  
  // Prepare the basic fields
  const fields: HubSpotField[] = [
    // Standard contact properties
    { name: "firstname", value: userInfo.firstname },
    { name: "lastname", value: userInfo.lastname },
    { name: "email", value: userInfo.email },
    { name: "company", value: userInfo.company },
    
    // Add job title and phone if provided
    { name: "jobtitle", value: jobTitle },
    { name: "phone", value: phoneNumber },
    
    // Custom properties for AI Quotient
    { name: "aitestscore", value: String(score) },
    { name: "aitestscorepercentage", value: String(scorePercentage) },
    { name: "aireadinesscategory", value: categoryName },
  ];
  
  // Add comments if provided
  if (comments) {
    fields.push({ name: "message", value: comments });
  }
  
  // Add pillar scores and percentages
  Object.entries(pillarScores).forEach(([pillar, pillarScore]) => {
    // Format pillar name for HubSpot
    const pillarName = formatPillarNameForHubSpot(pillar);
    fields.push({ name: `pillar${pillarName}`, value: String(pillarScore) });
    
    // Add percentage for each pillar
    const maxForPillar = maxPillarScores[pillar] || 0;
    if (maxForPillar > 0) {
      const pillarPercentage = Math.round((pillarScore / maxForPillar) * 100);
      fields.push({ 
        name: `pillar${pillarName}percentage`, 
        value: String(pillarPercentage) 
      });
    }
  });
  
  // Flag that this is a detailed report request
  fields.push({ name: "requesteddetailedreport", value: "Yes" });
  
  return fields;
};

/**
 * Log detailed information about the submission
 * @param userInfo User information
 * @param score Total score
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
