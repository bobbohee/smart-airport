$(function() {

  var key = 'qQyghynMjWVFQFaN3ZiF1neNgFaug%2FlVHSJQUgaXaBgNcG2dRjiAPV%2F0qFNoiUCcntIghxOYfmsHVMV6tbQUnw%3D%3D';
  
  var url = 'http://openapi.airport.kr/openapi/service/StatusOfDepartures/getDeparturesCongestion';
  url += '?' + encodeURIComponent('ServiceKey') + '=' + key;
  
  console.log(url);
  
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
    var date = year + "년 " + month + "월 " + day + "일 " + hour + "시 " + minute + "분";
    var gate1 = $(items[0]).find("gate1").text();
    var gate2 = $(items[0]).find("gate2").text();
    var gate3 = $(items[0]).find("gate3").text();
    var gate4 = $(items[0]).find("gate4").text();
    var gateinfo1 = $(items[0]).find("gateinfo1").text();
    var gateinfo2 = $(items[0]).find("gateinfo2").text();
    var gateinfo3 = $(items[0]).find("gateinfo3").text();
    var gateinfo4 = $(items[0]).find("gateinfo4").text();
    
    var departdo = 
    "<p>" + "T1 2번 / T2 1번 : " + gate1 + "</p>" +
    "<p>" + "T1 3번 / T2 2번 : " + gate2 + "</p>" +
    "<p>" + "T1 4번 : " + gate3 + "</p>" +
    "<p>" + "T1 5번 : " + gate4 + "</p>";
    var departsu = 
    "<p>" + "T1 2번 / T2 1번 : " + gateinfo1 + "명</p>" +
    "<p>" + "T1 3번 / T2 2번 : " + gateinfo2 + "명</p>" +
    "<p>" + "T1 4번 : " + gateinfo3 + "명</p>" +
    "<p>" + "T1 5번 : " + gateinfo4 + "명</p>";
    $(".depart-do").append(departdo);
    $(".depart-su").append(departsu);
    $("h4").append(date);
  });

});