
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Brain, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { questions, questionsByPillar } from '@/data/aiQuotientQuestions';

interface ResultsPageProps {
  score: number;
  totalPossible: number;
  pillarScores?: Record<string, number>;
  maxPillarScores?: Record<string, number>;
}

const ResultsPage = ({ 
  score, 
  totalPossible,
  pillarScores = {},
  maxPillarScores = {}
}: ResultsPageProps) => {
  const percentage = Math.round((score / totalPossible) * 100);
  const [expandedPillar, setExpandedPillar] = React.useState<string | null>(null);
  
  // Categories based on score percentage
  let category: { title: string; description: string; icon: React.ReactNode };
  
  if (percentage >= 80) {
    category = {
      title: "AI Innovator",
      description: "Your organization is well-positioned to leverage AI for significant competitive advantage. You're ready to implement advanced AI solutions and drive transformation.",
      icon: <Award className="h-10 w-10 text-green-500" />
    };
  } else if (percentage >= 60) {
    category = {
      title: "AI Ready",
      description: "Your organization has a good foundation for AI implementation. With some strategic adjustments, you can quickly move forward with effective AI solutions.",
      icon: <Brain className="h-10 w-10 text-blue-500" />
    };
  } else if (percentage >= 40) {
    category = {
      title: "AI Emerging",
      description: "Your organization has begun the AI journey but has significant opportunities to improve readiness and strategy before major implementations.",
      icon: <BookOpen className="h-10 w-10 text-orange-500" />
    };
  } else {
    category = {
      title: "AI Developing",
      description: "Your organization needs foundational work before effectively implementing AI solutions. Focus on building technical capabilities and strategic alignment.",
      icon: <Brain className="h-10 w-10 text-red-500" />
    };
  }

  // Get all pillars and calculate percentages
  const pillars = Object.keys(questionsByPillar);
  
  const togglePillar = (pillar: string) => {
    if (expandedPillar === pillar) {
      setExpandedPillar(null);
    } else {
      setExpandedPillar(pillar);
    }
  };
  
  return (
    <Card className="p-8 bg-white shadow-lg border border-gray-200">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-prometheus-navy text-white mb-4">
          {category.icon}
        </div>
        <h2 className="text-2xl font-bold text-prometheus-navy">{category.title}</h2>
        <div className="mt-6 mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Your AI Quotient Score</span>
            <span className="text-sm font-medium">{score}/{totalPossible} ({percentage}%)</span>
          </div>
          <Progress value={percentage} className="h-3" />
        </div>
      </div>
      
      <div className="space-y-4 text-gray-700">
        <p className="text-lg">{category.description}</p>
        
        {/* Pillar breakdown */}
        <h3 className="text-lg font-semibold mt-6 mb-3">Your Performance by Category</h3>
        <div className="space-y-4">
          {pillars.map((pillar) => {
            const pillarMax = maxPillarScores[pillar] || (questionsByPillar[pillar]?.length * 4 || 0);
            const pillarScore = pillarScores[pillar] || 0;
            const pillarPercentage = Math.round((pillarScore / pillarMax) * 100) || 0;
            
            return (
              <div key={pillar} className="border rounded-lg p-3">
                <button 
                  className="w-full flex justify-between items-center text-left"
                  onClick={() => togglePillar(pillar)}
                >
                  <div>
                    <h4 className="font-medium">{pillar}</h4>
                    <div className="flex items-center text-sm mt-1">
                      <div className="flex-1 max-w-xs">
                        <Progress value={pillarPercentage} className="h-2" />
                      </div>
                      <span className="ml-2">{pillarScore}/{pillarMax}</span>
                    </div>
                  </div>
                  {expandedPillar === pillar ? 
                    <ChevronUp className="h-5 w-5" /> : 
                    <ChevronDown className="h-5 w-5" />}
                </button>
                
                {expandedPillar === pillar && (
                  <div className="mt-3 text-sm space-y-2 border-t pt-2">
                    {/* Tips based on pillar score */}
                    {pillarPercentage < 50 ? (
                      <p className="text-orange-600">Focus area: This category needs significant improvement to leverage AI effectively.</p>
                    ) : pillarPercentage < 75 ? (
                      <p className="text-blue-600">Opportunity area: With targeted improvements in this category, you could see substantial AI benefits.</p>
                    ) : (
                      <p className="text-green-600">Strength area: Your organization demonstrates strong capabilities in this category.</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <p className="mt-6">Our detailed report will provide you with:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Strategic recommendations tailored to your organization's specific needs</li>
          <li>Actionable insights for each of the five key pillars of AI readiness</li>
          <li>Prioritized roadmap for AI implementation based on your current state</li>
          <li>Case studies relevant to your industry and score level</li>
        </ul>
      </div>
    </Card>
  );
};

export default ResultsPage;
