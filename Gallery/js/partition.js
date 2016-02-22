$(window).load(function () {
/*    
    var start    = 0;
    var end      = $(".image_box").length;
    var $images  = $(".image_box");
    var pages, ppages;

    $images.slice(0, 12).hide();        
    $images.slice(0, 12).fadeIn("slow");        
    $images.slice(13, end).hide();
    $(".prev_page").css("display", "none");
*/
    partitionGallery();
/*       
    $(".next_page").on("click", function() {
        nextPage();
    });
    
    $(".prev_page").on("click", function() {
        prevPage();   
    });

function nextPage() {
    start    = start + 9;
    pages    = start + 8;
    ppages   = start - 1;

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

    $(".next_page").css("display", "block");

    if (start <= '0') {
        $(".prev_page").css("display", "none");
    } else {
        $images.slice(start - start, pages - 1).hide();
    }
    
    $images.slice(ppages, end).hide();
    $images.slice(start, pages).fadeIn("slow");
}
*/
});

function partitionGallery() {
    var p = $('.image_list');
    
    $(p).each(function () {
        var h = $(this).height();
        var w = $(this).width();
        $(this).attr({ 'data-aspect-ratio': w / h });
    });
    
    var photos       = p.toArray();
    var viewport     = $('.content').width();
    var ideal_height = parseInt($(window).height() / 3) - 50;
    var summed_width = photos.reduce(function(sum, img) {
        return sum += $(img).data('aspect-ratio') * ideal_height;
    }, 0);    
    
    var rows    = Math.round( summed_width / viewport );
    var weights = photos.map(function (img) {
        return parseInt($(img).data('aspect-ratio') * 100);
    });
    
    var partition = linear_partition(weights, rows);
    var index     = 0;
    var pheight = 0;
    var n = 0;
    for (var i in partition) {
        var summed_ratios;
        row_buffer = [];

        for (var j = 0; j < partition[i].length; j++) {
            row_buffer.push(photos[index++]);
        }

        summed_ratios = row_buffer.reduce(function (sum, img) {
            return sum += $(img).data('aspect-ratio');
        }, 0);

        for (var j = 0; j < row_buffer.length; j++) {
            var img = row_buffer[j];
            
            $(img).width( parseInt(viewport / summed_ratios * $(img).data("aspect-ratio")) - 20);
            $(img).height( parseInt(viewport / summed_ratios) - 20);

            $(img).parent().width($(img).width() + 20);
            $(img).parent().height($(img).height() + 20);
            
            if (n !== $(img).parent().height()) {
             pheight += $(img).parent().height();
             console.log(pheight + "-" + n);
            }
            
            if (pheight > $(window).height()) {
                console.log("true");
                $(img).css('display', 'none');
            }
            
            n = $(img).parent().height();
        }
    }    
}


function linear_partition(seq, k) {
    n = seq.length;
    
    if (k <= 0) {
        return [];
    }
    if (k > n) {
        return seq.map(function(x) { return [x]; });
    }
    
    var table = [];
    var solution = [];
    
    for (var i = 0; i < n; i++) {
        var row = [];
        for (var j = 0; j < k; j++) {
            row.push(0);
        }
        table.push(row);
    }

    for (var i = 0; i < n-1; i++) {
        var row = [];
        for (var j = 0; j < k-1; j++) {
            row.push(0);
        }
        solution.push(row);
    }
 
    for (var i = 0; i < n; i++) {
        if (i != 0) {
            table[i][0] = seq[i] + table[i-1][0];   
        } else {
            table[i][0] = seq[i];
        }
    }
  
    for (var j = 0; j < k; j++) {
        table[0][j] = seq[0];   
    }

    for (var i = 1; i < n; i++) {
        for (var j = 1; j < k; j++) {
            var m = [];
            var min;
            for (var x = 0; x < i; x++) {
                var list_of_pairs = [];
                var list_of_maxes = [];
                for (var x = 0; x < i; x++) {
                    var max = Math.max(table[x][j-1], table[i][0]-table[x][0]);
                    list_of_pairs.push([max, x]);
                    list_of_maxes.push(max);
                }
            }
            min = Math.min.apply(this, list_of_maxes);
            m = list_of_pairs.reduce(function(previous, current) {
                return current[0] < previous[0] ? current : previous;
            }, [Infinity]);
            table[i][j] = m[0];
            solution[i-1][j-1] = m[1];
        }
    }
       
    n = n-1;
    k = k-2;
    var ans = [];
    while (k >= 0) {
        var sub_list = [];
        for (var i = solution[n-1][k]+1; i < n+1; i++) {
            sub_list.push(seq[i]);
        }
        ans = [sub_list].concat(ans);
        n = solution[n-1][k];
        k = k-1;
    }

    console.log(ans);
    var beginning_list = [];
    for (var i = 0; i < n+1; i++) {
        beginning_list.push(seq[i]);
    }
    ans = [beginning_list].concat(ans);
    console.log(ans); 
    return ans;
}
