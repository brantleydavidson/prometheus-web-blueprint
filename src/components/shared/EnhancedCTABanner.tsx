
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface EnhancedCTABannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  bgColor?: string;
}

const EnhancedCTABanner: React.FC<EnhancedCTABannerProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  bgColor = 'bg-prometheus-navy'
}) => {
  return (
    <div className={`${bgColor} py-16 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          {title}
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <Button
          asChild
          size="lg"
          className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white"
        >
          <Link to={buttonLink}>
            {buttonText}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default EnhancedCTABanner;
