<?php
include "db.php";
$response = array();

$asset = $_POST['asset'];
$targetLocation = $_POST['targetLocation'];
$remarks = $_POST['remarks'];
$created_by = $_POST['created_by'];


$year = date('y');
$month = date('m');

$list = array();

$sth = "SELECT ref_series from asset_transfer where ref_yr='$year' and ref_month='$month' order by ref_series asc";
$data = mysqli_query($conn, $sth);
while ($row = mysqli_fetch_array($data)) {
    array_push($list, $row['ref_series']);
}

if (sizeof($list) > 0) {
foreach ($list as $arr) {
    $x = $arr;
}
$series = intval($x) + 1;
if (strlen($series) == 1) {
    $series = '000' . $series;
} else if (strlen($series) == 2) {
    $series = '00' . $series;
} else if (strlen($series) == 3) {
    $series = '0' . $series;
} else {
    $series = $series;
}
} else {
  $series = '0001';
}

$reference = 'TR'.$year.'-'.$month.'-'.$series;

$current_location = mysqli_fetch_row(mysqli_query($conn, "SELECT current_location FROM assets WHERE id='$asset'"));

$insertQuery = "INSERT INTO asset_transfer(`ref_series`,`ref_yr`,`ref_month`,`reference_no`,`asset_id`, `current_location`, `target_location`,`remarks`,`created_by`,`status`)VALUES('$series','$year','$month','$reference','$asset', '$current_location[0]','$targetLocation', '$remarks','$created_by','IN TRANSIT')";
$return = mysqli_query($conn, $insertQuery);
if ($return){
    mysqli_query($conn, "UPDATE assets SET current_location='$targetLocation' WHERE id='$asset'");
    $response['status'] = 'success';
}else{
    $response['status'] = 'failed';
}
echo json_encode($response);

?>