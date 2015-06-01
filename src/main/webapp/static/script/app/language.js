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

var language = getCookie("language");

if(language=="tr" || language=="" || language==null || language==undefined)
{
    var languageTextLogin                           ="Giriş",
        languageTextLoginUsername                   ="Kullanıcı Adı",
        languageTextLoginAuthority                  ="Rol",
        languageTextLoginPassword                   ="Parola",
        languageTextLoginErrorLogin                 ="Kullanıcı Adı veya Parola Hatalı",
        languageTextLoginButton                     ="Giriş Yap",
        languageTextMainButtonMakeRsrv              ="Rezervasyon Yap",
        languageTextMainButtonQueryRsrv             ="Rezervasyon Sorgula"
        languageTextMainButtonUploadRsrv            ="Rezervasyon Güncelle/Sil",
        languageTextMainButtonUploadRest            ="Restoran Durumu Güncelleme",
        languageTextMainButtonFileUpload            ="Aylık Menü ve Yardım Dosyası Yükleme",
        languageTextMainButtonMonthMenu             ="Aylık Menü",
        languageTextMainButtonHelp                  ="Yardım",
        languageTextMainButtonExit                  ="Çıkış",
        languageTextWelcomeWelcome                  ="HOŞ GELDİNİZ",
        languageTextWelcomeSpan1                    ="*Rezervasyon Yapmak İçin 'Reservasyon Yap' Butonuna Tıklayınız.",
        languageTextWelcomeSpan2                    ="*Rezervasyon ile ilgili problemlerde sistem yöneticinize başvurunuz.",
        languageTextWelcomeSpan3                    ="*Rezervasyon Randevusu ile ilgili düzeltmeler için sistem yöneticinize başvurunuz."
        languageTextMakeRsrvWeekDays                =new Array('Pzrt','Salı','Çarş','Perş','Cuma','Cmts','Pzr'),
        languageTextMakeRsrvMonths                  =new Array('OCAK','ŞUBAT','MART','NİSAN','MAYIS','HAZİRAN','TEMMUZ','AĞUSTOS','EYLÜL','EKİM','KASIM','ARALIK'),
        languageTextMakeRsrvMealBreakfast           ="Kahvaltı",
        languageTextMakeRsrvMealLaunch              ="Öğle",
        languageTextMakeRsrvMealDinner              ="Akşam",
        languageTextMakeRsrvMealSaveButton          ="Kaydet",
        languageTextMakeRsrvMealSaveAlert           ="Kayıt Başarılı",
        languageTextMakeRsrvMealUpdateAlert         ="Güncelleme Başarılı",
        languageLoading                             ="yukleniyor.gif",//İmage Url
        languageTextPopupBack                       ="Geri",
        languageTextMainButtonUpload                ="Yükle",
        languageTextFirstName                       ="Adı",
        languageTextLastName                        ="Soyadı",
        languageTextDate                            ="Tarih",
        languageTextQuery                           ="Sorgula",
        languageTextMeal                            ="Öğün",
        languageTextStatupDate                      ="Başlangıç Tarihi",
        languageTextEndDate                         ="Bitiş Tarihi",
        languageTextTotal                           ="Toplam",
        languageTextReservation                     ="Rezervasyon",
        languageTextReservationDate                 ="Rezervasyon Tarihi",
        languageTextAnd                             ="and",
        languageTextErrorNullDate                   ="Tarih Alanlarını Boş Bırakmayınız...",
        languageTextErrorDate                       ="Bitiş tarihini başlangıç tarihinden önce tanımladınız, lütfen doğru bilgi giriniz.",
        languageTextErrorClick                      ="Lütfen Tarihi girdikten sonra işlem yapacağınız kişinin üzerine tıklayınız",
        languageTextButtonUpdate                    ="Güncelle";
}
else if(language=="eng")
{
    var languageTextLogin                           ="Login",
        languageTextLoginUsername                   ="User Name",
        languageTextLoginAuthority                  ="Authority",
        languageTextLoginPassword                   ="Password",
        languageTextLoginErrorLogin                 ="User Name or Password Error",
        languageTextLoginButton                     ="Login",
        languageTextMainButtonMakeRsrv              ="Make Reservation",
        languageTextMainButtonQueryRsrv             ="Reservation Query"
        languageTextMainButtonUploadRsrv            ="Reservation Update/Delete",
        languageTextMainButtonUploadRest            ="Restaurant Status Update",
        languageTextMainButtonFileUpload            ="Monthly Menu and Help File Upload",
        languageTextMainButtonMonthMenu             ="Monthly Menu",
        languageTextMainButtonHelp                  ="Help",
        languageTextMainButtonExit                  ="Exit",
        languageTextWelcomeWelcome                  ="WELCOME",
        languageTextWelcomeSpan1                    ="*Make reservation for click 'Make Reservation'.",
        languageTextWelcomeSpan2                    ="*Please contact your system administrator for problems with reservations.",
        languageTextWelcomeSpan3                    ="*Adjustments related to appointment booking, please contact your system administrator for",
        languageTextMakeRsrvWeekDays                =new Array('Mon','Tue','Wed','Thu','Fri','Sat','Sun'),
        languageTextMakeRsrvMonths                  =new Array("January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December" ),
        languageTextMakeRsrvMealBreakfast           ="Breakfast",
        languageTextMakeRsrvMealLaunch              ="Launch",
        languageTextMakeRsrvMealDinner              ="Dinner",
        languageTextMakeRsrvMealSaveButton          ="Save",
        languageTextMakeRsrvMealSaveAlert           ="Successful",
        languageTextMakeRsrvMealUpdateAlert         ="Update Successful",
        languageLoading                             ="loading2.gif",//İmage Url
        languageTextPopupBack                       ="Back",
        languageTextMainButtonUpload                ="Upload",
        languageTextFirstName                       ="First Name",
        languageTextLastName                        ="Last Name",
        languageTextDate                            ="Date",
        languageTextMeal                            ="Meal",
        languageTextQuery                           ="Query",
        languageTextStatupDate                      ="Startup Date",
        languageTextEndDate                         ="End Date",
        languageTextTotal                           ="Total",
        languageTextReservation                     ="Reservation",
        languageTextReservationDate                 ="Reservation Date",
        languageTextAnd                             ="and",
        languageTextErrorNullDate                   ="Please do not leave the date fields blank.",
        languageTextErrorDate                       ="You have defined end date before the start date, please enter the correct information.",
        languageTextErrorClick                      ="Enter the date you want to operate in. After you click on the person.",
        languageTextButtonUpdate                    ="Update";

}