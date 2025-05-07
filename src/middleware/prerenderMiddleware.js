
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
  'duckduckbot',
  'prerender'
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
  
  console.log('Checking user agent for prerender:', userAgentLC);
  
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
export const getPrerenderUrl = (path, prerenderToken) => {
  // Clean up the path and ensure it starts with a slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // Format: https://service.prerender.io/https://www.teamprometheus.io/path
  const prerenderUrl = `https://service.prerender.io/https://www.teamprometheus.io${cleanPath}`;
  
  // Append token as a query parameter
  const urlWithToken = `${prerenderUrl}${prerenderUrl.includes('?') ? '&' : '?'}token=${prerenderToken}`;
  
  console.log('Generated prerender URL:', urlWithToken);
  
  return urlWithToken;
};
