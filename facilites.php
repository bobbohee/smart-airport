<?php
  $ch = curl_init();

  $facilitesName = "";
  if (isset($_GET["facilitesName"])) {
    $facilitesName = $_GET["facilitesName"];
  }

  $url = 'http://openapi.airport.kr/openapi/service/FacilitiesInformation/getFacilitesInfo?ServiceKey=qQyghynMjWVFQFaN3ZiF1neNgFaug%2FlVHSJQUgaXaBgNcG2dRjiAPV%2F0qFNoiUCcntIghxOYfmsHVMV6tbQUnw%3D%3D&ServiceKey=qQyghynMjWVFQFaN3ZiF1neNgFaug%252FlVHSJQUgaXaBgNcG2dRjiAPV%252F0qFNoiUCcntIghxOYfmsHVMV6tbQUnw%253D%253D&pageNo=1&numOfRows=363&lang=K&facilitynm=' . $facilitesName;
  // echo $url;

  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
  curl_setopt($ch, CURLOPT_HEADER, FALSE);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
  $response = curl_exec($ch);
  curl_close($ch);

  $xml = simplexml_load_string($response);
  
  $body = $xml->body;
  $items = $body->items;
  $itemlist = $items->item;
  
  $facilites = array();
  $no = 0;
  
  foreach( $itemlist as $item ) {
    
    $facilites[$no] = array(
      "facilitynm"=>$item->facilitynm,    // 상호명
      "floorinfo"=>$item->floorinfo,      // 층
      "lcnm"=>$item->lcnm,                // 위치
      "servicetime"=>$item->servicetime,  // 시간
      "tel"=>$item->tel                   // 전화번호
    );

    $no++;
    
  }
  
  echo json_encode($facilites, JSON_UNESCAPED_UNICODE);
  
?>