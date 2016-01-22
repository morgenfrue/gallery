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
          createGallery("menu", $(this).attr('id'));
      });

  });

});

function getSubmenu(id) {
    var submenu = "";
    $(".sublinks").html(id + "<HR>");

    $.getJSON("../sql_fetch.php", { table : "submenu", cat : id }, function(data) {
        
        $.each(data, function(i, item) {
            submenu = "<A CLASS='submenu' ID='" + item.ID + "'>" + item.SERIE + " </A>";
            $(".sublinks").append(submenu);
        });
        
        $(".submenu").on('click', function() {
            $(".content").html("");
            createGallery("sublist", $(this).attr('id'));
        });
    });
}
