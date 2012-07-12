define(['module'], function (module) {
    'use strict';
    var cord;

    cord = {
        load: function (name, req, onLoad, config) {
            req( [ 'cord-path!' + name ], function ( path ) {
                req( [ 'text!' + path ], function ( data ) {
                    onLoad( data );
                } );
            } );
        }
    };

    return cord;
});
