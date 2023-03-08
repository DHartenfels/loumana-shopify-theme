jQuery(document).ready(function(){
    if($('#product-images-carousel-main')){
        $('#product-images-carousel-main').slick({
            dots: false,
            arrows: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: "0",
            asNavFor: '#product-images-carousel-thumbnails',
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        dots: true
                    }
                }
            ]
        });
    }

    var product_img_carousel = 6;

    $('#product-images-carousel-thumbnails').on('init', function(event, slick){        
        var thisSliderCount = parseInt(jQuery('#product-images-carousel-thumbnails').attr('thumbnailsCount'));
        if(thisSliderCount <= product_img_carousel){
            jQuery('#product-images-carousel-thumbnails').addClass('center-items-manually');
        }
    });

    if(jQuery('#product-images-carousel-thumbnails')){
        $('#product-images-carousel-thumbnails').slick({
            dots: false,
            arrows: false,
            infinite: true,
            speed: 300,
            slidesToShow: product_img_carousel,
            slidesToScroll: 1,
            variableWidth: true,
            focusOnSelect: true,
            centerMode: true,
            centerPadding: "0",
            asNavFor: '#product-images-carousel-main'
        });
    }

    /*jQuery(document).on('click', '.product--link', function(e){
        e.preventDefault();
        console.log('redirect now'); 
    });*/
});

function check_if_in_view_OneWay() {

    var lazy_elements = jQuery('.lazy-background,.lazy-image');
    var window_height = jQuery(window).height();
    var window_top_position = jQuery(window).scrollTop();
    var halfscreen =  (window_height / 2);

    if(jQuery(window).width() < 768 ){
        var top_extra = 10; 
    }else{    
        var top_extra = 300; 
    }

    var window_bottom_position = window_top_position + window_height + top_extra;

    jQuery.each(lazy_elements, function() {
        var element = jQuery(this);
        var element_height = element.outerHeight();
        var element_top_position = element.offset().top;
        var element_bottom_position = (element_top_position + element_height);
        if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
            
            if(element.hasClass('lazy-image')){
            
            var img = element.attr('data-src');
            element.attr('src',img);
            
            }else{
            
            var bg = element.attr('data-bg');
            element.css('background-image','url('+bg+')');
            
            }
            
        }
    });
  
}

function paginate_to_blog(page,posts_per_page){

    jQuery('.filter_loading').fadeIn();
    var posts = $.parseJSON(jQuery('.articles_json_container').html());

    var html = '';
    if(parseInt(page) > 0){
        page = parseInt(page) - 1;
    }
    var min_pag = parseInt(page * posts_per_page);
    var max_pag = parseInt(min_pag) + parseInt(posts_per_page);
    var allposts = posts['results'];

    for (var i = min_pag;i < max_pag;i++) {

        if(allposts[i]){

            var post = allposts[i];
            html += '<li class="as-blogpost-item transition load_blogpost" post_filters="'+post.tags+'">';

                html += '<div class="blogpost-image lazy-background" data-bg="'+post.image+'">';
                    html += '<a href="'+post.url+'" title="'+post.title+'" class="anchor_overlay"></a>';
                html += '</div>';

                html += '<div class="blogpost-item-content">';
                    html += '<div>';

                        html += '<div class="blog-item-badge"></div>';

                        html += '<div class="post_date">'+post.date+'</div>';

                        html += '<div class="post_title"><a href="'+post.url+'" title="'+post.title+'">'+post.title+'</a></div>';

                        html += '<div class="post_excerpt">'+post.excerpt+'</div>';

                        html += '<div class="button-container">';
                            html += '<a class="as-button text-button" href="'+post.url+'"><span>Mehr erfahren</span></a>';
                        html += '</div>';

                    html += '</div>';
                html += '</div>';
                
            html += '</li>';

        }

    }
    
    jQuery('.blog-module-list-items ul').html(html);

    setTimeout(function(){
        check_if_in_view_OneWay();
    },20);

    setTimeout(function(){
        jQuery("html, body").animate({ scrollTop: 0 }, 500);
    },100)

    setTimeout(function(){
        jQuery('.as-blogpost-item').removeClass('load_blogpost');
        jQuery('.filter_loading').fadeOut();
    },400);

}

function resetBlogPagination(posts_per_page){

    var posts = $.parseJSON(jQuery('.articles_json_container').html());
    var allposts = posts['results'];
    var pagination_html = '';
    var item_class = '';

    var pagination_count = Math.ceil(allposts.length / posts_per_page);

    for(var i=1;i<=pagination_count;i++){

        if(i==1){
            item_class = 'active';
        }else{
            item_class = '';
        }

        pagination_html += '<li page_go_to="'+i+'" class="'+item_class+'">'+i+'</li>';

    }

    jQuery('.as-paginate-numbers').html(pagination_html).attr('pages_size',pagination_count);
    jQuery('.paginate_prev_btn, .paginate_next_btn').addClass('inactive');
    if(pagination_count > 1){
        jQuery('.paginate_next_btn').removeClass('inactive');
    }
    
}

function arrayContains(needle, arrhaystack){
    return (arrhaystack.indexOf(needle) > -1);
}
jQuery(document).ready(function(){
    check_if_in_view_OneWay();
  });
  
  jQuery(window).on('scroll', function() {
    check_if_in_view_OneWay();
  });
