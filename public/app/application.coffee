`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define [
  "ProjectNS/config"
  "cord!/cord/core/#{ ( if window? then 'clientSideRouter' else 'serverSideRouter' ) }"
], (config, router) ->

  router.addRoutes config.routes
  router.setDefWidget config.defWidget if config.defWidget?

  router
