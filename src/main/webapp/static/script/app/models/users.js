define(function (require) {
    "use strict";
    var Backbone = require('backbone'),
        User = Backbone.Model.extend({
            urlRoot: '../../jpnrest/api/users',
            idAttribute: "id"
        }),
        Users = Backbone.Collection.extend({
            url: '../../jpnrest/api/users'
        }),

        //userId ile arama yapmak için model oluşturuldu
        Usr = Backbone.Model.extend({
            url: '../../jpnrest/api/users/getUser'
        });
    return {
        User: User,
        Users: Users,
        Usr:Usr
    };
});