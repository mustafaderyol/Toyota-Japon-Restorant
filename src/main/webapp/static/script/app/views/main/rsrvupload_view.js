define(function (require) {
    "use strict";
    //Bağımlılıklarımız yükleniyor
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        cookie              = require('cookie'),
        ui                  = require('jquery-ui'),
        usermodels          = require('app/models/users'),
        statusmodel         = require('app/models/status'),
        reservationmodel    = require('app/models/reservation'),
        userTemplate        = require('text!template/users.html'),
        tpl                 = require('text!template/rsrvUpload.html');

    var reservationData;

    //Şuanki tarih alınıyor
    var nowDate = new Date();

    return Backbone.View.extend({
        el: "#main2",
        initialize: function(){
        },
        events:{
            //R_upload id li butona tıklayınca çalışacak fonksiyon
            'click #rUpload' : 'rUpload'
        },
        render: function(){
            //Kullanıcı yetkisi sorgulanıyor
            if(authority=="user")
            {
                //Welcome sayfasına yönlendiriliyor
                var Router = require('app/router');
                var router = new Router();
                router.navigate('welcome', {trigger:true});
            }
            else
            {
                //Tüm kullanıcı bilgileri alınıp userTemplate'ye aktarılıyor
                var  allUser;
                var users = new usermodels.Users();
                users.fetch({
                    async: false,
                    success: function(){
                        allUser= _.template(userTemplate, {users: users.models});
                    }
                });

                //rsrvUpload.html sayfası yükleniyor
                var temp = _.template(tpl, {
                    title:languageTextMainButtonQueryRsrv,
                    date:languageTextDate,
                    breakfast:languageTextMakeRsrvMealBreakfast,
                    launch:languageTextMakeRsrvMealLaunch,
                    dinner:languageTextMakeRsrvMealDinner,
                    firstName:languageTextFirstName,
                    lastName:languageTextLastName,
                    userName:languageTextLoginUsername,
                    auth:languageTextLoginAuthority,
                    reservationDate:languageTextReservationDate,
                    reservation:languageTextReservation,
                    and:languageTextAnd,
                    save:languageTextMakeRsrvMealSaveButton
                });
                this.$el.html(temp);

                //Kullanıcılar ekrana basılıyor
                $('#rsrvupload_right tbody').append(allUser);

                //Tarih maskeleniyor
                $('#date').datepicker({ dateFormat: 'yy-mm-dd' });

                //Kullanıcıların üzerine basınca yapılacak işlemler
                $(".UserIdClass").click(function(event) {

                    //Başlangıç ayarları yapılıyor
                    //Checkbox işaretleri kaldırılıyor
                    $(".breakfast").prop( "checked", false );
                    $(".launch").prop( "checked", false );
                    $(".dinner").prop( "checked", false );

                    //Checkboxlar enable yapılıyor
                    $(".breakfast").prop( "disabled", false );
                    $(".launch").prop( "disabled", false );
                    $(".dinner").prop( "disabled", false );

                    //Tarih değeri alınıyor
                    var date = $('#rsrvupload_right #date').datepicker({ dateFormat: 'yy-mm-dd' }).val();

                    //Tarih denetleniyor
                    if(date.length <7)
                    {
                        alert(languageTextErrorNullDate);
                    }
                    else
                    {
                        //Click işleminden gelen id'ye göre kullanıcı bilgileri ve tarih ekrana basılıyor
                        var userId;
                        var usr = new usermodels.Usr();
                        usr.fetch({
                            data:{id:event.target.id},
                            async: false,
                            success: function(data){
                                data=data.toJSON();
                                userId=data[0].userId;
                                $("#reservation_firstname_span").html(data[0].firstName+" "+data[0].lastName);
                                $("#reservation_username_span").html(data[0].userName);
                                $("#reservation_date_span").html(date);
                            }
                        });

                        //Gelen verilere göre reservasyon sorguları yapılıp ekrana basılıyor
                        for(var i=0; i<3;i++)
                        {
                            if(i==0)
                            {
                                var ml="b";
                            }
                            else if(i==1)
                            {
                                var ml="l";
                            }
                            else if(i==2)
                            {
                                var ml="d";
                            }

                            var status = new statusmodel.Sttss();
                            status.fetch({
                                data:{date:date,meal:ml},
                                async: false,
                                success: function(statusData){
                                    statusData = statusData.toJSON();
                                    if(statusData[0] != undefined || statusData[0] != null)
                                    {
                                        var sttsId = statusData[0].statusId;
                                        var reservation = new reservationmodel.Rsrvstn();
                                        reservation.fetch({
                                            data:{userId:event.target.id,statusId:statusData[0].statusId},
                                            async: false,
                                            success: function(reservationData){
                                                var reservationData = reservationData.toJSON();
                                                if(i==0)
                                                    $(".breakfast").attr("id",sttsId+"_"+userId);
                                                else if(i==1)
                                                    $(".launch").attr("id",sttsId+"_"+userId);
                                                else if(i==2)
                                                    $(".dinner").attr("id",sttsId+"_"+userId);
                                                if(reservationData[0] != undefined || reservationData[0] != null)
                                                {
                                                    if(i==0)
                                                        $(".breakfast").prop( "checked", true );
                                                    else if(i==1)
                                                        $(".launch").prop( "checked", true );
                                                    else if(i==2)
                                                        $(".dinner").prop( "checked", true );
                                                }
                                                else
                                                {
                                                    if(i==0)
                                                        $(".breakfast").prop( "checked", false );
                                                    else if(i==1)
                                                        $(".launch").prop( "checked", false );
                                                    else if(i==2)
                                                        $(".dinner").prop( "checked", false );
                                                }
                                            }
                                        });

                                    }
                                    else
                                    {
                                        if(i==0)
                                            $(".breakfast").prop( "disabled", true );
                                        else if(i==1)
                                            $(".launch").prop( "disabled", true );
                                        else if(i==2)
                                            $(".dinner").prop( "disabled", true );
                                    }
                                }
                            });

                        }

                    }
                });

            }
        },
        rUpload:function(){
            //Lütfen Bekleyin divi ekrana basılıyor
            $("body").append("<div id='loadingg'><img src='images/"+languageLoading+"' width='300' height='100'> </div>");

            //Rezervasyon kayıtları alınıyor
            var reservation = new reservationmodel.Reservastions();
            reservation.fetch({
                async: false,
                success: function(data){
                    reservationData=data.toJSON();
                }
            });

            //Kişi bilgiler boş ise kontrolü
            if($("#reservation_firstname_span").html()<1 || $("#reservation_username_span").html()<1 || $("#reservation_date_span").html()<1)
            {
                 alert(languageTextErrorClick);
            }
            else
            {
                //Kahvaltı reservasyonu yok ise kaydedildi
                if(($(".breakfast").prop("disabled"))==false)
                {
                    var temps = $(".breakfast").attr("id").split("_");
                    var tmp= 0,rsrvId;
                    for(var j=0;j<reservationData.length;j++)
                    {
                        if(reservationData[j].userId==temps[1] && reservationData[j].statusId==temps[0])
                        {
                            tmp++;
                            rsrvId=reservationData[j].reservationId;
                        }
                    }
                    if($(".breakfast").prop('checked'))
                    {
                        //Kayıtlı değil ama işaretli ise
                        if(tmp==0)
                        {
                            //Rezervasyon kayıt ediliyor
                            var reservation = new reservationmodel.Reservastion({userId:temps[1],statusId:temps[0],createUser:userID,createDate:nowDate,updateUser:userID,updateDate:nowDate});
                            reservation.save(null,{
                                async: false,
                                success: function(){
                                    console.log("basarili"+temps[1])
                                }
                            });
                        }

                    }
                    else
                    {
                        //Kayıtlı ama işaretli değil ise
                        if(tmp>0)
                        {
                            //Rezervasyon siliniyor
                            var reservation2 = new reservationmodel.Reservastion({id: rsrvId});
                            reservation2.destroy({
                                success: function(){
                                    console.log("ReservationId:"+rsrvId+" Silindi");
                                }
                            });
                        }
                    }
                }

                //Öğle reservasyonu yok ise kaydedildi
                if(($(".launch").prop("disabled"))==false)
                {
                    var temps = $(".launch").attr("id").split("_");
                    var tmp= 0,rsrvId;
                    for(var j=0;j<reservationData.length;j++)
                    {
                        if(reservationData[j].userId==temps[1] && reservationData[j].statusId==temps[0])
                        {
                            tmp++;
                            rsrvId=reservationData[j].reservationId;
                        }
                    }
                    if($(".launch").prop('checked'))
                    {
                        //Kayıtlı değil ama işaretli ise
                        if(tmp==0)
                        {
                            //Rezervasyon kayıt ediliyor
                            var reservation = new reservationmodel.Reservastion({userId:temps[1],statusId:temps[0],createUser:userID,createDate:nowDate,updateUser:userID,updateDate:nowDate});
                            reservation.save(null,{
                                async: false,
                                success: function(){
                                    console.log("basarili"+temps[1])
                                }
                            });
                        }

                    }
                    else
                    {
                        //Kayıtlı ama işaretli değil ise
                        if(tmp>0)
                        {
                            //Rezervasyon siliniyor
                            var reservation2 = new reservationmodel.Reservastion({id: rsrvId});
                            reservation2.destroy({
                                success: function(){
                                    console.log("ReservationId:"+rsrvId+" Silindi");
                                }
                            });
                        }
                    }
                }

                //Akşam reservasyonu yok ise kaydedildi

                if(($(".dinner").prop("disabled"))==false)
                {
                    var temps = $(".dinner").attr("id").split("_");
                    var tmp= 0,rsrvId;
                    for(var j=0;j<reservationData.length;j++)
                    {
                        if(reservationData[j].userId==temps[1] && reservationData[j].statusId==temps[0])
                        {
                            tmp++;
                            rsrvId=reservationData[j].reservationId;
                        }
                    }
                    if($(".dinner").prop('checked'))
                    {
                        //Kayıtlı değil ama işaretli ise
                        if(tmp==0)
                        {
                            //Rezervasyon kayıt ediliyor
                            var reservation = new reservationmodel.Reservastion({userId:temps[1],statusId:temps[0],createUser:userID,createDate:nowDate,updateUser:userID,updateDate:nowDate});
                            reservation.save(null,{
                                async: false,
                                success: function(){
                                    console.log("basarili"+temps[1])
                                }
                            });
                        }

                    }
                    else
                    {
                        //Kayıtlı ama işaretli değil ise
                        if(tmp>0)
                        {
                            //Rezervasyon siliniyor
                            var reservation2 = new reservationmodel.Reservastion({id: rsrvId});
                            reservation2.destroy({
                                success: function(){
                                    console.log("ReservationId:"+rsrvId+" Silindi");
                                }
                            });
                        }
                    }
                }
            }
            //Lütfen bekleyiniz divi kaldırıldı ve işlemin gerçekleştiğine dair mesaj verildi
            $('#loadingg').remove();
            alert(languageTextMakeRsrvMealSaveAlert);
        }

    });
});