$(document).ready(function() { 
    var options = { 
        target:        '#image_previewer',  
        beforeSubmit:  showRequest,  
        success:       showResponse   
    }; 
 
    $('#uploader').submit(function() { 
        $(this).ajaxSubmit(options); 
        return false; 
    }); 

    var gears = "";
    $.getJSON("sql_fetch.php", {table: "gallery_gear", sort: "CAMERA", elm: "all"}, function(data) {
        $.each(data, function(index, gear) {
            gears += "<OPTION VALUE='" + gear.ID + "'>" + gear.CAMERA + "</OPTION>"; 
        });

        $("#image_gear").html(gears);
    });

    var cats = "";
    $.getJSON("sql_fetch.php", {table: "gallery_categories", sort: "CATEGORY", elm: "all"}, function(data) {
        $.each(data, function(index, cat) {
            cats += "<OPTION VALUE='" + cat.ID + "'>" + cat.CATEGORY + " - " + cat.SERIE + "</OPTION>"; 
        });

        $("#image_category").html(cats);
        $("#collection").html(cats);        
    });

  	
}); 

 
function showRequest(formData, jqForm, options) { 
    var queryString = $.param(formData); 
 
    alert('About to submit: \n\n' + queryString); 
    return true; 
} 
 
function showResponse(responseText, statusText, xhr, $form)  { 
    alert('status: ' + statusText + '\n\nresponseText: \n' + responseText); 
} 
