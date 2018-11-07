$(function () {
  var key = 'qQyghynMjWVFQFaN3ZiF1neNgFaug%2FlVHSJQUgaXaBgNcG2dRjiAPV%2F0qFNoiUCcntIghxOYfmsHVMV6tbQUnw%3D%3D';

  var url = 'http://openapi.airport.kr/openapi/service/FacilitiesInformation/getFacilitesInfo';
  url += '?' + encodeURIComponent('ServiceKey') + '=' + key;
  url += '&' + encodeURIComponent('ServiceKey') + '=' + encodeURIComponent(key);
  url += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
  url += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100');
  url += '&' + encodeURIComponent('lang') + '=' + encodeURIComponent('K');

  $.get(url, function (res) {
    console.log(res);
    var items = $(res).find("item");
    for (let i = 0; i < items.length; i++) {
      var floorinfo = $(items[i]).find("floorinfo").text();
      var facilitynm = $(items[i]).find("facilitynm").text();   /* 가게 이름 */
      var lcnm = $(items[i]).find("lcnm").text();               /* 위치 */
      var servicetime = $(items[i]).find("servicetime").text(); /* 시간 */

      var li = "<li class='ui-first-child ui-last-child li-facilites'>" +
                  "<a href='#' rel='external' class='ui-btn ui-btn-icon-right ui-icon-carat-r'>" + floorinfo + " " + facilitynm + "</a>" +
                "</li>";
      $("#facilites ul").append(li);
    }
  });

  $("#facilites").on("click", ".li-facilites", function() {
    console.log(1);
  });

});