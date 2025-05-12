
import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { PageContext } from './types'
import { HelmetProvider } from 'react-helmet-async'

export { onRenderClient }

async function onRenderClient(pageContext: PageContext) {
  const { Page, pageProps } = pageContext
  
  if (!Page) throw new Error('Page component not found')
  
  hydrateRoot(
    document.getElementById('root')!,
    <HelmetProvider>
      <Page {...pageProps} />
    </HelmetProvider>
  )
}
