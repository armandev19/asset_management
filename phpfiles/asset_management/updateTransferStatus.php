<?php
include "db.php";
$response = array();

$id = $_POST['selectedReference'];

$insertQuery = "UPDATE asset_transfer SET status='DELIVERED' WHERE reference_no='$id'";
$return = mysqli_query($conn, $insertQuery);
if ($return){
      $response['status'] = 'success';
      // mysqli_query($conn, "INSERT INTO logs(log_description, created_by)VALUES('Update Transfer Status', '$created_by') ");
}else{
      $response['status'] = 'failed';
}
echo json_encode($response);

?>