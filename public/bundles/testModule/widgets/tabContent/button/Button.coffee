`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define [
  'dustjs-linkedin'
  'cordWidget'
], (dust, Widget) ->

  class Button extends Widget

    cssClass: 'b-button'
    rootTag: 'span'

    _defaultAction: (params, callback) ->
      @ctx.number = params.number ? 1
      callback()


  Button