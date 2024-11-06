<?php
include "db.php";
$response = array();

$token = $_POST['device_token'];
$id = $_POST['id'];

$updateQuery = "UPDATE users SET notif_token = '$token' WHERE id = '$id'";
$return = mysqli_query($conn, $updateQuery);
if ($return){
      $response['status'] = 'success';
}else{
      $response['status'] = 'failed';
}
echo json_encode($response);

?>