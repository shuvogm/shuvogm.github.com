(function($) {

    $.fn.menumaker = function(options) {

        var cssmenu = $(this),
            settings = $.extend({
                title: "Menu",
                logoImg: "logo-m.png",
                format: "dropdown",
                sticky: false
            }, options);

        return this.each(function() {
			if ($(window).width() <= 768) {
				
			//	$("nav#topMenu ul").appendTo("#cssmenu");
			//	$("nav#topMenu").remove();
							
				$('nav#topMenu ul').children('li').clone().appendTo('#cssmenu ul:first');
			//	$("nav#topMenu").remove();
			
			
			}
			//  <a href="#"><img src="logo-m.png"  alt="logo"/></a>
			//  cssmenu.prepend('<div id="menu-button">' + settings.title + '</div>');
            cssmenu.prepend('<div id="site-logo"><a href="#"><img src="' + settings.logoImg + '"' + ' alt="logo"/></a></div><div id="menu-button"></div>');
            $(this).find("#menu-button").on('click', function() {
                $(this).toggleClass('menu-opened');
                var mainmenu = $(this).next('ul');
                mainmenu.slideToggle();
			//	$("#topMenuList").slideToggle();
				
            });

            cssmenu.find('li ul').parent().addClass('has-sub');

            multiTg = function() {
                cssmenu.find('.has-sub').children('a').addClass('submenu-button');

                //   cssmenu.find(".has-sub").prepend('<span class=""></span>');
                cssmenu.find('.submenu-button').on('click', function() {
                    if ($(window).width() <= 768) {
                        $(this).toggleClass('submenu-opened');
                        $(this).siblings('ul').slideToggle();
					//	$("#topMenuList").show();

                    }
					return false; // prevent default click action from happening! Like "Go To Top"
                });
            };

            if (settings.format === 'multitoggle') multiTg();
            else cssmenu.addClass('dropdown');

            if (settings.sticky === true) cssmenu.css('position', 'fixed');

/*			if ($(window).width() > 768) {
				cssmenu.find('ul:first').show();
				$("nav#topMenu").show();
				
			}*/
            resizeFix = function() {
                if ($(window).width() > 768) {
                    cssmenu.find('ul').show();
				//	$("nav#topMenu").show();
                }

                if ($(window).width() <= 768) {
                //    cssmenu.find('ul').hide().removeClass('open');
				//	$("nav#topMenu").hide();
					
                }
            };
            resizeFix();
            return $(window).on('resize', resizeFix);

        });
    };
})(jQuery);

(function($) {
    $(document).ready(function() {

        $("#cssmenu").menumaker({
            title: "Menu",
            format: "multitoggle"
        });

    });
})(jQuery);
