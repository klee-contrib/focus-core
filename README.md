spa-fmk
=======

Fmk for spa application.

## What's inside
- Helpers for the application
- Base views
- Base models and collection

## Dependencies
- jQuery
- Underscore.js
- Backbone.js

## How to build the lib
The build system is made with `gulp` which is a node base build system. `npm install -g gulp`
Then you have to launch the following command: `npm run build` which generates two outputs: one for the browser, one for node js (expecially for unit tests purpose).

### Browser
The browser build is inside the `dist/browser/fmk.js`

### Node js
`dist/node and one file per sub module.

## Unit tests
All unit tests are written with mocha, and can be launched using the `npm run test` command.
