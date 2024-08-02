<?php
include "db.php";

$response = array();
$username = $_POST['email'];
$password = $_POST['password'];

$selectQuery = "SELECT * FROM users WHERE `username`='$username' AND `password`='$password' AND `status`='Active'";
$return = mysqli_query($conn, $selectQuery);
if ($return){
      $rowcount = mysqli_num_rows($return);
      if($rowcount > 0){
            $dataArr = mysqli_fetch_object($return);
            $response['user_data'] = $dataArr;
            $response['message'] = "User found.";
            $response['result'] = true;
            $response['status'] = 'success';
      }else{
            $response['message'] = "Username/Password does not exist.";
            $response['result'] = false;
            $response['status'] = 'failed';
      }
}else{
      $response['message'] = $return;
      $response['result'] = false;
}
echo json_encode($response);

?>