<?php
include "db.php";
$response = array();

$asset_id = $_POST['asset_id'];
$description = $_POST['description'];
$estimated_cost = $_POST['cost'];
$schedule = $_POST['schedule'];
$start_date = $_POST['start_date'];
$endDate = $_POST['end_date'];
$technician = $_POST['technician'];
$created_by = $_POST['created_by'];

$insertQuery = "INSERT INTO asset_maintenance(`asset_id`, `maintenance_description`, `estimated_cost`, `schedule`, `status`, `start_date`, `end_date`, `technician`, `created_by`)VALUES('$asset_id','$description','$estimated_cost','$schedule','Pending','$start_date','$endDate','$technician','$created_by')";
$return = mysqli_query($conn, $insertQuery);
if ($return){
      $response['status'] = 'success';
}else{
      $response['status'] = 'failed';
}
echo json_encode($response);

?>