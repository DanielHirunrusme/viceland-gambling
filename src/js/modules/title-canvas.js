var settings = require( "modules/settings" ),
	velocity = require("velocity-animate/velocity"),
	urlParam = require('modules/urlParam')(),
	urlParam = require('modules/section-controller')(),
	mousewheel = require('jquery-mousewheel');





module.exports = function( el ) {
		var $el = $( el );
		$window = $( window );
		
		var loaderBar;
		var stage;
		var bar;
		var imageContainer;
		var currentImage = 0;
		var loaderWidth;
		var loaderColor;
		var borderPadding;
		var preload;
		var oldItem;
		var leftStrip;
		var rightStrip;
		var containerIndex = 0;
		var images = [];
		var containers = [];
		var manifest = [];
		var _index = 0;
		var _xOffset = $window.width()/2;
		
		var _origXArr = [];
		var _setXArr  = [];
		
			function init() {
				canvas = document.getElementById("title-canvas");
				stage = new createjs.Stage(canvas);
				
			    var text = new createjs.Text("JOSH OLINS", "16px akzidenz-m", "#282924");
				text.regX = text.getBounds().width/2;
				text.regY = text.getBounds().height/2;
			    text.x = $window.width()/2;
				text.y = $window.height()/2;
				
				
				stage.addChild(text);

				setCanvasSize();
			}
			
			function setCanvasSize(){
				$el.attr('width', $window.width());
				$el.attr('height', $window.height());
				tick();
			}
			
			function winResize(){
				setCanvasSize();
				tick();
			}
			
		  	function tick(e) {
				stage.update(e);
		    }
			
			$window.on('resize', winResize);
			
			init();	
		//stage.update();
};
  