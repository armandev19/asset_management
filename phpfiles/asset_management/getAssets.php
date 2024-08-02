<?php
include "db.php";

$response = array();
$dataArr = array();

if(isset($_POST['search'])){
      $selectQuery = "SELECT *, b.name as loc_name, a.id as item_id FROM assets as a LEFT JOIN locations as b ON b.id=a.original_location WHERE a.asset_name LIKE '%$_POST[search]%' OR a.asset_code LIKE '%$_POST[search]%' OR a.asset_description LIKE '%$_POST[search]%' ORDER BY a.id DESC";
}else{
      $selectQuery = "SELECT *, b.name as loc_name, a.id as item_id FROM assets as a LEFT JOIN locations as b ON b.id=a.original_location ORDER BY a.id DESC";
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