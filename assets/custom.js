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

    
    $('#product-images-carousel-thumbnails').on('afterChange', function(event, slick, currentSlide, nextSlide){        
       console.log('change now');
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

    jQuery('body').on('click','.paginate_next_btn', function(){

        var next_page = jQuery('.as-blog-pagination-inner ol li.active').next().attr('page_go_to');
        var posts_per_page = jQuery('.as-blog-pagination').attr('posts_per_page');
        jQuery('.as-blog-pagination-inner ol li.active').removeClass('active').next().addClass('active');

        if(jQuery('.as-blog-pagination-inner ol li:last-child').hasClass('active')){
            jQuery('.paginate_next_btn').addClass('inactive');
        }else{
            jQuery('.paginate_next_btn').removeClass('inactive');
        }

        if(jQuery('.as-blog-pagination-inner ol li:first-child').hasClass('active')){
            jQuery('.paginate_prev_btn').addClass('inactive');
        }else{
            jQuery('.paginate_prev_btn').removeClass('inactive');
        }

        paginate_to_blog(next_page,posts_per_page);

    });

    jQuery('body').on('click','.paginate_prev_btn', function(){

        var next_page = jQuery('.as-blog-pagination-inner ol li.active').prev().attr('page_go_to');
        var posts_per_page = jQuery('.as-blog-pagination').attr('posts_per_page');
        jQuery('.as-blog-pagination-inner ol li.active').removeClass('active').prev().addClass('active');

        if(jQuery('.as-blog-pagination-inner ol li:last-child').hasClass('active')){
            jQuery('.paginate_next_btn').addClass('inactive');
        }else{
            jQuery('.paginate_next_btn').removeClass('inactive');
        }

        if(jQuery('.as-blog-pagination-inner ol li:first-child').hasClass('active')){
            jQuery('.paginate_prev_btn').addClass('inactive');
        }else{
            jQuery('.paginate_prev_btn').removeClass('inactive');
        }

        paginate_to_blog(next_page,posts_per_page);

    });

    jQuery('body').on('click','.as-paginate-numbers li:not(.active)',function(){
        
        var next_page = jQuery(this).attr('page_go_to');
        var posts_per_page = jQuery('.as-blog-pagination').attr('posts_per_page');
        jQuery('.as-blog-pagination-inner ol li.active').removeClass('active');
        jQuery(this).addClass('active');

        if(jQuery('.as-blog-pagination-inner ol li:last-child').hasClass('active')){
            jQuery('.paginate_next_btn').addClass('inactive');
        }else{
            jQuery('.paginate_next_btn').removeClass('inactive');
        }

        if(jQuery('.as-blog-pagination-inner ol li:first-child').hasClass('active')){
            jQuery('.paginate_prev_btn').addClass('inactive');
        }else{
            jQuery('.paginate_prev_btn').removeClass('inactive');
        }

        paginate_to_blog(next_page,posts_per_page);
        
    });

    jQuery('body').on('click','.blog-module-filters ul li',function(){

        var posts_per_page = parseInt(jQuery('.as-blog-pagination').attr('posts_per_page'));
        var tag = jQuery(this).attr('tag_slug');
        jQuery('.blog-module-filters ul li').removeClass('active');
        jQuery(this).addClass('active');

        if(tag == '*'){

            jQuery('.articles_json_container').html(jQuery('.articles_json_container_bkp').html());
            jQuery('.blog-featured-post').removeClass('hidden_fade').fadeIn();

        }else{
 
            if(jQuery('.as-blogpost-item.item_collection_featured').length){
                var featured_tags = jQuery('.as-blogpost-item.item_collection_featured').attr('post_filters');
                var featured_tags_Array = featured_tags.split(',');
                if(arrayContains(tag,featured_tags_Array)){
                    jQuery('.blog-featured-post').removeClass('hidden_fade').fadeIn();
                }else{
                    jQuery('.blog-featured-post').addClass('hidden_fade').fadeOut();
                }
            }

            var posts = $.parseJSON(jQuery('.articles_json_container_bkp').html());
            var allposts = posts['results'];

            var new_json_inner = '';
            var new_json = '{';
                new_json += '"result_count": "category",';
                new_json += '"results": [';

                    for (var key of Object.keys(allposts)) {

                        var post = allposts[key];
                        var taglist = post['tags'];
                        if(arrayContains(tag,taglist)){
                            new_json_inner += '{';
                                new_json_inner += '"title":"'+post.title+'",';
                                new_json_inner += '"url":"'+post.url+'",';
                                new_json_inner += '"image":"'+post.image+'",';
                                new_json_inner += '"date":"'+post.date+'",';
                                new_json_inner += '"excerpt":"'+post.excerpt+'",';
                                new_json_inner += '"tags":"'+post.tags+'"';
                            new_json_inner += '},';
                        }
                        
                    }

                    new_json += new_json_inner.slice(0, -1);

                new_json += ']';
            new_json += '}';

            jQuery('.articles_json_container').html(new_json);

        }

        setTimeout(function(){
            paginate_to_blog(0,posts_per_page);
        },50);

        setTimeout(function(){
            resetBlogPagination(posts_per_page);
        },100);

    });

  });
  
  jQuery(window).on('scroll', function() {
    check_if_in_view_OneWay();
  });
