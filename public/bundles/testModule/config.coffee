define [], () ->

  'routes':
    '/tab:activeTabId':
      widget: '/testModule//Layout'
      regex: false
      action: 'default'
      params:
       someParam: 11

    '/module/tab:activeTabId':
      widget: '/testModule//Layout'
      regex: false
      action: 'default'
      params:
       someParam: 11

    '/module/space:activeTabId':
      widget: '/testModule//Layout'
      regex: false
      action: 'default'
      params:
       someParam: 11

  'defWidget': '/testModule//Layout'