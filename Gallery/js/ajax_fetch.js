    
function createGallery(table, cat) {

    $.getJSON("../sql_fetch.php", { table: table, cat: cat }, function(data) {
        var imgArray     = [];
        var imgItem      = "";
        var imgName      = "";
        var imgList      = "";
        var popupContent = "";
        var box          = "";
            
        $.each(data, function(i, photo) {
            imgItem = {
                    title:   photo.TITLE, 
                    date:    photo.DATE, 
                    descr:   photo.DESCRIPTION, 
                    loc1:    photo.LOCATION, 
                    loc2:    photo.SERIE, 
                    thumb:   photo.THUMB, 
                    id:      photo.ID, 
                    filep:   photo.FILEPATH,
                    theight: photo.THEIGHT,
                    twidth:  photo.TWIDTH,
                    fheight: photo.HEIGHT,
                    fwidth:  photo.WIDTH
            };
                
            imgArray[i] = imgItem;
        });
            
       
        $.each(imgArray, function(i, n) {
            box  = "<DIV CLASS='image_box'>";
            box += "<IMG SRC='photos/" + imgArray[i].thumb + "' ID='img_" + imgArray[i].id + "' NAME='" + i + "' CLASS='image_list'>";
            box += "</DIV>";
                    
            $(".content").append(box);
        });
        
        $(function(){
            $("div.holder").jPages({
                containerID  : "content",
                perPage      : 12,
                startPage    : 1,
                startRange   : 1,
                midRange     : 5,
                endRange     : 1
            });
        });
    
        $(".popup_close").on('click', function(){
            $(".popup_image").hide();
            $(".cover").fadeOut(500);
            $(".holder").toggle();
            
            imgName = 0;
        });

      
        $(".image_list").on('click', function() {
            $(".cover").fadeTo(500, 1);

            imgName      = $(this).attr('name');
            popupContent = fillContent(imgArray[imgName]);

            resizeBox(imgArray[imgName]);
            
            $(".popup_image").toggle();
            $(".holder").toggle();
            $(".popup_content").html(popupContent);
            
        });


        $(".popup_next").on('click', function() {
            imgName      = parseInt(imgName)+1;
            popupContent = fillContent(imgArray[imgName]);
            
            resizeBox(imgArray[imgName]);
            
            $(".popup_content").html(popupContent);
        });

        $(".popup_prev").on('click', function() {
            imgName      = parseInt(imgName)-1;
            popupContent = fillContent(imgArray[imgName]);
            
            resizeBox(imgArray[imgName]);
            
            $(".popup_content").html(popupContent);
        });

    });
}
    
function resizeBox(id) {
    if (parseInt(id.fwidth) < parseInt(id.fheight)) {
        $(".popup_image").width(800);
        $(".popup_image").css("margin-left", "-400px");
    } else {
        $(".popup_image").width(1500);
        $(".popup_image").css("margin-left", "-750px");
    }
}

function fillContent(id) {
    var content  = "<DIV CLASS='popup_txt'>";
        content += "<P CLASS='popup_title'>" + id.title + "</P>";
        content += "<P CLASS='popup_descr'>" + id.descr + "</P>";
        content += "<P CLASS='popup_date'>"  + id.date + "<BR />" + id.loc2 + ", " + id.loc1 + "</P>";
        content += "</DIV>";
        content += "<IMG SRC='photos/" + id.filep + "' CLASS='popup_src'>";
        
    return content;
}


