const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const uuid = require('uuid')

const log = require('./lib/log')
const authentication = require('./lib/authentication')
const api = require('./lib/api')
const response = require('./lib/response')

const pubRoot = path.resolve(__dirname, '../client')

const PORT = process.env.PORT || 9999
const app = express()

/* istanbul ignore next */
const getIP = (req) => req.headers['x-forwarded-for'] || req.connection.remoteAddress

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

// Serve API
app.all('/api/:controller/:id?', [ authentication, api, response.success ])

// Support routing on the client app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(pubRoot, 'index.html'))
})

// Handle middleware errors
app.use(response.error)

app.listen(PORT, () => {
  log.info('Server Started', {
    port: PORT,
    timestamp: new Date()
  })
})
