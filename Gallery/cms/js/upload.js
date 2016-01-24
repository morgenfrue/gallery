$(document).ready(function() { 
    var dataArray = [];
    
    var options = { 
        target: '#image_previewer', 
        data: { keys: dataArray }
    }; 
 
    $('#uploader').submit(function() {
        $('.rtag').each(function() {
            dataArray.push(this.innerHTML);
        });
        
        $(this).ajaxSubmit(options); 
        return false; 
    }); 
    
    $('#image_date').datepicker( {
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'MM yy',
        yearRange: '1900:2020',
        monthNamesShort: [ "January", "February", "March", "April",
                           "May", "June", "July", "August", "September",
                           "October", "November", "December" ],
        onClose: function(dateText, inst) { 
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year  = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(year, month, 1));
        }
    });

    var gears = "<OPTION>CHOOSE CAMERA</OPTION><OPTION>------------------------</OPTION>";
    $.getJSON("sql_fetch.php", {table: "gallery_gear", sort: "CAMERA", elm: "all"}, function(data) {
        $.each(data, function(index, gear) {
            gears += "<OPTION VALUE='" + gear.ID + "'>" + gear.CAMERA + "</OPTION>"; 
        });

        $("#image_gear").html(gears);
    });

    var cats = "<OPTION>CHOOSE LOCATION</OPTION><OPTION>------------------------</OPTION>";
    $.getJSON("sql_fetch.php", {table: "gallery_categories", sort: "LOCATION", elm: "all"}, function(data) {
        $.each(data, function(index, cat) {
            cats += "<OPTION VALUE='" + cat.ID + "'>" + cat.LOCATION + " - " + cat.SERIE + "</OPTION>"; 
        });

        $("#image_category").html(cats);
        $("#collection").html(cats);        
    });

    var tags = "<OPTION>CHOOSE TAG</OPTION><OPTION>------------------------</OPTION>";
    $.getJSON("sql_fetch.php", {table: "gallery_tags", sort: "ID", elm: "all"}, function(data) {
        $.each(data, function(index, tag) {
            tags += "<OPTION VALUE='" + tag.TAG + "'>" + tag.TAG + "</OPTION>"; 
        });

        $("#image_tags").html(tags);
    });

    $('#select_tag').on("click", function(){
        var newTag = $("#image_tags").val();
        $("#tag_box").append("<DIV CLASS='rtag'>" + newTag + "</DIV>");
        
        $(".rtag").on("click", function() {
            $(this).remove(); 
        });
     });
    
    $('#add_tag').on("click", function(){
       var newTag = $("#image_add_tag").val();
       $("#tag_box").append("<DIV CLASS='rtag'>" + newTag + "</DIV>");
       $('#image_add_tag').val("");
       
       $(".rtag").on("click", function() {
           $(this).remove(); 
       });
    });
  	

}); 