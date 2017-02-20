# SPAQ Server

## Summary

The SPAQ server performs two primary functions:

1. Hosting the static assets for the [`client application`](../client)
2. Serving the API and all functionality

## API

The API is dynamically generated via the [`api.json`](./api.json) configuration file. This file defines the routes to build, their associated controller, supported methods and permissions. The structure of this file is as follows:

```javascript
{
  // The route (i.e. /api/foo) and name of the controller
  "foo": {
    // At the root of this specific route...
    "/": {
      // For the GET method...
      "get": {
        // Execute the following method in the controller...
        "exec": "getFoo",
        // If the user has the following permission...
        "permission": "readFoo"
      }
      // ...
    }
    // ...
  }
  // ...
}
```

Additionally, nodes on the configuration can be configured to:

* Pass parameters at the route level, i.e. `/:id`
* Bypass authentication for publicly consumable routes by replacing `"permission": "readFoo"` with `"public": true`

When the server is started the configuration is parsed and Express routes are added dynamically based on the above configuration.

## Models

Data modelling is done with the [Obey](https://github.com/TechnologyAdvice/obey) library. When models are validated they return a Promise which makes them easy to integrate with the [controllers](#controllers).

The [`lib/models.js`](/server/lib/models.js) file is used to import Obey and set any global configurations.

## Adapters

By default, SPAQ uses MongoDB. Additional adapters can be added in the [`/server/adapters`](/server/adapters) directory.

## Controllers

Controllers export an object which conains any methods referenced in the `api.json` configuration. Controller methods must return a Promise that resolves with any data to be sent in the response, or rejects with an error; for example:

```javascript
const mongodb = require('../adapters/mongodb')
const HTTPError = require('http-errors')

module.exports = {
  getFoo: (event) => mongodb.read({ _id: event.params.id })
    .then((result) => {
      // ...perform any actions on data here...
      return result
    })
    .catch((err) => {
      // if you wish to return a specific error
      return new HTTPError(500, { message: err.message })
    })
}
```

Controller methods are called with a single argument, `event <Object>`. This object contains the Express request object, including properties such as `params`, `method`, `query`, etc.

## Authentication

The server is designed to perform authentication and authorization using [JSON Web Tokens (JWT)](https://jwt.io/).

The following controllers are setup to handle management of this process:

* [`users`](/server/controllers/users.js): CRUD ops for user accounts
* [`roles`](/server/controllers/roles.js): CRUD ops for user roles
* [`authenticate`](/server/controllers/authenticate.js): Process authentication and return JWT

### Users

The [user model](/server/models/user.js) defines the following properties which must be in place to properly handle authentication and authorization:

* `email <string>`: User email address
* `password <string>`: User password (encrypted via Argon2)
* `roles <array>`: Array of roles the user has been assigned

### Roles

The [role model](/server/models/role.js) defines the following properties which must be in place to properly handle authentication and authorization:

* `name <string>`: The role name
* `permissions <array>`: Names of permissions (should match `api.json` configuration)

### Process Definition

The entire process of authentication involves:

1. A user authenticates (successfully) and is granted a JWT. This JWT contains `permissions` which is a mapping of all permissions from any roles the user is assigned.
2. When an attempt is made to hit an endpoint on the API, the [`lib/authentication`](/server/lib/authentication.js) processes the request:
  2a. The JWT is validated and decoded
  2b. The token's `permissions` is checked against the route which the user is attempting to access
3. The attempt is either passed to the controller or a `403` error is returned

## Logging

The [lib/log](/server/lib/log.js) file exposes the [Bristol](https://github.com/TomFrost/Bristol) logging library for use universally throughout the application server.

Logging can be achieved by:

```javascript
const log = require('lib/log')

// log.<level>(<message>, <object>)
log.error('Something failed', { foo: 'bar' })
```

By default, logs are sent to `console` with `human` formatting. See the Bristol documentation for additional configuration.