var settings = require( "modules/settings" ),
	velocity = require("velocity-animate/velocity");





module.exports = function( el ) {
		var $el = $( el ),
		$window = $( window ),
		total_frames = $el.data('total-frames'),
		frame_prefix = $el.data('frame-prefix'),
		frame_type = $el.data('frame-type');
		
		
		
		$el.imgplay({rate: 30}); // start imgplay
		$el.data('imgplay').play();
		$el.data('imgplay').stop();
		
		$el.css('height', $('.the-play').height() - 2);
		$el.find('canvas').attr('height', $('.the-play').height() - 2 ).attr('width', $window.width())
		
		if($el.attr('data-frame-loop')) {
			//alert('true')
			setInterval(function(){
				if($el.hasClass('shooting')) return true;
				$el.data('imgplay').toFrame(1);
				$el.data('imgplay').play();
			}, 3000);
		}
		
		$window.on('resize', function(){
			//$el.data('imgplay').play();
			$el.data('imgplay').play();
			$el.data('imgplay').stop();
			
			$el.css('height', $('.the-play').height() - 2);
			$el.find('canvas').attr('height', $('.the-play').height() - 2 ).attr('width', $window.width())
		});
		
		$window.trigger('resize');
		
		/*
		for(var i=0; i<total_frames; i++) {

			$el.append(' <img src=" '+ image_path + '/' + frame_prefix + '' + i + '.' + frame_type + '" alt="frame'+ i +'">');
			console.log(  )
		} 
		*/
		
};
  