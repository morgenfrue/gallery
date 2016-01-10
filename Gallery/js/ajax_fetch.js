/**
 * 
 */

$(document).ready(function(){
  var url = "../sql_fetch.php";
  $.getJSON(url, function(data){
	 $.each(data.photos, function(i, photo){
		var newRow = "id: " + photo.ID + " - title: " + photo.TITLE + " - date: " + photo.DATE + " - <IMG SRC='" + photo.FILEPATH + "' />";
		console.log(newRow);
		$(".content").html(newRow);
	 });
  });
	
});

