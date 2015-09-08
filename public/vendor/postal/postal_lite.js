/*
 */
(function ( root, doc, factory ) {
	if ( typeof define === "function" && define.amd ) {
		// AMD. Register as an anonymous module.
		define( ["underscore"], function ( _ ) {
			return factory( _, root, doc );
		} );
	} else {
		// Browser globals
		factory( root._, root, doc );
	}
}( this, document, function ( _, global, document, undefined ) {

	var SubscriptionDefinition = function ( topic, callback ) {
    if ( ! topic ) {
      throw new Error("Topic on subscription must be defined");
    }
    if ( ! callback ) {
      throw new Error("Callback on subscription must be defined");
    }
    
		this.topic = topic;
		this.callback = callback;
	};

	SubscriptionDefinition.prototype = {
		unsubscribe : function () {
			postal.unsubscribe( this );
		}
  }
  
  var postal = {

    _lostTopics: {},
    subscriptions: {},
    
    subscribe: function ( options ) {

      var subDef = new SubscriptionDefinition ( options.topic, options.callback );
      if ( this.subscriptions[options.topic] == undefined ) {
        this.subscriptions[options.topic] = [];
      }

      this.subscriptions[options.topic].push( subDef );

      return subDef;
    },
    
    
    publish: function ( topic, data ) {
      if ( ! topic ) {
        throw new Error("Topic on publish must be defined");
      }

      if ( this.subscriptions[topic] != undefined ) {
        var envelope = {
          topic: topic,
          timeStamp: new Date(),
          data: data
        };

        _.each( _.clone(this.subscriptions[topic]), function( SubDef ) {
            SubDef.callback.apply( null, [data, envelope] );
          }
        );
      }
    },
    
    unsubscribe: function ( subDef ) {

      if ( this.subscriptions[subDef.topic] ) {
        var len = this.subscriptions[subDef.topic].length,
            idx = 0;

        for ( ; idx < len; idx++ ) {
          if ( this.subscriptions[subDef.topic][idx] === subDef ) {
            this.subscriptions[subDef.topic].splice( idx, 1 );
            break;
          }
        }

        if ( this.subscriptions[subDef.topic].length == 0 ) {
          delete this.subscriptions[subDef.topic];
        }
      }
    }
    
  }

	global.postal = postal;
	return postal;
} ));