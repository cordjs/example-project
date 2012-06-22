// Generated by CoffeeScript 1.3.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['jquery', '../Behaviour'], function($, Behaviour) {
  var ButtonBehaviour;
  return ButtonBehaviour = (function(_super) {

    __extends(ButtonBehaviour, _super);

    function ButtonBehaviour() {
      return ButtonBehaviour.__super__.constructor.apply(this, arguments);
    }

    ButtonBehaviour.prototype._setupBindings = function() {
      var _this = this;
      console.log('setupButtonBindings', this.id);
      return $('#' + this.id).click(function() {
        return alert("Button click " + _this.view.ctx.number + "!");
      });
    };

    return ButtonBehaviour;

  })(Behaviour);
});
