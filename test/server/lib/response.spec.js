const response = require('server/lib/response')
const log = require('server/lib/log')
const HTTPError = require('http-errors')
const obey = require('obey')

const reqFixture = {
  originalUrl: 'foo',
  method: 'get',
  clientIP: '1.1.1.1',
  sessionId: '1111-2222-3333'
}

describe('server > lib > response', () => {
  let logInfoStub
  let logErrorStub
  let resFixture
  let resSendStub
  beforeEach(() => {
    logInfoStub = sinon.stub(log, 'info')
    logErrorStub = sinon.stub(log, 'error')
    resSendStub = sinon.stub()
    resFixture = {
      data: { foo: 'bar' },
      status: function (code) {
        this.send = resSendStub
        return this
      }
    }
  })
  afterEach(() => {
    logInfoStub.restore()
    logErrorStub.restore()
  })
  describe('success', () => {
    it('logs response data and sends response back through express', () => {
      const resStatusSpy = sinon.spy(resFixture, 'status')
      response.success(reqFixture, resFixture, sinon.stub())
      expect(resStatusSpy).to.be.calledWith(200)
      expect(resSendStub).to.be.calledWith(resFixture.data)
      expect(logInfoStub).to.be.calledWith('Success Response', {
        route: reqFixture.originalUrl,
        method: reqFixture.method.toUpperCase(),
        sessionId: reqFixture.sessionId,
        ip: reqFixture.clientIP
      })
    })
  })
  describe('error', () => {
    it('logs http error and sends response back through express', () => {
      const resStatusSpy = sinon.spy(resFixture, 'status')
      response.error(new HTTPError(404), reqFixture, resFixture, sinon.stub())
      expect(resStatusSpy).to.be.calledWith(404)
      expect(resSendStub).to.be.calledWith('Not Found')
      expect(logErrorStub).to.be.calledWith('Error Response', {
        route: reqFixture.originalUrl,
        method: reqFixture.method.toUpperCase(),
        sessionId: reqFixture.sessionId,
        ip: reqFixture.clientIP,
        code: 404,
        error: 'Not Found'
      })
    })
    it('logs data validation error and sends response back through express', () => {
      const resStatusSpy = sinon.spy(resFixture, 'status')
      response.error(new obey.ValidationError([{ key: 'foo', value: 'bar', message: 'Must be foo' }]), reqFixture, resFixture, sinon.stub())
      expect(resStatusSpy).to.be.calledWith(400)
      expect(resSendStub).to.be.calledWith({
        message: 'foo (bar): Must be foo',
        collection: [{ key: 'foo', message: 'Must be foo', value: 'bar' }]
      })
      expect(logErrorStub).to.be.calledWith('Error Response', {
        route: reqFixture.originalUrl,
        method: reqFixture.method.toUpperCase(),
        sessionId: reqFixture.sessionId,
        ip: reqFixture.clientIP,
        code: 400,
        error: 'foo (bar): Must be foo'
      })
    })
    it('logs non-http error and sends response back through express', () => {
      const resStatusSpy = sinon.spy(resFixture, 'status')
      response.error(new Error(), reqFixture, resFixture, sinon.stub())
      expect(resStatusSpy).to.be.calledWith(500)
      expect(resSendStub).to.be.calledWith('Internal Server Error')
      expect(logErrorStub).to.be.calledWith('Error Response', {
        route: reqFixture.originalUrl,
        method: reqFixture.method.toUpperCase(),
        sessionId: reqFixture.sessionId,
        ip: reqFixture.clientIP,
        code: 500,
        error: 'Internal Server Error'
      })
    })
  })
})
