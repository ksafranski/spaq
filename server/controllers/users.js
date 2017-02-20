const user = require('../models/user')
const mongodb = require('../adapters/mongodb')

const controller = {
  /**
   * Retreives user record(s) by id or returns all
   * @param {Object} event The controller event
   * @returns {Object.<promise>}
   */
  getUser: (event) => Promise.resolve().then(() => {
    const query = event.params.id ? { _id: event.params.id } : {}
    return mongodb.read(user.collection, query)
  }),
  /**
   * Creates a user with the data in the event body
   * @param {Object} event The controller event
   * @returns {Object.<promise>}
   */
  createUser: (event) => user.model.validate(event.body)
    .then((data) => mongodb.create(user.collection, data)),
  /**
   * Updates a user with the data in the event body
   * @param {Object} event The controller event
   * @returns {Object.<promise>}
   */
  updateUser: (event) => {
    const partial = (event.method.toLowerCase() === 'patch')
    return user.model.validate(event.body, { partial })
      .then((data) => mongodb.update(user.collection, { _id: event.params.id }, data))
  },
  /**
   * Deletes a record from the user collection
   * @param {Object} event The controller event
   * @returns {Object.<promise>}
   */
  deleteUser: (event) => mongodb.delete(user.collection, { _id: event.params.id })
}

module.exports = controller
