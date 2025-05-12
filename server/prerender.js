
// Pre-rendering script for building static HTML
const { prerender } = require('vike/prerender')
const { root } = require('./root.cjs')

startPrerender()

async function startPrerender() {
  const pageContexts = await prerender({
    root,
    // List out all routes to prerender
    // If not specified, all routes will be prerendered
    partial: false
  })
  
  // Done
  console.log(`Pre-rendered ${pageContexts.length} pages`)
  
  // Log each prerendered URL
  pageContexts.forEach((pageContext) => {
    console.log(`  ${pageContext.urlOriginal}`)
  })
}
