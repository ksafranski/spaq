# SPAQ
**Single Page App Quick-Start**

## Summary:

This is a simple starter-pack I put together for those times when you need a simple base for starting an SPA.

## Includes:

* [Devlab](https://github.com/TechnologyAdvice/Devlab) config for running development in Docker
* Yarn-based dependency management
* Basic server (`/server`) with ExpressJS for hosting static assets, API services and logging
* Basic client (`/client`) with JSPM + SystemJS using React
* Test suite with everything from linting to mocking to coverage

## Goal:

As stated in the summary, this is a simple starter-pack for spinning up an SPA with both the client and server code in one place for rapid-prototyping. However, the additional goals are:

* KISS: no complex build tool-chains or steps
* Easily separation between client and server
  * JSPM separation in [`package.json`](/package.json)
  * No hard-code tie-ins with the server to run the client app
* Solidly tested core server code for API
* Supports easy service prototyping with Devlab (Docker)

## Getting Started

1. Ensure [Devlab](https://github.com/TechnologyAdvice/Devlab) is installed (`npm i -g devlab`)
2. Install all dependencies: `lab install`
3. Run it (dev-mode): `lab dev`

## License

This project is released under the MIT license. Feel free to use, abuse, modify, and so-on (with proper attribution).
