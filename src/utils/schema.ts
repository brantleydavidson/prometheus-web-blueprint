
// JSON-LD Schema for SEO and AI crawlers

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Prometheus Agency",
  "description": "Marketing technology experts helping B2B and DTC businesses transform tech chaos into controlled growth through AI enablement, CRM integration, and revenue-focused strategies.",
  "url": "https://www.teamprometheus.io/",
  "logo": "https://dxufdcvoupjqvxnwnost.supabase.co/storage/v1/object/public/cms-assets/zga9nrq2m1.png",
  "sameAs": [
    "https://www.linkedin.com/company/teamprometheus/",
    "https://twitter.com/lovable_dev"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Austin",
    "addressRegion": "TX",
    "addressCountry": "US"
  },
  "telephone": "+1-512-555-1212",
  "email": "info@teamprometheus.io",
  "areaServed": ["United States", "Canada"],
  "serviceType": [
    "CRM Implementation",
    "AI Enablement",
    "Marketing Automation",
    "Go-to-Market Strategy",
    "Customer Journey Optimization"
  ],
  "priceRange": "$$",
  "foundingDate": "2023",
  "knowsAbout": [
    "CRM Integration",
    "Marketing Technology",
    "AI Implementation",
    "Revenue Operations",
    "B2B Marketing",
    "DTC Marketing"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Marketing Technology Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "CRM Implementation",
          "description": "Custom CRM implementation and integration with your marketing technology stack."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Enablement",
          "description": "Integration of AI tools and strategies to enhance marketing effectiveness."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Go-to-Market Strategy",
          "description": "Strategic planning and execution of go-to-market initiatives."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Customer Journey Optimization",
          "description": "Analysis and optimization of customer journeys to improve conversion rates."
        }
      }
    ]
  }
};

export const generateServiceSchema = (service: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "Prometheus Agency",
      "url": "https://www.teamprometheus.io/"
    },
    "url": service.url,
    "image": service.image || "https://dxufdcvoupjqvxnwnost.supabase.co/storage/v1/object/public/cms-assets/zga9nrq2m1.png"
  };
};

export const generateArticleSchema = (article: {
  headline: string;
  description: string;
  authorName: string;
  publishDate: string;
  modifiedDate: string;
  url: string;
  image?: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.headline,
    "description": article.description,
    "author": {
      "@type": "Person",
      "name": article.authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "Prometheus Agency",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dxufdcvoupjqvxnwnost.supabase.co/storage/v1/object/public/cms-assets/zga9nrq2m1.png"
      }
    },
    "datePublished": article.publishDate,
    "dateModified": article.modifiedDate,
    "mainEntityOfPage": article.url,
    "image": article.image || "https://dxufdcvoupjqvxnwnost.supabase.co/storage/v1/object/public/cms-assets/zga9nrq2m1.png"
  };
};

export const generateFAQSchema = (questions: Array<{question: string, answer: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
};
