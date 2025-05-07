
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { shouldPrerender, getPrerenderUrl } from './middleware/prerenderMiddleware'

// Check if the current request is from a crawler that should receive pre-rendered content
const userAgent = navigator.userAgent;

// Add your Prerender.io token
const PRERENDER_TOKEN = 'dKzffLw7ttkED8XRG9R1';

console.log('User Agent:', userAgent);

// If this is a crawler, fetch the pre-rendered version
if (shouldPrerender(userAgent)) {
  console.log('Crawler detected: Redirecting to Prerender.io service');
  
  // Get full path including query string
  const fullPath = window.location.pathname + window.location.search;
  console.log('Full path for prerendering:', fullPath);
  
  // Redirect to Prerender.io service
  const prerenderUrl = getPrerenderUrl(fullPath, PRERENDER_TOKEN);
  console.log('Redirecting to:', prerenderUrl);
  
  window.location.href = prerenderUrl;
} else {
  // Normal rendering for regular users
  console.log('Regular user detected: Rendering normally');
  createRoot(document.getElementById("root")!).render(<App />);
}
