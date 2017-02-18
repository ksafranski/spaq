const fixture = require('test/fixtures/server/api.json')
const api = proxyquire('server/lib/api', {
  'require-dir': () => {
    return {
      user: {
        getUser: () => Promise.resolve({ foo: 'bar' })
      }
    }
  }
})

describe('server > lib > api', () => {
  describe('parseAPI', () => {
    it('traverses raw routes json object and returns array of endpoints', () => {
      expect(api.parseAPI(fixture)[0]).to.deep.equal({
        exec: 'getFoo',
        permission: 'readFoo',
        method: 'get',
        path: '/api/foo/',
        controller: 'foo'
      })
    })
  })
  describe('build', () => {
    const appGetStub = sinon.stub()
    const appPostStub = sinon.stub()
    const appPutStub = sinon.stub()
    const appDeleteStub = sinon.stub()
    const app = {
      get: appGetStub,
      post: appPostStub,
      put: appPutStub,
      delete: appDeleteStub
    }
    afterEach(() => appGetStub.reset())
    it('traverses routes to build app endpoints', () => {
      api.build(app, fixture)
      expect(appGetStub).to.be.calledTwice()
      expect(appPostStub).to.be.calledOnce()
      expect(appPutStub).to.be.calledOnce()
      expect(appDeleteStub).to.be.calledOnce()
    })
  })
})
