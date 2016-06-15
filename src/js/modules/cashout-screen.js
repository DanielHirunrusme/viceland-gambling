var settings = require( "modules/settings" ),
	velocity = require("velocity-animate/velocity");

module.exports = function( el ) {
		var $el = $( el ),
		$window = $( window );
		
		$el.on('click', showCashout);
		
		function showCashout(){ 
			$('#cashout').show();
		}
};
  