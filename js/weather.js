$(function () {

  function getAirCode(airline, airport) {

    var airline = airline ? airline : "";
    var airport = airport ? airport : "";

    var key = 'qQyghynMjWVFQFaN3ZiF1neNgFaug%2FlVHSJQUgaXaBgNcG2dRjiAPV%2F0qFNoiUCcntIghxOYfmsHVMV6tbQUnw%3D%3D';

    var url = 'http://openapi.airport.kr/openapi/service/StatusOfPassengerWeahter/getPassengerDeparturesW';
    url += '?' + encodeURIComponent('ServiceKey') + '=' + key;
    url += '&' + encodeURIComponent('ServiceKey') + '=' + encodeURIComponent(key);
    url += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
    url += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('500');
    url += '&' + encodeURIComponent('from_time') + '=' + encodeURIComponent('0000');
    url += '&' + encodeURIComponent('to_time') + '=' + encodeURIComponent('2400');
    url += '&' + encodeURIComponent('airline') + '=' + encodeURIComponent(airline); /* 항공사 코드 */
    url += '&' + encodeURIComponent('airport') + '=' + encodeURIComponent(airport); /* 출발지 공항 코드 */
    url += '&' + encodeURIComponent('lang') + '=' + encodeURIComponent('10');

    console.log(url);

    $.get(url, function (res) {
      console.log(res);

      var items = $(res).find("item");
      for (let i = 0; i < items.length; i++) {
        var airport = $(items[i]).find("airport").text();
        var airportCode = $(items[i]).find("airportCode").text();
        var option = "<option value='" + airportCode + "'>" + airport + "</option>";
        $("#airportCode").append(option);
      }

    });

  }

  function getWeatherCode(airline, airport) {
    var key = 'qQyghynMjWVFQFaN3ZiF1neNgFaug%2FlVHSJQUgaXaBgNcG2dRjiAPV%2F0qFNoiUCcntIghxOYfmsHVMV6tbQUnw%3D%3D';

    var url = 'http://openapi.airport.kr/openapi/service/StatusOfPassengerWeahter/getPassengerDeparturesW';
    url += '?' + encodeURIComponent('ServiceKey') + '=' + key;
    url += '&' + encodeURIComponent('ServiceKey') + '=' + encodeURIComponent(key);
    url += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
    url += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100');
    url += '&' + encodeURIComponent('from_time') + '=' + encodeURIComponent('0000');
    url += '&' + encodeURIComponent('to_time') + '=' + encodeURIComponent('2400');
    url += '&' + encodeURIComponent('airline') + '=' + encodeURIComponent(airline); /* 항공사 코드 */
    url += '&' + encodeURIComponent('airport') + '=' + encodeURIComponent(airport); /* 출발지 공항 코드 */
    url += '&' + encodeURIComponent('lang') + '=' + encodeURIComponent('10');

    console.log(url);

    $("#weather ul li").remove();
    $.get(url, function (res) {
      console.log(res);

      var items = $(res).find("item");
      for (let i = 0; i < items.length; i++) {
        // var airline = $(items[i]).find("airline").text();
        // var airport = $(items[i]).find("airport").text();
        // var airportCode = $(items[i]).find("airportCode").text();
        var scheduleDateTime = $(items[i]).find("scheduleDateTime").text();
        var hour = scheduleDateTime.substring(0, 2);
        var bun = scheduleDateTime.substring(2, 4);

        // var estimatedDateTime = $(items[i]).find("estimatedDateTime").text();
        var flightId = $(items[i]).find("flightId").text();
        // var gatenumber = $(items[i]).find("gatenumber").text();
        var himidity = $(items[i]).find("himidity").text();
        var maxtem = $(items[i]).find("maxtem").text();
        var mintem = $(items[i]).find("mintem").text();
        // var remark = $(items[i]).find("remark").text();
        // var terminalid = $(items[i]).find("terminalid").text();
        var wimage = $(items[i]).find("wimage").text();
        // var wind = $(items[i]).find("wind").text();
        // var yoil = $(items[i]).find("yoil").text();
        var p = 
          // "<p>" + "공항코드 : " + airportCode + "</p>" +
          "<p>" + "도착 시간 : " + hour + "시 " + bun + "분" + "</p>" +
          // // "<p>" + "변경시간 : " + estimatedDateTime + "</p>" +
          "<p>" + "편명 : " + flightId + "</p>" +
          // "<p>" + "탑승구 : " + gatenumber + "</p>" +
          "<p>" + "습도 : " + himidity + "%</p>" +
          "<p>" + "최고 : " + maxtem + "도" + " / " + "최저 : " + mintem + "도</p>"
          // "<p>" + "현황 : " + remark + "</p>" +
          // "<p>" + "터미널 : " + terminalid + "</p>" +
          // "<p>" + "날씨 이미지 : " + wimage + "</p>" +
          // "<p>" + "풍속 : " + wind + "</p>" +
          // "<p>" + "날씨표출 요일 : " + yoil + "</p>" +
          ;
        var li = "<li class='ui-first-child ui-last-child'>" +
              "<a href='#' rel='external' class='ui-btn ui-btn-icon-right ui-icon-carat-r'>" + 
              "<img src='" + wimage + "' width='50' height='50' />" + 
                p + 
              "</a>" +
          "</li>";
        $("#weather ul").append(li);
      }
    });
  }

  /* SELECT OPTION */

  var airlineCode, airportCode;

  $("#airlineCode").on("change", function () {
    airlineCode = $(this).val();
    $("#airportCode option").remove();
    $("#airportCode").append("<option value=''>출발 공항</option>");
    getAirCode(airlineCode, "");
  });
  $("#airportCode").on("change", function () {
    airportCode = $(this).val();
    getAirCode(airlineCode, airportCode);
    getWeatherCode(airlineCode, airportCode);
  });
});
