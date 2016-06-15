var settings = require( "modules/settings" ),
	velocity = require("velocity-animate/velocity"),
	urlParam = require('modules/urlParam')(),
	mousewheel = require('jquery-mousewheel');





module.exports = function( el ) {
		var $el = $( el );
		$window = $( window );
		
		//$window.on('mousewheel', scrollTitleScreen);
		//$el.on('click', scrollTitleScreen); 
		
	
		console.log(settings.page.current)
		
		function scrollTitleScreen(){
			$('body').addClass('scrolling').attr('data-page', 'work');
			$el.off();
			$window.off('mousewheel', scrollTitleScreen);
			
			
			
			$el.velocity({ 
				top:'-100%'
			}, {
				duration:settings.animationSpeed,
				complete:function(){ setPath('work'); settings.page.current = 'work'; }
			});
			
			$('.main-wrapper').velocity({ 
				top:0
			}, {
				duration:settings.animationSpeed
			}); 
		} 
};
  