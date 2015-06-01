define(function (require) {
    "use strict";
    //Bağımlılıklar yükleniyor
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        main                = require('text!template/main.html'),
        welcome             = require('text!template/welcome.html');


    return Backbone.View.extend({
        el:"#main",
        initialize: function(){
        },
        render: function(){
            //cookie parçalama
            function getCookie(cname)
            {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for(var i=0; i<ca.length; i++)
                {
                    var c = ca[i].replace(/^\s+|\s+$/g, '');
                    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
                }
                return null;
            }

            var o_user      =getCookie("o_user");
            var authority   =getCookie("authority");
            var userID      = getCookie("userId");
            var sayac      = getCookie("sayac");

            if(sayac==0)
            {
                document.cookie = "sayac=1";
                location.reload();
            }

            //cookie varlığı kontrol ediliyor
            if(o_user==null)
            {
                //Login sayfasına yönlendiriliyor
                var Router = require('app/router');
                var router = new Router();
                router.navigate('login', {trigger:true});
            }
            else
            {
                //Main Template yükleniyor.
                //Parametre olarak cookie bilgileri gönderiliyor
                var temp = _.template(main, {o_user:o_user,authority:authority,userID:userID,
                    langUser:languageTextLoginUsername,
                    langAut:languageTextLoginAuthority,
                    makeRsrv:languageTextMainButtonMakeRsrv,
                    queryRsrv:languageTextMainButtonQueryRsrv,
                    updateRsrv:languageTextMainButtonUploadRsrv,
                    uploadRest:languageTextMainButtonUploadRest,
                    fileUpload:languageTextMainButtonFileUpload,
                    monthlyMenu:languageTextMainButtonMonthMenu,
                    help:languageTextMainButtonHelp,
                    exit:languageTextMainButtonExit
                });
                this.$el.html(temp);

                $('#userusernamename').text(o_user);
                $('#rolrol').text(authority);

                //Welcome sayfası çağırılıyor
                var temp = _.template(welcome, {wlcome:languageTextWelcomeWelcome,
                    span1:languageTextWelcomeSpan1,
                    span2:languageTextWelcomeSpan2,
                    span3:languageTextWelcomeSpan3
                });
                $("#main2").html(temp);


                //language click
                $(".language_but").click(function(event) {
                    document.cookie = "language="+event.target.id;
                    location.reload();
                });

             }

        },
        events: {
            //logoya tıklayınca çalışacak fonksiyon
            'click #logo' : 'logo'
        },
        logo: function(){
            //Welcome sayfasına yönlendiriliyo
            var Router = require('app/router');
            var router = new Router();
            router.navigate('welcome', {trigger:true});
        }

    });
});