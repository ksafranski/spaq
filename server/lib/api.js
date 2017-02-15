const HTTPError = require('http-errors')
const requireDir = require('require-dir')
const path = require('path')
const controllers = requireDir(path.resolve(__dirname, '../controllers'))

const api = (req, res, next) => {
  const controller = req.params.controller
  const event = { body: req.body, id: req.params.id, query: req.query }
  // Handle non-existent controller
  if (!controllers[controller]) {
    next(new HTTPError(404))
    return
  }
  // Controller found, process
  controllers[controller][req.method.toLowerCase()](event)
    .then((result) => {
      res.data = result
      next()
    })
    .catch((err) => {
      next(err)
    })
}

module.exports = api
