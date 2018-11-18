<?php 
  $key = 'qQyghynMjWVFQFaN3ZiF1neNgFaug%2FlVHSJQUgaXaBgNcG2dRjiAPV%2F0qFNoiUCcntIghxOYfmsHVMV6tbQUnw%3D%3D';
  $url = 'http://openapi.airport.kr/openapi/service/StatusOfDepartures/getDeparturesCongestion';
  $url .= '?' + encodeURIComponent('ServiceKey') + '=' + $key;

  $xml = simplexml_load_file($news); // XML 파일으로 객체를 생성한다
  echo $xml;
?>