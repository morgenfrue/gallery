/**
 * 
 */

$(document).ready(function() {
  var menu = "";
  
  $.getJSON("../sql_fetch.php", { table: "categories", cat : '' }, function(data) {

      $.each(data, function(i, cat) {
        menu    = "<A CLASS='menu' ID='" + cat.CATEGORY + "'>" + cat.CATEGORY + " </A>";
        $(".links").prepend(menu);
      });
      
      $(".menu").on('click', function() {
          $(".content").html("");
          getSubmenu($(this).attr('id'));
          getSubpage($(this).attr('id'));
      });

  });

});

function getSubmenu(id) {
    var submenu = "";
    $(".sublinks").html("");

    $.getJSON("../sql_fetch.php", { table : "submenu", cat : id }, function(data) {
        $.each(data, function(i, item) {
            submenu = "<A CLASS='submenu' ID='" + item.ID + "'>" + item.SERIE + " </A>";
            $(".sublinks").append(submenu);
        });
        
        $(".submenu").on('click', function() {
            $(".content").html("");
            getSubpage_list($(this).attr('id'));
        });
    });
}

function getSubpage_list(id) {
    var sublist = "<DIV CLASS='subitems'>";
    
    $.getJSON("../sql_fetch.php", { table: "sublist", cat : id }, function(data) {
        $.each(data, function(i, sitem) {
           sublist += "<DIV CLASS='subitem_l'>" +
                      "<DIV CLASS='img_list_info'>" + sitem.TITLE + 
                      "<BR />" + sitem.DATE + 
                      "<P>" + sitem.DESCRIPTION + "</P>" +  
                      "</DIV><DIV CLASS='img_list_item'>" +
                      "<IMG SRC='../photos/" + sitem.THUMB + "'>" +
                      "</DIV></DIV>";
        });
        
        $(".content").append(sublist + "</DIV>");

    });
}

// Get categories for subpages from menu
function getSubpage(id) {
    var newRow = "";

    $.getJSON("../sql_fetch.php", { table : "menu", cat : id }, function(data) {
        $.each(data, function(i, item) {
            newRow = "<IMG SRC='photos/" + item.THUMB + "' ID='img_" + item.ID + "' NAME='" + item.FILEPATH + "' CLASS='image_list'>";
            $(".content").append(newRow);
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
}
