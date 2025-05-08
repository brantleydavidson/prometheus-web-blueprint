
interface Option {
  id: string;
  text: string;
  value: number;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
}

export const questions: Question[] = [
  {
    id: 1,
    question: "How would you describe your organization's current data strategy?",
    options: [
      { id: "1A", text: "We don't have a formal data strategy in place", value: 0 },
      { id: "1B", text: "We collect data but don't use it systematically", value: 1 },
      { id: "1C", text: "We have a data strategy but implementation is inconsistent", value: 2 },
      { id: "1D", text: "We have a comprehensive, well-implemented data strategy", value: 4 }
    ]
  },
  {
    id: 2,
    question: "How clean and organized is your customer and operational data?",
    options: [
      { id: "2A", text: "Mostly unstructured and siloed across different systems", value: 0 },
      { id: "2B", text: "Partially structured but with significant data quality issues", value: 1 },
      { id: "2C", text: "Mostly structured with some data quality challenges", value: 2 },
      { id: "2D", text: "Well-structured, integrated, and maintained with high quality", value: 4 }
    ]
  },
  {
    id: 3,
    question: "What level of technical expertise related to AI exists within your organization?",
    options: [
      { id: "3A", text: "No dedicated technical expertise in AI", value: 0 },
      { id: "3B", text: "Basic understanding but no specialized AI skills", value: 1 },
      { id: "3C", text: "Some team members have AI expertise", value: 2 },
      { id: "3D", text: "Dedicated AI specialists or data scientists on staff", value: 4 }
    ]
  },
  {
    id: 4,
    question: "How would you rate leadership support for AI initiatives?",
    options: [
      { id: "4A", text: "Little to no support or understanding of AI potential", value: 0 },
      { id: "4B", text: "Interest exists but without resource commitment", value: 1 },
      { id: "4C", text: "Supportive but cautious about investment", value: 2 },
      { id: "4D", text: "Strong support with allocated budget and resources", value: 4 }
    ]
  },
  {
    id: 5,
    question: "What is your organization's experience with implementing technology solutions?",
    options: [
      { id: "5A", text: "Limited technology implementation experience", value: 0 },
      { id: "5B", text: "Some experience but with mixed results", value: 1 },
      { id: "5C", text: "Successful implementations of moderate complexity", value: 2 },
      { id: "5D", text: "Extensive experience with successful complex implementations", value: 4 }
    ]
  }
];

// Add more questions later as needed. This is just a starter set.
