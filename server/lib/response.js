const log = require('./log')

/* istanbul ignore next */
const getIP = (req) => req.headers['x-forwarded-for'] || req.connection.remoteAddress

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
      ip: getIP(req)
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
    const statusCode = error.statusCode || 500
    log.error('Error Response', {
      route: req.originalUrl,
      method: req.method.toUpperCase(),
      sessionId: req.sessionId,
      ip: getIP(req),
      code: statusCode,
      error: error.message || 'Internal Server Error'
    })
    res.status(statusCode).send(error.message || 'Internal Server Error')
  }
}

module.exports = response
