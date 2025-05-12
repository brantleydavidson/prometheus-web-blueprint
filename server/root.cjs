
// This file is used in both client and server code
// Needed to determine the root of the project

const path = require('path')
const root = path.resolve(__dirname, '..')

module.exports = { root }
