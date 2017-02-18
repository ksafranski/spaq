const HTTPError = require('http-errors')
const fixture = require('test/fixtures/server/api.json')
const api = proxyquire('server/lib/api', {
  'require-dir': () => {
    return {
      test: require('test/fixtures/lib/api').controller.test
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
  describe('buildEndpointExec', () => {
    it('calls next with 404 error if controller does not exist', () => {
      const inst = api.buildEndpointExec({ controller: 'foo', exec: 'getFoo' })
      const next = sinon.stub()
      inst({}, {}, next)
      expect(next).to.be.calledWith(new HTTPError(404))
    })
    it('executes controller and resolves, setting res.data with response', () => {
      const inst = api.buildEndpointExec({ controller: 'test', exec: 'getFoo' })
      const res = {}
      inst({}, res, () => {
        expect(res.data).to.deep.equal({ name: 'foo' })
      })
    })
    it('executs controller and rejects, calling next with error', () => {
      const inst = api.buildEndpointExec({ controller: 'test', exec: 'deleteFoo' })
      const res = {}
      inst({}, res, (err) => {
        expect(err.message).to.equal('fail')
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
