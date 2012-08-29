server = require('./public/bundles/cord/core/nodeInit')
publicDir = if process.argv[2]? then process.argv[2] else 'public'
server.init publicDir
