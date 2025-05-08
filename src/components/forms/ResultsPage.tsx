
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Brain, Award } from 'lucide-react';

interface ResultsPageProps {
  score: number;
  totalPossible: number;
}

const ResultsPage = ({ score, totalPossible }: ResultsPageProps) => {
  const percentage = Math.round((score / totalPossible) * 100);
  
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
        <p>Our detailed report will provide you with:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Strategic recommendations tailored to your organization</li>
          <li>Specific action steps to improve your AI readiness</li>
          <li>Case studies relevant to your industry and score level</li>
          <li>Resources to accelerate your AI implementation journey</li>
        </ul>
      </div>
    </Card>
  );
};

export default ResultsPage;
