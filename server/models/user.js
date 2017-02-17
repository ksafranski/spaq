const obey = require('../lib/models')

const user = obey.model({
  id: { type: 'uuid', creator: 'uuid' },
  fname: { type: 'string', required: true },
  lname: { type: 'string', required: true },
  email: { type: 'email', required: true },
  password: { type: 'string', required: true },
  created: { type: 'string', creator: 'timestamp' },
  modified: { type: 'string', modifier: 'timestamp' }
})

module.exports = user
