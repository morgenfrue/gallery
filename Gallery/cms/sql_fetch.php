<?php

$host 		= "localhost";
$user 		= "root";
$pass 		= "";
$db		 	= "gallery";
$tableName 	= "gallery_gear";
$dbQuery 	= "SELECT * FROM " . $tableName;
$dbAry      = array();

// CONNECT
//$mysqli  	= new mysqli($host, $user, $pass, $db);
$con = @mysqli_connect($host, $user, $pass, $db);

if (!$con) {
 trigger_error('Could not connect to MySQL: ' . mysqli_connect_error());
}


$result = mysqli_query($con, $dbQuery);

while ($row = mysqli_fetch_array($result)) {
	$dbAry[] = $row;
}

echo '{"photos":' . json_encode($dbAry) . '}';


?>