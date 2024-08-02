<?php
include "db.php";

$response = array();
$dataArr = array();

if(isset($_POST['search'])){
      $selectQuery = "SELECT * FROM users WHERE firstname LIKE '%$_POST[search]%' OR lastname like '%$_POST[search]%' OR middlename like '%$_POST[search]%'";
}else{
      $selectQuery = "SELECT * FROM users";
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