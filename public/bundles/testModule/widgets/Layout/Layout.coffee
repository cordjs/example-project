define [
  'dustjs-linkedin'
  'cord!Widget'
], (dust, Widget) ->

  class Layout extends Widget

    _defaultAction: (params, callback) ->
      @ctx.setDeferred 'activeTab'
      @ctx.set
        centralTabGroup: Widget.DEFERRED
      setTimeout =>
          @ctx.set
            activeTab: params.activeTabId
            centralTabGroup: true
        , 200

      callback()
