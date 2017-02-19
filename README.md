# SPAQ
**Single Page App Quick-Start**

## Summary:

A core server and client setup to allow for rapid prototyping SPA's. The goal of this project is to make few assumptions and setup everything needed to start development imediately.

### Server

Express-based server that serves both the static assets (`/client`) and an API. [More information...](/server/README.md)

### Client

React SPA with basic starting components, SystemJS and Bootstrap. [More Information...](/client/README.md)

## Quick Start

The goal of this project being rapid prototyping and development, the project uses Docker (with [Devlab](https://github.com/TechnologyAdvice/DevLab)) to allow both the application and its database to be run with very little configuration.

**After installing [Docker](https://docs.docker.com/engine/installation/) and [Devlab](https://github.com/TechnologyAdvice/DevLab)** the application can be run with the following command:

```
devlab install start:dev
```

_Note: after the first run, the `install` command is not needed as all dependencies will be installed_

## Commands

The following commands are available for working with the application:

  * `devlab env`: show all environemtn variables
  * `devlab shell`: starts container(s) with interactive shell
  * `devlab clean`: removes dependencies, data, and generated coverage files
  * `devlab clean:node_modules` removes `/node_modules`
  * `devlab clean:jspm_packages`: removes `/client/jspm_packages`
  * `devlab clean:coverage`: removes `/coverage`
  * `devlab clean:data`: removes `/data` (MongoDB data volume)
  * `devlab start`: starts the application (production)
  * `devlab start:dev`: starts the application (development)
  * `devlab upgrade`: runs interactive yarn upgrade
  * `devlab install`: installs all project dependencies
  * `devlab lint`: runs lint task
  * `devlab test`: runs linting and full tests (with coverage)
  * `devlab test:watch`: runs test suite with reload on change

## License

This project is released under the MIT license. Feel free to use, abuse, modify, and so-on (with proper attribution).
