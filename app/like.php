<?php
 
$token = $_POST['user_token'];
$media_id = $_POST['media_id'];

$fields = array(
  'access_token'=>$token,
  'action'=>'like'
);

$url = "https://api.instagram.com/v1/media/$media_id/likes";

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl,CURLOPT_POST,1);
curl_setopt($curl,CURLOPT_POSTFIELDS, http_build_query($fields));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
echo curl_exec($curl);
curl_close($curl);

?>