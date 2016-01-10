/**
 * 
 */

$(document).ready(function(){
  var url = "../sql_fetch.php";
  $.getJSON(url, function(data){
	 $.each(data.locations, function(i, location){
		var newRow = "id: " + location.ID + " - location: " + location.CATEGORY;
		console.log(newRow);
		$("#image_previewer").html(newRow);
	 });
  });
	
});

