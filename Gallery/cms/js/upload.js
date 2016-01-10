$(document).ready(function() { 
    var options = { 
        target:        '#image_previewer',   // target element(s) to be updated with server response 
        beforeSubmit:  showRequest,  // pre-submit callback 
        success:       showResponse  // post-submit callback 
    }; 
 
    $('#uploader').submit(function() { 
        $(this).ajaxSubmit(options); 
        return false; 
    }); 
    
    var url = "../sql_fetch.php";
    $.getJSON(url, function(data){
  	 $.each(data.photos, function(i, photo){
  		var newRow = "id: " + photo.ID + " - title: " + photo.CAMERA;
  		console.log(newRow);
  		$("#image_previewer").html(newRow);
  	 });
    });
  	
  	
}); 
 
function showRequest(formData, jqForm, options) { 
    var queryString = $.param(formData); 
 
    alert('About to submit: \n\n' + queryString); 
    return true; 
} 
 
function showResponse(responseText, statusText, xhr, $form)  { 
    alert('status: ' + statusText + '\n\nresponseText: \n' + responseText + 
        '\n\nThe output div should have already been updated with the responseText.'); 
} 