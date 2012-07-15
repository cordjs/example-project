`if (typeof define !== 'function') { define = require('amdefine')(module) }`

configPaths = require './public/bundles/cord/core/configPaths'
requirejs = require 'requirejs'
requirejs.config
  nodeRequire: require
  baseUrl: 'public'

requirejs.config configPaths

http = require 'http'
serverStatic = require 'node-static'

requirejs [
  'cord!/cord/core/appManager'
], (application) ->
    file = new serverStatic.Server './public/'

    http.createServer (req, res) ->
        if !application.process req, res
            req.addListener 'end', ->
              file.serve req, res
    .listen 1337, '127.0.0.1'

    console.log "Server running at http://127.0.0.1:1337/"
    console.log "Current directory: #{ process.cwd() }"