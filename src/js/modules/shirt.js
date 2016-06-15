/**
 * Global URL Param
 * @type {Object}
 */

var settings = require( "modules/settings" ),
	velocity = require("velocity-animate/velocity");


var shirt = module.exports = function() {
	
	$shirt = $('.shirt');
	
	this.changeShirt = function(){
		$shirt.css( 'background-color', getRandomColor() );
	}
	
	this.alignShirt = function(){
		//var _l = $(window).width()/2 - ( $('.the-play').height()/900 * 100);
		var _l = $(window).width()/2 - (346 * ($('.the-play').height()/600));
		var _t = $('.the-play').height() - 200;
		var _w = $('.the-play').height()/900 * 38;
		var _h = $('.the-play').height()/600 * 80;
		$shirt.css('top', '52%').css('left', _l).css('width', _w).css('height', _h);
		
		
	}
	
	
	$(window).on('resize', this.alignShirt);
	

	function getRandomColor() {
	    var letters = '0123456789ABCDEF'.split('');
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}
	
	this.alignShirt();
	this.changeShirt();
	
}

