const path = require('path')

require('genesis-core').dev({
  root: path.resolve(__dirname, '../client'),
  main: [
    path.resolve(__dirname, '../client/lib/main.js')
  ],
  verbose: true
})
