$(document).ready(function() {
  var menu = "";
  
  $.getJSON("../sql_fetch.php", { table: "categories", cat : '' }, function(data) {

      $.each(data, function(i, cat) {
        menu    = "<A CLASS='menu' ID='" + cat.LOCATION + "'>" + cat.LOCATION.toUpperCase() + " </A>";
        $(".links").append(menu);
      });
      
      $(".menu").on('click', function() {
          $(".content").html("");
          getSubmenu($(this).attr('id'));
          createGallery("menu", $(this).attr('id'), $(this).attr('id'));
      });

  });

});

function getSubmenu(id) {
    var submenu = "";
    $(".sublinks").html("<P ID='sublinks_title'>" + id.toUpperCase() + "</P>");

    $.getJSON("../sql_fetch.php", { table : "submenu", cat : id }, function(data) {
        
        $.each(data, function(i, item) {
            submenu = "<DIV CLASS='submenu' ID='" + item.ID + "'>" + item.SERIE + " </DIV>";
            $(".sublinks").append(submenu);
        });
        
        $(".submenu").on('click', function() {
            $(".content").html("");
            $(".submenu").css("color", "#CCC");
            $(".submenu").css("font-weight", "normal");
            $(this).css("color", "#FFF");
            $(this).css("font-weight", "bold");
            createGallery("sublist", $(this).attr('id'), $(this).html());
            
        });
    });
}
