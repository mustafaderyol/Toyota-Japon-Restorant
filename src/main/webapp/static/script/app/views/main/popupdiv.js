define(function (require) {
    "use strict";
    //Bağımlılıklar yükleniyor
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        usermodels          = require('app/models/users'),
        statusmodel         = require('app/models/status'),
        reservationmodel    = require('app/models/reservation'),
        tpl                 = require('text!template/popupDiv.html');

        var allUsers;

    return Backbone.View.extend({
        el: "body",
        initialize: function(){

        },
        events:{
            //id'si popupBack olan buttona basınca çağırılacak fonksiyon
            'click #popupBack':'popupBack'
        },
        render: function(popupData){

            var users = new usermodels.Users();
            users.fetch({
                async: false,
                success: function(userData){
                    allUsers=userData.toJSON();
                }
            });

            //Parametre olarak gelen popupData verisini parçalıyoruz
            var data = popupData.split("_");
            var date=data[1];
            var meal;
            if(data[0]=="b")
                meal=languageTextMakeRsrvMealBreakfast;
            if(data[0]=="l")
                meal=languageTextMakeRsrvMealLaunch;
            if(data[0]=="d")
                meal=languageTextMakeRsrvMealDinner;

            //popupData parametresinden gelen tarih ve öğünde kimler reservasyon yapmış sorgulanıyor
            //user değişkenine aktarılıyor
            var user;
            var status1 = new statusmodel.Sttss();
            status1.fetch({
                data:{date:data[1],meal:data[0]},
                async: false,
                success: function(statusData1){
                    statusData1 = statusData1.toJSON();
                    if(statusData1[0]!=undefined || statusData1[0]!=null)
                    {
                        var reservation = new reservationmodel.Reses();
                        reservation.fetch({
                            data:{statusId:statusData1[0].statusId},
                            async: false,
                            success: function(data){
                                data=data.toJSON();
                                user=data;
                            }
                        });

                    }
                }
            });

            //popupData dan gelen veriler parametre olarak verilerek popupDiv ekrana basılıyor
            var temp = _.template(tpl, {date:date,meal:meal,
                back:languageTextPopupBack,
                firstName:languageTextFirstName,
                lastName:languageTextLastName,
                userName:languageTextLoginUsername
            });
            this.$el.append(temp);

            //reservasyon sorgusundan dönen kullanıcıların bilgileri alınıp popupDiv içine basılıyor
            for(var i= 0;i<user.length;i++)
            {
                for(var j=0;j<allUsers.length;j++)
                {
                    if(allUsers[j].userId==user[i].userId)
                    {
                        $("#popuptable table").append("<tr><td>"+allUsers[j].firstName+"</td><td>"+allUsers[j].lastName+"</td><td>"+allUsers[j].userName+"</td></tr>");
                    }
                }
            }
        },
        popupBack:function(){
            //popupDiv siliniyor
            $("#popup").remove();
        }

    });
});