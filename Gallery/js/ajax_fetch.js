    
function createGallery(table, cat, header) {
    $(".content").html("<DIV CLASS='content_title'>" + header.toUpperCase() + "</DIV>");
    
    $.getJSON("../sql_fetch.php", { table: table, cat: cat }, callBackWithPagination);
    
    function callBackWithPagination(data) {
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
            box += "<IMG SRC='photos/" + imgArray[i].thumb + "' ID='img_" + imgArray[i].id + "' NAME='" + i + "' CLASS='image_list' WIDTH='" + imgArray[i].twidth + "' HEIGHT='" + imgArray[i].theight + "'>";
            box += "</DIV>";
                    
            $(".content").append(box);
        });


        var start    = 0;
        var end      = $(".image_box").length;
        var $images  = $(".image_box");
        var pages, ppages;

        $images.slice(0, 7).hide();        
        $images.slice(0, 7).fadeIn("slow");        
        $images.slice(8, end).hide();
        $(".prev_page").css("display", "none");
        
        function nextPage() {
                start    = start + 9;
                pages    = start + 8;
                ppages   = start - 1;
            
            console.log("FORWARD -> Total pages: " + $(".image_box").length + " Start: " + start + " End: " + end + " Pages: " + pages);

            $(".prev_page").css("display", "block");

            $images.slice(start - start, ppages).hide();
            $images.slice(start, pages).fadeIn("slow");

            
            if (pages >= end) {
                $(".next_page").css("display", "none");
            }
            
            $images.slice(pages + 1, end).hide();
            
        }
        

        function prevPage() {
                pages    = pages - 9;
                start    = pages - 8;                
                ppages   = pages + 1;

            console.log("BACK -> Total pages: " + $(".image_box").length + " Start: " + start + " End: " + end + " Pages: " + pages);

            $(".next_page").css("display", "block");

            if (start <= '0') {
                $(".prev_page").css("display", "none");
            } else {
                $images.slice(start - start, pages - 1).hide();
            }
            
            $images.slice(ppages, end).hide();
            $images.slice(start, pages).fadeIn("slow");
        }
        
           
        $(".next_page").on("click", function() {
            nextPage();
        });
        
        $(".prev_page").on("click", function() {
            prevPage();   
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

            tagList(imgArray[imgName].id);            
        });


        $(".popup_next").on('click', function() {
            imgName      = parseInt(imgName)+1;
            popupContent = fillContent(imgArray[imgName]);
            
            resizeBox(imgArray[imgName]);
            
            $(".popup_content").html(popupContent);

            tagList(imgArray[imgName].id);            

        });

        $(".popup_prev").on('click', function() {
            imgName      = parseInt(imgName)-1;
            popupContent = fillContent(imgArray[imgName]);
            
            resizeBox(imgArray[imgName]);
            
            $(".popup_content").html(popupContent);

            tagList(imgArray[imgName].id);            

        });
        
    }
}

function tagWall() {
    $.getJSON("../sql_fetch.php", { table: "tagwall", cat: "" }, function(data) {
        $(".tagwall").html("<P ID='tagwall_title'>TAGS</P>");
        
        $.each(data, function(i, tag) {
            $(".tagwall").append("<DIV CLASS='tagwall_tag' ID='" + tag.ID + "'>" + tag.TAG + "</DIV>");
        });
        
        $(".tagwall_tag").on('click', function() {
            var tag_clicked = $(this).attr('id');
            createGallery("photos", "tag:" + tag_clicked, "tag: " + $(this).html());
        });

    });
}

function tagList(id) {
    
    $.getJSON("../sql_fetch.php", { table: "taglist", cat: id }, function(data) {
        $(".popup_txt").append("<DIV CLASS='taglist'>");

        $.each(data, function(i, tag){
           $(".taglist").append("<DIV CLASS='tag'>#" + tag.TAG + "</DIV>"); 
        });
        
        $(".popup_txt").append("</DIV>");
    });
    
  
}
    
function resizeBox(id) {
    var marg = (parseInt(id.fwidth) + 250) / 2;
    
    $(".popup_image").width(parseInt(id.fwidth) + 250);
    $(".popup_image").css("margin-left", -marg);
    
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


