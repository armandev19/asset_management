<?php
$conn = mysqli_connect('localhost', 'root', 'YgtDGdmoEn'); 
$database =  mysqli_select_db($conn, 'asset_management');

// echo json_encode($conn)
//hostinger
// $conn = mysqli_connect("127.0.0.1", "u278714988_test", "BH/mOp;d1"); 
// $database =  mysqli_select_db($conn, 'u278714988_test');

//infinityfree
// $conn = mysqli_connect('sql313.epizy.com', 'epiz_34224108', 'aHJM0oI8Ttl7');
// $database = mysqli_select_db($conn, 'epiz_34224108_asset_management');

// $servername = "localhost";
// $username = "root";
// $password = "YgtDGdmoEn";
// $dbname = "asset_management";

// $conn = new mysqli($servername, $username, $password, $dbname);

// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error);
// } else {
//     echo "Connected successfully<br>";
//     echo "Server info: " . $conn->server_info . "<br>";
//     echo "Client info: " . $conn->client_info . "<br>";
//     echo "Host info: " . $conn->host_info . "<br>";
//     echo "Server version: " . $conn->server_version . "<br>";
//     echo "Client version: " . $conn->client_version . "<br>";
// }

// $sql = "SELECT * FROM users"; // replace with your actual query
// $result = $conn->query($sql);

// if ($result) {
//     while ($row = $result->fetch_assoc()) {
//         echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. "<br>";
//     }
// } else {
//     echo "Error executing query: " . $conn->error . "<br>";
// }

// $conn->close();

?>

<?php

//hostinger
// $host = '127.0.0.1';
// $dbname = 'u278714988_ams';
// $username = 'u278714988_ams';
// $password = '/e63yY72N9';

//local
// $host = 'localhost';
// $dbname = 'asset_management';
// $username = 'root';
// $password = 'YgtDGdmoEn';
// $conn = mysqli_connect('localhost', 'root', 'YgtDGdmoEn'); 


// $conn = mysqli_connect($host, $username, $password);
// $database =  mysqli_select_db($conn, 'asset_management');

// if (!$conn) {
//     die("Connection failed: " . mysqli_connect_error());
// }

// echo "$conn";

// mysqli_close($conn);

?>