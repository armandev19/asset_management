<?php
include "db.php";
$response = array();

$id = $_POST['id'];
$name = $_POST['name'];
$address = $_POST['address'];

$insertQuery = "UPDATE locations SET `name`='$name', `address`='$address' WHERE id='$id'";
$return = mysqli_query($conn, $insertQuery);
if ($return){
      $response['status'] = 'success';
}else{
      $response['status'] = 'failed';
}
echo json_encode($response);

?>