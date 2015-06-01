define(function (require) {
    "use strict";
    //Bağımlılıklar çağırılıyor
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        usermodels          = require('app/models/users'),
        tpl                 = require('text!template/login.html');

    return Backbone.View.extend({
        el: "#main",
        initialize: function(){
        },
        render: function(){
            document.cookie = "sayac=0";

            //Login Template yi yükleniyor
            var temp = _.template(tpl, {
                login:languageTextLogin,
                username:languageTextLoginUsername,
                password:languageTextLoginPassword,
                button:languageTextLoginButton
            });
            this.$el.html(temp);

            //language click
            $(".language_but").click(function(event) {
                document.cookie = "language="+event.target.id;
                location.reload();
            });

        },
        events:{
            //login butonuna tıklandığında çalıştırılacak fonksiyonu
            'click #login' : 'login'
        },
        login: function(){
            //Kullanıcıdan gelen veriler
            var user = $('#username').val();
            var pass = $('#password').val();
            //Gelen veri kontrol ediliyor
            if(user.length < 1 || pass.length < 1)
                alert('Lütfen Tüm Alanları Doldurunuz!');

            //Veritabanında arama başlıyor
            var tmp=0;
            var users = new usermodels.Users();
            users.fetch({
                async: false,
                success: function(){
                    _.each(users.models,function(row){
                        if(user==row.get("userName") && pass==row.get("password"))
                        {
                            tmp=0;

                            //Şartlar sağlandığında cookie oluşturuluyor
                            document.cookie = "o_user="+user;

                            if(row.get("authority")==1)
                                document.cookie = "authority=admin";
                            else
                                document.cookie = "authority=user";

                            document.cookie = "userId="+row.get("userId");

                            document.cookie = "sayac=0";

                            //Sayfa yönlendirmesi yapılıyor
                            var Router = require('app/router');
                            var router = new Router();
                            router.navigate('main', {trigger:true});
                            return
                        }
                        else
                        {
                            tmp++;
                        }
                    });
                }
            });

            if(tmp>0)
            {
               $('#username').val("");
               $('#password').val("");
            }
            tmp=0;
        }
    });
});

