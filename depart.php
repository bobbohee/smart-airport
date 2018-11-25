<?php

$ch = curl_init();

$url = 'http://openapi.airport.kr/openapi/service/StatusOfDepartures/getDeparturesCongestion?ServiceKey=qQyghynMjWVFQFaN3ZiF1neNgFaug%2FlVHSJQUgaXaBgNcG2dRjiAPV%2F0qFNoiUCcntIghxOYfmsHVMV6tbQUnw%3D%3D&terno=1'; /*URL*/

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
$response = curl_exec($ch);
curl_close($ch);

$xml = simplexml_load_string($response);

$body = $xml->body;
$items = $body->items;
$item = $items->item;

$cgtdt = $item->cgtdt;
$cgthm = $item->cgthm;
$gateinfo1 = $item->gateinfo1;
$gateinfo2 = $item->gateinfo2;
$gateinfo3 = $item->gateinfo3;
$gateinfo4 = $item->gateinfo4;

$depart = array(
  "cgtdt" => $cgtdt,
  "cgthm" => $cgthm,
  "gateinfo1" => $gateinfo1,
  "gateinfo2" => $gateinfo2,
  "gateinfo3" => $gateinfo3,
  "gateinfo4" => $gateinfo4
);

echo json_encode($depart);

?>