<?php
include "db.php";
$response = array();

$id = $_POST['id'];
$firstname = $_POST['firstname'];
$middlename = $_POST['middlename'];
$lastname = $_POST['lastname'];
$age = $_POST['age'];
$address = $_POST['address'];
$contact_num = $_POST['contact_num'];
$username = $_POST['username'];
$password = $_POST['password'];
$access_level = $_POST['access_level'];
$status = $_POST['status'];

$insertQuery = "UPDATE users set firstname = '$firstname',  middlename = '$middlename', lastname = '$lastname', age = '$age', address = '$address', contact_number = '$contact_num', username = '$username', `password` = '$password', access_level = '$access_level', `status`='$status' WHERE id = '$id'";

$return = mysqli_query($conn, $insertQuery);
if ($return){
      $response['status'] = 'success';
}else{
      $response['status'] = 'failed';
}
echo json_encode($response);

?>