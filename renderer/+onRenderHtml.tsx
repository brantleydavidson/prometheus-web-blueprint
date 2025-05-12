
import React from 'react'
import { renderToString } from 'react-dom/server'
import { dangerouslySkipEscape, escapeInject } from 'vike/server'
import { PageContext } from './types'
import { HelmetProvider } from 'react-helmet-async'

export { onRenderHtml }

async function onRenderHtml(pageContext: PageContext) {
  const { Page, pageProps } = pageContext
  
  if (!Page) throw new Error('Page component not found')
  
  // For collecting Helmet data
  const helmetContext: any = {}
  
  // We render the page to HTML
  const pageHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <Page {...pageProps} />
    </HelmetProvider>
  )
  
  // Extract head tags from helmet
  const { helmet } = helmetContext
  
  // Complete HTML document
  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${dangerouslySkipEscape(helmet?.title?.toString() || '')}
        ${dangerouslySkipEscape(helmet?.meta?.toString() || '')}
        ${dangerouslySkipEscape(helmet?.link?.toString() || '')}
        ${dangerouslySkipEscape(helmet?.script?.toString() || '')}
        
        <!-- Prerender verification meta tags -->
        <meta name="prerender-status-code" content="200" />
        <meta name="prerender-token" content="dKzffLw7ttkED8XRG9R1" />
        <meta name="fragment" content="!" />
        <meta name="prerender" content="prerender-verification-success" />
      </head>
      <body>
        <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
        
        <!-- Added visible marker for Prerender verification -->
        <div id="prerender-marker" data-testid="prerender-verification" style="position: absolute; bottom: 0; right: 0; opacity: 0.1;">
          Prerender Verification: dKzffLw7ttkED8XRG9R1
        </div>
      </body>
    </html>`

  return {
    documentHtml
  }
}
