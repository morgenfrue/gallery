$(document).ready(function() { 

    var archive = "";
    $.getJSON("sql_fetch.php", {table: "gallery_photos", sort: "ID DESC", elm: "all"}, function(data) {
        $.each(data, function(index, tmb) {
            archive += "<IMG WIDTH='75' SRC='../photos/" + tmb.THUMB + "' CLASS='archive_tmb' ID='" + tmb.ID + "'>"; 
        });

        $("#collection_container").append(archive);
    });

///    $.getJSON("sql_fetch.php", {table: "gallery_categories", sort: "CATEGORY", elm: "all"}, function(data) {
//        $.each(data, function(index, ))
//    });

    $('#collection_container').on('click', '.archive_tmb', function() {
        var id = this.id;
        $.getJSON("sql_fetch.php", {table: "gallery_photos", sort: "ID", elm: id}, function(data) {
            $("#image_title").val(data[0].TITLE);
            $("#image_date").val(data[0].DATE);
            $("#image_category").val(data[0].CATEGORY);
            $("#image_gear").val(data[0].GEAR);
            $("#image_description").val(data[0].DESCRIPTION);
            $("#image_previewer").html("<IMG SRC='../photos/" + data[0].THUMB + "'>");
            $(".image_uploader").html("<INPUT TYPE='BUTTON' VALUE='Delete photo' ID='image_remove'>");
            $(".submit").html("<INPUT TYPE='button' VALUE='Cancel' ID='cancel'></INPUT><INPUT TYPE='submit' VALUE='Update' CLASS='submit_button'></INPUT><INPUT TYPE='button' VALUE='Delete entry' ID='delete'></INPUT>");
            $("#title_upload").html("UPDATE PHOTO");
        });
    });	
});