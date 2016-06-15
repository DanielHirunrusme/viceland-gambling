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
		
		var images = [];
		var _index = 0;
		var _xOffset = $window.width()/2;
		
		var _origXArr = [];
		var _setXArr  = [];
		
			function init() {
				canvas = document.getElementById("project-canvas");
				stage = new createjs.Stage(canvas);
				stage.enableMouseOver(10);
				borderPadding = 10;
				var barHeight = 2;
				loaderColor = createjs.Graphics.getRGB(0, 0, 0);
				loaderBar = new createjs.Container();
				bar = new createjs.Shape();
				bar.graphics.beginFill(loaderColor).drawRect(0, 0, 1, barHeight).endFill();
				imageContainer = new createjs.Container();
				imageContainer.x = 0;
				//imageContainer.y = 200;
				loaderWidth = 300;
				stage.addChild(imageContainer);
				var bgBar = new createjs.Shape();
				var padding = 3
				//bgBar.graphics.setStrokeStyle(1).beginStroke(loaderColor).drawRect(-padding / 2, -padding / 2, loaderWidth + padding, barHeight + padding);
				loaderBar.x = canvas.width - loaderWidth >> 1;
				loaderBar.y = canvas.height - barHeight >> 1;
				loaderBar.addChild(bar, bgBar);
				stage.addChild(loaderBar);
				
				setCanvasSize();
				
				manifest = [
					{src: "1-work-1/shot_18_edie_083_v3_web.jpg", id: "0", group:"0", groupID:"0"},
					{src: "1-work-1/shot_18_edie_139_v4_web.jpg", id: "1", group:"0", groupID:"1"},
					{src: "2-work-2/08930002_v1_web.jpg", id: "2", group:'false'},
					{src: "3-work-3/18640010_web.jpg", id: "3", group:'false'},
					{src: "4-work-4/99520013_web.jpg", id: "4", group:'false'},
					{src: "7-work-7/70070001_web.jpg", id: "5", group:'false'},
					{src: "8-work-8/8648-37_v1_web.jpg", id: "6", group:'false'},
					{src: "10-work-10/42560019_web.jpg", id: "7", group:'false'}
				];
				
				
				preload = new createjs.LoadQueue(true, "content/");
				// Use this instead to use tag loading
				//preload = new createjs.PreloadJS(false);
				preload.on("progress", handleProgress);
				preload.on("complete", handleComplete);
				preload.on("fileload", handleFileLoad);
				preload.loadManifest(manifest, true, "content/2-work/");
				createjs.Ticker.setFPS(60);
				createjs.Ticker.timingMode = createjs.Ticker.RAF;
				createjs.Ticker.addEventListener("tick", tick);
			}
			function stop() {
				if (preload != null) {
					preload.close();
				}
			}
			function handleProgress(event) {
				bar.scaleX = event.loaded * loaderWidth;
			}
			
			

			
			function handleFileLoad(event) {
				
				var image = event.result;
				var w = image.width;
				var h = image.height;
				var ratio = parseFloat(image.height/image.width).toFixed(2);
				
				var _scaleY = parseFloat($window.height() * .7 / image.height).toFixed(4);
				var _scaleX = _scaleY;
				var _y = $window.height()/2 - ($window.height() * .7)/2;
				
			    var _isInGroup = manifest[_index].group != 'false' ? true : false;
				var _groupID = !_isInGroup ? false : manifest[_index].groupID;
			
				
				var bmp = new createjs.Bitmap(image).set({
					 scaleX:_scaleX, scaleY:_scaleY,
					 regX: 0, regY: 0,
					 cursor: "pointer",
					 x: 0, 
					 y: _y,
					_origX: 0,
					_id: _index,
					_group: !_isInGroup ? 'false' : manifest[_index].group,
					_groupID: _groupID
				});
				

				images.push(bmp);
				
				//var twoImgPrev = _index > 3 ? images[_index-2].image.width * (($window.height() * .3 / images[_index-2].image.height)) + 10 : images[_index-1].image.width * (($window.height() * .3 / images[_index-1].image.height)) + 10
				
				bmp.scaleY = parseFloat($window.height() * .3 / image.height).toFixed(4);
				bmp.scaleX = bmp.scaleY;
				bmp._origX = _index > 0 ? _origXArr[_index - 1]['_x'] + _origXArr[_index - 1]['_image'].image.width * (($window.height() * .3 / _origXArr[_index - 1]['_image'].image.height)) + 10 : 10;
				bmp.x = bmp._origX;
				
				_origXArr[_index] = {'_image':bmp, '_x':bmp.x};
				
				//console.log(_origXArr[_index]['_x'])
				
				
				var groupPrevImageX = _isInGroup && _groupID != 0 ? images[_index-1].x : $window.width()/4-(image.width * ($window.height() * .7 / image.height))/2 + 10;
				
				var groupOffset = _isInGroup && _groupID != 0 ? 20 : 0;
				
				//bmp.x = _index * 1 + _xOffset + (prevImageWidth);
				
				//console.log(prevImageWidth)
				var prevImageX, prevImageWidth, offset;
				
				bmp.scaleY = parseFloat($window.height() * .7 / image.height).toFixed(4);
				bmp.scaleX = bmp.scaleY;
				
				if(!_isInGroup) {
					prevImageX = _index > 0 ? images[_index-1].x : $window.width()/2 - (image.width * ($window.height() * .7 / image.height))/2;
					prevImageWidth = _index > 0 ? (images[_index-1].image.width * ($window.height() * .7 / images[_index-1].image.height)) : 0;
					offset = _index > 0 ? 20 + ($window.width()) : 0;
							
				} else {
					
					if(_groupID == 0) {
						prevImageX = _index > 0 ? images[_index-1].x : $window.width()/2 - (image.width * ($window.height() * .7 / image.height))/2;
						prevImageWidth = _index > 0 ? (images[_index-1].image.width * ($window.height() * .7 / images[_index-1].image.height)) :  -(image.width * ($window.height() * .7 / image.height))/2 - 10;
						offset = _index > 0 ? 20 + ($window.width()) : 0;
					} else {
						prevImageX = images[_index-1].x;
						prevImageWidth = (images[_index-1].image.width * ($window.height() * .7 / images[_index-1].image.height));
						offset = 20;
					}
			
				}
				
				var imageWidth = (images[_index].image.width * ($window.height() * .7 / images[_index].image.height));
				
				bmp.x = prevImageX + prevImageWidth + offset;
				_setXArr[_index] = {'_image':bmp, '_x':bmp.x, '_width':imageWidth};
				console.log(imageWidth);
		
				
				//console.log(bmp.x)
				_index++;
				
				bmp.on("click", handleClick);
				bmp.on("mouseover", handleOver);
				bmp.on("mouseout", handleOut);
				
				
				var container = new createjs.Container();
				container.addChild( bmp );
				imageContainer.addChild(container);
				stage.update();
			
			}
			
			function handleOver(event) {
				if(!$('body').hasClass('index')) {
					return false;
				} else {
					createjs.Tween.get(event.target, {override: true})
							.to({alpha: .6 }, 300, createjs.Ease.quadInOut)
							.call(tweenUpComplete)
							.on("change", handleTweenChange);
				}
			}
			
			function handleOut(event) {
				if(!$('body').hasClass('index')) {
					return false;
				} else {
					createjs.Tween.get(event.target, {override: true})
							.to({alpha: 1 }, 300, createjs.Ease.quadInOut)
							.call(tweenUpComplete)
							.on("change", handleTweenChange);
				}
			}
			
			function handleClick(event) {
				
				currentItem = event.target.parent;
				
				var _isInGroup = event.target._group != 'false' ? true : false;
				var _nextID, _currImageWidth, _nextX;
				
				if(!$('body').hasClass('index')) {
				
					var prevImageWidth = currentImage > 0 ? (images[currentImage-1].image.width * ($window.height() * .7 / images[currentImage-1].image.height)) : 0;
				
					console.log(event)
				
					//var _isInGroup = event.target._group != 'false' ? true : false;
					//var _nextID, _currImageWidth, _nextX;
				
				
					if(!_isInGroup) {
						_nextID = event.currentTarget._id + 1 < images.length ? (event.currentTarget._id + 1) : 0;
						_currImageWidth = (images[_nextID].image.width * ($window.height() * .7 / images[_nextID].image.height))
						_nextX = _nextID > 0 ? images[_nextID].x - $window.width()/2 + _currImageWidth/2 : 0;
					} else {
					
						var __next_id = event.target._groupID == 0 ? 2 : 1 ;
					
						_nextID = event.currentTarget._id + __next_id < images.length ? (event.currentTarget._id + __next_id) : 0;
						_currImageWidth = (images[_nextID].image.width * ($window.height() * .7 / images[_nextID].image.height))
						_nextX = images[_nextID].x - $window.width()/2 + _currImageWidth/2;
					}
				
				
				
				
					currentImage = _nextID;
				
					createjs.Tween.get(imageContainer, {override: true})
							.to({ 
								regX: _nextX,
							}, 1000, createjs.Ease.quadInOut)
							.on("change", tweenUpdate);
							
					
				} else {
					currentImage = event.currentTarget._id;
					showImage()
					
					
				}
				
				/*
				createjs.Tween.get(event.target, {override: true})
					.to({x: -_xOffset }, 800, createjs.Ease.quadInOut)
					.call(tweenUpComplete)
					.on("change", handleTweenChange);
				
				createjs.Tween.get(images[_nextID], {override: true})
					.to({x: _xOffset }, 800, createjs.Ease.quadInOut)
					.call(tweenUpComplete)
					.on("change", handleTweenChange);
				*/
						//showIndex()
				
			}
			
			
			function showImageComplete(){
				console.log('showIndex Complete')
				$('body').addClass('imageMode');
			}
			
			function showImage(){
				
				$('body').removeClass('index');
				
				createjs.Tween.get(imageContainer, {override: true})
					.to({
						scaleX:1, 
						scaleY:1, 
						y:0,
						regX:_setXArr[currentImage]['_x']
					}, 2000, createjs.Ease.quadInOut)
					.call(showImageComplete)
					.on("change", tweenUpdate)
					
					for(var i=0; i<images.length; i++) {
					
						var _alpha = i != currentImage ? 0 : 1;
					
						createjs.Tween.get(images[i], {override: true})
							.to({
								x:_setXArr[i]['_x'],
								alpha:_alpha
							}, 2000, createjs.Ease.quadInOut)
							.on("change", tweenUpdate)
					}
			}
			
			
			function showIndexComplete(){
				console.log('showIndex Complete')
				$('body').addClass('index');	
			}
			
			
			function showIndex(){
				
			
				
				
				//imageContainer.setTransform(imageContainer.x, imageContainer.y, 1, 1, 0, 0, 0, images[currentImage].x);
				
				createjs.Tween.get(imageContainer, {override: true})
					.to({
						scaleX:.3, 
						scaleY:.3, 
						y:$window.height() * .33,
						regX:_origXArr[currentImage]['_x']
					}, 2000, createjs.Ease.quadInOut)
					.call(showIndexComplete)
					.on("change", positionIndex)
					
			
				//var prevImageWidth = (images[0].image.width * ($window.height() * .7 / images[0].image.height));
				//var prevImageX = (images[0].image.width * ($window.height() * .7 / images[0].image.height)) ;
				//var offset = 20;
				
				
				
				for(var i=0; i<images.length; i++) {
					
					//calculate position of elements
					//var _prevImageWidth = i > 0 ? images[i-1].image.width * ($window.height() * .3 / images[0].image.height)) : 0;
					//var _prevImageX = i > 0 ? images[i-1]._origX - ( images[i-1].image.width * ($window.height() * .3 / images[0].image.height)) : ( images[0].image.width * ($window.height() * .3 / images[0].image.height))  ;
					//console.log(images[i]._origX)
					//var _scale = parseFloat($window.height() * .7 / images[i].height).toFixed(4);
					
					//var _x = i > 0 ? _origXArr[i]['_x'] + _origXArr[i-1]['_image'].image.width * ($window.height() * .7 / _origXArr[i-1]['_image'].image.height) : _origXArr[i]['_x'];
					
					createjs.Tween.get(images[i], {override: true})
						.to({
							x:_origXArr[i]['_x'] * 2.33 + 20
						}, 2000, createjs.Ease.quadInOut)
						.on("change", tweenUpdate)
				}
				
				
				
				
					

		

			
				
			}
			
			function onProgress(event) {
				//console.log(event);
			}
			
			function nextImage(){
				currentImage = currentImage < images.length-1 ? currentImage+1 : 0;
				var _nextX  = images[currentImage].x;
				
				//console.log(_nextX)
				
				createjs.Tween.get(imageContainer, {override: true})
						.to({x: -_nextX + _xOffset }, 1000, createjs.Ease.quadInOut)
						.call(tweenUpComplete)
						.on("change", handleTweenChange);
			}
			
			function prevImage(){
				currentImage = currentImage > 0 ? currentImage-1 : images.length - 1;
				
				var _nextID = event.currentTarget._id + 1 < images.length ? (event.currentTarget._id + 1) : 0;
				var _nextX  = images[currentImage].x;
				
				createjs.Tween.get(imageContainer, {override: true})
						.to({x: -_nextX + _xOffset }, 1000, createjs.Ease.quadInOut)
						.call(tweenUpComplete)
						.on("change", handleTweenChange);
			}
			
			
			
			$("body").keydown(function(e) {
			  if(e.which == 37) { // left     
			      //$('.item').eq(settings.image.current).trigger('click');
				  //if($('body').hasClass('animating')) return true;
			  
				  if(!$('body').hasClass('index'))
	  			  prevImage();
				  return true;
			  }
			  else if(e.which == 39) { // right     
			      //$(".next a").trigger("click");
				  //if($('body').hasClass('animating')) return true;
				  if(!$('body').hasClass('index'))
				  nextImage();
				  return true;
			  }
			  else if(e.which == 32) { // right     
			      //$(".next a").trigger("click");
			  	
				  $('.work').addClass('visible');
				  showIndex();
			  
			  }
		  	});
			
			
			
			function handleTweenChange(tween) {
				//console.log(tween.target.target._id);
				var _id = tween.target._target;
				//console.log(_id);
				if(tween.target._target._id > 1) {
					//console.log(event.target.target.x)
				
					//tween.target.target.x = images[_id-1].x;
				}
				
				
				//console.log('imagecontainer.x ' + imageContainer.x);   
				//console.log(images[currentImage].x)   
				
				//imageContainer.x = imageContainer.x - (imageContainer.x - images[currentImage].x);
				
				for(var i=2; i<images.length; i++){
					//images[i].x = (images[i-1].image.width * ($window.height() * .7 / images[i-1].image.height)) + images[i-1].x + 10;
				}
				

				
				//imageContainer.x = -1 * images[currentImage].x;
				  
				
					/*
					var prevImageWidth = i > 0 ? (images[i-1].image.width * ($window.height() * .7 / images[i-1].image.height)) : 0;
					var prevImageX = i > 0 ? (images[i-1].image.width * ($window.height() * .7 / images[i-1].image.height)) : 0;
					var offset = i > 0 ? 20 : 20;
				*/
				
				// update other positions to previous x
				
				stage.update();
			}
			
			function tweenUpComplete(event) {
				//imageContainer.addChildAt(currentItem, 0);
				for(var i=2; i<images.length; i++){
					//images[i].x = (images[i-1].image.width * parseFloat(($window.height() * .7 / images[i-1].image.height))).toFixed(2) + images[i-1].x + 10;
				}
				stage.update();
			}
			
			function positionIndex(event){
				//imageContainer.setTransform(0, imageContainer.y, imageContainer.scaleX, imageContainer.scaleY, 0, 0, 0, _nextX);
				stage.update();
			}
			
			function tweenUpdate(){
				stage.update();
			}
			
			function handleComplete(event) {
				loaderBar.visible = false;
				stage.update();
			}
			
			function setCanvasSize(){
				$el.attr('width', $window.width());
				$el.attr('height', $window.height());
			}
			
			function winResize(){
				setCanvasSize();
				tick();
			}
			
		  	function tick(e) {
				stage.update();
		    }
			
			$window.on('resize', winResize);
			
			init();	
		//stage.update();
};
  