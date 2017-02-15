const log = require('./log')

/* istanbul ignore next */
const getIP = (req) => req.headers['x-forwarded-for'] || req.connection.remoteAddress

const response = {
  success: (req, res, next) => {
    log.info('Success Response', {
      route: req.originalUrl,
      method: req.method.toUpperCase(),
      ip: getIP(req)
    })
    res.status(200).send(res.data)
  },
  error: (error, req, res, next) => {
    const statusCode = error.statusCode || 500
    log.error('Error Response', {
      route: req.originalUrl,
      method: req.method.toUpperCase(),
      ip: getIP(req),
      code: statusCode,
      error: error.message || 'Internal Server Error'
    })
    res.status(statusCode).send(error.message || 'Internal Server Error')
  }
}

module.exports = response
