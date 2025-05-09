
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
    
    // Use window.location.replace for a clean redirect without adding to browser history
    window.location.replace(redirectURL);
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
