<?php
include "db.php";
$response = array();

$id = $_POST['id'];
$name = $_POST['name'];
$description = $_POST['description'];
$original_location = $_POST['location'];
$original_price = $_POST['price'];
$purchase_date = date("Y-m-d", strtotime($_POST['purchaseDate']));
$status = $_POST['status'];
$created_by = $_POST['created_by'];


$insertQuery = "UPDATE assets SET asset_name='$name', asset_description='$description', original_location='$original_location', original_price='$original_price', purchase_date='$purchase_date', `status`='$status' WHERE id='$id'";
$return = mysqli_query($conn, $insertQuery);
if ($return){
      $response['status'] = 'success';
      mysqli_query($conn, "INSERT INTO logs(log_description, created_by)VALUES('Update Asset', '$created_by') ");
}else{
      $response['status'] = 'failed';
}
echo json_encode($response);

?>