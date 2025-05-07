
/**
 * This file configures Prerender.io integration for search engine optimization
 * It detects search engine crawlers and serves pre-rendered content
 */

// List of crawler user agents that should receive pre-rendered pages
const crawlerUserAgents = [
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
  'duckduckbot'
];

/**
 * Check if the request is coming from a crawler that should receive pre-rendered pages
 * @param {string} userAgent - The user agent string from the request
 * @returns {boolean} - True if the request is from a crawler, false otherwise
 */
export const shouldPrerender = (userAgent) => {
  if (!userAgent) return false;
  
  // Convert to lowercase for comparison
  const userAgentLC = userAgent.toLowerCase();
  
  // Check if user agent matches any crawler patterns
  return crawlerUserAgents.some(crawler => userAgentLC.includes(crawler));
};

/**
 * Get the prerendered URL for the current page
 * @param {string} path - The path of the current page
 * @param {string} prerenderToken - Your Prerender.io token
 * @returns {string} - The URL to fetch the prerendered version from
 */
export const getPrerenderUrl = (path, prerenderToken) => {
  // Use teamprometheus.io as the domain
  // Format the URL according to Prerender.io's documentation
  // The format should be: https://service.prerender.io/https://teamprometheus.io/path?token=token
  return `https://service.prerender.io/https://teamprometheus.io${path}?token=${prerenderToken}`;
};
