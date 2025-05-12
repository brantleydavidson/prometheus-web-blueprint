
const express = require('express')
const compression = require('compression')
const sirv = require('sirv')
const { renderPage } = require('vike/server')
const { root } = require('./root.cjs')

startServer()

async function startServer() {
  const app = express()
  
  app.use(compression())
  
  // Serve assets with cache headers
  app.use(sirv(`${root}/dist/client`, { 
    maxAge: 31536000, // 1 year
    immutable: true 
  }))

  // Handle all routes with Vike
  app.get('*', async (req, res, next) => {
    const pageContextInit = {
      urlOriginal: req.originalUrl
    }
    
    const pageContext = await renderPage(pageContextInit)
    
    if (pageContext.errorWhileRendering) {
      console.error('Error while rendering:', pageContext.errorWhileRendering)
    }
    
    const { httpResponse } = pageContext
    
    if (!httpResponse) return next()
    
    const { body, statusCode, headers } = httpResponse
    
    headers.forEach(([name, value]) => {
      res.setHeader(name, value)
    })
    
    res.status(statusCode).send(body)
  })
  
  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
