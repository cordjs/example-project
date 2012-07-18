define [
  'dustjs-linkedin'
  'cordWidget'
], (dust, Widget) ->

  class Button extends Widget

    cssClass: 'b-button'
    rootTag: 'span'

    _defaultAction: (params, callback) ->
      @ctx.number = params.number ? 1
      @ctx.sourceJson = params.sourceJson ? {}

      callback()


  Button