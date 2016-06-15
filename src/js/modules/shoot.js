var settings = require( "modules/settings" ),
	velocity = require("velocity-animate/velocity");

module.exports = function( el ) {
		var $el = $( el ),
		$window = $( window ),
		swapInt,
	over = false;
		
		swapInt = setInterval(toggleClasses, 2000);
		
		function toggleClasses() {
			if(over) return true;
			$('#swish').toggleClass('clicked');
			$('#miss').toggleClass('clicked');
		}
		
		$('#swish').on('touchstart mousedown', function(e){
			//e.stopPropagation();
			if($('body').hasClass('animating')) return true;
			$('body').addClass('animating shooting');
			
			$(this).addClass('clicked');
			$('#miss').removeClass('clicked');
			clearInterval(swapInt);
			
			//setShotWage('swish');
			//shoot();
			
			setTimeout(function(){ $('body').removeClass('animating shooting'); swapInt = setInterval(toggleClasses, 2000); }, 3000); //90 frames at 30fps
		}).on('mouseover', function(){
			over = true;
			$(this).addClass('clicked');
			$('#miss').removeClass('clicked');
		}).on('mouseout', function(){
			over = false;
		})
		
		$('#miss').on('touchstart mousedown', function(e){
			//e.stopPropagation();
			if($('body').hasClass('animating')) return true;
			$('body').addClass('animating shooting');
			
			$(this).addClass('clicked');
			$('#swish').removeClass('clicked');
			clearInterval(swapInt);
			
			//setShotWage('miss');
			//shoot();
			
			setTimeout(function(){ $('body').removeClass('animating shooting'); swapInt = setInterval(toggleClasses, 2000); }, 3000);
		}).on('mouseover', function(){
			over = true;
			$(this).addClass('clicked');
			$('#swish').removeClass('clicked');
		}).on('mouseout', function(){
			over = false;
		});
};
  