$(document).ready(function() { 
    var dataArray = [];
    
    var options = { 
        target: '#image_previewer', 
        data: { keys: dataArray }
    }; 
 
    $('#updater').submit(function() {
        $('.rtag').each(function() {
            dataArray.push(this.innerHTML);
        });
        
        $(this).ajaxSubmit(options); 
        return false; 
    }); 
});
