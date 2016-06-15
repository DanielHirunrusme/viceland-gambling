var settings = require( "modules/settings" ),
	velocity = require("velocity-animate/velocity"),
	urlParam = require('modules/urlParam')(),
	urlParam = require('modules/section-controller')(),
	mousewheel = require('jquery-mousewheel');





module.exports = function( el ) {
		var $el = $( el );
		$window = $( window );
		
		$el.on('click', navClick); 
		
		
		
		function navClick(e) {
			e.preventDefault();
			
			if($('body').hasClass('animating')) return true;
			
			console.log(settings.page.current);
			
			if($el.data('page') != settings.page.current) {
				
				$('body').addClass('animating');
				var path = $el.data('location');
				
				if($el.data('page') == 'information') {
					
					$('body').addClass('information');
					
					settings.page.current = 'information';
					
					$('.canvas-container').addClass('out').velocity({ 
						top:-$window.height()
					}, {
						duration:settings.animationSpeed
					});
					
					$('.information-wrapper').velocity({ 
						top:0
					}, {
						duration:settings.animationSpeed,
						complete:function(){ 
							$('body').removeClass('animating');
							setPath(path); 
						}
					});
					
					
				} else if($el.data('page') == 'work') {
					
					settings.page.current = 'work';
					$('body').removeClass('information');
					
					
					$('.canvas-container').removeClass('out').velocity({ 
						top:0
					}, {
						duration:settings.animationSpeed,
						complete:function(){ 
							$('body').removeClass('animating');
							setPath(path); 
							
						}
					});
					
					$('.information-wrapper').velocity({ 
						top:'100%'
					}, {
						duration:settings.animationSpeed 
					});
					
					
				}
								
				
				
				$('body').attr('data-page', $el.data('page'));
				settings.page.current = $el.data('page');
				//setPath($el.data('location'));
			}
			
			
			
			
		}
		
		
		$window.on('resize', function(){
			if($('.canvas-container').hasClass('out')){
				$('.canvas-container').css('top', -$window.height());
			}
		});
		
};
  