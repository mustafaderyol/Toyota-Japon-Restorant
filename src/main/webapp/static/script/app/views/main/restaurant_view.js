define(function (require) {
    "use strict";
    //Bağımlılıklarımız yükleniyor
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        cookie              = require('cookie'),
        statusmodel         = require('app/models/status'),
        reservationmodel    = require('app/models/reservation'),
        ublty_model         = require('app/models/ublty');

    var statusData;
    var ye,mo;

    //Şuanki tarih bilgileri alınıyor
    var nowDate = new Date();

    return Backbone.View.extend({
        el:"#main2",
        initialize: function(){

        },
        events:{
            //click işlemlerinin fonksiyonları tanımlandı
            'click .reservation_save':'save',
            'click .reservation_update':'update'
        },
        render: function(month,year){

            //Parametre olarak gelen veriler boş mu die kontrol ediliyor
            if(month==null || month==undefined || year==null || year==undefined)
            {
                //Eğer boş ise şuanki tarih alınarak veriler dolduruluyor
                var day=nowDate.getDate();
                month=nowDate.getMonth();
                year=nowDate.getFullYear();
            }
            else
            {
                //Gelen parametredeki veriler alınıyor
                var strHref = window.location.href;
                var aQueryString = strHref.split("/");
                var date = new Date(aQueryString[7],aQueryString[6],1);
                var day = date.getDate();
                month = date.getMonth();
                year = date.getFullYear();
            }

            function calendar(month,year,day) {

                //Status Bilgileri Alınıyor
                var status = new statusmodel.Statuses();
                status.fetch({
                    async: false,
                    success: function(data){
                        statusData=data.toJSON();
                    }
                });

                ye=year;
                mo=month+1;

                //Önceki, sonraki yil ve ay hesaplanıyor
                var before_month,before_year,after_month,after_year;

                if (month==0)
                {
                    before_month=11;
                    before_year=year-1;
                }
                else
                {
                    before_month=month-1;
                    before_year=year;
                }

                if (month==12)
                {
                    after_month=1;
                    after_year=year+1;
                }
                else
                {
                    after_month=month+1;
                    after_year=year;
                }

                //Ay tanımları yapılıyor
                var months = languageTextMakeRsrvMonths;
                var monthDays = [];
                for (var i = 1; i <= 12; i++) {
                    var kacgun= new Date(year,i,0).getDate();
                    monthDays[i-1]=kacgun;
                }

                //Gün tanımları yapılıyor
                var weekDay = languageTextMakeRsrvWeekDays;
                var days_in_this_month = monthDays[month];

                //Ay ve Yıl ekrana basılıyor
                var calendar_html = '<table class="calendarTable">';
                calendar_html += '<tr><td class="monthHead" colspan="7"><a href="#main/restaurant/'+before_month+'/'+before_year+'"><img src="images/back.png" width="25" height="18" style="vertical-align:middle;"></a>' + months[month] + ' ' + year + '  <a href="#main/restaurant/'+after_month+'/'+after_year+'"><img src="images/next.png" width="25" height="18" style="vertical-align:middle;"></a></td></tr>';
                calendar_html += '<tr>';

                //Hafta bilgileri hesaplanıyor
                var first_week_day = new Date(year, month, 0).getDay();
                for(var week_day= 0; week_day < 7; week_day++) {
                    calendar_html += '<td class="weekDay">' + weekDay[week_day] + '</td>';
                }
                calendar_html += '</tr><tr>';

                //Restoranın Durumu sorgulanıyor
                var restaurantUsability=0;
                var usabilty = new ublty_model.Usbltys();
                usabilty.fetch({
                    async: false,
                    success: function(){
                        _.each(usabilty.models,function(row){
                            if((month+1)==row.get("mount") && year==row.get("year"))
                            {
                                restaurantUsability++;
                            }

                        });
                    }
                });



                for(week_day = 0; week_day < first_week_day; week_day++) {
                    calendar_html += '<td></td>';
                }
                week_day = first_week_day;

                //Günler ekrana basılıyor
                for(var day_counter = 1; day_counter <= days_in_this_month; day_counter++) {
                    week_day %= 7;

                    var sayb= 0,sayl= 0,sayd=0;

                    if((month+1)<10)
                    {
                        var ay=month+1;
                        ay="0"+ay;
                    }
                    if(day_counter<10)
                    {
                        var gun= day_counter;
                        gun="0"+gun;
                    }
                    else
                        gun=day_counter;

                    var yil = year+"-"+ay+"-"+gun;


                    //statusun var olup olmadığı kontrol ediliyor
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
                        for(var j=0;j<statusData.length;j++)
                        {
                            if(statusData[j].date==yil && statusData[j].meal==ml)
                            {

                                if(i==0)
                                {
                                    sayb++;
                                }
                                else if(i==1)
                                {
                                    sayl++;
                                }
                                else if(i==2)
                                {
                                    sayd++;
                                }
                            }
                        }
                    }

                    if(week_day == 0)
                        calendar_html += '</tr><tr>';

                    //Restorant daha önce açılmamış ise tüm checkboxlar işaretli gelecek
                    if(restaurantUsability==0)
                    {
                        calendar_html += '<td class="monthDay"><b><u>' + day_counter + '</u></b><br><p style="display:block; width:120px; margin:0 auto; text-align:left;">'+
                            '<input type="checkbox" name="checkId[]" value="b_'+ yil+ '" id="b_'+ yil + '"  checked="checked"><label for="b_'+ yil + '">'+languageTextMakeRsrvMealBreakfast+'</label><br>'+
                            '<input type="checkbox" name="checkId[]" value="l_'+ yil + '" id="l_'+ yil + '" checked="checked"><label for="l_'+ yil + '">'+languageTextMakeRsrvMealLaunch+'</label><br>'+
                            '<input type="checkbox" name="checkId[]" value="d_'+ yil + '" id="d_'+ yil + '"  checked="checked"><label for="d_'+ yil + '">'+languageTextMakeRsrvMealDinner+'</label>'+
                            '</p></td>';
                    }
                    else
                    {
                        calendar_html += '<td class="monthDay"><b><u>' + day_counter + '</u></b><br><p id="calendar_p_tag">';

                        calendar_html +='<input type="checkbox" name="checkId[]" value="b_'+ yil + '" id="b_'+ yil + '"';
                        if(sayb!=0)
                            calendar_html +='checked="checked"';
                        calendar_html +='><label for="b_'+ yil + '">'+languageTextMakeRsrvMealBreakfast+'</label></br>';

                        calendar_html +='<input type="checkbox" name="checkId[]" value="l_'+ yil + '" id="l_'+ yil + '"';
                        if(sayl!=0)
                            calendar_html +='checked="checked"';
                        calendar_html +='><label for="l_'+ yil + '">'+languageTextMakeRsrvMealLaunch+'</label></br>';

                        calendar_html +='<input type="checkbox" name="checkId[]" value="d_'+ yil + '" id="d_'+ yil + '"';
                        if(sayd!=0)
                            calendar_html +='checked="checked"';
                        calendar_html +='><label for="d_'+ yil + '">'+languageTextMakeRsrvMealDinner+'</label></br>';

                        calendar_html += '</p></td>';
                    }
                    week_day++;
                }
                calendar_html += '</tr>';
                calendar_html += '</table>';

                //Restorant aktif değilse kaydet, aktif ise güncelle butonu ekrana basılıyor
                if(restaurantUsability==0)
                {
                    calendar_html= "<div class='clndr'><div id='title'>"+languageTextMainButtonUploadRest+"</div>"+calendar_html+"<br><button class='button button-blue reservation_save saveandupdatebuton' id='main2_button' >"+languageTextMakeRsrvMealSaveButton+"</button> </div>";

                }
                else
                {
                    calendar_html= "<div class='clndr'><div id='title'>"+languageTextMainButtonUploadRest+"</div>"+calendar_html+"<br><button class='button button-blue reservation_update saveandupdatebuton' id='main2_button'>"+languageTextButtonUpdate+"</button> </div>";

                }
                return calendar_html;

            }

            //Yetkiler sorgulanıyor
            if(authority=="user")
            {
                //Login sayfasına yönlendiriliyor
                var Router = require('app/router');
                var router = new Router();
                router.navigate('welcome', {trigger:true});
            }
            else
            {
                //calender fonksiyonu çalıştırılarak ekrana basılıyor
                this.$el.html(calendar(month,year,day));

            }

        } ,
        save:function(){

            //Lütfen Bekleyin divi ekrana basılıyor
            $("body").append("<div id='loadingg'><img src='images/"+languageLoading+"' width='300' height='100'> </div>");

            //checkbox verileri alınıyor
            var cboxes = document.getElementsByName('checkId[]');
            var len = cboxes.length;

            var date = new Date();

            for (var i=0; i<len; i++) {
                var temp= cboxes[i].value.split("_");
                if(cboxes[i].checked)
                {
                    //status kayıt ediliyor
                    var status = new statusmodel.Status({date:temp[1],meal:temp[0],createUser:userID,createDate:date,updateUser:userID,updateDate:date});
                    status.save(null,{
                        async: false,
                        success: function(){
                            console.log("basarili"+temp[1]) ;
                        }
                    });
                }
            }

            //Restorant kullanılabilirlik kayıt ediliyor
            var usabilty = new ublty_model.Usblty({mount:mo,year:ye,createUser:userID,createDate:date,updateUser:userID,updateDate:date});
            usabilty.save(null,{
                async: false,
                success: function(){
                    $('#loadingg').remove();
                    alert(languageTextMakeRsrvMealSaveAlert);

                }
            });

            location.reload();
        },
        update:function()
        {
            //Lütfen Bekleyin divi ekrana basılıyor
            $("body").append("<div id='loadingg'><img src='images/"+languageLoading+"' width='300' height='100'> </div>");

            //Rezervasyon kayıtları alınıyor
            var reservationData;
            var reservation = new reservationmodel.Reservastions();
            reservation.fetch({
                async: false,
                success: function(data){
                     reservationData=data.toJSON();
                }
            });

            //checkbox verileri alınıyor
            var cboxes = document.getElementsByName('checkId[]');
            var len = cboxes.length;

            //Click işleminden sonra şuanki tarih alınıyor
            var dates = new Date();
            var date=dates.getFullYear()+"-"+dates.getMonth()+"-"+dates.getDay();


            for (var i=0; i<len; i++) {
                var temp= cboxes[i].value.split("_");
                if(cboxes[i].checked)
                {
                    //Status kayıtlı mı? sorgulanıyor
                    var tmp=0;
                    var sttsId;
                    for(var j=0;j<statusData.length;j++)
                    {
                        if(statusData[j].date==temp[1] && statusData[j].meal==temp[0])
                        {
                            tmp++;
                            sttsId=statusData[j].statusId;
                        }
                    }
                    if(tmp==0)
                    {
                        //Status kayıtlı değil ise kayıt ediliyor
                        var status = new statusmodel.Status({date:temp[1],meal:temp[0],createUser:userID,createDate:date,updateUser:userID,updateDate:date});
                        status.save(null,{
                            async: false,
                            success: function(){
                                console.log("Date:"+temp[1]+" Meal:"+temp[0]+" Başarılı");
                            }
                        });
                    }
                }
                else
                {
                    //Status kayıtlı mı? sorgulanıyor
                    var tmp=0;
                    var sttsId;
                    for(var j=0;j<statusData.length;j++)
                    {
                        if(statusData[j].date==temp[1] && statusData[j].meal==temp[0])
                        {
                            tmp++;
                            sttsId=statusData[j].statusId;
                        }
                    }
                    if(tmp>0)
                    {
                        //ReservasyonId si aranıyor
                        for(var k=0;k<reservationData.length;k++)
                        {
                            if(reservationData[k].statusId==sttsId)
                            {
                                //Reservasyon siliniyor
                                var reservation2 = new reservationmodel.Reservastion({id: reservationData[k].reservationId});
                                reservation2.destroy({
                                    success: function(){
                                        console.log("reservationId:"+reservationData[k].reservationId+" Silindi");
                                    }
                                });
                            }
                        }

                        //Status siliniyor
                        var status = new statusmodel.Status({id: sttsId});
                        status.destroy({
                            success: function(){
                                console.log("StatusId:"+sttsId+" Silindi");
                            }
                        });
                    }
                }

            }


            //Lütfen bekleyiniz kaldırılıyor
            $('#loadingg').remove();
            alert(languageTextMakeRsrvMealUpdateAlert);
            location.reload();
        }

    });
});