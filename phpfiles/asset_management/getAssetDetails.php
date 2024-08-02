<?php
include "db.php";
$response = array();
$dataArr = array();
$id = $_POST['id'];
$selectQuery = "SELECT *, a.id as id, CONCAT(users.firstname, ' ',users.lastname) as added_by, a.status as status, loc.id as loc_name, a.current_location as curr_loc, img.image_location as image_loc FROM assets as a LEFT JOIN locations as loc ON a.original_location = loc.id LEFT JOIN users as users ON users.id = a.created_by LEFT JOIN asset_images as img ON img.asset_id = a.id WHERE a.asset_code='$id'";
$return = mysqli_query($conn, $selectQuery);
if ($return){
      $rowcount = mysqli_num_rows($return);
      if($rowcount > 0){
            while($temp = mysqli_fetch_assoc($return)){
								$tempCurr = mysqli_fetch_assoc(mysqli_query($conn, "SELECT `name` FROM locations WHERE id='$temp[current_location]' "));
								$temp['curr_loc'] = $tempCurr['name'];
                $dataArr[] = $temp;
            };
            $response['data'] = $dataArr;
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