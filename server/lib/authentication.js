const HTTPError = require('http-errors')
const jwt = require('jwt-simple')

// Removes authentication check from public API endpoints
// Specify route as key, public methods <array> as value
const publicRoutes = {
  'authenticate': [ 'post' ]
}

const authentication = (req, res, next) => {
  // Check if accessing public route
  if (publicRoutes[req.params.controller] && publicRoutes[req.params.controller].indexOf(req.method.toLowerCase()) >= 0) {
    // Attempting to access public route
    next()
  }
  // Check for authorization header JWT
  if (req.headers.authorization) {
    // Verify JWT
    try {
      // Set req.token
      req.token = jwt.decode(req.headers.authorization, process.env.AUTH_JWT_SECRET)
      next()
    } catch (e) {
      next(new HTTPError(403, 'Unauthorized'))
    }
  }
  // Default to 403
  next(new HTTPError(403, 'Not Authenticated'))
}

module.exports = authentication
