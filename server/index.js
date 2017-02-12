const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const pubRoot = path.resolve(__dirname, '../client')

const PORT = process.env.PORT || 9999
const app = express()

// Serve static assets
app.use(express.static(pubRoot))

// Supports routing on the client app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(pubRoot, 'index.html'))
})

app.listen(PORT, () => console.log(`Server running on ${PORT}`))
