
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CTABannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const CTABanner = ({ title, description, buttonText, buttonLink }: CTABannerProps) => {
  return (
    <section className="py-16 bg-prometheus-navy text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
          <p className="text-lg mb-8">{description}</p>
          <Button size="lg" className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
            <Link to={buttonLink}>{buttonText}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
