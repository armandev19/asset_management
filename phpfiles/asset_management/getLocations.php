<?php
include "db.php";

$response = array();
$dataArr = array();

if($_POST['search'] !== ''){
      $selectQuery = "SELECT * FROM locations WHERE `name` LIKE '%$_POST[search]%' OR `address` like '%$_POST[search]%'";
}else{
      $selectQuery = "SELECT * FROM locations";
}

$return = mysqli_query($conn, $selectQuery);
if ($return){
      $rowcount = mysqli_num_rows($return);
      if($rowcount > 0){
            while($temp = mysqli_fetch_assoc($return)){
                $dataArr[] = $temp;
                $response['data'] = $dataArr;
            };
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