const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

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

// Supports routing on the client app
app.get('*', (req, res) => {
  console.log('Trying to send more shit...', req.originalUrl)
  res.sendFile(path.resolve(pubRoot, 'index.html'))
})

app.use(response.error)

app.listen(PORT, () => console.log(`Server running on ${PORT}`))
