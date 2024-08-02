<?php
include "db.php";
$response = array();

$year = date('y');
$month = date('m');

$name = $_POST['name'];
$description = $_POST['description'];
$original_location = $_POST['location'];
$original_price = $_POST['price'];
$purchase_date = date("Y-m-d", strtotime($_POST['purchaseDate']));
$created_by = $_POST['created_by'];
$type = $_POST['type'];
$imageName = $_POST['imageName'];
$imageUri = $_POST['imageUri'];
$qty = $_POST['qty'];

$list = array();

$sth = "SELECT ref_series from assets where ref_yr='$year' and ref_month='$month' order by ref_series asc";
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

$reference = 'ASSET'.$year.'-'.$month.'-'.$series;


$insertQuery = "INSERT INTO assets(`ref_series`,`ref_yr`,`ref_month`,`asset_code`,`asset_name`, `asset_description`, `type`, `original_location`, `current_location`, `original_price`,`current_price`,`qty`,`status`, `purchase_date`, `created_by`)VALUES('$series','$year','$month','$reference','$name','$description', '$type','$original_location','$original_location','$original_price','$original_price',$qty,'Operational','$purchase_date','$created_by')";
$return = mysqli_query($conn, $insertQuery);
if ($return){
      $response['status'] = 'success';
      $asset_id = mysqli_insert_id($conn);
      mysqli_query($conn, "INSERT INTO asset_images(file_name, image_location, asset_id)VALUES('$imageName', '$imageUri', '$asset_id')");
      mysqli_query($conn, "INSERT INTO logs(log_description, created_by)VALUES('Add Asset', '$created_by') ");
}else{
      $response['status'] = 'failed';
}
echo json_encode($response);



function getSeries($year,$month,$conn){
      $list = array();

      $sth = "SELECT ref_series from assets where ref_yr='$year' and ref_month='$month' order by ref_series asc";
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

    return $series;
}
?>