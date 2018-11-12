$(function() {

  var key = 'qQyghynMjWVFQFaN3ZiF1neNgFaug%2FlVHSJQUgaXaBgNcG2dRjiAPV%2F0qFNoiUCcntIghxOYfmsHVMV6tbQUnw%3D%3D';
  
  var url = 'http://openapi.airport.kr/openapi/service/StatusOfDepartures/getDeparturesCongestion';
  url += '?' + encodeURIComponent('ServiceKey') + '=' + key;

  function bakpeople( n ) {
    var bak; var bakimg = "";
    if (n < 100) {
      return "";
    }
    bak = parseInt(n / 100);
    for (let i = 0; i < bak; i++) {
      bakimg += "<img src='./img/people-bak.png' width='40' height='40'>"
    }
    return bakimg;
  }

  function sippeople( n ) {
    var bak; var sip; var sipimg = "";
    if (n >= 100) {
      bak = parseInt(n / 100);
      n -= bak * 100;
    }
    sip = parseInt(n / 10);
    if (n < 10) {
      return "";
    }
    for (let i = 0; i < sip; i++) {
      sipimg += "<img src='./img/people-sip.png' width='30' height='30'>"
    }
    return sipimg;
  }
  
  $.get(url, function (res) {
    console.log(res);
    var items = $(res).find("item");
    var cgtdt = $(items[0]).find("cgtdt").text();
    var year = cgtdt.substring(0, 4);
    var month = cgtdt.substring(4, 6);
    var day = cgtdt.substring(6, 8);
    var cgthm = $(items[0]).find("cgthm").text();
    var hour = cgthm.substring(0, 2);
    var minute = cgthm.substring(2, 4);
    var date = year + "년 " + month + "월 " + day + "일 " + hour + "시 " + minute + "분 기준";
    var gateinfo1 = parseInt( $(items[0]).find("gateinfo1").text() );
    var gateinfo2 = parseInt( $(items[0]).find("gateinfo2").text() );
    var gateinfo3 = parseInt( $(items[0]).find("gateinfo3").text() );
    var gateinfo4 = parseInt( $(items[0]).find("gateinfo4").text() );
    
    var departsu = 
    "<hr><p>" + 
      "제 1여객터미널 2번 / 제 2여객터미널 1번" + "<br>" + 
      bakpeople(gateinfo1) + sippeople(gateinfo1) + gateinfo1 + "명" + 
    "</p><hr>" +
    "<p>" + "제 1여객터미널 3번 / 제 2여객터미널 2번" + "<br>" + 
      bakpeople(gateinfo2) + sippeople(gateinfo2) + gateinfo2 + "명" + 
    "</p><hr>" +
    "<p>" + "제 1여객터미널 4번" + "<br>" + 
      bakpeople(gateinfo3) + sippeople(gateinfo3) + gateinfo3 + "명" + 
    "</p><hr>" +
    "<p>" + "제 1여객터미널 5번" + "<br>" + 
      bakpeople(gateinfo4) + sippeople(gateinfo4) + gateinfo4 + "명" + 
    "</p><hr>";
    $(".depart-su").append(departsu);
    $("h4").append(date);
  });

});