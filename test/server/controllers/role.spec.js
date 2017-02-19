const role = require('server/controllers/role')
const fixture = require('test/fixtures/server/controllers/role')

describe('server > controllers > role', () => {
  let testRole
  describe('getRole', () => {
    testRole = Object.assign({}, fixture)
    let testId
    before(() => {
      return role.createRole({ body: testRole })
        .then((res) => {
          testId = res._id
        })
    })
    after(() => {
      return role.deleteRole({ params: { id: testId } })
    })
    it('resolves with all role records from the database', () => {
      return role.getRole({ params: { id: null } })
        .then((res) => {
          expect(res[0]).to.have.any.keys('name', 'permissions')
        })
    })
    it('resolves with the record specified by id', () => {
      return role.getRole({ params: { id: testId } })
        .then((res) => {
          expect(res[0]).to.have.any.keys('name', 'permissions')
          expect(res[0]._id.toString()).to.equal(testId.toString())
        })
    })
  })
  describe('createRole', () => {
    const testRole = Object.assign({}, fixture)
    let testId
    after(() => {
      return role.deleteRole({ params: { id: testId } })
    })
    it('creates a new record in the role collection', () => {
      return role.createRole({ body: testRole })
        .then((res) => {
          expect(res).to.have.any.keys('name', 'permissions')
          testId = res._id
        })
    })
  })
  describe('updateRole', () => {
    testRole = Object.assign({}, fixture)
    let testId
    before(() => {
      return role.createRole({ body: testRole })
        .then((res) => {
          testId = res._id
        })
    })
    after(() => {
      return role.deleteRole({ params: { id: testId } })
    })
    it('updates an existing record in the role collection', () => {
      testRole.name = 'testRole1'
      return role.updateRole({ params: { id: testId }, body: testRole, method: 'put' })
        .then(() => {
          return role.getRole({ params: { id: testId } })
            .then((res) => {
              expect(res[0].name).to.equal('testRole1')
              expect(res[0].permissions).to.deep.equal([ 'readFoo', 'writeFoo' ])
            })
        })
    })
    it('updates an existing record in the role collection with partial data', () => {
      return role.updateRole({ params: { id: testId }, body: { name: 'testRole2' }, method: 'patch' })
        .then(() => {
          return role.getRole({ params: { id: testId } })
            .then((res) => {
              expect(res[0].name).to.equal('testRole2')
              expect(res[0].permissions).to.deep.equal([ 'readFoo', 'writeFoo' ])
            })
        })
    })
  })
  describe('deleteRole', () => {
    testRole = Object.assign({}, fixture)
    let testId
    before(() => {
      return role.createRole({ body: testRole })
        .then((res) => {
          testId = res._id
        })
    })
    it('deletes an existing record in the role collection', () => {
      return role.deleteRole({ params: { id: testId } })
        .then((res) => {
          expect(res.ok).to.equal(1)
        })
    })
  })
})
