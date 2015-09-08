server = require('./public/bundles/cord/core/init/nodeInit')

publicDir = if process.argv[2]? then process.argv[2] else 'public'
config = if process.argv[3]? then process.argv[3] else 'default'
serverPort = process.argv[4]

server.init publicDir, config, serverPort
