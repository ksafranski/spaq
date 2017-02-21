const log = require('./log')
const obey = require('obey')

const response = {
  /**
   * Processes a success response from the controller
   * @param {Object} req Express request object
   * @param {Object} res Express response object
   * @param {Function} next
   */
  success: (req, res, next) => {
    log.info('Success Response', {
      route: req.originalUrl,
      method: req.method.toUpperCase(),
      sessionId: req.sessionId,
      ip: req.clientIP
    })
    res.status(200).send(res.data)
  },
  /**
   * Processes an error response from the controller
   * @param {Object.<Error>} error Response error object
   * @param {Object} req Express request object
   * @param {Object} res Express response object
   * @param {Function} next
   */
  error: (error, req, res, next) => {
    // Handle formatting for data validation errors
    if (error instanceof obey.ValidationError) error.statusCode = 400
    const collection = error.collection || false
    const message = error.message
    // Set status code to 500 if not already set
    const statusCode = error.statusCode || 500
    log.error('Error Response', {
      route: req.originalUrl,
      method: req.method.toUpperCase(),
      sessionId: req.sessionId,
      ip: req.clientIP,
      code: statusCode,
      error: error.message || 'Internal Server Error'
    })
    res.status(statusCode).send(collection ? { message, collection } : message || 'Internal Server Error')
  }
}

module.exports = response
