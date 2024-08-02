<?php
include "db.php";
$response = array();

$address = $_POST['address'];
$name = $_POST['name'];
$created_by = $_POST['created_by'];

$insertQuery = "INSERT INTO locations(`name`, `address`, `created_by`)VALUES('$name','$address','$created_by')";
$return = mysqli_query($conn, $insertQuery);
if ($return){
      $response['status'] = 'success';
}else{
      $response['status'] = 'failed';
}
echo json_encode($response);

?>