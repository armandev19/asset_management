<?php
include "db.php";

$response = array();
$dataArr = array();
$report_type = $_POST['report_type'];
$date_from = date("Y-m-d", strtotime($_POST['date_from']));
$date_to = date("Y-m-d", strtotime($_POST['date_to']));


if($report_type === 'Asset'){
  $assetQuery = "SELECT asset_code, asset_name, `status`, purchase_date FROM assets WHERE purchase_date BETWEEN '$date_from' AND '$date_to'";
}else if($report_type === 'Asset Transfer'){
  $assetQuery = "SELECT aa.asset_name, loc_from.name AS 'from', loc_to.name AS 'to', tx.transfer_date FROM asset_transfer AS tx LEFT JOIN assets AS aa ON aa.id = tx. asset_id LEFT JOIN locations AS loc_from ON loc_from.id = tx.current_location LEFT JOIN locations AS loc_to ON loc_to.id = tx.target_location WHERE tx.transfer_date BETWEEN '$date_from' AND '$date_to';";
}else if($report_type === 'Maintenance'){
  $assetQuery = "SELECT a.asset_name, b.status as `status`, b.maintenance_description as `desc`, b.schedule as `sched` FROM assets as a LEFT JOIN asset_maintenance as b ON b.asset_id = a.id WHERE b.schedule BETWEEN '$date_from' AND '$date_to'";
}else{
  $assetQuery = "SELECT 
    asset_name, 
    original_price, 
    purchase_date,
    `type`
  FROM assets";
}

$return = mysqli_query($conn, $assetQuery);
if ($return){
      $rowcount = mysqli_num_rows($return);
      if($rowcount > 0){
            while($temp = mysqli_fetch_assoc($return)){
                $dataArr[] = $temp;
                $response['data'] = $dataArr;
                $response['type'] = $report_type;
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