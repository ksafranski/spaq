const obey = require('obey')
const uuid = require('uuid')

// Set up Obey customizations
obey.creator('uuid', uuid.v4)
obey.creator('timestamp', () => Date.now())
obey.modifier('timestamp', () => Date.now())

module.exports = obey
