const jwt = require('jwt-simple')
const authentication = require('server/lib/authentication')
const pkg = require('package.json')

describe('server > lib > authentication', () => {
  const jwtTest = jwt.encode({
    iss: pkg.name,
    exp: Date.now() + process.env.AUTH_JWT_EXPIRES,
    context: {
      permissions: [ 'foo' ]
    }
  }, process.env.AUTH_JWT_SECRET)
  it('responds with a 403 error if no authorization header', () => {
    const inst = authentication('foo')
    inst({ headers: {} }, {}, (err) => {
      expect(err.message).to.equal('Not Authenticated')
    })
  })
  it('responds with a 403 error if JWT does not contain permission requested', () => {
    const inst = authentication('bar')
    inst({ headers: { authorization: jwtTest } }, {}, (err) => {
      expect(err.message).to.equal('Unauthorized')
    })
  })
  it('calls next and returns if JWT is authorized', () => {
    const inst = authentication('foo')
    inst({ headers: { authorization: jwtTest } }, {}, (err) => {
      expect(err).to.be.undefined
    })
  })
  it('response with a 403 error if JWT issuer is incorrect', () => {
    const inst = authentication('foo')
    const jwtTestIssuer = jwt.encode({
      iss: 'nope',
      exp: Date.now() + process.env.AUTH_JWT_EXPIRES,
      context: {
        permissions: [ 'foo' ]
      }
    }, process.env.AUTH_JWT_SECRET)
    inst({ headers: { authorization: jwtTestIssuer } }, {}, (err) => {
      expect(err.message).to.equal('Invalid Token')
    })
  })
  it('response with a 403 error if JWT is expired', () => {
    const inst = authentication('foo')
    const jwtTestExpired = jwt.encode({
      iss: pkg.name,
      exp: Date.now() - 500,
      context: {
        permissions: [ 'foo' ]
      }
    }, process.env.AUTH_JWT_SECRET)
    inst({ headers: { authorization: jwtTestExpired } }, {}, (err) => {
      expect(err.message).to.equal('Token Expired')
    })
  })
  it('responds with a 403 error if there is an error processing JWT', () => {
    sinon.stub(jwt, 'decode', () => new Error())
    const inst = authentication('foo')
    inst({ headers: { authorization: jwtTest } }, {}, (err) => {
      expect(err.message).to.equal('Unauthorized')
    })
    jwt.decode.restore()
  })
})
