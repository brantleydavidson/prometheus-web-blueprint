import React from 'react'
import { renderToString } from 'react-dom/server'
import { escapeInject, dangerouslySkipEscape } from 'vike/server'
import type { PageContextServer } from 'vike/types'
// Import the App component (which is now just providers)
import App from '../src/App' 
import { HelmetProvider } from 'react-helmet-async'

// Define a type for the Page component expected in exports
type Page = React.ComponentType<any>;

export { onRenderHtml }

async function onRenderHtml(pageContext: PageContextServer) {
  const page = pageContext.exports.Page as React.ComponentType<any> | undefined;
  const pageProps = pageContext.exports.pageProps ?? {};

  if (!page) throw new Error('Server-side render: pageContext.exports.Page is missing')

  // For collecting Helmet data
  const helmetContext: any = {}
  
  // We render the page to HTML, wrapped in the App providers
  const pageHtml = renderToString(
    // HelmetProvider wraps App and receives context
    <HelmetProvider context={helmetContext}> 
      <App>
        {React.createElement(page, pageProps)}
      </App>
    </HelmetProvider>
  )
  
  // Extract head tags from the context passed to HelmetProvider
  const { helmet } = helmetContext
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
