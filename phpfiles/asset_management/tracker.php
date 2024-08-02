<?php
include "db.php";

$response = array();
$dataArr = array();

$asset_code = $_POST['asset_code']
$allAssets = "SELECT * FROM assets WHERE asset_code = '$asset_code'";

$return = mysqli_query($conn, $selectQuery);
if ($return){
      $rowcount = mysqli_num_rows($return);
      if($rowcount > 0){
            $response['data'] = $rowcount;
            $response['result'] = true;
      }else{
            $response['data'] = [];
            $response['result'] = false;
      }
}else{
      $response['message'] = $return;
      $response['result'] = false;
}


echo json_encode($response);

?>