`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define [
  "cord!/testModule/config"
  "cord!/cord/core/#{ ( if window? then 'clientSideRouter' else 'serverSideRouter' ) }"
], (config, router) ->

  require.config
    paths:
      'ProjectNS':    './bundles/testModule'

#  modules = 'TestModule'

  router.addRoutes config.routes
  router.setDefWidget config.defWidget if config.defWidget?

  router
