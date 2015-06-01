define(function (require) {
    "use strict";
    //Bağımlılıklar yükleniyor
    var Backbone          = require('backbone'),
        LoginView         = require('app/views/login/login_view'),
        MainView          = require('app/views/main/main_view'),
        MakersrvView      = require('app/views/main/makersrv_view'),
        RestaurantView    = require('app/views/main/restaurant_view'),
        UploadView        = require('app/views/main/upload_view'),
        A_RsrvQueryView   = require('app/views/main/a_rsrvquery_view'),
        U_RsrvQueryView   = require('app/views/main/u_rsrvquery_view'),
        RsrvUploadView    = require('app/views/main/rsrvupload_view'),
        cookie            = require('cookie'),//cookie arama

        loginView         = new LoginView(),
        makersrView       = new MakersrvView(),
        restaurantView    = new RestaurantView(),
        mainView          = new MainView(),
        uploadView        = new UploadView(),
        a_rsrvQueryView   = new A_RsrvQueryView(),
        u_rsrvQueryView   = new U_RsrvQueryView(),
        rsrvUploadView    = new RsrvUploadView();




    return Backbone.Router.extend({
        //yönlendirme kuralları belirleniyor
        routes: {
            ''                              : 'login',
            'login'                         : 'login',
            'logout'                        : 'logout',
            'main'                          : 'main',
            'welcome'                       : 'main',
            'main/makersrv'                 :'makersrv',
            'main/makersrv/:month/:year'    :'makersrv',
            'main/restaurant'               :'restaurant',
            'main/restaurant/:month/:year'  :'restaurant',
            'main/uploadfile'               :'uploadfile',
            'main/rsrvQuery'                :'rsrvQuery',
            'main/rsrvUpload'               :'rsrvUpload'
        },
        rsrvQuery : function(){
            //cookie var mı? Yok mu? sorgulanıyor
            if(o_user==null)
            {
                //Login sayfasına yönlendiriliyor
                var Router = require('app/router');
                var router = new Router();
                router.navigate('login', {trigger:true});
            }
            else
            {
                //main sayfası ekleniyor
                mainView.render();
                //yetkisine göre reservasyon sorgulama sayfası çağırılıyor
                if(authority=="admin")
                    a_rsrvQueryView.render();
                else if(authority=="user")
                    u_rsrvQueryView.render();
            }
        },
        rsrvUpload : function(){
            //cookie var mı? Yok mu? sorgulanıyor
            if(o_user==null)
            {
                //Login sayfasına yönlendiriliyor
                var Router = require('app/router');
                var router = new Router();
                router.navigate('login', {trigger:true});
            }
            else
            {
                //main sayfası ekleniyor ve reservasyon güncelleme sayfası çağırılıyor
                mainView.render();
                rsrvUploadView.render();
            }
        },
        uploadfile : function(){
            //cookie var mı? Yok mu? sorgulanıyor
            if(o_user==null)
            {
                //Login sayfasına yönlendiriliyor
                var Router = require('app/router');
                var router = new Router();
                router.navigate('login', {trigger:true});
            }
            else
            {
                //main sayfası ekleniyor ve dosya yükleme sayfası çağırılıyor
                mainView.render();
                uploadView.render();
            }
        },
        makersrv: function(month,year){
            //cookie var mı? Yok mu? sorgulanıyor
            if(o_user==null)
            {
                //Login sayfasına yönlendiriliyor
                var Router = require('app/router');
                var router = new Router();
                router.navigate('login', {trigger:true});
            }
            else
            {
                //main sayfası ekleniyor ve reservasyon yap sayfası çağırılıyor
                mainView.render();
                makersrView.render(month,year);
            }
        },
        restaurant: function(month,year){
            //cookie var mı? Yok mu? sorgulanıyor
            if(o_user==null)
            {
                //Login sayfasına yönlendiriliyor
                var Router = require('app/router');
                var router = new Router();
                router.navigate('login', {trigger:true});
            }
            else
            {
                //main sayfası ekleniyor ve restoran durumu güncelleme sayfası çağırılıyor
                mainView.render();
                restaurantView.render(month,year);
            }
        },
        logout:function(){
            //cookie siliniyor
            document.cookie = "o_user" +
                '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
            document.cookie = "authority" +
                '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
            document.cookie = "userId" +
                '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';

            $("#main2").html(" ");
            document.cookie = "sayac=0";

            //login sayfasına yönlendiriliyor
            var Router = require('app/router');
            var router = new Router();
            router.navigate('login', {trigger:true});
        },
        login: function () {
            //login sayfası çağırılıyor
            loginView.render();
            $('#main2').html(" ");

        },
        main : function(){
            //main sayfası çağırılıyor
            mainView.render();
        }
    });
});