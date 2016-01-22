<?php

$host 		= "localhost";
$user 		= "root";
$pass 		= "";
$db		 	= "gallery";
$tableName 	= $_GET["table"];
$mnu_cat	= $_GET["cat"];

if ($tableName == "photos") {
  $query = "SELECT gallery_photos.*, gallery_categories.* 
			FROM gallery_photos 
			JOIN gallery_categories ON gallery_photos.CATEGORY=gallery_categories.ID
			ORDER BY gallery_photos.ID";
} 

if ($tableName == "sublist") {
  $query = "SELECT * FROM gallery_photos
  		    WHERE CATEGORY = '" . $mnu_cat . "'";	
}

if ($tableName == "categories") {
  $query = "SELECT DISTINCT LOCATION 
  		    FROM gallery_categories 
  		    ORDER BY LOCATION";
}

if ($tableName == "submenu") {
  $query = "SELECT * 
			FROM gallery_categories 
  		    WHERE LOCATION = '" . $mnu_cat . "' 
  		    ORDER BY SERIE";
}

if ($tableName == "menu") {
  $query = "SELECT gallery_photos.*, gallery_categories.* 
			FROM   gallery_photos 
			JOIN   gallery_categories 
			ON     gallery_categories.ID=gallery_photos.CATEGORY
			WHERE  gallery_categories.LOCATION='" . $mnu_cat . "'";
}

$mysqli  	= new mysqli($host, $user, $pass, $db);

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