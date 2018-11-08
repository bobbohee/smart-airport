$(function() {

  var key = 'qQyghynMjWVFQFaN3ZiF1neNgFaug%2FlVHSJQUgaXaBgNcG2dRjiAPV%2F0qFNoiUCcntIghxOYfmsHVMV6tbQUnw%3D%3D';
  
  var url = 'http://openapi.airport.kr/openapi/service/StatusOfParking/getTrackingParking'; /*URL*/
  url += '?' + encodeURIComponent('ServiceKey') + '=' + key; /*Service Key*/
  url += '&' + encodeURIComponent('ServiceKey') + '=' + encodeURIComponent(key); /*공공데이터포털에서 받은 인증키*/
  url += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /*페이지번호*/
  url += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /*한 페이지 결과 수*/
  
  $.get(url, function (res) {
    console.log(res);
    var items = $(res).find("item");
    var datetm = $(items[0]).find("datetm").text();
    var year = datetm.substring(0, 4);
    var month = datetm.substring(4, 6);
    var day = datetm.substring(6, 8);
    var hour = datetm.substring(8, 10);
    var minute = datetm.substring(10, 12);
    var date = year + "년 " + month + "월 " + day + "일 " + hour + "시 " + minute + "분 기준";
    for (let i = 0; i < items.length; i++) {
      var floor = $(items[i]).find("floor").text();
      var parking = $(items[i]).find("parking").text();
      var parkingarea = $(items[i]).find("parkingarea").text();
      var danapd;
      if (i >= 0 && i < 4) { 
        danapd = $("#car .car-t1dan"); 
        floor = floor.split("장");
        floor = floor[1];
      } 
      else if (i >= 4 && i < 7) { 
        danapd = $("#car .car-t2dan"); 
        floor = floor.split("장");
        floor = floor[1];
      } 
      else if (i >= 7 && i < 10) { 
        danapd = $("#car .car-t1jan"); 
        floor = floor.split(" ");
        floor = floor[2] + " " + floor[3];
      }
      var dan = "<li>" + floor + "</br>" +
      parkingarea + " 中 " + parking + "</li>";
      danapd.append(dan);
    }
    $("#car h4").append(date);
  });

});