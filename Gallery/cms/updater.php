<?php

function update_data($post) {
	$id				= $post["id"];
	$title 			= $post["image_title"];
	$date			= $post["image_date"];
	$category		= $post["image_category"];
	$gear			= $post["image_gear"];
	$description 	= $post["image_description"];

	$host			= "localhost";
	$user			= "root";
	$pass			= "";
	$db	 			= "gallery";
	$table			= "gallery_photos";

	$query 			= 'UPDATE ' . $table . ' 
   			      	   SET 
  				  	   TITLE="' . $title . '",
  				  	   DATE="' . $date . '",
  				  	   CATEGORY="' . $category . '",
  				  	   DESCRIPTION="' . $description . '",
  				  	   GEAR="' . $gear . '"
  				  	   WHERE ID="' . $id . '"';

	$mysqli  	= new mysqli($host, $user, $pass, $db);

	if ($mysqli->connect_errno) {
		printf("Connect failed: %s\n", $mysqli->connect_error);
		exit();
	}

	if ($mysqli->query($query)) {
		foreach($post["keys"] as &$val) {
			update_tags($id, $val);
		}
		return true;
	}
}


function update_tags() {
	
}


?>