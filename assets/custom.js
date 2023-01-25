jQuery(document).ready(function(){
    if(jQuery('#product-images-carousel-main')){
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
                    breakpoint: 480,
                    settings: {
                        dots: true
                    }
                }
            ]
        });
    }

    var product_img_carousel = 5;

    $('#product-images-carousel-thumbnails').on('init', function(event, slick){        
        var thisSliderCount = parseInt(jQuery('#product-images-carousel-thumbnails').attr('thumbnailsCount'));
        if(thisSliderCount < product_img_carousel){
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
});