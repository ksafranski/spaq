const obey = require('../lib/models')

const model = obey.model({
  fname: { type: 'string', required: true },
  lname: { type: 'string', required: true },
  email: { type: 'email', required: true },
  password: { type: 'string', required: true },
  created: { type: 'string', creator: 'timestamp' }, // automatically generated by `creator`
  modified: { type: 'string', modifier: 'timestamp' } // automatically updated by `modifier`
})

module.exports = {
  collection: 'users',
  model
}
