
import React from 'react';
import { cn } from "@/lib/utils";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string; // Make alt required
  fallbackSrc?: string;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, alt, fallbackSrc = "https://dxufdcvoupjqvxnwnost.supabase.co/storage/v1/object/public/cms-assets/placeholder.png", ...props }, ref) => {
    const [error, setError] = React.useState(false);
    
    const handleError = () => {
      if (!error && fallbackSrc) {
        setError(true);
      }
    };
    
    return (
      <img
        className={cn(className)}
        alt={alt} // Descriptive alt text for accessibility and SEO
        onError={handleError}
        src={error ? fallbackSrc : props.src}
        ref={ref}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";

export { Image };
