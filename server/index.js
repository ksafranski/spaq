const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const log = require('./lib/log')
const authentication = require('./lib/authentication')
const api = require('./lib/api')
const response = require('./lib/response')

const pubRoot = path.resolve(__dirname, '../client')

const PORT = process.env.PORT || 9999
const app = express()

// Use body-parser; json
app.use(bodyParser.json())

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
