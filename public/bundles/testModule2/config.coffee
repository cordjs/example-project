`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define [], () ->

  'routes':
    '/tab2:activeTabId':
      regex: false
      action: 'default'
      params:
        someParam: 11

    '/module2/tab:activeTabId':
      regex: false
      action: 'default'
      params:
        someParam: 11

    '/module2/space:activeTabId':
      regex: false
      action: 'default'
      params:
        someParam: 11

  'defWidget': '/testModule//Layout/Layout'