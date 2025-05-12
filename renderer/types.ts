
import type { PageContextBuiltIn } from 'vike/types'
import React from 'react'

export type PageProps = Record<string, unknown>

export interface PageContext extends PageContextBuiltIn {
  Page: React.ComponentType<PageProps>
  pageProps: PageProps
  exports: {
    documentProps?: {
      title?: string
      description?: string
    }
  }
}
