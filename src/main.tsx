
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { shouldPrerender, getPrerenderUrl } from './middleware/prerenderMiddleware'

// Check if the current request is from a crawler that should receive pre-rendered content
const userAgent = navigator.userAgent;

// HubSpot token - this is your HubSpot Portal ID's specific token
const PRERENDER_TOKEN = 'dKzffLw7ttkED8XRG9R1';

console.log('User Agent:', userAgent);

// Special handling for HubSpot tracking and form submissions
// This helps ensure HubSpot forms work properly with Lovable as primary domain
const isHubSpotRequest = userAgent.toLowerCase().includes('hubspot') || 
                         window.location.href.includes('hsforms') ||
                         document.referrer.includes('hubspot');

if (isHubSpotRequest) {
  console.log('HubSpot request detected: Ensuring compatibility');
  // Continue with normal rendering but ensure HubSpot scripts are loaded
  createRoot(document.getElementById("root")!).render(<App />);
} else if (shouldPrerender(userAgent)) {
  console.log('Crawler detected: Redirecting to Prerender.io service');
  
  // Get full path including query string
  const fullPath = window.location.pathname + window.location.search;
  console.log('Full path for prerendering:', fullPath);
  
  // Log detection for debugging
  console.log('Prerender.io token used:', PRERENDER_TOKEN);
  console.log('Prerender.io detection active');
  
  // Redirect to Prerender.io service
  const prerenderUrl = getPrerenderUrl(fullPath, PRERENDER_TOKEN);
  console.log('Redirecting to:', prerenderUrl);
  
  // For Prerender verification specifically, we want to ensure it can capture our content
  if (userAgent.toLowerCase().includes('prerender')) {
    console.log('Verification agent detected, special handling enabled');
    // Continue with normal rendering for verification
    createRoot(document.getElementById("root")!).render(<App />);
  } else {
    // Regular bot handling
    window.location.href = prerenderUrl;
  }
} else {
  // Normal rendering for regular users
  console.log('Regular user detected: Rendering normally');
  createRoot(document.getElementById("root")!).render(<App />);
}
