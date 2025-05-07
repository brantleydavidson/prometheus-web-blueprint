
// Default content templates for new pages
export const defaultContentTemplates = {
  default: {
    heading: "Default Page",
    subheading: "This is a default page template",
    content: [
      {
        type: "paragraph",
        text: "Enter your content here. You can edit this content in the JSON editor below."
      }
    ]
  },
  landing: {
    hero: {
      title: "Landing Page",
      subtitle: "Welcome to our landing page",
      ctaText: "Get Started",
      ctaLink: "/contact"
    },
    sections: [
      {
        title: "Feature 1",
        description: "Description of feature 1"
      },
      {
        title: "Feature 2",
        description: "Description of feature 2"
      }
    ]
  },
  contact: {
    title: "Contact Us",
    description: "Get in touch with our team",
    contactInfo: {
      email: "contact@example.com",
      phone: "(555) 123-4567",
      address: "123 Main St, City, State 12345"
    },
    formFields: ["name", "email", "message"]
  }
};
