const Promise = require('bluebird')
const mongodb = require('../server/adapters/mongodb')

models = {
  user: require('../server/models/user'),
  role: require('../server/models/role')
}

// Setup any seed accounts and roles needed for testing
const seedData = {
  'user': [
    {
      fname: 'John',
      lname: 'Doe',
      email: 'jdoe@gmail.com',
      password: 'welcome',
      roles: [ 'admin' ]
    }
  ],
  'role': [
    {
      name: 'admin',
      permissions: [ 'readUser', 'writeUser', 'readRole', 'writeRole' ]
    }
  ]
}

console.log(`Seeding database with ${Object.keys(seedData).map(x => x+'s').join(', ')}`)

// Seed into DB
Promise.map(Object.keys(seedData), (collection) => {
  return Promise.map(seedData[collection], (item) => {
    return models[collection].model.validate(item)
      .then((data) => {
        return mongodb.create(models[collection].collection, data)
      })
  })
})
.then(() => {
  console.log('Complete.')
  process.exit(0)
})
.catch((err) => {
  console.log('Error!', err.message)
  process.exit(1)
})

