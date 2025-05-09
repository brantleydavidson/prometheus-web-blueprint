import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { shouldPrerender, getPrerenderUrl } from './middleware/prerenderMiddleware'

// Check if the current request is from a crawler that should receive pre-rendered content
const userAgent = navigator.userAgent;

// HubSpot token - this is your HubSpot Portal ID's specific token
const PRERENDER_TOKEN = 'dKzffLw7ttkED8XRG9R1';

// Enhanced domain logging with timestamp
const timestamp = new Date().toISOString();
console.log(`Application startup (${timestamp}):`);
console.log('User Agent:', userAgent);
console.log('Current hostname:', window.location.hostname);
console.log('Current protocol:', window.location.protocol);
console.log('Is Cloudflare?', navigator.userAgent.includes('Cloudflare'));
console.log('Full URL:', window.location.href);
console.log('DNS prefetch tags present:', document.querySelectorAll('link[rel="dns-prefetch"]').length);

// Log any SSL/TLS errors in the console
window.addEventListener('error', function(e) {
  if (e.message && (
    e.message.includes('SSL') || 
    e.message.includes('TLS') || 
    e.message.includes('security') || 
    e.message.includes('certificate')
  )) {
    console.error('SSL/TLS Error detected:', e.message);
  }
});

// Special handling for HubSpot tracking and form submissions
// This helps ensure HubSpot forms work properly with Lovable as primary domain
const isHubSpotRequest = userAgent.toLowerCase().includes('hubspot') || 
                         window.location.href.includes('hsforms') ||
                         document.referrer.includes('hubspot');

// Check for domain issues
const isDomainIssue = window.location.hostname === 'undefined' || 
                     window.location.hostname === '' || 
                     !window.location.hostname.includes('.');

if (isDomainIssue) {
  console.error('Domain resolution issue detected:', window.location.hostname);
  console.error('This could be related to DNS configuration or SSL certificate issues');
  console.error('Current document.domain:', document.domain);
  
  // Try to get more information about potential Cloudflare errors
  if (document.documentElement.innerHTML.includes('Error 1001') || 
      document.documentElement.innerHTML.includes('cloudflare')) {
    console.error('Cloudflare error detected in page content');
    console.error('This often indicates a DNS configuration issue between Hover and Lovable');
  }
  
  // Still render the app, but log the issue
}

// Add handlers to detect navigation issues
window.addEventListener('popstate', function(event) {
  console.log('Navigation event detected:', document.location.href);
});

// Create a helper to check the domain health
const checkDomainHealth = () => {
  const domainCheckPromises = [
    { domain: 'teamprometheus.io', expectSuccess: true },
    { domain: 'www.teamprometheus.io', expectSuccess: true },
    { domain: 'lovable.app', expectSuccess: true }
  ].map(({domain, expectSuccess}) => {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve({ domain, status: 'success', expected: expectSuccess });
      img.onerror = () => resolve({ domain, status: 'failed', expected: expectSuccess });
      img.src = `https://${domain}/favicon.ico?_=${Date.now()}`;
      setTimeout(() => resolve({ domain, status: 'timeout', expected: expectSuccess }), 3000);
    });
  });

  Promise.all(domainCheckPromises).then(results => {
    console.log('Domain health check results:', results);
  });
};

// Run the domain health check after a short delay
setTimeout(checkDomainHealth, 2000);

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
