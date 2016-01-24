<?php

$host 		= "localhost";
$user 		= "root";
$pass 		= "";
$db		 	= "gallery";
$table 		= $_GET["table"];
$sort 		= $_GET["sort"];
$elm		= $_GET["elm"];

if ($elm != "all") { 
	$query 	= "SELECT * FROM " . $table . " a  
			   INNER JOIN gallery_img_tag b
			    ON a.ID = b.IMG_ID
			   INNER JOIN gallery_tags c
				ON b.TAG_ID = c.ID
			   WHERE a.ID = " . $elm ." ;"; 
} else {
	$query 	= "SELECT * FROM " . $table . " ORDER BY " . $sort . ";";
}

$mysqli = new mysqli($host, $user, $pass, $db);

if ($mysqli->connect_errno) {
	printf("Connect failed: %s\n", $mysqli->connect_error);
	exit();
}

$result = $mysqli->query($query);
$data   = array();

while ($row = mysqli_fetch_array($result, true)){
	$data[] = array_map("utf8_encode", $row); 
};

echo json_encode($data);

$result->free();
$mysqli->close();


?>

