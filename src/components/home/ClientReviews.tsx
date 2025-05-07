
import React from 'react';
import { Star, StarHalf, Users, Factory, Truck } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

type ReviewProps = {
  quote: string;
  author: string;
  position: string;
  company: string;
  rating: number;
  industry: 'manufacturing' | 'restoration' | 'services' | 'ecommerce';
}

const reviews: ReviewProps[] = [
  {
    quote: "Prometheus transformed our disconnected tech stack into a revenue-driving machine. We've seen a 32% increase in qualified leads that actually convert.",
    author: "Michael Richardson",
    position: "VP of Marketing",
    company: "Precision Manufacturing Inc",
    rating: 5,
    industry: 'manufacturing'
  },
  {
    quote: "Before working with Prometheus, we were missing emergency calls because of poor systems. Now we capture 40% more leads and our scheduling is perfectly optimized.",
    author: "Sarah Johnson",
    position: "Operations Director",
    company: "Rapid Response Restoration",
    rating: 5,
    industry: 'restoration'
  },
  {
    quote: "The ROI on our marketing spend has completely transformed. We finally have visibility into which campaigns drive actual business.",
    author: "David Chen",
    position: "CEO",
    company: "Premier Professional Services",
    rating: 4.5,
    industry: 'services'
  },
  {
    quote: "Our customer retention has skyrocketed since implementing Prometheus' recommendation engine. Repeat purchase rate is up 28% year over year.",
    author: "Jennifer Myers",
    position: "Digital Director",
    company: "Urban Essentials",
    rating: 5,
    industry: 'ecommerce'
  }
];

const IndustryIcon = ({ industry }: { industry: string }) => {
  switch (industry) {
    case 'manufacturing':
      return <Factory className="text-prometheus-orange" />;
    case 'restoration':
      return <Truck className="text-prometheus-orange" />;
    case 'services':
      return <Users className="text-prometheus-orange" />;
    case 'ecommerce':
      return <Users className="text-prometheus-orange" />;
    default:
      return null;
  }
};

const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex text-prometheus-gold">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`star-${i}`} fill="currentColor" className="w-4 h-4" />
      ))}
      {hasHalfStar && <StarHalf fill="currentColor" className="w-4 h-4" />}
    </div>
  );
};

const ClientReviews = () => {
  return (
    <div className="py-16 md:py-24 bg-gray-50">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-prometheus-navy mb-4">
          Real Results for Real Businesses
        </h2>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          See what our clients say about working with Prometheus Agency to transform their tech stack.
        </p>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="mx-auto max-w-6xl px-4"
        >
          <CarouselContent>
            {reviews.map((review, index) => (
              <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/2">
                <div className="p-1">
                  <Card className="border border-gray-100">
                    <CardContent className="p-6 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <RatingStars rating={review.rating} />
                        <IndustryIcon industry={review.industry} />
                      </div>
                      <blockquote className="text-gray-700 italic">
                        "{review.quote}"
                      </blockquote>
                      <div className="mt-4">
                        <div className="font-medium text-prometheus-navy">{review.author}</div>
                        <div className="text-sm text-gray-600">
                          {review.position}, {review.company}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-8">
            <CarouselPrevious className="static transform-none" />
            <CarouselNext className="static transform-none" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default ClientReviews;
