define(function (require) {
    "use strict";
    //Bağımlılıklar yükleniyor
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        cookie              = require('cookie'),
        ui                  = require('jquery-ui'),
        usermodels          = require('app/models/users'),
        statusmodel         = require('app/models/status'),
        reservationmodel    = require('app/models/reservation'),
        nuser_s             = require('text!template/users.html'),
        tpl                 = require('text!template/aRsrvQuery.html');

    var reservationData;

    return Backbone.View.extend({
        el: "#main2",
        initialize: function(){
        },
        render: function(){

            //Tüm kullanılar listelenip template içine atılır. allUser değişkenine kaydedildi.
            var  allUser;
            var users = new usermodels.Users();
            users.fetch({
                async: false,
                success: function(){
                    allUser= _.template(nuser_s, {users: users.models});
                }
            });

            //aRsrvQuery.html template' si yükleniyor
            var temp = _.template(tpl, {
                title:languageTextMainButtonQueryRsrv,
                date:languageTextDate,
                meal:languageTextMeal,
                breakfast:languageTextMakeRsrvMealBreakfast,
                launch:languageTextMakeRsrvMealLaunch,
                dinner:languageTextMakeRsrvMealDinner,
                total:languageTextTotal,
                startupDate:languageTextStatupDate,
                endDate:languageTextEndDate,
                firstName:languageTextFirstName,
                lastName:languageTextLastName,
                userName:languageTextLoginUsername,
                auth:languageTextLoginAuthority
            });
            this.$el.html(temp);

            //Tüm kullanıcılar yükleniyor
            $('#rsrvupload_right .hovered tbody').append(allUser);

            //Tarih maskelemesi yapılıyor
            $('#date1').datepicker({ dateFormat: 'yy-mm-dd' });
            $('#date2').datepicker({ dateFormat: 'yy-mm-dd' });

            //Kullanıcıların üzerine tıklandığında yapılacak işlemler
            $(".UserIdClass").click(function(event) {
                //Tarih bilgileri alınıyor
                var date1 = $('#rsrvupload_right #date1').datepicker({ dateFormat: 'yy-mm-dd' }).val();
                var date2 = $('#rsrvupload_right #date2').datepicker({ dateFormat: 'yy-mm-dd' }).val();

                //Tarih bilgileri denetleniyor
                if(date1.length <7 || date2.length <7)
                {
                    alert(languageTextErrorNullDate);
                }
                else
                {
                    //Başlangıç tarihinin bitiş tarihinden küçük olup olmadığı kontrol ediliyor
                    if(date1>date2)
                    {
                        alert(languageTextErrorDate);
                    }
                    else
                    {
                        //Lütfen bekleyiniz Div'i ekleniyor
                        $("body").append("<div id='loadingg'><img src='images/"+languageLoading+"' width='300' height='100'> </div>");

                        $("#rsrvQuery_table tbody").html(" ");

                        //Rezervasyon kayıtları alınıyor
                        var reservation = new reservationmodel.Reservastions();
                        reservation.fetch({
                            async: false,
                            success: function(data){
                                reservationData=data.toJSON();
                            }
                        });

                        //Üzerine tıklanan kullanicinin bilgileri sorgulanıp ekrana basılıyor
                        var user = new usermodels.Usr();
                        user.fetch({
                            data:{id:event.target.id},
                            async: false,
                            success: function(veri){
                                var dosya = veri.toJSON();
                                if(dosya[0]!=undefined || dosya[0]!=null)
                                {
                                    $("#span_username").html("<span style='color:#f30;'>"+languageTextFirstName+":</span>"+dosya[0].firstName+"<br><span style='color:#f30;'>"+languageTextLastName+":</span>"+dosya[0].lastName+"<br><span style='color:#f30;'>"+languageTextLoginUsername+":</span>"+dosya[0].userName+"<br>");
                                }

                            }
                        });

                        //Belirtilen tarihler arasındaki kişinin reservasyonları listeleniyor
                        var brk=0, lnc= 0, dnnr= 0,meals;
                        var status = new statusmodel.StatusBetweens();
                        status.fetch({
                            data:{date1:date1,date2:date2},
                            async: false,
                            success: function(statusData){
                                statusData = statusData.toJSON();
                                if(statusData!=undefined || statusData!=null)
                                {
                                    for(var i=0;i<statusData.length;i++)
                                    {
                                        for(var j=0;j<reservationData.length;j++)
                                        {
                                            if(reservationData[j].userId==event.target.id && reservationData[j].statusId==statusData[i].statusId)
                                            {
                                                if(statusData[i].meal=="b")
                                                {
                                                    meals=languageTextMakeRsrvMealBreakfast;
                                                    brk++;
                                                }
                                                else if(statusData[i].meal=="l")
                                                {
                                                    meals=languageTextMakeRsrvMealLaunch;
                                                    lnc++;
                                                }
                                                else if(statusData[i].meal=="d")
                                                {
                                                    meals=languageTextMakeRsrvMealDinner;
                                                    dnnr++;
                                                }
                                                $("#rsrvQuery_table tbody").append("<tr style=' border:1px solid #000;'><td>"+statusData[i].date+"</td><td>"+meals+"</td></tr>");

                                            }
                                        }
                                    }
                                }
                            }
                        });

                        //Lütfen Bekleyiniz Div'i kaldırılıyor
                        $('#loadingg').remove();

                        //Toplam kahvaltı, toplam akşam, toplam öğle reservasyon sayısı ekrana basılıyor
                        $("#brkfst").html(brk);
                        $("#lnch").html(lnc);
                        $("#dnnr").html(dnnr);
                    }
                }

            });


        }

    });
});