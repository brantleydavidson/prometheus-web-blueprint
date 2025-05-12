import React from 'react'
import { renderToString } from 'react-dom/server'
import { escapeInject, dangerouslySkipEscape } from 'vike/server'
import type { PageContextServer } from 'vike/types'
import { HelmetProvider } from 'react-helmet-async'

// Define a type for the Page component expected in exports
type Page = React.ComponentType<any>;

export { onRenderHtml }

async function onRenderHtml(pageContext: PageContextServer) {
  // Access Page and pageProps from pageContext.exports or default
  const page = pageContext.exports.Page as Page | undefined;
  const pageProps = pageContext.exports.pageProps ?? {}; // Look for pageProps in exports too

  // Check if Page is defined
  if (!page) throw new Error('My render() hook expects pageContext.exports.Page to be defined')
  
  // For collecting Helmet data
  const helmetContext: any = {}
  
  // Render the page to HTML
  const pageHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      {React.createElement(page, pageProps)}
    </HelmetProvider>
  )
  
  // Extract head tags from helmet
  const { helmet } = helmetContext
  
  // Inject page title and meta tags from Helmet
  const title = helmet?.title?.toString() || '';
  const meta = helmet?.meta?.toString() || '';
  const link = helmet?.link?.toString() || '';
  const script = helmet?.script?.toString() || '';

  // Complete HTML document with Vike asset injection
  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${dangerouslySkipEscape(title)}
        ${dangerouslySkipEscape(meta)}
        ${dangerouslySkipEscape(link)}
        ${dangerouslySkipEscape(script)}
        
        <!-- Vike automatically injects CSS links here -->
        
        <!-- Remove Prerender verification meta tags -->
        <!--
        <meta name="prerender-status-code" content="200" />
        <meta name="prerender-token" content="dKzffLw7ttkED8XRG9R1" />
        <meta name="fragment" content="!" />
        <meta name="prerender" content="prerender-verification-success" />
        -->
      </head>
      <body>
        <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
        
        <!-- Remove visible marker for Prerender verification -->
        <!--
        <div id="prerender-marker" data-testid="prerender-verification" style="position: absolute; bottom: 0; right: 0; opacity: 0.1;">
          Prerender Verification: dKzffLw7ttkED8XRG9R1
        </div>
        -->

        <!-- Vike automatically injects JS scripts here -->
      </body>
    </html>`

  return {
    documentHtml
  }
}
