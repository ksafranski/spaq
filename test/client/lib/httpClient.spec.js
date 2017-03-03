/* global location */
import express from 'express'
import axios from 'axios'
import nock from 'nock'
import request from 'client/lib/httpClient'

describe('client > lib > httpClient', () => {
  before(() => {
    // Setup nocks
    nock('http://localhost').get('/api/testSuccess').reply(200, { foo: 'bar' })
    nock('http://localhost').get('/api/testFail').reply(400, 'Invalid data')
    nock('http://localhost').get('/api/testFail403').reply(403, 'Invalid email address')
    nock('http://localhost').get('/api/testFail403Redir').reply(403, 'Invalid Token')
  })
  it('resolves with response on successful request', () => {
    return request('/testSuccess', 'get')
      .then((res) => {
        expect(res).to.deep.equal({ foo: 'bar' })
      })
  })
  it('rejects with an error when cannot connect', () => {
    return request('/nope', 'get')
      .catch((err) => {
        expect(err.message).to.equal('Could not connect to host')
      })
  })
  it('rejects an error and returns message', () => {
    return request('/testFail', 'get')
      .catch((err) => {
        expect(err.status).to.equal(400)
        expect(err.message).to.equal('Invalid data')
      })
  })
  describe('authorization errors', () => {
    it('rejects an authorization failure and returns error', () => {
      return request('/testFail403', 'get')
        .catch((err) => {
          expect(err.status).to.equal(403)
          expect(err.message).to.equal('Invalid email address')
        })
    })
    it('rejects an authorization failure and redirects if matches auth failure array', () => {
      return request('/testFail403Redir', 'get')
        .catch((err) => {
          expect(location.href).to.equal('/login')
        })
    })
  })
})