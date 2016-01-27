/**
 *  jQuery BloggerDynamicSlider v1.0.0
 *  Copyright 2016 http://shuvojitdas.com
 *  Contributing Author: Shuvojit Das
 *
 */
;
(function($) {

    $.fn.BloggerDynamicSlider = function(options) {

        // Default settings/options
        var settings = $.extend({
            blogURL: "", // Your Blog URL. example: "http://imagesliderforblogger.blogspot.com"
            labelName: "", // Show posts from specific Label. Specify a 'Label', or leave it empty to display recent posts of blog.
            maxItem: 4, // Max number of Slider Posts to show
            showPostTitle: true, // Show post title as Caption ? (true/false)
            postTitleStyle: "default", // Select post title/caption style "default, "overlayDark" or "overlayLight"
            imageWidth: 400, // Image width in px value
            imageHeight: 200, // Image height in px value
            animation: "fade", // Select your animation type, "fade" or "slide"
            controlNav: true, // Navigation for paging control of each slide? (true/false)
            directionNav: true, // Previous/next navigation? (true/false)
            pauseOnHover: false, // Pause slideshow when hovering over slider, then resume when no longer hovering (true/false)
            slideshowSpeed: 7000, // Set the speed of the slideshow cycling, in milliseconds
            animationSpeed: 600, // Set the speed of animations, in milliseconds
            animationLoop: true, // Should the animation loop? (true/false)

        }, options);



        return this.each(function() {
            var thisE = $(this),
                sliderID = thisE.attr('id'),
                //    feedURL = settings.blogURL + '/feeds/posts/summary/' + (settings.labelName.length == 0 ? "" : '-/' + settings.labelName.replace(/\,(\s+)?/g, "/")) + '?max-results=' + settings.maxItem + '&orderby=updated' + '&alt=json-in-script';

               feedURL = "https://picasaweb.google.com/data/feed/base/user/105052417560222702116/albumid/5663875596830561969?alt=json&kind=photo&max-results=2&imgmax=720&thumbsize=144&hl=en_US&prettyprint=true";

            //    feedURL = "https://picasaweb.google.com/data/feed/base/user/102020166350261717322/albumid/5648323304770114161?alt=json&kind=photo&max-results=2&imgmax=720&thumbsize=144&hl=en_US&prettyprint=true";

console.log(feedURL);
// 720 x 540

            $.ajax({
                type: 'GET',
                url: feedURL,
                async: false,
                contentType: "application/json",
                dataType: 'jsonp',
                success: function(json) {
                    console.log("Success!");
                    var entries = json.feed.entry || [],
                        skeleton, i, j, post, postTitle, imgUrl, //newImgUrl, 
                        links, postUrl, imgTag, item;


                    skeleton = "";
                    skeleton += '<div class="flexslider loading" style="max-width:' + settings.imageWidth + 'px">';
                    skeleton += '<ul class="slides">';
                    for (i = 0; i < entries.length; ++i) {
                        post = entries[i];

                        var photo_Url = post.content.src;
                        console.log(photo_Url);

                        
                        imgUrl = post.content.src ? post.content.src : 'http://3.bp.blogspot.com/-sWtp_qRPNT8/UZYmQq5sAdI/AAAAAAAAEec/7YDbpK4Q6g8/s72-c/default+image.png';
                    //    newImgUrl = imgUrl.replace('s72-c', 'w' + settings.imageWidth + '-h' + settings.imageHeight + '-c');
                        links = post.link || [];
                        for (j = 0; j < links.length; ++j) {
                            if (links[j].rel == 'alternate') break;
                        }
                        postUrl = links[j].href;
                        imgTag = '<img src="' + imgUrl + '" width="' + settings.imageWidth + '" height="' + settings.imageHeight + '"/>';
                        item = '<a href="' + postUrl + '" target="_blank" title="' + postTitle + '">' + imgTag + '</a>';
                        skeleton += '<li>' + item + '</li>';
                    }

                    skeleton += '</ul></div>';
                    skeleton += '<style type="text/css">#' + sliderID + ' .flexslider.loading {min-height:' + settings.imageHeight + 'px !important;}</style>';
                    thisE.append(skeleton);

                }, // success function end


                error: function(xhr, status, error) {
                    thisE.append('<div class="error"><p>No Result! Or Error Loading Feed</p></div');

                }, // error function end


                complete: function() {

                        // initialize the flexSlider 
                        $('#' + sliderID + ' .flexslider').flexslider({
                            animation: settings.animation,
                            controlNav: settings.controlNav,
                            directionNav: settings.directionNav,
                            pauseOnHover: settings.pauseOnHover,
                            slideshowSpeed: settings.slideshowSpeed,
                            animationSpeed: settings.animationSpeed,
                            animationLoop: settings.animationLoop
                        });



                        // wait until all images loaded, then hide the preloader overlay and spinner
                        var sliderImages = $("#" + sliderID + ' .flexslider ul.slides li a img'),
                            index = 0;
                        sliderImages.on('load', function() {
                            index++;
                            if (index == sliderImages.length - 1) {

                                // When all images loaded and the slider is ready but before removing preloader
                                // Reset slider to 'slide 0'
                                // When user first see the slider then it should start from the beginning
                                // Catch the flexslider context
                                var slider = $("#" + sliderID + ' .flexslider').data("flexslider");
                                // Unset the animating flag so we can move back to the first slide quickly      
                                slider.animating = false;
                                // Move to the first slide
                                slider.flexAnimate(0);


                                // remove preloader
                                $("#" + sliderID + ' .flexslider').removeClass('loading');

                            }
                        });

                    } // complete function end

            });
        });
    };

})(jQuery);
