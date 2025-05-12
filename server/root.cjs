
// This file is used in both client and server code
// Needed to determine the root of the project
const path = require('path')

// For Vercel, we need to handle the case where the working directory might be different
let root = process.cwd()

// In Vercel environment, we might need to adjust the path
if (process.env.VERCEL) {
  console.log('Running in Vercel environment')
  console.log('Current working directory:', root)
  
  // Log available files and directories for debugging
  try {
    const fs = require('fs')
    console.log('Files in current directory:', fs.readdirSync(root))
  } catch (error) {
    console.error('Error listing files:', error)
  }
}

// Export the resolved root path
module.exports = { root }
