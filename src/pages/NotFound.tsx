
import { useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFound = () => {
  const location = useLocation();
  const [errorDetails, setErrorDetails] = useState<string>('');
  
  // Check if this is a www request that needs to be redirected
  const isWwwSubdomain = window.location.hostname.startsWith('www.');
  const currentDomain = window.location.hostname;
  
  useEffect(() => {
    // Check if page contains Cloudflare error message
    const checkForCloudflareErrors = () => {
      const pageContent = document.body.innerText || '';
      
      if (pageContent.includes('Error 1001') || pageContent.includes('DNS resolution error')) {
        setErrorDetails('Cloudflare DNS resolution error detected. This typically indicates that the DNS records for your domain are not correctly pointing to the Lovable servers.');
        console.error('Cloudflare Error 1001 detected on 404 page');
        console.error('This is a DNS configuration issue between your domain registrar and Lovable');
      } else if (pageContent.includes('SSL') || pageContent.includes('certificate')) {
        setErrorDetails('SSL/TLS certificate error detected. This may indicate that the SSL certificate for your domain has not been properly provisioned yet.');
      }
    };
    
    // Run the check with a small delay to ensure page content is available
    setTimeout(checkForCloudflareErrors, 500);
    
    if (!isWwwSubdomain) {
      console.error(
        "404 Error: User attempted to access non-existent route:",
        location.pathname
      );
    }
    
    // Log domain information to help diagnose DNS issues
    console.log("Domain information:");
    console.log("- Current hostname:", window.location.hostname);
    console.log("- Full URL:", window.location.href);
    console.log("- Protocol:", window.location.protocol);
    console.log("- Is www subdomain:", isWwwSubdomain);
    console.log("- User agent:", navigator.userAgent);
    
    // Check for SSL/TLS errors
    if (window.location.protocol !== 'https:' && !window.location.hostname.includes('localhost')) {
      console.warn('Page is not being served over HTTPS, which might indicate SSL configuration issues');
    }
    
    // Log additional information to help diagnose the domain issue
    if (document.domain) {
      console.log("- document.domain:", document.domain);
    }
    
    // Attempt to detect if we're in a Cloudflare error page
    const isCloudflareError = document.body.innerText.includes('Cloudflare') || 
                             document.body.innerText.includes('Error 1001');
    
    if (isCloudflareError) {
      console.error('Potential Cloudflare error page detected');
    }
  }, [location.pathname, isWwwSubdomain]);
  
  // If this is a www request, redirect to the root domain while preserving the path
  if (isWwwSubdomain) {
    const rootDomain = window.location.hostname.replace('www.', '');
    const redirectURL = `${window.location.protocol}//${rootDomain}${window.location.pathname}${window.location.search}`;
    
    // Enhanced debug logging to help diagnose issues
    console.log("Redirecting from www subdomain to root domain");
    console.log("Original URL:", window.location.href);
    console.log("Redirect target:", redirectURL);
    console.log("Current domain state:", currentDomain);
    
    // Use window.location.replace for a clean redirect without adding to browser history
    // Only perform the redirect if we're on a valid domain
    if (rootDomain && rootDomain !== 'undefined') {
      window.location.replace(redirectURL);
    } else {
      console.error("Domain resolution issue detected. Not performing redirect due to invalid domain name.");
    }
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-6xl font-bold mb-4 text-prometheus-navy">404</h1>
        <p className="text-xl text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
        
        {/* Show error details if detected */}
        {errorDetails && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md text-sm">
            <p className="font-semibold mb-1">Detected Issue:</p>
            <p>{errorDetails}</p>
            <p className="mt-2 text-xs">
              This appears to be a domain configuration issue. Please check your DNS settings in your domain registrar.
            </p>
          </div>
        )}
        
        {/* Include domain information in the UI to help with debugging */}
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-500">Domain: {window.location.hostname || 'undefined'}</p>
          <p className="text-xs text-gray-400">Protocol: {window.location.protocol}</p>
        </div>
        
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
