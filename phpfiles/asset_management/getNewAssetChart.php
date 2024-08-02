<?php
include "db.php";

$response = array();
$dataArr = array();

$dateToday = date("Y/m/d");
$currMonth = date("m");

$allAssets = "SELECT count(id) as 'value', `status` as 'label' from assets group by 'status'";

$return = mysqli_query($conn, $allAssets);
if ($return){
      $rowcount = mysqli_num_rows($return);
      if($rowcount > 0){
        $dataArr = [];
        $xData = [];
            while($temp = mysqli_fetch_assoc($return)){
                $yData[] =['y' => (int)$temp['value'] ];
                $xData[] = $temp['label'];
                $dataArr['xData'] = $xData;
                $dataArr['yData'] = $yData;
                $response['data'] = $dataArr;
            };
            $response['result'] = true;
      }else{
            $response['data'] = [];
            $response['result'] = false;
      }
}else{
      $response['message'] = $return;
      $response['result'] = false;
}


echo json_encode($response);

?>