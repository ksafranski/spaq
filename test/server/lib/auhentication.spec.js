const jwt = require('jwt-simple')
const authentication = require('server/lib/authentication')

describe('server > lib > authentication', () => {
  const jwtTest = jwt.encode({ permissions: [ 'foo' ] }, process.env.AUTH_JWT_SECRET)
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
  it('responds with a 403 error if there is an error processing JWT', () => {
    sinon.stub(jwt, 'decode', () => new Error())
    const inst = authentication('foo')
    inst({ headers: { authorization: jwtTest } }, {}, (err) => {
      expect(err.message).to.equal('Unauthorized')
    })
    jwt.decode.restore()
  })
})
