const mongodb = require('server/adapters/mongodb')

describe('server > adapters > mongodb', () => {
  describe('create', () => {
    it('creates a new record in the collection and returns the data', () => {
      return mongodb.create('test', { foo: 'bar' })
        .then((result) => {
          expect(result.foo).to.equal('bar')
        })
    })
  })
  describe('read', () => {
    before(() => mongodb.create('test', { _id: '12345' }))
    after(() => mongodb.delete('test', { _id: '12345' }))
    it('finds record(s) based on query and returns array', () => {
      return mongodb.read('test', { _id: '12345' })
        .then((res) => {
          expect(res[0]).to.deep.equal({ _id: '12345' })
        })
    })
  })
  describe('update', () => {
    before(() => mongodb.create('test', { _id: '23456' }))
    after(() => mongodb.delete('test', { _id: '23456' }))
    it('updates record(s) based on query and resolves', () => {
      return mongodb.update('test', { _id: '23456' }, { foo: 'bar' })
        .then((res) => {
          expect(res.ok).to.equal(1)
        })
    })
  })
  describe('delete', () => {
    before(() => mongodb.create('test', { _id: '34567' }))
    after(() => mongodb.delete('test', { _id: '34567' }))
    it('deletes record(s) based on query and resolves', () => {
      return mongodb.delete({ _id: '34567' })
        .then((res) => {
          expect(res.ok).to.equal(1)
        })
    })
  })
})
