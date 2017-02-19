# SPAQ Client

## Summary

The client is developed to work "out of the box", with very little configuration needed. It is hosted by the [server](/server) and runs alongside the API.

Since the goal of this project is rapid prototyping the client uses [JSPM](http://jspm.io) with the system configured to separate out client modules in the [`/package.json`](/package.json) (under the `jspm` property) so if the desired goal is to separate the client application from the server this process can be done easily.

## Development vs. Production

In order to simplify production runs, the primary file for the application is an EJS file ([`client/index.ejs`](/client/index.ejs)).

### Development

Running the application via `devlab start:dev` will load in development mode and use the source files.

### Production

Once the application has been built via `devlab build` it can then be run with the generated `dist.js` file. Running `devlab start` will start the application in production mode.

## Module Loading & ES6 Compatibility

JSPM loads [BabelJS](https://babeljs.io/), along with [SystemJS](https://github.com/systemjs/systemjs) to load modules.

## ReactJS
The client includes [ReactJS](https://facebook.github.io/react/) as the framework, along with [react-enroute](https://github.com/tj/react-enroute) for simplified routing and [react-bootstrap](https://react-bootstrap.github.io/) for [Bootstrap](http://getbootstrap.com/) support.

## User Interface

The [`index.ejs`](/client/index.ejs) file loads some default icons as well as a [bootswatch theme](https://www.bootstrapcdn.com/bootswatch/) and an override CSS file; [`css/main.css`](/client/css/main.css).

## App Entrypoint

The main entrypoint for the client application is [`client/lib/main.js`](/client/lib/main.js) which loads the app into the `#app` container and starts the React application at [`client/lib/components/App.js`](/client/lib/components/App.js).