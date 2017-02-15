const obey = require('obey')
const uuid = require('uuid')

obey.creator('uuid', uuid.v4)
obey.creator('timestamp', () => Date.now())
obey.modifier('timestamp', () => Date.now())

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
