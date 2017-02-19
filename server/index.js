const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const uuid = require('uuid')
const log = require('./lib/log')
const response = require('./lib/response')
const api = require('./lib/api')
const pubRoot = path.resolve(__dirname, '../client')
const PORT = process.env.PORT || 9999
const app = express()
let apiConfig

// Load API config
try {
  apiConfig = require('./api.json')
} catch (e) {
  log.error('Failed to parse api.json', {
    message: e.message
  })
  process.exit(1)
}

/* istanbul ignore next */
const getIP = (req) => req.headers['x-forwarded-for'] || req.connection.remoteAddress

// Set EJS for loading dist v. dev
app.set('view engine', 'ejs')

// Use body-parser; json
app.use(bodyParser.json())

// Log incoming requests
app.use((req, res, next) => {
  // Add id to req for tracking
  req.sessionId = uuid()
  // Log request
  log.info('Request', {
    route: req.originalUrl,
    method: req.method.toUpperCase(),
    sessionId: req.sessionId,
    ip: getIP(req)
  })
  next()
})

// Serve static assets
app.use(express.static(pubRoot))

// Build API from api.json
api.build(app, apiConfig)

// Support routing on the client app
app.get('*', (req, res) => {
  res.render(path.resolve(pubRoot, 'index.ejs'), {
    env: process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'dev'
  })
})

// Handle middleware errors
app.use(response.error)

app.listen(PORT, () => {
  log.info('Server Started', {
    port: PORT,
    timestamp: new Date()
  })
})
