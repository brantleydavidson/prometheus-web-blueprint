
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { shouldPrerender, getPrerenderUrl } from './middleware/prerenderMiddleware'

// Check if the current request is from a crawler that should receive pre-rendered content
const userAgent = navigator.userAgent;

// Add your Prerender.io token
const PRERENDER_TOKEN = 'dKzffLw7ttkED8XRG9R1';

// If this is a crawler, fetch the pre-rendered version
if (shouldPrerender(userAgent)) {
  // Redirect to Prerender.io service
  window.location.href = getPrerenderUrl(window.location.pathname + window.location.search, PRERENDER_TOKEN);
} else {
  // Normal rendering for regular users
  createRoot(document.getElementById("root")!).render(<App />);
}
