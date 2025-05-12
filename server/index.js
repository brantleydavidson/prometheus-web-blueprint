
const express = require('express')
const compression = require('compression')
const sirv = require('sirv')
const { renderPage } = require('vike/server')
const { root } = require('./root.cjs')

// Create the Express app
const app = express()
app.use(compression())

// Serve static assets
app.use(sirv(`${root}/dist/client`, { 
  maxAge: 31536000, // 1 year
  immutable: true 
}))

// Handle all routes with Vike
app.get('*', async (req, res, next) => {
  const pageContextInit = {
    urlOriginal: req.originalUrl
  }
  
  try {
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
  } catch (error) {
    console.error('Server-side rendering error:', error)
    res.status(500).send('Server error')
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
