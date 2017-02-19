const role = require('../models/role')
const mongodb = require('../adapters/mongodb')

const controller = {
  /**
   * Retreives role record(s) by id or returns all
   * @param {Object} event The controller event
   * @returns {Object.<promise>}
   */
  getRole: (event) => Promise.resolve().then(() => {
    const query = event.params.id ? { _id: event.params.id } : {}
    return mongodb.read(role.collection, query)
  }),
  /**
   * Creates a role with the data in the event body
   * @param {Object} event The controller event
   * @returns {Object.<promise>}
   */
  createRole: (event) => role.model.validate(event.body)
    .then((data) => mongodb.create(role.collection, data)),
  /**
   * Updates a role with the data in the event body
   * @param {Object} event The controller event
   * @returns {Object.<promise>}
   */
  updateRole: (event) => {
    const partial = (event.method.toLowerCase() === 'patch')
    return role.model.validate(event.body, { partial })
      .then((data) => mongodb.update(role.collection, { _id: event.params.id }, data))
  },
  /**
   * Deletes a record from the role collection
   * @param {Object} event The controller event
   * @returns {Object.<promise>}
   */
  deleteRole: (event) => mongodb.delete(role.collection, { _id: event.params.id })
}

module.exports = controller
