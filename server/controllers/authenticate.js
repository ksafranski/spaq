const HTTPError = require('http-errors')
const jwt = require('jwt-simple')
const argon2 = require('argon2')
const mongodb = require('../adapters/mongodb')
const user = require('../models/user')

const controller = {
  /**
   * Verifies authentication information in event.body and either responds
   * with 403 error on failure or 200 with JWT body
   * @param {Object} event The request event object
   * @returns {Object.<promise>}
   */
  authenticate: (event) => {
    const salt = new Buffer(process.env.AUTH_PASSWORD_SALT)
    return mongodb.read(user.collection, { email: event.body.email })
      .then((res) => {
        // Check user exists
        if (res.length === 0) {
          return new HTTPError(403, 'Invalid email address')
        }
        // Check valid password
        if (argon2.hash(event.body.password, salt) !== res[0].password) {
          return new HTTPError(403, 'Invalid password')
        }
        // Everything checks out, return JWT
        return jwt.encode(res[0], process.env.AUTH_JWT_SECRET)
      })
  }
}

module.exports = controller
