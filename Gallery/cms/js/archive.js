$(document).ready(function() { 

    var archive = "";
    $.getJSON("sql_fetch.php", {table: "gallery_photos", sort: "ID DESC", elm: "all"}, function(data) {
        $.each(data, function(index, tmb) {
            archive += "<IMG WIDTH='75' SRC='../photos/" + tmb.THUMB + "' CLASS='archive_tmb' ID='" + tmb.ID + "'>"; 
        });

        $("#collection_container").append(archive);
    });

    $('#collection_container').on('click', '.archive_tmb', function() {
        $("#tag_box").html("");
        
        var id = this.id;
        
        $.getJSON("sql_fetch.php", {table: "gallery_photos", sort: "", elm: id}, function(data) {
                        
            $("#uploader").attr("action", "updater.php");
            $("#uploader").attr("id", "updater");
            
            $("#image_title").val(data[0].TITLE);
            $("#image_date").val(data[0].DATE);
            $("#image_category").val(data[0].CATEGORY);
            $("#image_gear").val(data[0].GEAR);
            $("#image_description").val(data[0].DESCRIPTION);
            $("#image_previewer").html("<IMG SRC='../photos/" + data[0].THUMB + "'>");
            $(".image_uploader").html("<LABEL ID='uploader_label'>Remove image</LABEL><INPUT TYPE='BUTTON' VALUE='DELETE PHOTO' ID='image_remove'></P>");
            $(".submit").html("<INPUT TYPE='button' VALUE='CANCEL' ID='cancel'></INPUT><INPUT TYPE='submit' VALUE='UPDATE' CLASS='submit_button'></INPUT><INPUT TYPE='button' VALUE='DELETE' ID='delete'></INPUT>");
            $("#title_upload").html("UPDATE PHOTO");
            
            $.each(data, function(index, tag) {
                $("#tag_box").append("<DIV CLASS='rtag'>" + data[index].TAG + "</DIV>");  
            });

            $('#cancel').on('click', function() {
                document.getElementById("updater").reset();
                location.reload(); 
            });
            
        });
    });	
    
});