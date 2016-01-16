$(function() {

    $.getJSON("../sql_fetch.php", { table: "photos", cat : '' }, function(data) {
        $.each(data, function(i, photo) {
            $(".content").append("<IMG SRC='photos/" + photo.THUMB + "' ID='img_" + photo.ID + "' NAME='" + photo.FILEPATH + "' CLASS='image_list'>");
        });
    });
    
    
    $(".pop_up_image").on('click', function(){
        if ($(".pop_up_image").is(":visible")) {
            $(".pop_up_image").hide();
        } 
    });
      
    $(".image_list").on('click', function() {
        $(".pop_up_image").toggle();
        $(".pop_up_image").html("<IMG SRC='photos/" + $(this).attr('name') + "'>");
    });

});

