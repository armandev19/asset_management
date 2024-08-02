<?php
$img_response = array();
//upload image
$targetDirectory = "asset_management/uploads/";
$uploadedFile = $_FILES['file'];

$targetPath = $_SERVER['DOCUMENT_ROOT'] . '/' . $targetDirectory . basename($uploadedFile['name']);
if (move_uploaded_file($uploadedFile['tmp_name'], $targetPath)) {
    $img_response['img_msg'] = "File uploaded successfully.";
} else {
    $img_response['img_msg'] = "File upload failed.";
}

echo json_encode($img_response);
?>