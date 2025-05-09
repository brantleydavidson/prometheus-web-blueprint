/**
 * This file configures Prerender.io integration for search engine optimization
 * It detects search engine crawlers and serves pre-rendered content
 */

// List of crawler user agents that should receive pre-rendered pages
const crawlerUserAgents: string[] = [
  'googlebot',
  'yahoo',
  'bingbot',
  'baiduspider',
  'facebookexternalhit',
  'twitterbot',
  'rogerbot',
  'linkedinbot',
  'embedly',
  'quora link preview',
  'showyoubot',
  'outbrain',
  'pinterest',
  'slackbot',
  'vkShare',
  'W3C_Validator',
  'yandex',
  'duckduckbot',
  'prerender',
  'prerendercloud',
  'headlessChrome'
];

/**
 * Check if the request is coming from a crawler that should receive pre-rendered pages
 * @param {string} userAgent - The user agent string from the request
 * @returns {boolean} - True if the request is from a crawler, false otherwise
 */
export const shouldPrerender = (userAgent: string): boolean => {
  if (!userAgent) return false;
  
  // Convert to lowercase for comparison
  const userAgentLC = userAgent.toLowerCase();
  
  console.log('Checking user agent for prerender:', userAgentLC);
  
  // Special case for Prerender verification
  if (userAgentLC.includes('prerender')) {
    console.log('Prerender verification detected');
    return false; // Changed to false to prevent redirect loops
  }
  
  // During domain configuration issues, temporarily disable prerendering
  // This helps with testing the site without getting caught in redirects
  const isDomainIssue = window.location.hostname === 'undefined' || 
                       window.location.hostname === '' || 
                       !window.location.hostname.includes('.');
  
  if (isDomainIssue) {
    console.log('Domain issue detected, disabling prerender');
    return false;
  }
  
  // Check if user agent matches any crawler patterns
  const isBot = crawlerUserAgents.some(crawler => userAgentLC.includes(crawler));
  
  console.log('Is bot detection result:', isBot);
  return isBot;
};

/**
 * Get the prerendered URL for the current page
 * @param {string} path - The path of the current page
 * @param {string} prerenderToken - Your Prerender.io token
 * @returns {string} - The URL to fetch the prerendered version from
 */
export const getPrerenderUrl = (path: string, prerenderToken: string): string => {
  // Clean up the path and ensure it starts with a slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // Use current hostname for more reliable prerendering
  const hostname = window.location.hostname;
  
  // Enhanced logging for debugging
  console.log('Getting prerender URL with hostname:', hostname);
  
  // Only use teamprometheus.io domain if we're on a valid domain
  // Otherwise use the current hostname to avoid redirect issues
  const baseUrl = hostname && hostname.includes('.') ? 
    `https://${hostname}` : 
    'https://teamprometheus.io';
  
  // Format: https://service.prerender.io/https://www.teamprometheus.io/path
  const prerenderUrl = `https://service.prerender.io/${baseUrl}${cleanPath}`;
  
  // Append token as a query parameter
  const urlWithToken = `${prerenderUrl}${prerenderUrl.includes('?') ? '&' : '?'}token=${prerenderToken}`;
  
  console.log('Generated prerender URL:', urlWithToken);
  
  return urlWithToken;
};
