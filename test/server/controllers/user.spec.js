const user = require('server/controllers/user')
const fixture = require('test/fixtures/server/controllers/user')

describe('server > controllers > user', () => {
  let testUser
  describe('getUser', () => {
    testUser = Object.assign({}, fixture)
    let testId
    before(() => {
      return user.createUser({ body: testUser })
        .then((res) => {
          testId = res._id
        })
    })
    after(() => {
      return user.deleteUser({ params: { id: testId } })
    })
    it('resolves with all user records from the database', () => {
      return user.getUser({ params: { id: null } })
        .then((res) => {
          expect(res[0]).to.have.any.keys('fname', 'lname', 'email', 'password')
        })
    })
    it('resolves with the record specified by id', () => {
      return user.getUser({ params: { id: testId } })
        .then((res) => {
          expect(res[0]).to.have.any.keys('fname', 'lname', 'email', 'password')
          expect(res[0]._id.toString()).to.equal(testId.toString())
        })
    })
  })
  describe('createUser', () => {
    const testUser = Object.assign({}, fixture)
    let testId
    after(() => {
      return user.deleteUser({ params: { id: testId } })
    })
    it('creates a new record in the user collection', () => {
      return user.createUser({ body: testUser })
        .then((res) => {
          expect(res).to.have.any.keys('fname', 'lname', 'email', 'password')
          testId = res._id
        })
    })
  })
  describe('updateUser', () => {
    testUser = Object.assign({}, fixture)
    let testId
    before(() => {
      return user.createUser({ body: testUser })
        .then((res) => {
          testId = res._id
        })
    })
    after(() => {
      return user.deleteUser({ params: { id: testId } })
    })
    it('updates an existing record in the user collection', () => {
      testUser.fname = 'Frank'
      return user.updateUser({ params: { id: testId }, body: testUser, method: 'put' })
        .then(() => {
          return user.getUser({ params: { id: testId } })
            .then((res) => {
              expect(res[0].fname).to.equal('Frank')
              expect(res[0].lname).to.equal('Doe')
            })
        })
    })
    it('updates an existing record in the user collection with partial data', () => {
      return user.updateUser({ params: { id: testId }, body: { fname: 'Bob' }, method: 'patch' })
        .then(() => {
          return user.getUser({ params: { id: testId } })
            .then((res) => {
              expect(res[0].fname).to.equal('Bob')
              expect(res[0].lname).to.equal('Doe')
            })
        })
    })
  })
  describe('deleteUser', () => {
    testUser = Object.assign({}, fixture)
    let testId
    before(() => {
      return user.createUser({ body: testUser })
        .then((res) => {
          testId = res._id
        })
    })
    it('deletes an existing record in the user collection', () => {
      return user.deleteUser({ params: { id: testId } })
        .then((res) => {
          expect(res.ok).to.equal(1)
        })
    })
  })
})
