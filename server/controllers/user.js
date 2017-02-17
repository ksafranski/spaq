const user = require('../models/user')
const mongodb = require('../adapters/mongodb')

const controller = {
  /**
   * Retreives user record(s) by id or returns all
   * @param {Object} event The controller event
   * @returns {Object.<promise>}
   */
  get: (event) => Promise.resolve().then(() => {
    const query = event.params.id ? { _id: event.params.id } : {}
    return mongodb.read(user.collection, query)
  }),
  /**
   * Creates a user with the data in the event body
   * @param {Object} event The controller event
   * @returns {Object.<promise>}
   */
  post: (event) => user.model.validate(event.body)
    .then((data) => mongodb.create(user.collection, data)),
  /**
   * Updates a user with the data in the event body
   * @param {Object} event The controller event
   * @returns {Object.<promise>}
   */
  put: (event) => user.model.validate(event.body)
    .then((data) => mongodb.update(user.collection, { _id: event.params.id }, data)),
  /**
   * Updates specific user data with the data in the event body
   * @param {Object} event The controller event
   * @returns {Object.<promise>}
   */
  patch: (event) => user.model.validate(event.body, { partial: true })
    .then((data) => mongodb.update(user.collection, { _id: event.params.id }, data)),
  /**
   * Deletes a record from the user collection
   * @param {Object} event The controller event
   * @returns {Object.<promise>}
   */
  delete: (event) => mongodb.delete(user.collection, { _id: event.params.id })
}

module.exports = controller
