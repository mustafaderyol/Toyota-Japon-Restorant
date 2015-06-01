define(function (require) {
    "use strict";
    //Bağımlılıklarımız yükleniyor
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        cookie              = require('cookie'),
        Popupdiv            = require('app/views/main/popupdiv'),
        ubltymodel          = require('app/models/ublty'),
        statusmodel         = require('app/models/status'),
        reservationmodel    = require('app/models/reservation'),

        popupdiv = new Popupdiv();

    var statusData;
    var reservationData;
    var popupTemp;

    //Şuanki tarih bilgileri alınıyor
    var nowDate = new Date();

    var now=nowDate.getFullYear()+"-";
    if((nowDate.getMonth()+1)<10)
        now+="0"+(nowDate.getMonth()+1)+"-";
    else
        now+=(nowDate.getMonth()+1)+"-";

    if(nowDate.getDate()<10)
        now+="0"+nowDate.getDate()+"-";
    else
        now+=nowDate.getDate()+"-";


    return Backbone.View.extend({
        el: "#main2",
        initialize: function(){
        },
        events:{
            //click işlemlerinin fonksiyonları tanımlandı
            'click .min-calendar-png':'popupOpen',
            'click .make_reservation_save':'make_reservation_save'
        },
        render: function(month,year){

            //Parametre olarak gelen veriler boş mu die kontrol ediliyor
            if(month==null || month==undefined || year==null || year==undefined)
            {
                //Eğer boş ise şuanki tarih alınarak veriler dolduruluyor
                day=nowDate.getDate();
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
                //Get status
                var status = new statusmodel.Statuses();
                status.fetch({
                    async: false,
                    success: function(data){
                        statusData=data.toJSON();
                    }
                });

                //Rezervasyon kayıtları alınıyor
                //Get reservation
                var reservation = new reservationmodel.Reservastions();
                reservation.fetch({
                    async: false,
                    success: function(data){
                        reservationData=data.toJSON();
                    }
                });

                popupTemp=0;

                //Önceki, sonraki yil ve ay hesaplanıyor
                //After, befor year and month are calculated
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
                //Month are defined
                var months = languageTextMakeRsrvMonths;
                var monthDays = [];
                for (var i = 1; i <= 12; i++) {
                    var kacgun= new Date(year,i,0).getDate();
                    monthDays[i-1]=kacgun;
                }

                //Gün tanımları yapılıyor
                //Days are defined
                var weekDay = languageTextMakeRsrvWeekDays;
                var days_in_this_month = monthDays[month];

                //Ay ve Yıl ekrana basılıyor
                //Month and year screen printed
                var calendar_html = '<table class="calendarTable">';
                calendar_html += '<tr><td class="monthHead" colspan="7"><a href="#main/makersrv/'+before_month+'/'+before_year+'"><img src="images/back.png" width="25" height="18" style="vertical-align:middle;"></a>' + months[month] + ' ' + year;

                //Sonraki ayın kullanılabilirliği sogulanıyor
                //Next month usability query
                var ublty = new ubltymodel.Usbltys();
                ublty.fetch({
                    async: false,
                    success: function(){
                        _.each(ublty.models,function(row){
                            if((after_month+1)==row.get("mount") && after_year==row.get("year"))
                            {
                                calendar_html +=   '  <a href="#main/makersrv/'+after_month+'/'+after_year+'"><img src="images/next.png" width="25" height="18" style="vertical-align:middle;"></a>';
                            }
                        });
                    }
                });

                calendar_html +=   '</td></tr>';
                calendar_html += '<tr>';

                //Hafta bilgileri hesaplanıyor
                //Week information is calculated
                var first_week_day = new Date(year, month, 0).getDay();
                for(var week_day= 0; week_day < 7; week_day++) {
                    calendar_html += '<td class="weekDay">' + weekDay[week_day] + '</td>';
                }
                calendar_html += '</tr><tr>';

                for(week_day = 0; week_day < first_week_day; week_day++) {
                    calendar_html += '<td></td>';
                }
                week_day = first_week_day;

                //Günler ekrana basılıyor
                //Days screen printed
                for(var day_counter = 1; day_counter <= days_in_this_month; day_counter++) {
                    week_day %= 7;

                    var sayb=0, sayl=0, sayd=0;
                    var rb=0, rl=0, rd=0;
                    var rsb,rsl,rsd;

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

                    //yil ve öğüne göre statusId bulunuyor
                    //find year and month by statusId
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
                                    rsb=statusData[j].statusId;
                                }
                                else if(i==1)
                                {
                                    sayl++;
                                    rsl=statusData[j].statusId;
                                }
                                else if(i==2)
                                {
                                    sayd++;
                                    rsd=statusData[j].statusId;
                                }
                            }
                        }
                    }

                    //Rezervasyon bilgilerinde arama yapılıyor
                    //Reservation information in query
                    var clndrPopupİmgTempB= 0,clndrPopupİmgTempL= 0, clndrPopupİmgTempD=0;
                    for(var i=0; i<3;i++)
                    {
                        if(i==0)
                        {
                            var data=rsb;
                        }
                        else if(i==1)
                        {
                            var data=rsl;
                        }
                        else if(i==2)
                        {
                            var data=rsd;
                        }
                        for(var j=0;j<reservationData.length;j++)
                        {
                            //statusId ve userID ye göre rezervasyon sorgulaması yapılıyor
                            //statusId and userID by reservation query
                            if(reservationData[j].userId==userID && reservationData[j].statusId==data)
                            {
                                    if(i==0)
                                    {
                                        rb++;
                                    }
                                    else if(i==1)
                                    {
                                        rl++;
                                    }
                                    else if(i==2)
                                    {
                                        rd++;
                                    }
                            }

                            //Tarihe reservasyon yapılmışmı sorgulanıyor
                            //Do you have a reservation on this date? Query...
                            if(reservationData[j].statusId==data)
                            {
                                if(i==0)
                                    clndrPopupİmgTempB++;
                                else if(i==1)
                                    clndrPopupİmgTempL++;
                                else if(i==2)
                                    clndrPopupİmgTempD++;
                            }
                        }

                    }

                    if(week_day == 0)
                        calendar_html += '</tr><tr>';

                    calendar_html += '<td class="monthDay"><b><u>' + day_counter + '</u></b><br><p id="calendar_p_tag">';


                    //Kahvaltı Checkbox kontrolleri ve ekrana yazdırma
                    //Breakfast Checkbox control and screen printed
                    if(clndrPopupİmgTempB>0)
                        calendar_html += '<img src="images/calendar.png" class="min-calendar-png" id="b_'+ yil + '" width="15" height="15" >';

                    calendar_html +='<input type="checkbox" name="checkId[]" value="b_'+ yil + '" id="b_'+ yil + '"';
                    if(yil<=now)
                        calendar_html +=' disabled ';
                    if(sayb==0)
                    {
                        calendar_html +=' disabled ';
                    }
                    else
                    {
                        if(rb!=0)
                            calendar_html +='checked="checked"';
                    }
                    calendar_html +='><label for="b_'+ yil + '">'+languageTextMakeRsrvMealBreakfast+'</label></br>';

                    //Öğle Checkbox kontrolleri ve ekrana yazdırma
                    //Launch Checkbox control and screen printed
                    if(clndrPopupİmgTempL>0)
                        calendar_html += '<img src="images/calendar.png" class="min-calendar-png" id="l_'+ yil + '" width="15" height="15" >';

                    calendar_html +='<input type="checkbox" name="checkId[]" value="l_'+ yil + '" id="l_'+ yil + '"';
                    if(yil<=now)
                        calendar_html +=' disabled ';
                    if(sayl==0)
                    {
                        calendar_html +=' disabled ';
                    }
                    else
                    {
                        if(rl!=0)
                            calendar_html +='checked="checked"';
                    }
                    calendar_html +='><label for="l_'+ yil + '">'+languageTextMakeRsrvMealLaunch+'</label></br>';

                    //Akşam Checkbox kontrolleri ve ekrana yazdırma
                    //Dinner Checkbox control and screen printed
                    if(clndrPopupİmgTempD>0)
                        calendar_html += '<img src="images/calendar.png" class="min-calendar-png" id="d_'+ yil + '" width="15" height="15" >';

                    calendar_html +='<input type="checkbox" name="checkId[]" value="d_'+ yil + '" id="d_'+ yil + '"';
                    if(yil<=now)
                        calendar_html +=' disabled ';
                    if(sayd==0)
                    {
                        calendar_html +=' disabled ';
                    }
                    else
                    {
                        if(rd!=0)
                            calendar_html +='checked="checked"';
                    }
                    calendar_html +='><label for="d_'+ yil + '">'+languageTextMakeRsrvMealDinner+'</label></br>';


                    calendar_html += '</p></td>';

                    week_day++;
                    rsb=0,rsl=0,rsd=0,clndrPopupİmgTempB=0,clndrPopupİmgTempL=0,clndrPopupİmgTempD=0;
                }
                calendar_html += '</tr>';
                calendar_html += '</table>';


                return "<div class='clndr'><div id='title'>"+languageTextMainButtonMakeRsrv+"</div>"+calendar_html+"<br><button class='button button-blue make_reservation_save saveandupdatebuton' id='main2_button'>"+languageTextMakeRsrvMealSaveButton+"</button> </div>";
            }

            //calender fonksiyonu çalıştırılarak
            //Calendar function run
            this.$el.html(calendar(month,year,day));

        },
        popupOpen:function(){
            if(popupTemp==0)
            {
                //Popup'ı ekrana bastı
                //Popup screen printed
                $(".min-calendar-png").click(function(event) {
                    popupdiv.render(event.target.id);
                });
                popupTemp++;
            }
        },
        make_reservation_save: function(){

            //Lütfen Bekleyin ekrana basılıyor
            //Please Wait screen printed
            $("body").append("<div id='loadingg'><img src='images/"+languageLoading+"' width='300' height='100'> </div>");

            //checkbox verileri alınıyor
            //Get checkbox value
            var cboxes = document.getElementsByName('checkId[]');
            var len = cboxes.length;

            var date = new Date();

            for (var i=0; i<len; i++) {
                var temp= cboxes[i].value.split("_");

                //statusId alınıyor
                //Get statusId
                var sttsId;
                for(var j=0;j<statusData.length;j++)
                {
                    if(statusData[j].date==temp[1] && statusData[j].meal==temp[0])
                    {
                        sttsId = statusData[j].statusId;
                    }
                }

                //statusId ve userID ye göre reservasyon sorgulaması yapılıyor
                //statusId and userID by reservation query
                var tmp= 0,reservationId;
                for(var j=0;j<reservationData.length;j++)
                {
                    if(reservationData[j].userId==userID && reservationData[j].statusId==sttsId)
                    {
                        tmp++;
                        reservationId = reservationData[j].reservationId;
                    }
                }

                //checkboxların işaretlenip işaretlenmemesi kontrol ediliyor
                //checkbox sign control
                if(cboxes[i].checked)
                {
                    if(tmp==0)
                    {
                        //reservasyon kaydı yapılıyor
                        //Reservation saved
                        var reservation2 = new reservationmodel.Reservastion({userId:userID,statusId:sttsId,createUser:userID,createDate:date,updateUser:userID,updateDate:date});
                        reservation2.save(null,{
                            async: false,
                            success: function(){
                                console.log("Date: "+temp[1]+" Meal: "+temp[0]+" Başarılı");
                            }
                        });
                    }
                }
                else
                {
                    if(tmp>0)
                    {
                        //Rezervasyon siliniyor
                        //Reservation deleted
                        var reservation2 = new reservationmodel.Reservastion({id: reservationId});
                        reservation2.destroy({
                            success: function(){
                                console.log("ReservationId:"+reservationId+" Silindi");
                            }
                        });
                    }

                }
            }

            //Lütfen bekleyiniz kaldırılıyor
            //Please Loading removed
            $('#loadingg').remove();
            alert(languageTextMakeRsrvMealSaveAlert);
            location.reload();
        }

    });
});