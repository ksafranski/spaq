const HTTPError = require('http-errors')
const jwt = require('jwt-simple')
const pkg = require('../../package.json')

const authentication = (permission) => (req, res, next) => {
  // Check for authorization header JWT
  if (req.headers.authorization) {
    // Verify JWT
    try {
      // Verify permission
      const token = jwt.decode(req.headers.authorization, process.env.AUTH_JWT_SECRET)
      // Verify issuer
      if (token.iss !== pkg.name) {
        return next(new HTTPError(403, 'Invalid Token'))
      }
      // Verify expiration
      if (token.exp <= Date.now()) {
        return next(new HTTPError(403, 'Token Expired'))
      }
      if (token.context.permissions.indexOf(permission) < 0) {
        return next(new HTTPError(403, 'Unauthorized'))
      }
      // Has permissions
      return next()
    } catch (e) {
      return next(new HTTPError(403, 'Unauthorized'))
    }
  }
  // Default to 403
  next(new HTTPError(403, 'Not Authenticated'))
}

module.exports = authentication
