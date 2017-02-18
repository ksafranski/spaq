const HTTPError = require('http-errors')
const requireDir = require('require-dir')
const path = require('path')
const _ = require('redash')
const controllers = requireDir(path.resolve(__dirname, '../controllers'))
const response = require('./response')
const authentication = require('./authentication')

const api = {
  /**
   * Parses api.json into array of objects for creating express endpoints
   * @param {object} rte Raw routes object
   * @returns {array} Array of endpoint objects with properties:
   *   - @property {string} controller Name of the controller
   *   - @property {string} function Name of the method to execute
   *   - @property {string} method HTTP method/verb to apply to
   *   - @property {string} path Resource path, i.e. /<controller>/<route>
   *   - @property {boolean} (public) True if this is a public path
   *   - @property {string} (permission) Permission name if not public
   */
  parseAPI: (rte) => {
    // Flatten controller object into config object
    const flattenController = (ctrl, name) => _.pipe([
      _.toPairs,
      _.chain(([path, methods]) => {
        return _.map(([method, config]) => _.merge(
          config, { method, path: `/api/${name}${path}` }),
          _.toPairs(methods))
      })
    ])(ctrl)
    // Iterate over route controllers
    return _.pipe([
      _.toPairs,
      _.chain(([name, controller]) => {
        const methods = flattenController(controller, name)
        return _.map(_.assoc('controller', name), methods)
      })
    ])(rte)
  },
  /**
   * Build exec middleware for endpoint
   * @param {Object} ep The endpoint configuration
   * @returns {Function}
   */
  buildEndpointExec: (ep) => (req, res, next) => {
    if (!controllers[ep.controller] || !controllers[ep.controller][ep.exec]) {
      next(new HTTPError(404))
      return
    }
    controllers[ep.controller][ep.exec](req)
      .then((result) => {
        res.data = result
        next()
      })
      .catch((err) => {
        next(err)
      })
  },
  /**
   * Builds the API by processing the api.json config file
   */
  build: (app, apiConfig) => _.map((ep) => {
    let middleware = []
    // If not public, push authentication middleware with route permission
    if (!ep.public) middleware.push(authentication(ep.permission))
    // Execution middleware
    middleware.push(api.buildEndpointExec(ep))
    // Response success middlare
    middleware.push(response.success)
    // Create endpoint
    app[ep.method](ep.path, middleware)
  })(api.parseAPI(apiConfig))
}

module.exports = api
