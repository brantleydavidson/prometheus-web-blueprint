
import type { Config } from 'vike/types'

// Default configuration for all pages
export default {
  // Enable client-side routing
  clientRouting: true,
  
  // Use HTML streaming for better performance
  stream: true,
  
  // Configure meta tags for the whole app
  meta: {
    // Define defaults that apply to all pages
    title: {
      default: 'Prometheus Agency | Tame Your Tech. Unleash Growth.',
      // Add the required env setting
      env: 'server-and-client'
    },
    description: {
      default: 'Prometheus Agency helps B2B and DTC businesses transform tech chaos into controlled growth through AI enablement, CRM integration, and revenue-focused marketing strategies.',
      env: 'server-and-client'
    }
  }
} satisfies Config
