define(function (require) {
    "use strict";
    //Bağımlılıklar yükleniyor
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        uploadmodel         = require('app/models/upload'),
        cookie              = require('cookie'),
        tpl                 = require('text!template/uploadFile.html');

    var file1, file2;
    return Backbone.View.extend({
        el: "#main2",
        initialize: function(){
        },
        render: function(){
            //yetki sorgulanıyor
            if(authority=="user")
            {
                //welcome sayfasına yönlendiriliyor
                var Router = require('app/router');
                var router = new Router();
                router.navigate('welcome', {trigger:true});
            }
            else
            {
                //uploadFile.html sayfası yükleniyor
                var temp = _.template(tpl, {
                    mountUpload:languageTextMainButtonMonthMenu,
                    helpUpload:languageTextMainButtonHelp,
                    title:languageTextMainButtonFileUpload,
                    uploadFile:languageTextMainButtonUpload
                });
                this.$el.html(temp);
            }

            //Dosya bilgisi alınıyor
            $('#mountUpload').bind("change", function(e) {
                var files = e.target.files || e.data.files;
                // Our file var now holds the selected file
                file1 = files[0];
            });

            //Dosya bilgisi alınıyor
            $('#helpUpload').bind("change", function(e) {
                var files = e.target.files || e.data.files;
                // Our file var now holds the selected file
                file2 = files[0];
            });

        }
    });
});