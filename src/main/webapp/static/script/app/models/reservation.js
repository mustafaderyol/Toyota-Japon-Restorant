define(function (require) {
    "use strict";
    var Backbone = require('backbone'),
        Reservastion = Backbone.Model.extend({
            urlRoot: '../../jpnrest/api/rsvr',
            idAttribute: "id"
        }),
        Reservastions = Backbone.Collection.extend({
            url: '../../jpnrest/api/rsvr'
        }),

        //userId ve statusId'e göre arama yapmak için model oluşturuldu
        Rsrvstn = Backbone.Model.extend({
            url: '../../jpnrest/api/rsvr/reservation'
        }),

        //statusId'ye göre arama yapmak için model oluşturuldu
        Res = Backbone.Model.extend({
            url: '../../jpnrest/api/rsvr/reserv'
        }),

        //Res in Collection ı ( Res Modelinin Topluluğu )
        Reses = Backbone.Collection.extend({
            url: '../../jpnrest/api/rsvr/reserv'
        });
    return {
        Reservastion: Reservastion,
        Reservastions: Reservastions,
        Rsrvstn:Rsrvstn,
        Res:Res,
        Reses:Reses
    };
});