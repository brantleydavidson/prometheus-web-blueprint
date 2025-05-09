
interface Option {
  id: string;
  text: string;
  value: number;
}

interface Question {
  id: number;
  question: string;
  pillar: string;
  options: Option[];
}

export const questions: Question[] = [
  // Pillar: Data Spine Health
  {
    id: 1,
    question: "How are your primary RevOps data sources (CRM, marketing automation, ERP, CS) integrated?",
    pillar: "Data Spine Health",
    options: [
      { id: "1A", text: "Manual exports/imports", value: 1 },
      { id: "1B", text: "Some point-to-point sync", value: 2 },
      { id: "1C", text: "Near-real-time native/middleware sync", value: 3 },
      { id: "1D", text: "Central lakehouse gives real-time, bidirectional access", value: 4 }
    ]
  },
  {
    id: 2,
    question: "What level of data standardisation & documented data dictionary exists for key RevOps fields?",
    pillar: "Data Spine Health",
    options: [
      { id: "2A", text: "None", value: 1 },
      { id: "2B", text: "Limited, inconsistent", value: 2 },
      { id: "2C", text: "Standardised + documented, maintained", value: 3 },
      { id: "2D", text: "Enterprise-grade dictionary + automated QA", value: 4 }
    ]
  },
  {
    id: 3,
    question: "How confident are you in the accuracy, completeness & timeliness of data used for AI initiatives?",
    pillar: "Data Spine Health",
    options: [
      { id: "3A", text: "Low confidence; major gaps", value: 1 },
      { id: "3B", text: "Moderate; needs heavy cleaning", value: 2 },
      { id: "3C", text: "High; robust quality processes", value: 3 },
      { id: "3D", text: "Very high; automated monitoring & governance", value: 4 }
    ]
  },
  {
    id: 4,
    question: "How easy is it for teams to combine data from different functions for analysis or AI modelling?",
    pillar: "Data Spine Health",
    options: [
      { id: "4A", text: "Very difficult, manual", value: 1 },
      { id: "4B", text: "Possible but slow, relies on specialists", value: 2 },
      { id: "4C", text: "Relatively easy; standard reports exist", value: 3 },
      { id: "4D", text: "Seamless self-service access via unified platform", value: 4 }
    ]
  },
  {
    id: 5,
    question: "How easily can employees query revenue data through natural-language/LLM chat tools (e.g., ChatGPT, Einstein, HubSpot AI)?",
    pillar: "Data Spine Health",
    options: [
      { id: "5A", text: "They can't; all SQL/spreadsheets", value: 1 },
      { id: "5B", text: "Pilot chatbot for limited datasets", value: 2 },
      { id: "5C", text: "Self-service LLM chat for key data; used weekly", value: 3 },
      { id: "5D", text: "Chat layer on full data spine; used daily across teams", value: 4 }
    ]
  },
  // Pillar: Funnel Intelligence & Attribution
  {
    id: 6,
    question: "What is your primary method for attributing revenue or pipeline influence?",
    pillar: "Funnel Intelligence & Attribution",
    options: [
      { id: "6A", text: "Single-touch (first/last)", value: 1 },
      { id: "6B", text: "Basic multi-touch (linear, U-shape)", value: 2 },
      { id: "6C", text: "Advanced model (W-shape, time-decay, custom)", value: 3 },
      { id: "6D", text: "AI-driven model factoring buying groups & journeys", value: 4 }
    ]
  },
  {
    id: 7,
    question: "How does your organisation use buyer-intent data (1st or 3rd party)?",
    pillar: "Funnel Intelligence & Attribution",
    options: [
      { id: "7A", text: "Not using intent data", value: 1 },
      { id: "7B", text: "Limited pilots for campaigns", value: 2 },
      { id: "7C", text: "Systematically in lead scoring & segmentation", value: 3 },
      { id: "7D", text: "Fully integrated into AI models for dynamic targeting", value: 4 }
    ]
  },
  {
    id: 8,
    question: "How well does current funnel reporting capture complex, multi-stakeholder journeys?",
    pillar: "Funnel Intelligence & Attribution",
    options: [
      { id: "8A", text: "Poorly; lead-centric only", value: 1 },
      { id: "8B", text: "Adequate for simple deals", value: 2 },
      { id: "8C", text: "Good visibility; starting account-level tracking", value: 3 },
      { id: "8D", text: "Excellent; buying-group & non-linear paths modelled", value: 4 }
    ]
  },
  {
    id: 9,
    question: "How agile is your team in shifting budget/resources based on performance data?",
    pillar: "Funnel Intelligence & Attribution",
    options: [
      { id: "9A", text: "Very slow; fixed cycles", value: 1 },
      { id: "9B", text: "Some flexibility; heavy approval", value: 2 },
      { id: "9C", text: "Moderately agile; periodic shifts", value: 3 },
      { id: "9D", text: "Near real-time, AI-assisted reallocations", value: 4 }
    ]
  },
  {
    id: 10,
    question: "How often do teams rely on LLM-generated insights or summaries when planning campaigns or pipeline reviews?",
    pillar: "Funnel Intelligence & Attribution",
    options: [
      { id: "10A", text: "Never", value: 1 },
      { id: "10B", text: "Occasionally by enthusiasts", value: 2 },
      { id: "10C", text: "Frequently for key meetings", value: 3 },
      { id: "10D", text: "Every cadence; LLM briefs embedded in workflow", value: 4 }
    ]
  },
  // Pillar: Automation Maturity
  {
    id: 11,
    question: "What percentage of routine RevOps tasks (data entry, routing, logging) are automated?",
    pillar: "Automation Maturity",
    options: [
      { id: "11A", text: "<10%", value: 1 },
      { id: "11B", text: "10–30%", value: 2 },
      { id: "11C", text: "31–50%", value: 3 },
      { id: "11D", text: ">50%", value: 4 }
    ]
  },
  {
    id: 12,
    question: "To what extent are AI capabilities (predictive scoring, NLP email analysis) embedded in automation?",
    pillar: "Automation Maturity",
    options: [
      { id: "12A", text: "None", value: 1 },
      { id: "12B", text: "Piloting 1–2 use cases", value: 2 },
      { id: "12C", text: "Selectively enhance several workflows", value: 3 },
      { id: "12D", text: "Core processes optimised by AI throughout", value: 4 }
    ]
  },
  {
    id: 13,
    question: "How coordinated are automation efforts across Sales, Marketing & Service?",
    pillar: "Automation Maturity",
    options: [
      { id: "13A", text: "Siloed; conflicting", value: 1 },
      { id: "13B", text: "Some coordination on overlaps", value: 2 },
      { id: "13C", text: "Generally coordinated via shared goals", value: 3 },
      { id: "13D", text: "Fully integrated under central RevOps", value: 4 }
    ]
  },
  {
    id: 14,
    question: "How prepared are you for advanced AI automation (agentic AI, autonomous decisions)?",
    pillar: "Automation Maturity",
    options: [
      { id: "14A", text: "Not prepared", value: 1 },
      { id: "14B", text: "Exploring; big gaps", value: 2 },
      { id: "14C", text: "Moderately prepared; clear roadmap needed", value: 3 },
      { id: "14D", text: "Well prepared; pilots underway", value: 4 }
    ]
  },
  {
    id: 15,
    question: "What share of routine work is already handled by LLM-powered agents/copilots (draft emails, call notes)?",
    pillar: "Automation Maturity",
    options: [
      { id: "15A", text: "<10%", value: 1 },
      { id: "15B", text: "10–25%", value: 2 },
      { id: "15C", text: "26–50%", value: 3 },
      { id: "15D", text: ">50% and expanding", value: 4 }
    ]
  },
  // Pillar: AI-Ready Content Operations
  {
    id: 16,
    question: "How does your team use AI for content creation (emails, blogs, ads)?",
    pillar: "AI-Ready Content Operations",
    options: [
      { id: "16A", text: "No AI usage", value: 1 },
      { id: "16B", text: "Ad-hoc experiments", value: 2 },
      { id: "16C", text: "Regular use for drafts/ideas", value: 3 },
      { id: "16D", text: "Integrated end-to-end with variation testing", value: 4 }
    ]
  },
  {
    id: 17,
    question: "What systems manage, tag & retrieve content assets?",
    pillar: "AI-Ready Content Operations",
    options: [
      { id: "17A", text: "Shared drive, manual tags", value: 1 },
      { id: "17B", text: "Basic CMS/DAM", value: 2 },
      { id: "17C", text: "Robust CMS/DAM with taxonomy", value: 3 },
      { id: "17D", text: "Unified content hub with auto-tagging & analytics", value: 4 }
    ]
  },
  {
    id: 18,
    question: "How effectively can you personalise content across channels & segments?",
    pillar: "AI-Ready Content Operations",
    options: [
      { id: "18A", text: "Generic content only", value: 1 },
      { id: "18B", text: "Basic rule-based personalisation", value: 2 },
      { id: "18C", text: "Dynamic content from profile/behaviour", value: 3 },
      { id: "18D", text: "Real-time AI personalisation across journey", value: 4 }
    ]
  },
  {
    id: 19,
    question: "How confident are you in measuring ROI of content (including AI-generated variants)?",
    pillar: "AI-Ready Content Operations",
    options: [
      { id: "19A", text: "Very low", value: 1 },
      { id: "19B", text: "Limited (vanity metrics)", value: 2 },
      { id: "19C", text: "Moderate (engagement + some conversions)", value: 3 },
      { id: "19D", text: "High; ties consumption to revenue", value: 4 }
    ]
  },
  {
    id: 20,
    question: "To what extent do creators use LLM tools for ideation, drafting & variant generation as standard practice?",
    pillar: "AI-Ready Content Operations",
    options: [
      { id: "20A", text: "Ad-hoc by few", value: 1 },
      { id: "20B", text: "Pilots in some teams", value: 2 },
      { id: "20C", text: "Regular in workflow; human QA", value: 3 },
      { id: "20D", text: "Fully standardised; tracked KPIs", value: 4 }
    ]
  },
  // Pillar: Governance & Change Management
  {
    id: 21,
    question: "Does your organisation have a formal AI governance policy?",
    pillar: "Governance & Change Management",
    options: [
      { id: "21A", text: "None", value: 1 },
      { id: "21B", text: "Draft guidelines only", value: 2 },
      { id: "21C", text: "Formal policy; partial rollout", value: 3 },
      { id: "21D", text: "Comprehensive, enforced across lifecycle", value: 4 }
    ]
  },
  {
    id: 22,
    question: "What level of AI training & communication do employees receive?",
    pillar: "Governance & Change Management",
    options: [
      { id: "22A", text: "None", value: 1 },
      { id: "22B", text: "Basic announcements", value: 2 },
      { id: "22C", text: "Tool-specific training", value: 3 },
      { id: "22D", text: "Ongoing AI-literacy programmes", value: 4 }
    ]
  },
  {
    id: 23,
    question: "How aligned is leadership on strategic AI implementation & governance?",
    pillar: "Governance & Change Management",
    options: [
      { id: "23A", text: "Low; AI seen as tactical", value: 1 },
      { id: "23B", text: "Moderate; mixed views", value: 2 },
      { id: "23C", text: "Strong alignment; clear vision", value: 3 },
      { id: "23D", text: "Fully aligned champions, driving transformation", value: 4 }
    ]
  },
  {
    id: 24,
    question: "How receptive are revenue-team employees to adopting AI tools?",
    pillar: "Governance & Change Management",
    options: [
      { id: "24A", text: "Highly resistant", value: 1 },
      { id: "24B", text: "Mixed; some enthusiasm", value: 2 },
      { id: "24C", text: "Generally receptive with guidance", value: 3 },
      { id: "24D", text: "Highly proactive & experimental", value: 4 }
    ]
  },
  {
    id: 25,
    question: "Have clear LLM usage guidelines & guardrails been issued—and are they widely known?",
    pillar: "Governance & Change Management",
    options: [
      { id: "25A", text: "No guidelines", value: 1 },
      { id: "25B", text: "Informal tips in chat", value: 2 },
      { id: "25C", text: "Formal doc exists but low awareness", value: 3 },
      { id: "25D", text: "Comprehensive policy + high awareness", value: 4 }
    ]
  }
];

// Group questions by pillar for easy reference
export const questionsByPillar = questions.reduce((acc, question) => {
  if (!acc[question.pillar]) {
    acc[question.pillar] = [];
  }
  acc[question.pillar].push(question);
  return acc;
}, {} as Record<string, Question[]>);

// Calculate maximum possible score
export const maxPossibleScore = questions.length * 4; // 25 questions × 4 points max each = 100
