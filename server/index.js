
const express = require('express')
const compression = require('compression')
const sirv = require('sirv')
const { renderPage } = require('vike/server')
const { root } = require('./root.cjs')

// Create the Express app
const app = express()
app.use(compression())

// Serve static assets with more conservative settings for Vercel
const serve = sirv(`${root}/dist/client`, { 
  dev: process.env.NODE_ENV !== 'production',
  maxAge: 31536000, // 1 year
  immutable: true,
  etag: true,
  single: false
})
app.use(serve)

// Enhanced error handling middleware
app.use((err, req, res, next) => {
  console.error('Express middleware error:', err)
  res.status(500).send('Server error occurred')
})

// Handle all routes with Vike
app.get('*', async (req, res, next) => {
  // Log incoming requests for debugging
  console.log(`Request received: ${req.originalUrl}`)
  
  const pageContextInit = {
    urlOriginal: req.originalUrl
  }
  
  try {
    const pageContext = await renderPage(pageContextInit)
    
    if (pageContext.errorWhileRendering) {
      console.error('Error while rendering:', pageContext.errorWhileRendering)
    }
    
    const { httpResponse } = pageContext
    
    if (!httpResponse) {
      console.log(`No httpResponse for ${req.originalUrl}`)
      return next()
    }
    
    const { body, statusCode, headers } = httpResponse
    
    headers.forEach(([name, value]) => {
      res.setHeader(name, value)
    })
    
    console.log(`Response for ${req.originalUrl}: status=${statusCode}`)
    res.status(statusCode).send(body)
  } catch (error) {
    console.error(`Server-side rendering error for ${req.originalUrl}:`, error)
    
    // More detailed error response
    if (process.env.NODE_ENV !== 'production') {
      res.status(500).send(`Server error: ${error.message}\n${error.stack}`)
    } else {
      res.status(500).send('Server error')
    }
  }
})

// For local development
if (!process.env.VERCEL) {
  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}

// For Vercel deployment - export the app
module.exports = app
