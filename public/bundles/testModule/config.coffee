`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define [
  './routes'
], (routes) ->

  'routes': routes
  'defWidget': 'cord-w!//Layout/Layout'