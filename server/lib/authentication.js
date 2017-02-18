const HTTPError = require('http-errors')
const jwt = require('jwt-simple')

const authentication = (permission) => (req, res, next) => {
  // Check for authorization header JWT
  if (req.headers.authorization) {
    // Verify JWT
    try {
      // Verify permission
      const token = jwt.decode(req.headers.authorization, process.env.AUTH_JWT_SECRET)
      if (token.permissions.indexOf(permission) < 0) {
        next(new HTTPError(403, 'Unauthorized'))
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
