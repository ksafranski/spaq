const _ = require('redash')
const { MongoClient, ObjectID } = require('mongodb')

// Establish connection
let conn
const getConnection = () => {
  conn = conn || MongoClient.connect(process.env.MONGODB_CONN)
  return conn
}

const mongodb = {
  /**
   * Parses any _id properties in queries to BSON ObjectId's
   * @param {Object} query The query to evaluate
   * @returns {Object}
   */
  parseIds: (query) => _.pipe([
    _.toPairs,
    _.map(x => x[0] === '_id' ? [ x[0], ObjectID(x[1]) ] : x),
    _.fromPairs
  ])(query),
  /**
   * Creates new item in collection
   * @param {String} collection Name of the collection
   * @param {Object} data The data to insert
   * @returns {Object.<promise>}
   */
  create: (collection, data) => getConnection().then((db) => {
    return db.collection(collection).insert(data)
      .then((res) => res.ops[0])
  }),
  /**
   * Reads item(s) from collection
   * @param {String} collection Name of the collection
   * @param {Object} [query] Query to execute
   */
  read: (collection, query = {}) => getConnection().then((db) => {
    let cursor = db.collection(collection).find(mongodb.parseIds(query))
    return cursor.toArray()
  }),
  /**
   * Updates item in collection
   * @param {String} collection Name of the collection
   * @param {Object} query Query to idenify update record(s)
   * @param {Object} data The data to update
   * @returns {Object.<promise>}
   */
  update: (collection, query, data) => getConnection().then((db) => {
    return db.collection(collection).update(mongodb.parseIds(query), { $set: data }, { multi: true })
      .then((res) => res.result)
  }),
  /**
   * Deletes item in collection
   * @param {String} collection Name of the collection
   */
  delete: (collection, query = { _id: null }) => getConnection().then((db) => {
    return db.collection(collection).remove(mongodb.parseIds(query))
      .then((res) => res.result)
  })
}

module.exports = mongodb
