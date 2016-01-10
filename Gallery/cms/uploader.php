<?php

/** CONFIG **/
$thumb_size		= 200;
$thumb_prefix 	= "thumb_";
$img_folder		= "../photos/";
$jpg_quality	= 100;

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
		
		/* DISABLED FOR TESTING 
	    if (!scale_image($image_res, $thumb_folder, $img_type, $img_width, $img_height, $jpg_quality, 'thumb')) {
	        die("Error creating thumb :(");
	    }
	    if (!scale_image($image_res, $image_folder, $img_type, $img_width, $img_height, $jpg_quality, 'original')) {
	    	die("Error creating image :(");
	    }
	    */
	    
	    	
	    echo '<DIV>New image:';
	    echo '<IMG SRC="../photos/' . $thumb_prefix . $new_file_name . '">';
	    echo '<BR />';
	    echo '<IMG SRC="../photos/' . $new_file_name . '">';
	    echo '</DIV>';
	    
	    imagedestroy($image_res);
	}
} 


function scale_image($source, $destination, $type, $width, $height, $quality, $method) {
	
	if ($method === 'thumb') {
		$max_width  = 240;
		$max_height = 180;
	} else {
		$max_width 	= 1200;
		$max_height	= 800;
	}
	
	$scale      = min($max_width/$width, $max_height/$height);
	
	$new_width  = ceil($scale*$width);
	$new_height = ceil($scale*$height);
	
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