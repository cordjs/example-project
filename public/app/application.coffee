`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define [
  "cord!/testModule/config"
  "cord!/cord/core/router/#{ ( if window? then 'clientSideRouter' else 'serverSideRouter' ) }"
  "underscore"
], (config, router, _) ->

  bundles = [
    'cord!/testModule/config'
#    'cord!/testModule2/config'
  ]

  require bundles, () ->
    routes = {};
    _.extend routes, bundle.routes for bundle in arguments

    router.addRoutes routes
#    router.setDefWidget config.defWidget if config.defWidget?

  router
