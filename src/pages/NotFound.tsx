
import { useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  
  // Check if this is a www request that needs to be redirected
  const isWwwSubdomain = window.location.hostname.startsWith('www.');
  
  useEffect(() => {
    if (!isWwwSubdomain) {
      console.error(
        "404 Error: User attempted to access non-existent route:",
        location.pathname
      );
    }
  }, [location.pathname, isWwwSubdomain]);
  
  // If this is a www request, redirect to the root domain while preserving the path
  if (isWwwSubdomain) {
    const rootDomain = window.location.hostname.replace('www.', '');
    const redirectURL = `${window.location.protocol}//${rootDomain}${window.location.pathname}${window.location.search}`;
    
    // Add debug logging to help diagnose issues
    console.log("Redirecting from www subdomain to root domain");
    console.log("Original URL:", window.location.href);
    console.log("Redirect target:", redirectURL);
    
    // Use window.location.replace for a clean redirect without adding to browser history
    window.location.replace(redirectURL);
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-6xl font-bold mb-4 text-prometheus-navy">404</h1>
        <p className="text-xl text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
        <a 
          href="/" 
          className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white py-2 px-6 rounded-md font-medium transition-colors"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
