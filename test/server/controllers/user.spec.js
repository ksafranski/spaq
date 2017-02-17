const user = require('server/controllers/user')
const fixture = require('test/fixtures/server/controllers/user')

describe('server > controllers > user', () => {
  let testUser
  describe('get', () => {
    testUser = Object.assign({}, fixture)
    let testId
    before(() => {
      return user.post({ body: testUser })
        .then((res) => {
          testId = res._id
        })
    })
    after(() => {
      return user.delete({ params: { id: testId } })
    })
    it('resolves with all user records from the database', () => {
      return user.get({ params: { id: null } })
        .then((res) => {
          expect(res[0]).to.have.any.keys('fname', 'lname', 'email', 'password')
        })
    })
    it('resolves with the record specified by id', () => {
      return user.get({ params: { id: testId } })
        .then((res) => {
          expect(res[0]).to.have.any.keys('fname', 'lname', 'email', 'password')
          expect(res[0]._id.toString()).to.equal(testId.toString())
        })
    })
  })
  describe('post', () => {
    const testUser = Object.assign({}, fixture)
    let testId
    after(() => {
      return user.delete({ params: { id: testId } })
    })
    it('creates a new record in the user collection', () => {
      return user.post({ body: testUser })
        .then((res) => {
          expect(res).to.have.any.keys('fname', 'lname', 'email', 'password')
          testId = res._id
        })
    })
  })
  describe('put', () => {
    testUser = Object.assign({}, fixture)
    let testId
    before(() => {
      return user.post({ body: testUser })
        .then((res) => {
          testId = res._id
        })
    })
    after(() => {
      return user.delete({ params: { id: testId } })
    })
    it('updates an existing record in the user collection', () => {
      testUser.fname = 'Frank'
      return user.put({ params: { id: testId }, body: testUser })
        .then(() => {
          return user.get({ params: { id: testId } })
            .then((res) => {
              expect(res[0].fname).to.equal('Frank')
              expect(res[0].lname).to.equal('Doe')
            })
        })
    })
  })
  describe('patch', () => {
    testUser = Object.assign({}, fixture)
    let testId
    before(() => {
      return user.post({ body: testUser })
        .then((res) => {
          testId = res._id
        })
    })
    after(() => {
      return user.delete({ params: { id: testId } })
    })
    it('updates an existing record in the user collection with partial data', () => {
      return user.patch({ params: { id: testId }, body: { fname: 'Frank' } })
        .then(() => {
          return user.get({ params: { id: testId } })
            .then((res) => {
              expect(res[0].fname).to.equal('Frank')
              expect(res[0].lname).to.equal('Doe')
            })
        })
    })
  })
  describe('delete', () => {
    testUser = Object.assign({}, fixture)
    let testId
    before(() => {
      return user.post({ body: testUser })
        .then((res) => {
          testId = res._id
        })
    })
    it('deletes an existing record in the user collection', () => {
      return user.delete({ params: { id: testId } })
        .then((res) => {
          expect(res.ok).to.equal(1)
        })
    })
  })
})
