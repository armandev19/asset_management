<?php
include "db.php";

$response = array();
$dataArr = array();

$selectQuery = "SELECT *, asset_t.id as key_id, asset_t.reference_no as ref_no, loc_from.name AS 'from', loc_to.name AS 'to', asset_t.status as transfer_status FROM asset_transfer as asset_t LEFT JOIN assets as a ON a.id=asset_t.asset_id LEFT JOIN `locations` as loc_to ON loc_to.id=asset_t.target_location LEFT JOIN `locations` as loc_from ON loc_from.id=asset_t.current_location  LEFT JOIN users as u ON u.id=asset_t.created_by";


// SELECT aa.asset_name, loc_from.name AS 'from', loc_to.name AS 'to', tx.transfer_date FROM asset_transfer AS tx LEFT JOIN assets AS aa ON aa.id = tx. asset_id LEFT JOIN locations AS loc_from ON loc_from.id = tx.current_location LEFT JOIN locations AS loc_to ON loc_to.id = tx.target_location

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