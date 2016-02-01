<?php

/** CONFIG **/
$thumb_size		= 200;
$thumb_prefix 	= "thumb_";
$img_folder		= "../photos/";
$jpg_quality	= 100;
$twidth			= "";
$theight		= "";
$fwidth			= "";
$fheight		= "";


if (isset($_POST) && isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
	if (!isset($_FILES['image_uploader']) || !is_uploaded_file($_FILES['image_uploader']['tmp_name'])) {
		die("Image file is missing :(");
	}

	$img_name = $_FILES['image_uploader']['name'];
	$img_size = $_FILES['image_uploader']['size'];
	$img_temp = $_FILES['image_uploader']['tmp_name'];
	
	$img_size_info = getimagesize($img_temp);
	
	if ($img_size_info) {
		$img_width	=	$img_size_info[0];
		$img_height	=	$img_size_info[1];
		$img_type	=	$img_size_info['mime'];
	} else {
		die("Make sure image file is valid!");
	}
	
	switch($img_type) {
		case 'image/png':
			$image_res = imagecreatefrompng($img_temp);
			break;
		case 'image/gif':
			$image_res = imagecreatefromgif($img_temp);
			break;
		case 'image/jpeg':
			$image_res = imagecreatefromjpeg($img_temp);
			break;
		default:
			$image_res = false;
	}
	
	if ($image_res) {
		$img_info 		= pathinfo($img_name);
		$img_extension 	= strtolower($img_info["extension"]);
		$img_name_only	= strtolower($img_info["filename"]);
		
		$new_file_name	= $img_name_only . "_" . rand(0, 9999999999) . '.' . $img_extension;
		$thumb_folder	= $img_folder . $thumb_prefix . $new_file_name;
		$image_folder	= $img_folder . $new_file_name;
		
	    if (!scale_image($image_res, $thumb_folder, $img_type, $img_width, $img_height, $jpg_quality, 'thumb')) {
	        die("Error creating thumb :(");
	    }
	    if (!scale_image($image_res, $image_folder, $img_type, $img_width, $img_height, $jpg_quality, 'original')) {
	    	die("Error creating image :(");
	    }

	    if (save_data($_POST, $thumb_prefix, $new_file_name, $twidth, $theight, $fwidth, $fheight)) {
	    	echo '<IMG SRC="../photos/' . $thumb_prefix . $new_file_name . '">';
	    }

	    imagedestroy($image_res);
	}
} 


function save_data($post, $tmb, $img, $twidth, $theight, $fwidth, $fheight) {
  $title 		= $post["image_title"];
  $date			= $post["image_date"];
  $category		= $post["image_category"];
  $gear			= $post["image_gear"];
  $description 	= $post["image_description"];

  $host			= "localhost";
  $user			= "root";
  $pass			= "";
  $db	 		= "gallery";
  $table		= "gallery_photos";

  $query 		= 'INSERT INTO 
   			      ' . $table . 
  				  ' (TITLE, DATE, CATEGORY, DESCRIPTION, GEAR, FILEPATH, THUMB, TWIDTH, THEIGHT, WIDTH, HEIGHT) VALUES (
  				  "' . $title . '", 
  				  "' . $date . '", 
  				  "' . $category . '", 
  				  "' . $description . '", 
  				  "' . $gear . '", 
  				  "' . $img . '", 
  				  "' . $tmb . $img . '",
  				  "' . $twidth . '",
  				  "' . $theight . '",
  				  "' . $fwidth . '",
  				  "' . $fheight . '")';

  $mysqli  	= new mysqli($host, $user, $pass, $db);

  if ($mysqli->connect_errno) {
	  printf("Connect failed: %s\n", $mysqli->connect_error);
	  exit();
  }

  if ($mysqli->query($query)) {
    $last_id = $mysqli->insert_id;

  	foreach($post["keys"] as $param => $val) {
  		save_tags($last_id, $param, $val);
  	}
  
  	return true;
  }
  
}


function save_tags($last_id, $tag_id, $tag) {
  $host			= "localhost";
  $user			= "root";
  $pass			= "";
  $db	 		= "gallery";
  
  $_tag_id 		= explode("_", $tag_id);

  $mysqli  		= new mysqli($host, $user, $pass, $db);

  if ($mysqli->connect_errno) {
	  printf("Connect failed: %s\n", $mysqli->connect_error);
	  exit();
  }

  if ($_tag_id[0] == "new") {
  	$query 		= 'INSERT INTO gallery_tags (TAG) VALUES ("' . $tag . '");';
  	$query	   .= 'INSERT INTO gallery_img_tag (IMG_ID, TAG_ID) VALUES ("' . $last_id . '", LAST_INSERT_ID())';

  	$mysqli->multi_query($query);
  } else {
  	$query	   = 'INSERT INTO gallery_img_tag (IMG_ID, TAG_ID) VALUES ("' . $last_id . '", "' . $_tag_id[0] . '")';
  	
  	$mysqli->query($query);
  }
  
  
}


function scale_image($source, $destination, $type, $width, $height, $quality, $method) {
	global $twidth;
	global $theight;
    global $fwidth;
	global $fheight;
	
	if ($method === 'thumb') {
		$max_width  = 240;
		$max_height = 240;
	} else {
		$max_width 	= 1200;
		$max_height	= 800;
	}
	
	$scale      = min($max_width/$width, $max_height/$height);
	
	$new_width  = ceil($scale*$width);
	$new_height = ceil($scale*$height);
	
	if ($method === 'thumb') {
		$twidth  = $new_width;
		$theight = $new_height;
	} else {
		$fwidth  = $new_width;
		$fheight = $new_height;
	}
	
	$new_canvas	= imagecreatetruecolor($new_width, $new_height);
	
	if (imagecopyresampled($new_canvas, $source, 0, 0, 0, 0, $new_width, $new_height, $width, $height)) {
		save_image($new_canvas, $destination, $type, $quality);
	}
	
	return true;
}

function save_image($source, $destination, $type, $quality) {
	switch (strtolower($type)){
		case 'image/png':
			imagepng($source, $destination);
			return true;
			break;
		case 'image/gif':
			imagegif($source, $destination);
			return true;
			break;
		case 'image/jpeg':
			imagejpeg($source, $destination, $quality);
			return true;
			break;
		default:
			return false;
	}
}

?>