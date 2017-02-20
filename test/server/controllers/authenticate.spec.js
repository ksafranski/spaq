const authenticate = require('server/controllers/authenticate')
const mongodb = require('server/adapters/mongodb')
const jwt = require('jwt-simple')
const argon2 = require('argon2')

describe('server > controllers > authenticate', () => {
  let testPassword
  before(() => {
    const salt = new Buffer(process.env.AUTH_PASSWORD_SALT)
    return argon2.hash('welcome', salt)
      .then((hashed) => {
        testPassword = hashed
      })
  })
  describe('getPermissions', () => {
    before(() => {
      sinon.stub(mongodb, 'read', (coll, roleObj) => Promise.resolve().then(() => {
        return [{ permissions: [ `read${roleObj.name}`, `write${roleObj.name}` ] }]
      }))
    })
    after(() => {
      mongodb.read.restore()
    })
    it('retreives roles and returns concatted array of permissions', () => {
      return authenticate.getPermissions([ 'foo', 'bar' ])
        .then((result) => {
          expect(result).to.deep.equal([ 'readfoo', 'writefoo', 'readbar', 'writebar' ])
        })
    })
  })
  describe('authenticate', () => {
    afterEach(() => {
      if (mongodb.read.restore) mongodb.read.restore()
      if (authenticate.getPermissions.restore) authenticate.getPermissions.restore()
    })
    it('returns 403 when invalid email address is provided', () => {
      sinon.stub(mongodb, 'read', Promise.resolve([]))
      authenticate.authenticate({ body: { email: 'jdoe@gmail.com', password: 'welcome' } })
        .catch((err) => {
          expect(err.message).to.equal('Invalid email address')
        })
    })
    it('returns 403 when invalid password is provided', () => {
      sinon.stub(mongodb, 'read', () => Promise.resolve([ { password: 'nope' } ]))
      authenticate.authenticate({ body: { email: 'jdoe@gmail.com', password: 'welcome' } })
        .catch((err) => {
          expect(err.message).to.equal('Invalid password')
        })
    })
    it('retreives permissions and returns JWT when authentication is successful', () => {
      sinon.stub(authenticate, 'getPermissions', () => Promise.resolve([ 'readFoo', 'readBar' ]))
      sinon.stub(mongodb, 'read', () => {
        return Promise.resolve([ {
          email: 'test@test.com',
          password: testPassword,
          roles: [ 'foo', 'bar' ]
        } ])
      })
      return authenticate.authenticate({ body: { email: 'test@test.com', password: 'welcome' } })
        .then((token) => {
          const decodedToken = jwt.decode(token, process.env.AUTH_JWT_SECRET)
          expect(decodedToken.context.permissions).to.deep.equal([ 'readFoo', 'readBar' ])
        })
    })
  })
})
