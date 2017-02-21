const pmongo = require('promised-mongo')
const conn = pmongo(process.env.MONGODB_CONN)
const _ = require('redash')

const mongodb = {
  /**
   * Parses any _id properties in queries to BSON ObjectId's
   * @param {Object} query The query to evaluate
   * @returns {Object}
   */
  parseIds: (query) => _.pipe([
    _.toPairs,
    _.map((x) => {
      return x[0] === '_id' ? x[1] = [ x[0], pmongo.ObjectId(x[1]) ] : x
    }),
    _.fromPairs
  ])(query),
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
    let cursor = conn[collection].find(mongodb.parseIds(query))
    return cursor.toArray()
  }),
  /**
   * Updates item in collection
   * @param {String} collection Name of the collection
   * @param {Object} query Query to idenify update record(s)
   * @param {Object} data The data to update
   * @returns {Object.<promise>}
   */
  update: (collection, query, data) => conn[collection].update(mongodb.parseIds(query), { $set: data }, { multi: true }),
  /**
   * Deletes item in collection
   * @param {String} collection Name of the collection
   */
  delete: (collection, query = { _id: null }) => conn[collection].remove(mongodb.parseIds(query))
}

module.exports = mongodb
