const { ObjectID } = require('mongodb')
const mongodb = require('server/adapters/mongodb')

describe('server > adapters > mongodb', () => {
  let testId
  beforeEach(() => mongodb.create('test', { foo: 'bar' }).then((res) => {
    testId = res._id
  }))
  afterEach(() => mongodb.delete('test', { _id: testId }))
  describe('parseIds', () => {
    it('parses _id properties in queries and applies ObjectId', () => {
      const actual = mongodb.parseIds({ _id: '551137c2f9e1fac808a5f572', foo: 'bar' })
      expect(actual).to.deep.equal({ _id: ObjectID('551137c2f9e1fac808a5f572'), foo: 'bar' })
    })
  })
  describe('create', () => {
    it('creates a new record in the collection and returns the data', () => {
      return mongodb.create('test', { foo: 'bar' })
        .then((result) => {
          expect(result.foo).to.equal('bar')
        })
    })
  })
  describe('read', () => {
    it('finds record(s) based on query and returns array', () => {
      return mongodb.read('test', { _id: testId })
        .then((res) => {
          expect(res[0]).to.deep.equal({ _id: testId, foo: 'bar' })
        })
    })
  })
  describe('update', () => {
    it('updates record(s) based on query and resolves', () => {
      return mongodb.update('test', { _id: testId }, { foo: 'bar' })
        .then((res) => {
          expect(res.ok).to.equal(1)
        })
    })
  })
  describe('delete', () => {
    it('deletes record(s) based on query and resolves', () => {
      return mongodb.delete('test', { _id: testId })
        .then((res) => {
          expect(res.ok).to.equal(1)
        })
    })
  })
})
