define [], () ->

  'routes':
    '/tab:activeTabId':
      widget: '//Layout'
      regex: false
      action: 'default'
      params:
       someParam: 11

    '/module/tab:activeTabId':
      widget: '//Layout'
      regex: false
      action: 'default'
      params:
       someParam: 11

    '/module/space:activeTabId':
      widget: '//Layout'
      regex: false
      action: 'default'
      params:
       someParam: 11

#  'defWidget': '/testModule//Layout'