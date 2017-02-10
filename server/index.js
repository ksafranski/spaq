const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const PORT = process.env.PORT || 9999
const app = express()

app.use(express.static(path.resolve(__dirname, '../client')))

app.listen(PORT, () => console.log(`Server running on ${PORT}`))
