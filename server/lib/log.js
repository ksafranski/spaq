const log = require('bristol')

// Setup logging configuration
log.addTarget('console').withFormatter('human')

module.exports = log
