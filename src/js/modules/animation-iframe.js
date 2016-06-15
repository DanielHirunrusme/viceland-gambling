var settings = require( "modules/settings" ),
	velocity = require("velocity-animate/velocity");

module.exports = function( el ) {
		var $el = $( el ),
		$window = $( window ),
		swapInt,
		over = false,
		canvas;
		
		
		function sizeFrame(){
			$el.css('width', $window.width() ).css('height', $('.the-play').height() );
			//$el.contents().find('canvas').attr('width', $('.the-play').height() * 1.8 ).attr('height', $('.the-play').height() );
			
			canvas = $el.contents().find('canvas');

		}
		
		/*
		console.log('animation iframe ')
		$el.on('ready', function(){
			console.log('loaded');
			$el.addClass('loaded');
		});
		*/
		
		$el.on('load', function(){
			$el.addClass('loaded');
		});
		
		sizeFrame();
		$window.on('resize', sizeFrame);
		
};
  