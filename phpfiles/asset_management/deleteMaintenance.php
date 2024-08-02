<?php
include "db.php";

$response = array();
$dataArr = array();

$id = $_POST['id'];

$selectQuery = "DELETE FROM asset_maintenance WHERE id='$id' ";
$return = mysqli_query($conn, $selectQuery);
if ($return){
    $response['status'] = 'success';
    $response['result'] = true;
}else{
    $response['status'] = 'failed';
    $response['result'] = false;
}


echo json_encode($response);

?>