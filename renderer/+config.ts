
import type { Config } from 'vike/types'

// Default configuration for all pages
export default {
  // Enable client-side routing
  clientRouting: true,
  
  // Configure meta tags for the whole app
  meta: {
    // Define defaults that apply to all pages
    title: {
      default: 'Prometheus Agency | Tame Your Tech. Unleash Growth.'
    },
    description: {
      default: 'Prometheus Agency helps B2B and DTC businesses transform tech chaos into controlled growth through AI enablement, CRM integration, and revenue-focused marketing strategies.'
    }
  }
} satisfies Config
