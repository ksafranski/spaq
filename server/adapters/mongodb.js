const conn = require('promised-mongo')(process.env.MONGODB_CONN)

const mongodb = {
  /**
   * Creates new item in collection
   * @param {String} collection Name of the collection
   * @param {Object} data The data to insert
   * @returns {Object.<promise>}
   */
  create: (collection, data) => conn[collection].insert(data),
  /**
   * Reads item(s) from collection
   * @param {String} collection Name of the collection
   * @param {Object} [query] Query to execute
   */
  read: (collection, query = {}) => Promise.resolve().then(() => {
    let cursor = conn[collection].find(query)
    return cursor.toArray()
  }),
  /**
   * Updates item in collection
   * @param {String} collection Name of the collection
   * @param {Object} query Query to idenify update record(s)
   * @param {Object} data The data to update
   * @returns {Object.<promise>}
   */
  update: (collection, query, data) => conn[collection].update(query, { $set: data }, { multi: true }),
  /**
   * Deletes item in collection
   * @param {String} collection Name of the collection
   */
  delete: (collection, query = { id: null }) => conn[collection].remove(query)
}

module.exports = mongodb
