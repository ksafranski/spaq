# SPAQ
**Single Page App, Quick!**

## Summary:

A server and client setup to allow for rapid prototyping SPA's. The goal of this project is to make few assumptions and setup everything needed to start development imediately.

**[Server](/server/README.md)** Express-based server that serves both the static assets (`/client`) and an API. ([Documentation](/server/README.md))

**[Client](/client/README.md)** React SPA with basic starting components, SystemJS and Bootstrap. ([Documentation](/client/README.md))

## Quick Start

The goal of this project being rapid prototyping and development, the project uses Docker (with [Devlab](https://github.com/TechnologyAdvice/DevLab)) to allow both the application and its database to be run with very little configuration.

**After installing [Docker](https://docs.docker.com/engine/installation/) and [Devlab](https://github.com/TechnologyAdvice/DevLab)**, the application can be run with the following command:

```
devlab install start:dev
```

_Note: after the first run, the `install` command is not needed as all dependencies will be installed_

## Configuration

The default configuration in [`devlab.yml`](devlab.yml) includes the following:

### Ports

The only exposed port is (by default) `9999`. This is exposed on the primary docker container so the application can be accessed at `http://localhost:9999`.

### Authentication

The following environment variables are used by the server for authentication purposes:

* `AUTH_PASSWORD_SALT`: Unique salt with which the password for users is hashed using argon2
* `AUTH_JWT_SECRET`: Secret used when encoding the JSON Web Tokens
* `AUTH_JWT_EXPIRES`: Expiration time for JSON Web Tokens (default `86400000` or 24 hours)

### API

Configuration guide for the API (and setting up additional routes, models and controllers) can be found in the [Server Documentation](/server/README.md)

## Commands

The following commands are available for working with the application.

`devlab <COMMAND>`:

  * `env`: show all environment variables
  * `shell`: starts container(s) with interactive shell
  * `build`: builds `client/dist.js` for production runs
  * `clean`: removes dependencies, data, and generated coverage files
  * `clean:node_modules` removes `/node_modules`
  * `clean:jspm_packages`: removes `/client/jspm_packages`
  * `clean:coverage`: removes `/coverage`
  * `clean:data`: removes `/data` (MongoDB data volume)
  * `install`: installs all project dependencies
  * `lint`: runs full lint task
  * `lint:client`: runs lint task on client files only
  * `lint:server`: runs lint task on server files only
  * `test`: runs linting and full tests (with coverage)
  * `test:watch`: runs test suite with reload on change
  * `seed`: runs `scripts/seed` to seed database with data
  * `start`: starts the application (production)
  * `start:dev`: starts the application (development)
  * `upgrade`: runs interactive yarn upgrade

_Note: many of these commands can be run in tandem, for instance, to start a clean (data-free) run of the application in `development` mode, run `devlab clean:data start:dev`._

## Installing Dependencies

Because Devlab runs the application in the container dependencies are installed through the container. When the project is run a `.yarn-cache` directory is created in the root of the project to maintain local cache for the project. To install new dependencies within the scope of the containerize application, run:

```
devlab -e "yarn add <DEPENDENCY>"
```

This will ensure that the dependency is installed (and built if need-be) inside the container and the `yarn.lock` and `.yarn-cache` are maintained properly.

## Personal Notes

My goal for this project was two-fold:

1. Establish where my knowledge was in regard to "full-stack", and finally get some time working more in the front-end/client-side
2. Develop a framework that stopped looking at the front-end and back-end as two incompatible entities, identify, and utilize, the similarities

Specifically to latter point; there are inherent differences but I tried to minimize these. The module structure is probably the most significant (primariyl due to ReactJS's Classing), however, testing, linting, and general structure of the code _should_ function similarly.

It often seems that working FE or BE/Node is working in two different paradigms and I do not believe this is, nor needs to be, the case.

## License

This project is released under the MIT license. Feel free to use, abuse, modify, and so-on (with proper attribution).
