define(function (require) {
    "use strict";
    var Backbone = require('backbone'),
        Status = Backbone.Model.extend({
            urlRoot: '../../jpnrest/api/status',
            idAttribute: "id"
        }),
        Statuses = Backbone.Collection.extend({
            url: '../../jpnrest/api/status'
        }),

        //date ve meal'e göre arama yapmak için oluşturulan model
        Sttss = Backbone.Model.extend({
            url: '../../jpnrest/api/status/dateMeal'
        }),

        //Gelen iki tarih verirsin arasında kalan Status'leri aramak için oluşturulan model
        StatusBetween = Backbone.Model.extend({
            url: '../../jpnrest/api/status/dateMealBetween'
        }),
        //StatusBetween'in Collection'ı tanımlanıyor
        StatusBetweens = Backbone.Collection.extend({
            url: '../../jpnrest/api/status/dateMealBetween'
        });
    return {
        Status: Status,
        Statuses: Statuses,
        Sttss:Sttss,
        StatusBetween:StatusBetween,
        StatusBetweens:StatusBetweens
    };
});