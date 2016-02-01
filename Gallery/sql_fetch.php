<?php

$host 		= "localhost";
$user 		= "root";
$pass 		= "";
$db		 	= "gallery";
$tableName 	= $_GET["table"];
$mnu_cat	= $_GET["cat"];
$mnu_subary = [];

switch ($tableName) {
	case "photos":	
		if ($mnu_cat != "") {
			$mnu_subary = explode(':', $mnu_cat);
			$query = "SELECT gallery_photos.*
  		      		  FROM gallery_photos
  			  		  JOIN gallery_img_tag
  			  		  ON gallery_photos.ID=gallery_img_tag.IMG_ID
  			  		  WHERE gallery_img_tag.TAG_ID='" . $mnu_subary[1] . "'";
		} else {
			$query = "SELECT gallery_photos.*, gallery_categories.SERIE, gallery_categories.LOCATION
			  		  FROM gallery_photos
			  		  JOIN gallery_categories
			  		  ON gallery_photos.CATEGORY=gallery_categories.ID
			  		  ORDER BY gallery_photos.ID DESC";
		}
	break;
	
	case "sublist":
		$query = "SELECT * FROM gallery_photos
  		    	  WHERE CATEGORY = '" . $mnu_cat . "'";
	break;
	
	case "categories":
	  	$query = "SELECT DISTINCT LOCATION 
  		    	  FROM gallery_categories 
  		    	  ORDER BY LOCATION";
	break;

	case "submenu":
  		$query = "SELECT * 
				  FROM gallery_categories 
  		    	  WHERE LOCATION = '" . $mnu_cat . "' 
  		    	  ORDER BY SERIE";
  	break;

  	case "menu":
  		$query = "SELECT gallery_photos.*, gallery_categories.* 
				  FROM   gallery_photos 
				  JOIN   gallery_categories 
				  ON     gallery_categories.ID=gallery_photos.CATEGORY
				  WHERE  gallery_categories.LOCATION='" . $mnu_cat . "'";
  	break;

  	case "tagwall":
  		$query = "SELECT * 
  				  FROM gallery_tags
  		    	  GROUP BY TAG"; 
	break;

  	case "taglist":
  		$query = "SELECT gallery_tags.TAG 
  				  FROM gallery_tags, gallery_img_tag
				  WHERE gallery_tags.ID = gallery_img_tag.TAG_ID
				  AND gallery_img_tag.IMG_ID = '" . $mnu_cat . "'";
	break;	
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