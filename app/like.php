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

// require 'instagram.class.php';
 
// $instagram = new Instagram(array(
//   'apiKey'      => 'ba466f6c17c64ff99b229085129f7cd9',
//   'apiSecret'   => 'd4e44c6a4a2548f79412b1b2b8a37e54',
//   'apiCallback' => 'http://igliker.com/'
// ));
 
// $token = $_POST['user_token'];
// $instagram->setAccessToken($token);
 
// $id = $_POST['media_id'];
// $result = $instagram->likeMedia($id);
 
// if ($result->meta->code === 200) {
//   echo 'Success! The image was added to your likes.';
// } else {
//   echo 'Something went wrong :(';
// }

?>