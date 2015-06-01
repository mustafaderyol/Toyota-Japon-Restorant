define(function (require) {
    "use strict";
    //Bağımlılıklar yükleniyor
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        cookie              = require('cookie'),
        ui                  = require('jquery-ui'),
        statusmodel         = require('app/models/status'),
        reservationmodel    = require('app/models/reservation'),
        tpl                 = require('text!template/uRsrvQuery.html');

    var reservationData;

    return Backbone.View.extend({
        el: "#main2",
        initialize: function(){
        },
        events:{
            //u_rsrvquery_query idli butona basınca çalışacak fonksiyon
            "click #u_rsrvquery_query":"u_rsrvquery_query"
        },
        render: function(){

            //uRsrvQuery.html sayfası yükleniyor
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
                query:languageTextQuery
            });
            this.$el.html(temp);

            //Tarih maskelemesi yapılıyor
            $('#date1').datepicker({ dateFormat: 'yy-mm-dd' });
            $('#date2').datepicker({ dateFormat: 'yy-mm-dd' });
        },
        u_rsrvquery_query:function(){

            //Tarih bilgileri alınıyor
            var date1 = $('#rsrvquery_div #date1').datepicker({ dateFormat: 'yy-mm-dd' }).val();
            var date2 = $('#rsrvquery_div #date2').datepicker({ dateFormat: 'yy-mm-dd' }).val();

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

                    //Belirtilen tarihler arasındaki kişinin reservasyonları listeleniyor
                    var brk=0, lnc= 0, dnnr= 0, meals;
                    var status = new statusmodel.StatusBetweens();
                    status.fetch({
                        data:{date1:date1,date2:date2},
                        async: false,
                        success: function(statusData){
                            statusData = statusData.toJSON();
                            if(statusData != undefined || statusData != null)
                            {
                                for(var i=0;i<statusData.length;i++)
                                {
                                    for(var j=0;j<reservationData.length;j++)
                                    {
                                        if(reservationData[j].userId==userID && reservationData[j].statusId==statusData[i].statusId)
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
        }

    });
});