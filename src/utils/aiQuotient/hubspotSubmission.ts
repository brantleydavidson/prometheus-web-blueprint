
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
    { name: "aitestscore", value: String(score) },
    { name: "aitestscorepercentage", value: String(scorePercentage) },
    { name: "aireadinesscategory", value: categoryName },
  ];
  
  // Add comments if provided - use exact HubSpot property name
  if (comments) {
    fields.push({ name: "message", value: comments });
  }
  
  // Expected pillar names in HubSpot
  const expectedPillars = [
    "Data Spine Health",
    "Funnel Intelligence & Attribution", 
    "Automation Maturity",
    "AI-Ready Content Operations",
    "Governance & Change Management"
  ];
  
  console.log('[DEBUG] Expected pillars for submission:', expectedPillars);
  console.log('[DEBUG] Actual pillars in pillarScores:', Object.keys(pillarScores));
  console.log('[DEBUG] Actual pillars in maxPillarScores:', Object.keys(maxPillarScores));
  
  // Add pillar scores and percentages - ensure format matches HubSpot property names exactly
  expectedPillars.forEach(pillar => {
    // Format pillar name for HubSpot using exact required format
    const formattedPillar = formatPillarNameForHubSpot(pillar);
    
    // Get pillar score (or default to 0)
    const pillarScore = pillarScores[pillar] || 0;
    
    // Add the raw score with proper property name (no underscores)
    fields.push({ 
      name: `pillar${formattedPillar}`, 
      value: String(pillarScore) 
    });
    
    // Add percentage for each pillar with proper property name (no underscores)
    const maxForPillar = maxPillarScores[pillar] || 0;
    if (maxForPillar > 0) {
      const pillarPercentage = Math.round((pillarScore / maxForPillar) * 100);
      fields.push({ 
        name: `pillar${formattedPillar}percentage`, 
        value: String(pillarPercentage) 
      });
    }
    
    console.log(`[DEBUG] Adding pillar: ${pillar} as pillar${formattedPillar} with score: ${pillarScore}`);
    console.log(`[DEBUG] Max score for ${pillar}: ${maxForPillar}`);
  });
  
  // Flag that this is a detailed report request (no underscores)
  fields.push({ name: "requesteddetailedreport", value: "Yes" });
  
  // Do a verification check for all required fields
  const requiredFields = [
    "aitestscorepercentage",
    "pillarfunnelintelligenceattribution",
    "pillarfunnelintelligenceattributionpercentage",
    "pillaraireadycontentoperationspercentage",
    "pillardataspinehealthpercentage",
    "requesteddetailedreport",
    "pillargovernancechangemanagementpercentage",
    "pillargovernancechangemanagement",
    "pillaraireadycontentoperations",
    "pillardataspinehealth",
    "pillarautomationmaturity",
    "pillarautomationmaturitypercentage",
    "aitestscore",
    "aireadinesscategory"
  ];
  
  // Check if all required fields are present
  const fieldNames = fields.map(f => f.name);
  const missingFields = requiredFields.filter(f => !fieldNames.includes(f));
  
  if (missingFields.length > 0) {
    console.error('[ERROR] Missing required HubSpot fields:', missingFields);
    
    // Add any missing fields with default values
    missingFields.forEach(fieldName => {
      fields.push({ name: fieldName, value: "0" });
      console.log(`[DEBUG] Adding missing field with default value: ${fieldName}`);
    });
  }
  
  // Log the fields to help with debugging
  console.log("Final HubSpot fields before submission:", JSON.stringify(fields, null, 2));
  
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
