<?php
include "db.php";

$response = array();
$dataArr = array();
$date_from = date("Y-m-d", strtotime($_POST['date_from']));
$date_to = date("Y-m-d", strtotime($_POST['date_to']));

$assetQuery = "SELECT *, logs.created_date as log_date, logs.id as key_id FROM logs INNER JOIN users ON users.id = logs.created_by WHERE DATE(logs.created_date) BETWEEN '$date_from' AND '$date_to'";


$return = mysqli_query($conn, $assetQuery);
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


function getUser($id){
  $assetQuery = "SELECT firstname, lastname FROM users WHERE id='$id'";
  $data = mysqli_query($conn, $assetQuery);
  $result = mysqli_row_data($data);
  echo $result[0]."-".$result[1];
}
?>