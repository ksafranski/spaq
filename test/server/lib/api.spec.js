const api = proxyquire('server/lib/api', {
  'require-dir': () => {
    return {
      foo: {
        get: () => Promise.resolve({ foo: 'bar' })
      },
      fizz: {
        get: () => Promise.reject(new Error('buzz'))
      }
    }
  }
})

describe('server > lib > api', () => {
  it('calls next and returns with an error 404 if controller does not exist', () => {
    api({ params: { controller: 'nope' } }, {}, (err) => {
      expect(err.statusCode).to.equal(404)
    })
  })
  it('calls next and returns data in res object when controller executes and resolves', () => {
    const res = {}
    api({ params: { controller: 'foo' }, method: 'GET' }, res, (err) => {
      expect(err).to.be.undefined
      expect(res.data).to.deep.equal({ foo: 'bar' })
    })
  })
  it('calls next and returns an error when controller executes and rejects', () => {
    api({ params: { controller: 'fizz' }, method: 'GET' }, {}, (err) => {
      expect(err.message).to.equal('buzz')
    })
  })
})
