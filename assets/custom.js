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