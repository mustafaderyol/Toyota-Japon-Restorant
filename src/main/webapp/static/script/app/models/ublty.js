define(function (require) {
    "use strict";
    var Backbone = require('backbone'),
        Usblty = Backbone.Model.extend({
            urlRoot: '../../jpnrest/api/usblty',
            idAttribute: "id"
        }),
        Usbltys = Backbone.Collection.extend({
            url: '../../jpnrest/api/usblty'
        });
    return {
        Usblty: Usblty,
        Usbltys: Usbltys
    };
});