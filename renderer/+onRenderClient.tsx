import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { PageContext } from './types'
import App from '../src/App'
import { HelmetProvider } from 'react-helmet-async'

export { onRenderClient }

async function onRenderClient(pageContext: PageContext) {
  const { Page, pageProps } = pageContext
  
  if (!Page) throw new Error('Client-side render: pageContext.Page is missing')
  
  hydrateRoot(
    document.getElementById('root')!,
    <HelmetProvider>
      <App>
        <Page {...pageProps} />
      </App>
    </HelmetProvider>
  )
}
