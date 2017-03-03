const path = require('path')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const sinon = require('sinon')
const schai = require('sinon-chai')
const dchai = require('dirty-chai')
const mod = require('module')
const proxyquire = require('proxyquire')

// Set globals
global.sinon = sinon
global.expect = chai.expect
global.should = chai.should
global.proxyquire = proxyquire
global.location = { href: null }

global['sessionStorage'] = {
  getItem: () => true
}

// Set chai props
chai.use(chaiAsPromised)
chai.use(schai)
chai.use(dchai)

// Allows pathing from root
process.env.NODE_PATH = path.join(__dirname, '..') + path.delimiter + (process.env.NODE_PATH || '')
mod._initPaths()
