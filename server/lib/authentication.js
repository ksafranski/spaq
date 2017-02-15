const HTTPError = require('http-errors')

const authentication = (req, res, next) => {
  // Thou shall not pass
  if (!req.headers.authorization) {
    next(new HTTPError(403))
  }
  next()
}

module.exports = authentication
