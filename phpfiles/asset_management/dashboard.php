<?php
include "db.php";

$response = array();
$dataArr = array();

$dateToday = date("Y/m/d");
$currMonth = date("m");
$currYear = date("Y");

$filter = $_POST['filter'];
if($filter === 'Today'){
      $where = "WHERE DATE(created_date) = '$dateToday' AND status = 'Operational'";
      $whereMaintenance = "WHERE DATE(schedule) = '$dateToday'";
      $whereNewAsset = "WHERE DATE(purchase_date) = '$dateToday'";
}else if($filter === 'ThisMonth'){
      $where = "WHERE MONTH(created_date) = '$currMonth' AND `status` = 'Operational'";
      $whereMaintenance = "WHERE MONTH(schedule) = '$currMonth'";
      $whereNewAsset = "WHERE MONTH(purchase_date) = '$currMonth'";
}else if($filter === 'ThisYear'){
      $where = "WHERE YEAR(created_date) = '$currYear' AND `status` = 'Operational'";
      $whereMaintenance = "WHERE YEAR(schedule) = '$currYear'";
      $whereNewAsset = "WHERE YEAR(purchase_date) = '$currYear'";
}else{
      $where = "WHERE status = 'Operational'";
      $whereMaintenance = "";
      $whereNewAsset = "";
}

$allAssets = "SELECT * FROM assets $where";
$forMaintenance = "SELECT * FROM asset_maintenance $whereMaintenance";
$newAssets = "SELECT * FROM assets $whereNewAsset";

$returnForMaintenance = mysqli_query($conn, $forMaintenance);
$returnNewAssets = mysqli_query($conn, $newAssets);
$return = mysqli_query($conn, $allAssets);

      $response['operational'] = $return ? mysqli_num_rows($return) : 0;
      $response['forMaintenance'] = $returnForMaintenance ? mysqli_num_rows($returnForMaintenance) : 0;
      $response['newAssets'] = $returnNewAssets ? mysqli_num_rows($returnNewAssets) : 0;
      $response['result'] = true;
      



echo json_encode($response);

?>