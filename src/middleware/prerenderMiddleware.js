
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
  // Clean up the path and ensure it starts with a slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // Format: https://service.prerender.io/https://www.teamprometheus.io/path?token=token
  const prerenderUrl = `https://service.prerender.io/https://teamprometheus.io${cleanPath}`;
  
  // Append token as a query parameter
  const urlWithToken = `${prerenderUrl}${prerenderUrl.includes('?') ? '&' : '?'}token=${prerenderToken}`;
  
  console.log('Prerender URL:', urlWithToken);
  
  return urlWithToken;
};
