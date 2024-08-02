<?php
include "db.php";
$response = array();

$firstname = $_POST['firstname'];
$middlename = $_POST['middlename'];
$lastname = $_POST['lastname'];
$age = $_POST['age'];
$address = $_POST['address'];
$contact_num = $_POST['contact_num'];
$username = $_POST['username'];
$password = $_POST['password'];
$access_level = $_POST['access_level'];
$created_by = $_POST['created_by'];

$insertQuery = "INSERT INTO users(`firstname`, `middlename`, `lastname`,`age`, `address`, `contact_number`,`username`, `password`, `access_level`, `status`, `created_by`)VALUES('$firstname','$middlename','$lastname','$age','$address','$contact_num','$username','$password','$access_level', 'Active' ,'$created_by')";
$return = mysqli_query($conn, $insertQuery);
if ($return){
      $response['status'] = 'success';
}else{
      $response['status'] = 'failed';
}
echo json_encode($response);

?>