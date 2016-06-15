var settings = require( "modules/settings" ),
	velocity = require("velocity-animate/velocity"),
	urlParam = require('modules/urlParam')(),
	mousewheel = require('jquery-mousewheel'),
	throttle = require('modules/throttle');





module.exports = function( el ) {
		var $el = $( el );
		$window = $( window );
		
		var loaderBar;
		var stage;
		var bar;
		var ctx;
		var $container;
		var imageConainerClone;
		
		var $container;
		var $containerClone;
		
		var allThumbsLoaded = false;
		
		var currentImage = 0;
		var loaderWidth;
		var loaderColor;
		var borderPadding;
		var preload;
		var preloadThumbs;
		var oldItem;
		var leftStrip;
		var rightStrip;
		var containerIndex = 0;
		var _isIndex = false;
		var images = [];
		var imagesClone = [];
		var containers = [];
		var manifest = [];
		var thumbsManifest = [];
		var _index = 0;
		var _xOffset = $window.width()/2;
		var ease = createjs.Ease.sineInOut;
		var indexSpacing = 10;
		var spacing = 20;
		var _mouseFactor = 1;
		var _moveIndex = false;
		
		var _isSlideShowFromIndex = false;
		var _slideShowDirection = "right";
		
		var _initScale = .3;
		
		var _origXArr = [];
		
		var _oX = [];
		var _sX = [];
		
		var _setXArr  = [];
		var _bmps     = [];
		var _orig$containerSize;
		var _set$containerSize;
		var _isSlideShow;
		var _clickedClone =  false;
		
		var timer;
		var winTimer;
		var animSpeed = 800;
		var timerSpeed = 10;
		var slideInterval;
		var intervalSpeed = 8000;
		var loadIndex = 0;
		var $containers = [];
		var filesLoaded = 0;
		
		var fileThreshold = 10;
		
		
			function init() {
				canvas = document.getElementById("project-canvas");
				ctx = canvas.getContext("2d");
				stage = new createjs.Stage(canvas);
				stage.enableMouseOver(10);
				stage.snapToPixelsEnabled = true;
				
				
				borderPadding = 10;
				var barHeight = 2;
				loaderColor = createjs.Graphics.getRGB(0, 0, 0);
				loaderBar = new createjs.Container();
				bar = new createjs.Shape();
				bar.graphics.beginFill(loaderColor).drawRect(0, 0, 1, barHeight).endFill();
				$container = new createjs.Container();
				$container.x = 0;
				$container.alpha = 0;
				
				//clone
				$containerClone = new createjs.Container();
				$containerClone.x = 0;
				$containerClone.alpha = 0;
				//$container.y = 200;
				loaderWidth = 100;
				stage.addChild($container, $containerClone);
				var bgBar = new createjs.Shape();
				var padding = 3
				//bgBar.graphics.setStrokeStyle(1).beginStroke(loaderColor).drawRect(-padding / 2, -padding / 2, loaderWidth + padding, barHeight + padding);
				//loaderBar.x = canvas.width/2 + loaderWidth/2 >> 1;
				//loaderBar.y = canvas.height - barHeight >> 1;
				//loaderBar.addChild(bar, bgBar);
				//stage.addChild(loaderBar);
				
				$container = new createjs.Container();
				$containerClone = new createjs.Container();

				
				stage.addChild( $container, $containerClone );
		
				
				setCanvasSize();
				
				/*
				*
				*	CREATE MANIFEST BASED ON PROJECT IMAGES ADDED BY KIRBY
				*
				*/
				$('.project-image').each(function(){
						thumbsManifest.push({
							src:$(this).data('thumb'),
							id:$(this).data('image-id'),
							group:$(this).data('group'),
							groupID:$(this).data('group-id')
						})
				});
				
				/*
				*
				*	CREATE MANIFEST BASED ON PROJECT IMAGES ADDED BY KIRBY
				*
				*/
				$('.project-image').each(function(){
						manifest.push({
							src:$(this).data('src'),
							id:$(this).data('image-id'),
							group:$(this).data('group'),
							groupID:$(this).data('group-id')
						})
				});
				
				ctx.imageSmoothingEnabled = true;

				/*
				manifest = [
					{src: "1-work-1/shot_18_edie_083_v3_web.jpg", id: "0", group:"0", groupID:"0"},
					{src: "1-work-1/shot_18_edie_139_v4_web.jpg", id: "1", group:"0", groupID:"1"},
					{src: "2-work-2/08930002_v1_web.jpg", id: "2", group:'false'},
					{src: "3-work-3/18640010_web.jpg", id: "3", group:'false'},
					{src: "7-work-7/70070001_web.jpg", id: "5", group:'false'},
					{src: "8-work-8/8648-37_v1_web.jpg", id: "6", group:'false'},
					{src: "10-work-10/42560019_web.jpg", id: "7", group:'false'}
				];
				*/
				
				createContainers();
				
				
				
				preloadThumbs = new createjs.LoadQueue(true, "thumbs/");
				preloadThumbs.on("progress", handleProgressThumbs);
				preloadThumbs.on("complete", handleCompleteThumbs);
				preloadThumbs.on("fileload", handleFileLoadThumbs);
				preloadThumbs.on("error", handleFileError);
				preloadThumbs.loadManifest(thumbsManifest, true, "thumbs");
				
				preload = new createjs.LoadQueue(true, "content/");
				preload.on("progress", handleProgress);
				preload.on("complete", handleCompleteAlt);
				preload.on("fileload", handleFileLoadAlt);
				preload.on("error", handleFileError);
				preload.loadManifest(manifest, true, "content/2-work/");
				
				
				createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
				createjs.Ticker.setFPS(60);
				createjs.Ticker.addEventListener("tick", tick);
			}
			
			var initWinHeight = $window.height();
			
			function sizeContainers(){
				
				var _temp_oX = _oX;
				var _temp_sX = _sX;
				
				_oX = [];
				_sX = [];
				
				for(var i=0; i<$container.children.length; i++) {
					var _scaleY = parseFloat($window.height() * .7 / $container.getBounds().height).toFixed(4);
					var _scaleX = _scaleY;
					
					$container.scaleX = _scaleX;
					$container.scaleY = _scaleY;

					_sX.push( _temp_sX * _scaleX );
					
					$container.x = _sX[i];
				}
			}
			
			function resetContainers(){
				loadIndex = 0;
				
				for(var i=0; i<$('.project-image').length; i++) {
				
					var _scaleY = parseFloat($window.height() * .7 / $('.project-image').eq(i).data('height')).toFixed(4);
					var _scaleX = _scaleY;
					var _y = $window.height()/2 - ($window.height() * .7)/2;
				    var _isInGroup = manifest[i].group != false ? true : false;
					var _groupID = !_isInGroup ? false : manifest[i].groupID;
					
					var _w =  ($('.project-image').eq(i).data('width') * _scaleX);
					var _h =  ($('.project-image').eq(i).data('height') * _scaleY);

					
					
					
					if(_isInGroup) {
						
						if(_groupID < 1){
							
							
						
							//imgContainer.addChild( background )
							//$containerClone.addChild( imgContainer.clone(true) );
							
						} else {
							//imgContainer = $containers[loadIndex];
							//imgContainer.regX = (_w/2 + ( $('.project-image').eq(i-1).data('width') * _scaleX )/2)/2 ;
							//imgContainer.x = $window.width()/2 + ($window.width() * loadIndex);
							
							//imgContainer.regX = 0;
							
							
							var _prevw =  ($('.project-image').eq(i-1).data('width') * _scaleX);
							var _prevx =  loadIndex > 0 ? $containers[loadIndex-1].x : 0;
							var _wbasis;

							var _addSpacing = indexSpacing;
							
							if(i > 2 && manifest[i-2].group){
								_addSpacing = indexSpacing * 2;
								_wbasis = i > 2 ? ($('.project-image').eq(i-3).data('width') * _scaleY) + ($('.project-image').eq(i-2).data('width') * _scaleY) + _addSpacing : 0;
							} else {
								_wbasis = i > 1 ? ($('.project-image').eq(i-2).data('width') * _scaleY) + _addSpacing :  0;
							}

							$container.children[loadIndex].x =  _wbasis + _prevx;
							$containerClone.children[loadIndex].x =  _wbasis + _prevx;
					
							loadIndex++;
						}
						
						//imgContainer.y = _y;

					} else {
						
						//imgContainer.y = _y;
						//imgContainer.regX = 0;
						
						
						var _prevw =  i > 0 ? ($('.project-image').eq(i-1).data('width') * _scaleY) + (indexSpacing): 0;
						if(i > 1){		
							if(manifest[i-1].group){
								_prevw = ($('.project-image').eq(i-1).data('width') * _scaleY) + ($('.project-image').eq(i-2).data('width') * _scaleY) + (indexSpacing * 2);
							}
							
						
						}
						var _prevx =  loadIndex > 0 ? $containers[loadIndex-1].x : 0;

						$container.children[loadIndex].x =  _prevw + _prevx;
						$containerClone.children[loadIndex].x =  _prevw + _prevx;
						
						loadIndex++
					}
					
					

					//imgContainer.regY = 0;
					//imgContainer.y = $window.height()/2  - _y;
					
					
				}
				
				
				stage.regX = $container.children[0].x - $window.width()/2 + ($('.project-image').eq(0).data('width') * .7)/2;

				
			}
			
			
			
			function createContainers(){
				
				for(var i=0; i<$('.project-image').length; i++) {
					
					var _scaleY = parseFloat($window.height() * .3 / $('.project-image').eq(i).data('height')).toFixed(4);
					var _scaleX = _scaleY;
					var _y = $window.height()/2 - ($window.height() * .3)/2;
				    var _isInGroup = manifest[i].group != false ? true : false;
					var _groupID = !_isInGroup ? false : manifest[i].groupID;
					
					var _w =  ($('.project-image').eq(i).data('width') * _scaleX);
					var _h =  ($('.project-image').eq(i).data('height') * _scaleY);
					
					var imgContainer;
					var background = new createjs.Shape();
					


					
					if(_isInGroup) {
						
						if(_groupID < 1){
							
							
							imgContainer = new createjs.Container().set({ _id:loadIndex });
							$containers.push( imgContainer );
							$container.addChild( imgContainer );
							//imgContainer.addChild( background )
							//$containerClone.addChild( imgContainer.clone(true) );
							
						} else {
							imgContainer = $containers[loadIndex];
							//imgContainer.regX = (_w/2 + ( $('.project-image').eq(i-1).data('width') * _scaleX )/2)/2 ;
							//imgContainer.x = $window.width()/2 + ($window.width() * loadIndex);
							
							imgContainer.regX = 0;
							
							
							var _prevw =  ($('.project-image').eq(i-1).data('width') * _scaleX);
							var _prevx =  loadIndex > 0 ? $containers[loadIndex-1].x : 0;
							var _wbasis;
							
							/*
							if(i > 2)
							if(manifest[i-2].group){
								_wbasis = ($('.project-image').eq(i-2).data('width') * _scaleX)/2 + _w/2;
							} else {
								_wbasis = _prevw + _w;
							}
							else
							if(i > 0 && manifest[i-1].group){
								_wbasis = _prevw + _w;
							} else {
								_wbasis = ($('.project-image').eq(i-2).data('width') * _scaleX)
							}
							*/
							var _addSpacing = indexSpacing * 2;
							
							if(i > 2 && manifest[i-2].group){
								_addSpacing = indexSpacing * 2;
								_wbasis = i > 2 ? ($('.project-image').eq(i-3).data('width') * _scaleY) + ($('.project-image').eq(i-2).data('width') * _scaleY) + _addSpacing : 0;
							} else {
								_wbasis = i > 2 ? ($('.project-image').eq(i-2).data('width') * _scaleY) + _addSpacing : 0;
							}
							
							imgContainer.x = _wbasis + _prevx;
							//_origXArr[loadIndex] = (_wbasis + _prevx);
							//_oX[loadIndex] = imgContainer.x;
							//imgContainer.x = $window.width()/2 + ($window.width() * loadIndex);
							//_setXArr[loadIndex] = (imgContainer.x)
							
					
							loadIndex++;
						}
						
						imgContainer.y = _y;

					} else {
						imgContainer = new createjs.Container().set({ _id:loadIndex });
						$container.addChild( imgContainer );
						
						imgContainer.y = _y;
						imgContainer.regX = 0;
						//imgContainer.x = i > 0 ? $window.width()/2 + ($window.width() * loadIndex) : $window.width()/2;

						
						//imgContainer.x = i > 0 ? $window.width()/2 + ($window.width() * loadIndex) : $window.width()/2;
						
						var _prevw =  i > 0 ? ($('.project-image').eq(i-1).data('width') * _scaleY) + (indexSpacing * 2): 0;
						if(i > 1){		
							if(manifest[i-1].group){
								_prevw = ($('.project-image').eq(i-1).data('width') * _scaleY) + ($('.project-image').eq(i-2).data('width') * _scaleY) + (indexSpacing * 2);
							}
							
						
						}
						var _prevx =  loadIndex > 0 ? $containers[loadIndex-1].x : 0;
						//imgContainer.x = _prevw + _prevx;
						//imgContainer.x = $window.width()/2 + ($window.width() * loadIndex);
						imgContainer.x = _prevw + _prevx;
						//_setXArr[loadIndex] = (imgContainer.x)
						//_origXArr[loadIndex] = (_prevw + _prevx);
						//_oX[loadIndex] = imgContainer.x;
						
						
						$containers.push( imgContainer );
						
						loadIndex++
					}
					
					

					imgContainer.regY = 0;
					imgContainer.y = $window.height()/2  - _y;
					
					//setTimeout(function(){ $container.alpha = .4; }, 3000);
					
					
					
				}
				
				
				
				
				
				_orig$containerSize = 0;
				_set$containerSize  = 0;
				
				for(var k=0; k<$('.project-image').length; k++){
					var thumbScale = parseFloat($window.height() * .3 / $('.project-image').eq(k).data('width')).toFixed(4);
					var largeScale = parseFloat($window.height() * .3 / $('.project-image').eq(k).data('width')).toFixed(4);
					//console.log(thumbScale);
					_orig$containerSize +=  ( $('.project-image').eq(k).data('width') * thumbScale ) + (indexSpacing);
					_set$containerSize  +=  ( $('.project-image').eq(k).data('width') * largeScale ) + (indexSpacing);
				}
				
				var thumbScale = parseFloat($window.height() * .3 / $('.project-image').eq(0).data('width')).toFixed(4);

				
				console.log(_orig$containerSize)
				
				
				
				
				
				for(var j=0; j<$container.children.length; j++) {
					//console.log($container.children[j]._id)
					$containerClone.addChild($container.children[j].clone(true));
					$containerClone.children[j].set({ _id: $container.children[j]._id, _clone:true })
				}
				
				//console.log($container)
				//console.log(imgContainer.regX);
				
				
			}
			
			
			function setStageCurrent(){
							console.log('set current stage');
							if( currentImage == $container.children.length -1 ) {
								console.log('set stage back')
								stage.regX = $containerClone.x + $containerClone.children[$containerClone.children.length-1].x - $window.width()/2;
								currentImage = -1;
							} else if(currentImage < 0 ) {
								console.log('set stage above')
								currentImage = Math.abs(currentImage);
								stage.regX = $container.children[currentImage].x - $window.width()/2;
					
							} else {
								currentImage = Math.abs(currentImage);
								stage.regX = $container.children[Math.abs(currentImage)].x - $window.width()/2;
							}
							//console.log(currentImage);
						}
			
			
			function stop() {
				if (preload != null) {
					preload.close();
				}
			}
			
			function handleProgressThumbs(event) {

			}
			
		
			
			function handleCompleteThumbs(event) {
				resetContainers();
				
				_orig$containerSize = $containerClone.getBounds().width * .3;

				
				
				for(var i=0; i<$container.children.length; i++) {
					//$container.children[i].x = $container.children[i].x + $container.children[i-1].getBounds().width + 20;
					_oX[i] = $container.children[i].x;
				}
				
				
				
				for(var i=0; i<$container.children.length; i++) {
			
					$container.children[i].x = i > 0 ? $container.children[i-1].x + $window.width() + $window.width()/2 : 0;
					$containerClone.children[i].x = i > 0 ? $container.children[i-1].x + $window.width() + $window.width()/2 : 0;
					_sX[i] = $container.children[i].x;
			
				}
				
				stage.regX = $container.children[0].x - $window.width()/2 + ($container.children[0].getBounds().width)/2;
				
				_set$containerSize = $containerClone.getBounds().width;
				//$containerClone.x = _set$containerSize + $window.width();
				allThumbsLoaded = true; 
				
				//scrollTitleScreen();
			}
			
			var thumbsLoaded = 0;
			var thumbLoadIndex = 0;
			var thumbIndex = 0;
			var thumbs = [];
			var thumbsClone = [];
			
			function handleFileLoadThumbs(event) {
				thumbsLoaded++;
				
				var image = event.result;
				var _scaleY = parseFloat( ($window.height() * .7) / $('.project-image').eq(thumbIndex).data('height')).toFixed(4);
				var _scaleYThumb = parseFloat( ($window.height() * .7) / image.height ).toFixed(4);
				var _scaleX = _scaleY;
			    var _isInGroup = thumbsManifest[thumbIndex].group != false ? true : false;
				var _groupID = !_isInGroup ? false : thumbsManifest[thumbIndex].groupID;
				var _y = 0;
				var w = image.width;
				var h = image.height;
				var ratio = parseFloat(image.height/image.width).toFixed(2);
				
				console.log(' y ' + _scaleY)
				
				var img = new createjs.Bitmap(image).set({
					 scaleX:_scaleYThumb, scaleY:_scaleYThumb,
					 regX: 0, regY: 0,
					 cursor: "pointer",
					 x: 0, 
					 y: 0,
					_origX: 0,
					_id: thumbIndex,
					_group: !_isInGroup ? false : thumbsManifest[thumbIndex].group,
					_groupID: _groupID
				});
				
				var imgClone = new createjs.Bitmap(image).set({
					 scaleX:_scaleYThumb, scaleY:_scaleYThumb,
					 regX: 0, regY: 0,
					 cursor: "pointer",
					 x: 0, 
					 y: 0,
					_origX: 0,
					_id: thumbIndex,
					_group: !_isInGroup ? false : thumbsManifest[thumbIndex].group,
					_groupID: _groupID
				});
				
				/*
			    var blurFilter = new createjs.BlurFilter(5, 5, 1);
			    img.filters = [blurFilter];
			    var bounds = blurFilter.getBounds();
				*/

				
				thumbs.push(img);
				thumbsClone.push(imgClone);
				
				
				if(thumbIndex > fileThreshold){
					//img.cache(0, 0, img.getBounds().width, img.getBounds().height);
					//$container.children[thumbLoadIndex].addChild( img );
					
				} else {
	
				}
				
				
				
				img.cache(0, 0, img.getBounds().width, img.getBounds().height);
				imgClone.cache(0, 0, img.getBounds().width, img.getBounds().height);
				
				$container.children[thumbLoadIndex].addChildAt( img, 0 );
				$containerClone.children[thumbLoadIndex].addChildAt( imgClone, 0 );
				

				
				if(!_isInGroup) {
					
					if(thumbLoadIndex > 0) {
						var _xpos = $container.children[thumbLoadIndex-1].x + $container.children[thumbLoadIndex-1].getBounds().width/2 + $container.children[thumbLoadIndex].getBounds().width/2;
						//$container.children[thumbLoadIndex].x = _xpos;
					} else {
						
					}
					
					img.x = 0;
					
					thumbLoadIndex += 1;
					
				} else {
					if(_groupID < 1) {
		
						var _cw = $container.children[thumbLoadIndex].getBounds().width;
						//img.x = -_cw/2 - indexSpacing/2;
						//imgClone.x = -_cw/2 - indexSpacing/2;
						img.x = 0;
						imgClone.x = 0;
						
					} else {
						console.log( $('.project-image').eq(thumbIndex-1).data('width') ) 
						img.x = ( $('.project-image').eq(thumbIndex-1).data('width') * _scaleY) + indexSpacing;
						imgClone.x = ( $('.project-image').eq(thumbIndex-1).data('width') * _scaleY) + indexSpacing;
						
						//img.x = $container.children[thumbLoadIndex].getBounds().width - (w * _scaleX);
						//imgClone.x = $containerClone.children[thumbLoadIndex].getBounds().width - (w * _scaleX);

					}
					thumbLoadIndex = _groupID < 1 ? thumbLoadIndex : thumbLoadIndex + 1;
				}

				thumbIndex++;
				
				
				
				var th_id = thumbLoadIndex > 0 ? thumbLoadIndex - 1 : 0;
				//th_id = thumbLoadIndex == $('.project-image').length + 1 ? $('.project-image').length : th_id;
				
				//console.log($container.children[th_id].getBounds().width);
				
				//$containerClone.x = $container.getBounds().width - $container.children[th_id].getBounds().width/2 + $window.width()/2 + ( $window.width()/2 - $container.children[0].getBounds().width/2 );
			}
			
			
			
			
			function handleFileError(event) {
				console.log('error ' + event);
			}
			
			var thumbsLoadedInt;
			
			function handleProgress(event) {
				var expo = $('.project-image').length / fileThreshold
				$('.preloader').css('width', (event.loaded * expo) * $window.width());
				
				if(filesLoaded == fileThreshold) {
					
				}
			}
			
			thumbsLoadedInt = setInterval(function(){ 
				if(filesLoaded >= fileThreshold && allThumbsLoaded) {
					clearInterval(thumbsLoadedInt);
					scrollTitleScreen();
				} else {
					console.log('thumbs not fully loaded yet')
					console.log(allThumbsLoaded);
					console.log(filesLoaded);
					console.log(fileThreshold);
				}
			}, 200);
			
			function scrollTitleScreen(){
				$('body').addClass('scrolling').attr('data-page', 'work');
				$('body').addClass('animating');
				
				$('.title-screen').velocity({ 
					translateY:'-100%'
				}, {
					ease: "easeInOutSine",
					duration:settings.animationSpeed,
					complete:function(){ }
				});
				
				
				
				$container.alpha = 1;
				
				/*
				var clone = $container.children[0].clone(true);
				stage.addChild(clone);
				*/
				
				$('.main-wrapper').velocity({ 
					translateY:'-100%'
				}, {
					duration:settings.animationSpeed,
					complete:function(){
						//$container.alpha = 1;
						//stage.removeChild(clone);
						
						for(var i=0; i<$container.children.length; i++) $container.children[i].alpha = 1;
						$('body').removeClass('animating');
						setPath('work'); 
						settings.page.current = 'work'; 
						initSlideshow();
						$(window).on('mousewheel', winMouseWheel).on('mousemove', winMouseMove);
					}
				}); 
				
				//clone.y = $window.height() + clone.getBounds().height;
				
				
				
				
				//$container.alpha = 0;
				
				//$container.cache(0, 0, $container.getBounds().width, $container.getBounds().height)
				/*
				$('.main-wrapper').css('top', 0);
					createjs.Tween.get(clone, {override: true})
							.to({y: $window.height()/2 }, settings.animationSpeed, ease)
				*/
			} 
			
			var fileLoadIndex = 0;
			
			function handleFileLoadAlt(event) {


				filesLoaded++;

				
				var image = event.result;
				var _scaleY = parseFloat($window.height() * .7 / image.height).toFixed(4);
				var _scaleX = _scaleY;
			    var _isInGroup = manifest[_index].group != false ? true : false;
				var _groupID = !_isInGroup ? false : manifest[_index].groupID;
				var _y = 0;
				var w = image.width;
				var h = image.height;
				//var ratio = parseFloat(image.height/image.width).toFixed(2);
				
				// alertnate load method
				
				var img = new createjs.Bitmap(image).set({
					 scaleX:_scaleX, scaleY:_scaleY,
					 regX: 0, regY: 0,
					 cursor: "pointer",
					 x: 0, 
					 y: 0,
					_origX: 0,
					_full:true,
					_id: _index,
					_group: !_isInGroup ? false : manifest[_index].group,
					_groupID: _groupID
				});
				
				var imgClone = new createjs.Bitmap(image).set({
					 scaleX:_scaleX, scaleY:_scaleY,
					 regX: 0, regY: 0,
					 cursor: "pointer",
					 x: 0, 
					 y: 0,
					_full:true,
					_origX: 0,
					_id: _index,
					_group: !_isInGroup ? false : manifest[_index].group,
					_groupID: _groupID
				});
				
	
				//console.log($containers.length)
				if(fileLoadIndex > fileThreshold){
					//img.alpha = 0;
				}
				
				if(fileLoadIndex > 0) {
					//$container.children[fileLoadIndex].alpha = 0;
					img.alpha = 0;
					imgClone.alpha = 0;
				}
				
				

				img.on("click", handleClickAlt);
				img.on("mouseover", handleOver);
				img.on("mouseout", handleOut);
				
				imgClone.on("click", handleClickAlt);
				imgClone.on("mouseover", handleOver);
				imgClone.on("mouseout", handleOut);
				
				img.cache(0, 0, img.getBounds().width, img.getBounds().height);
				imgClone.cache(0, 0, img.getBounds().width, img.getBounds().height);
			
				$container.children[fileLoadIndex].addChild( img );
				$containerClone.children[fileLoadIndex].addChild( imgClone );
				
				if(!_isInGroup) {
					fileLoadIndex += 1;
					img.x = 0;
					imgClone.x = 0;
				} else {
					if(_groupID < 1) {
						//img.x = -(w * _scaleX)/2 - indexSpacing/2;
						//imgClone.x = -(w * _scaleX)/2 - indexSpacing/2;
						img.x = 0;
						imgClone.x = 0;
					} else {
						img.x = ( $('.project-image').eq(_index-1).data('width') * _scaleY) + indexSpacing;
						imgClone.x = ( $('.project-image').eq(_index-1).data('width') * _scaleY) + indexSpacing;
					
						//img.x = ( $('.project-image').eq(_index - 1).data('width') * _scaleX)/2 + indexSpacing/2
						//imgClone.x = ( $('.project-image').eq(_index - 1).data('width') * _scaleX)/2 + indexSpacing/2
					}
					fileLoadIndex = _groupID < 1 ? fileLoadIndex : fileLoadIndex + 1;
				}
				
				if(fileLoadIndex > fileThreshold){
					createjs.Tween.get(img, {override: true})
									.to({alpha: 1 }, animSpeed, ease)
					createjs.Tween.get(imgClone, {override: true})
							.to({alpha: 1 }, animSpeed, ease)
				
					setTimeout(function(){ 
						//stage.removeChild(thumbs[_index]); 
						//stage.removeChild(thumbsClone[_index]); 
						//$container.children[fileLoadIndex].removeChild( thumbs[_index] );
						//$containerClone.children[fileLoadIndex].removeChild( thumbs[_index] );
					}, 300);
					
				} else {
					img.alpha = 1;
					imgClone.alpha = 1;
					//stage.removeChild(thumbs[_index]);
					//stage.removeChild(thumbsClone[_index]);
					
					//removeChild(thumbs[_index])
					$container.children[fileLoadIndex].removeChild( thumbs[_index] );
				}

				
				//img.alpha = 0;
				
				
				_bmps.push(img);
				images.push(img);
				imagesClone.push(imgClone);
				
				_index++;
				
				stage.update();
			}
			
			/*
			function resizeContainers(){

				_origXArr = [];
	
				var _y = $window.height()/2 - ($window.height() * .7)/2;
				
				for(var i=0; i<$container.children.length; i++) {
					var _isInGroup = 0;
					var _offset = 6; // 20 * .3
					

					
					$container.children[i].scaleX = .3;
					$container.children[i].scaleY = .3;
					
					$container.children[i].x = i > 0 ? ($container.children[i-1].getBounds().width/2 * .3) + $container.children[i-1].x + ($container.children[i].getBounds().width/2 * .3) + _offset : 0;
					
					
					_origXArr[i] = $container.children[i].x;
					_orig$containerSize = $container.getBounds().width;
					
				}
				
				//console.log(_origXArr);
				
				for(var i=0; i<$container.children.length; i++) {
					var _isInGroup = 0;
					var _offset = $window.width()/2; // 20 * .3
					
					
					$container.children[i].scaleX = 1;
					$container.children[i].scaleY = 1;
					
					$container.children[i].x = i > 0 ? $container.children[i-1].getBounds().width/2 + $container.children[i-1].x + $container.children[i].getBounds().width/2 + _offset : 0;
					$container.children[i].y = _y;
					
					$containerClone.children[i].scaleX = 1;
					$containerClone.children[i].scaleY = 1;
					
					$containerClone.children[i].x = i > 0 ? $container.children[i-1].getBounds().width/2 + $container.children[i-1].x + $container.children[i].getBounds().width/2 + _offset : 0;
					$containerClone.children[i].y = _y;
					
					_set$containerSize = $container.getBounds().width;
					
					_setXArr.push ( $container.children[i].x );
					
					//console.log(i + ' ' + $container.children[i].x )
					//console.log(i + ' ' + $container.children[i].getBounds().width )

				}
				
				
			}
		*/
			
			
			
			function handleCompleteAlt(event) {
				
				for(var i=0; i<containers.length; i++) {
					//console.log(containers[i].getBounds().width)
				}
				
				//$window.on('mousewheel', scrollThumbnails);	
				loaderBar.visible = false;
				//stage.regX = containers[currentImage].x  - $window.width()/2;
				stage.update();
				//scrollTitleScreen();
				//resizeContainers();
				//setClone();

				//initSlideshow();
				
				$('.index').on('click', showIndex);
			}
			
			
		

			function watchStrips(direction){
				console.log($container.x + $container.children[0].x);
				console.log($containerClone.x + $containerClone.children[0].x);
				if(direction == "left") {
					if(stage.regX <= $containerClone.x + $container.children[0].x) {
						stage.regX = $container.children[0].x;
						//$containerClone.x = -$container.getBounds().width - $window.width()/2;
					}
				} else {
					if(stage.regX >= $container.x + $container.children[$container.children.length-1].x) {
						stage.regX = $containerClone.x + $containerClone.children[$containerClone.children.length-1].x;
					}
				}
			}
			
			function handleOver(event) {
				if($('body').hasClass('animating')) return true;
				console.log('over')
				
				if(!_isIndex) {
					return false;
				} else {
					/*
					for(var i=0; i<$container.children.length; i++) {
						
						for(var j=0; i<$container.children[i].children.length; i++) {
							createjs.Tween.get($container.children[i].children[j].image, {override: true})
									.to({alpha: .6 }, animSpeed, ease)
							createjs.Tween.get($containerClone.children[i].children[j].image, {override: true})
									.to({alpha: .6 }, animSpeed, ease)
						}
						
						console.log($containerClone.children[i])
					}*/
					
					
					for(var i=images.length; i<thumbs.length; i++) {
							createjs.Tween.get(thumbs[i], {override: true})
									.to({alpha: .6 }, animSpeed, ease)
							createjs.Tween.get(thumbsClone[i], {override: true})
									.to({alpha: .6 }, animSpeed, ease)
							
					}
			
					
					for(var i=0; i<images.length; i++) {
						stage.removeChild(thumbs[i]); 
						stage.removeChild(thumbsClone[i]); 
						
						
							createjs.Tween.get(thumbs[i], {override: true})
									.to({alpha: 0 }, animSpeed, ease)
							createjs.Tween.get(thumbsClone[i], {override: true})
									.to({alpha: 0 }, animSpeed, ease)
						
						
							createjs.Tween.get(images[i], {override: true})
									.to({alpha: .6 }, animSpeed, ease)
							createjs.Tween.get(imagesClone[i], {override: true})
									.to({alpha: .6 }, animSpeed, ease)
							
					}

						createjs.Tween.get(event.target, {override: true})
								.to({alpha: 1 }, animSpeed, ease)
						
					
					}

			}
			
			function handleOut(event) {
				if($('body').hasClass('animating')) return true;
				if(!_isIndex) {
					return false;
				} else {
					
					for(var i=images.length; i<thumbs.length; i++) {
							createjs.Tween.get(thumbs[i], {override: true})
									.to({alpha: 1 }, animSpeed, ease)
							createjs.Tween.get(thumbsClone[i], {override: true})
									.to({alpha: 1 }, animSpeed, ease)
							
					}
					
					for(var i=0; i<images.length; i++) {
							createjs.Tween.get(images[i], {override: true})
									.to({alpha: 1 }, animSpeed, ease)
							createjs.Tween.get(imagesClone[i], {override: true})
									.to({alpha: 1 }, animSpeed, ease)
							
					}
	
					
				}
			}
			
			
			function handleClickAlt(event) {
				if($('body').hasClass('animating') || settings.page.current != 'work') return true;
				//$('body').addClass('animating');
	
				if(!_isIndex){
					nextImage();
					//initSlideshow();
				} else {

					
					_isSlideShowFromIndex = true;
					
					if(event.target.parent._clone) {
						console.log('clone')
						_clickedClone = true;
						//stage.regX += _orig$containerSize/2
						//stage.regX = $container.children[event.target.parent._id].x - stage.regX;
						//stage.regX = _oX[event.target.parent._id] - (stage.regX)
						console.log(event.target.parent.x)
						//console.log(_oX[event.target.parent._id]);
						
						//stage.regX = event.target.parent.x;
						//$containerClone.x = $container.getBounds().width + 7;
						//stage.regX = ($containerClone.x * .3) + event.target.parent.x + stage.regX
						//stage.update();
						/*
						createjs.Tween.get(stage, {override: true})
								.to({x: -event.target.parent.x + stage.regX  }, 2000, ease)
						
						*/
						
		
						
						
						//console.log(_oX[event.target.parent._id])
						
						//stage.regX += $container.children[event.target.parent._id].x - stage.regX - $window.width()/2 + ($container.children[event.target.parent._id].getBounds().width/2);
						//$containerClone.x = $container.getBounds().width + 7;
						
					} else {
						console.log('not clone')
						_clickedClone = false;
					}
					
					
					for(var i=0; i<thumbs.length; i++) {
							createjs.Tween.get(thumbs[i], {override: true})
									.to({alpha: 0 }, animSpeed, ease)
							createjs.Tween.get(thumbsClone[i], {override: true})
									.to({alpha: 0 }, animSpeed, ease)
							
					}
					
					
					for(var i=0; i<images.length; i++) {
							createjs.Tween.get(images[i], {override: true})
									.to({alpha: 0 }, animSpeed, ease)
							createjs.Tween.get(imagesClone[i], {override: true})
									.to({alpha: 0 }, animSpeed, ease)
							
					}
					
					createjs.Tween.get(images[event.target._id], {override: true})
							.to({alpha: 1 }, animSpeed, ease)
					createjs.Tween.get(imagesClone[event.target._id], {override: true})
							.to({alpha: 1 }, animSpeed, ease)
					
					currentImage = event.target.parent._id;
					destroySlideshow();
					showIndex();
				}
			}
			
			
			function initSlideshow(){
				clearTimeout(timer);
				clearInterval(slideInterval);
				console.log('init slideshow')
				
				timer = setTimeout(function(){
					slideInterval = setInterval(function(){
						if(_slideShowDirection == "right") {
							nextImage();
							stopSlideshow()
						} else {
							prevImage();
							stopSlideshow()
						}
						stage.update();
					}, intervalSpeed);
				}, timerSpeed);
			}
			
			function stopSlideshow(){
				initSlideshow();
			}
			
			function destroySlideshow(){
				clearTimeout(timer);
				clearInterval(slideInterval);
			}
			
			function slideShowOn(){
				_isSlideShow = true;
			}
			
			function slideShowOff(){
				_isSlideShow = false;
			}
			
			
			function winMouseWheel(e){
				if($('body').hasClass('animating') || !_isIndex) return true;
					
					stage.regX += e.deltaY;
					
		
					var direction;
					if(e.deltaY > 1) {
						//watchStrips("left");
						direction = "right";
					} else {
						//watchStrips("right");
						direction = "left";
					}
				
					var strip_offset = !_isIndex ? $window.width() : 10;
					var _scale = !_isIndex ? 1 : .3;
					
					
					if(direction=="left") {
						if(stage.regX + e.deltaY <= $containerClone.x + $container.children[0].x) {
							stage.regX = $container.children[0].x + e.deltaY;
						}
					} else {
						if(stage.regX + e.deltaY >= $container.children[$container.children.length-1].x - $window.width()) {
							stage.regX = $containerClone.x + $containerClone.children[$containerClone.children.length-1].x + e.deltaY - $window.width();
						}
					}
					
					for(var i=0; i<$container.children.length; i++) {
						
						if( stage.regX > ( _oX[i] * .3 ) - $window.width()/2 ) {
							currentImage = $container.children[i]._id;
							console.log(currentImage)
						}
					}
					
					/*
				
					if(direction == "left") {
						if(!_isIndex){
							$containerClone.x = -$containerClone.getBounds().width - (strip_offset - $containerClone.children[0].getBounds().width)/2;
						} else {
							$containerClone.x = -($containerClone.getBounds().width * $containerClone.scaleX) - 6;
						}
						
						
						if(stage.regX + e.deltaY <= $containerClone.x + $container.children[0].x - strip_offset/2) {
							console.log('over left index')
							stage.regX = $container.children[0].x - strip_offset/2 + e.deltaY;
						}
					} else {
						if(!_isIndex){
							if(stage.regX + e.deltaY >= $container.children[$container.children.length-1].x - strip_offset) {
								stage.regX = $containerClone.x + $containerClone.children[$containerClone.children.length-1].x - e.deltaY - strip_offset;
							}
						} else {
							if(stage.regX + e.deltaY >= ( $container.children[$container.children.length-1].x * .3) - $window.width() ) {
								console.log('over right index')
								stage.regX = $containerClone.x  + ( $containerClone.children[$containerClone.children.length-1].x * .3) + e.deltaY;
							}
						}
					}
					*/
				
			}
			
			function winMouseMove(e){
				var factor = e.clientX < $window.width()/2 ? $window.width() - $window.width()/2 - e.clientX : e.clientX - $window.width()/2;
					factor = ( (factor - 200) / ($window.width()*.5) ).toFixed(1);
					factor = factor < 0 ? 0 : factor;
					factor = factor > 1 ? 1 : factor;
					factor = e.clientX < $window.width()/2 ? -factor * 2 : factor * 2;
				//console.log(factor);
				
				if(!_isIndex || $('body').hasClass('animating')) return true;
				
				//var factor = Math.abs(e.clientX/$window.width()) * (_orig$containerSize - $window.width()); moves entire strip [---]
				
				
				if(e.clientX < $window.width()/2 ){
					_moveIndex = true;
					_mouseFactor = factor;
				} else if( e.clientX > $window.width()/2  ) {
					_moveIndex = true;
					_mouseFactor = factor;
				} else {
					_moveIndex = false;
				}
			}
			
			function tickStage(){
				if(!_moveIndex) return true;
				stage.regX += _mouseFactor;
	
				if(_mouseFactor < 0) {
					if(stage.regX + _mouseFactor <= $containerClone.x + $container.children[0].x) {
						stage.regX = $container.children[0].x + _mouseFactor;
					}
				} else {
					if(stage.regX + _mouseFactor >= $container.children[$container.children.length-1].x - $window.width()) {
						stage.regX = $containerClone.x + $containerClone.children[$containerClone.children.length-1].x +_mouseFactor - $window.width();
					}
				}
			}
			
			
			function prevImage(){
				if($('body').hasClass('animating') || settings.page.current != 'work' || _isIndex) return true;			
				$('body').addClass('animating');
				
				if(_isSlideShowFromIndex) {
					
					_slideShowDirection = "left";
					
					var targContainer = currentImage < 0 ? $containerClone : $container;
					console.log(targContainer);
					var _toNext = false;
					var _prevID  = currentImage > -($container.children.length - 1) ? currentImage - 1 : $container.children.length-1;
					
					
					for(var i=0; i<$container.children[Math.abs(currentImage)].children.length; i++) {
						if($container.children[Math.abs(currentImage)].children[i].alpha < 1 || $containerClone.children[Math.abs(currentImage)].children[i].alpha < 1) {
							_toNext = false;
							if($container.children[Math.abs(currentImage)].children[i]._full) {
							createjs.Tween.get($container.children[Math.abs(currentImage)].children[i], {override: true})
									.to({alpha: 1 }, animSpeed, ease)
							createjs.Tween.get($containerClone.children[Math.abs(currentImage)].children[i], {override: true})
									.to({alpha: 1 }, animSpeed, ease)
									.call(onPrevComplete)
							}
							console.log('animate it')
						} else {
							_toNext = true;
						}
					}
					
					
					
			
					
					if(_toNext) {
						
						
						for(var i=0; i<$container.children[Math.abs(currentImage)].children.length; i++) {
								createjs.Tween.get($container.children[Math.abs(currentImage)].children[i], {override: true})
										.to({alpha: 0 }, animSpeed, ease)
								createjs.Tween.get($containerClone.children[Math.abs(currentImage)].children[i], {override: true})
										.to({alpha: 0 }, animSpeed, ease)
						}
						
						var _prevID  = currentImage > -($container.children.length - 1) ? currentImage - 1 : $container.children.length-1;
						var _nextX = _prevID < 0 ? $containerClone.x + $containerClone.children[$containerClone.children.length + _prevID].x - $window.width()/2 + $containerClone.children[$containerClone.children.length + _prevID].getBounds().width/2  : $container.x + $container.children[_prevID].x - $window.width()/2 + $container.children[_prevID].getBounds().width/2;
						var targContainer = _prevID < 0 ? $containerClone : $container;
						
						//_nextX -= $window.width()/2;
					
						currentImage = _prevID;
						
						if($container.children[Math.abs(currentImage)].children.length < 3) {
							//single

							for(var i=0; i<$container.children[Math.abs(currentImage)].children.length; i++) {
								if($container.children[Math.abs(currentImage)].children[i]._full) {
									$container.children[Math.abs(currentImage)].children[i].alpha = 1;
									$containerClone.children[Math.abs(currentImage)].children[i].alpha = 1;
									break;
								} else {
									$container.children[Math.abs(currentImage)].children[i].alpha = 0;
									$containerClone.children[Math.abs(currentImage)].children[i].alpha = 0;
								}
							}
							/*
							createjs.Tween.get($container.children[Math.abs(currentImage)].children[1], {override: true})
									.to({alpha: 1 }, animSpeed, ease)
							*/
				
							
						} else {
							// grouped
							var _img;
							for(var i=0; i<$container.children[Math.abs(currentImage)].children.length; i++) {
								if($container.children[Math.abs(currentImage)].children[i]._full) {
									$container.children[Math.abs(currentImage)].children[i].alpha = 1;
									$containerClone.children[Math.abs(currentImage)].children[i].alpha = 1;
									break;
								} else {
									$container.children[Math.abs(currentImage)].children[i].alpha = 0;
									$containerClone.children[Math.abs(currentImage)].children[i].alpha = 0;
								}
							}
							
							//_img.alpha = 1;
							/*
							createjs.Tween.get(_img, {override: true})
									.to({alpha: 1 }, animSpeed, ease)
							*/
						
		
						}
						
						/*
						
						
						for(var i=0; i<targContainer.children[Math.abs(currentImage)].children.length; i++) {
								createjs.Tween.get(targContainer.children[Math.abs(currentImage)].children[i], {override: true})
										.to({alpha: 1 }, animSpeed, ease)
						}
						
						createjs.Tween.get($container.children[Math.abs(currentImage)].children[0], {override: true})
								.to({alpha: 1 }, animSpeed, ease)
						createjs.Tween.get($containerClone.children[Math.abs(currentImage)].children[0], {override: true})
								.to({alpha: 1 }, animSpeed, ease)
						*/
						createjs.Tween.get(stage, {override: true})
								.to({regX: _nextX }, animSpeed, ease)
								.call(onPrevComplete)
					} else {
						stopSlideshow();
					}
					
					
				} else {
					
					if(currentImage == 0) $containerClone.x = -$containerClone.getBounds().width - ($window.width()/2);
					
					var _prevID  = currentImage > -($container.children.length - 1) ? currentImage - 1 : $container.children.length-1;
				
					
				
					var _nextX = _prevID > -1 ? $container.children[_prevID].x - $window.width()/2 + $container.children[_prevID].getBounds().width/2 : $containerClone.x + $containerClone.children[$containerClone.children.length + _prevID].x - $window.width()/2 + $containerClone.children[$containerClone.children.length + _prevID].getBounds().width/2;
					//_nextX -= $window.width()/2;
					
					stopSlideshow();
							
					currentImage = _prevID;
					
					//console.log(currentImage);

					createjs.Tween.get(stage, {override: true})
							.to({regX: _nextX }, animSpeed, ease)
							.call(onPrevComplete)
					
				}
				
				
				
				//console.log(currentImage);
				/*
				for(var i=0; i<$container.children.length; i++){
					if(i != currentImage)
					for(var j=0; i<$container.children[i].children.length; i++){
						$container.children[i].children[j].alpha = 0;
					}
				}
				*/
				
				
				
			}
			
			function onPrevComplete(){
				$('body').removeClass('animating');
				
				
				
				if(currentImage == -($container.children.length-1) ) {
					stage.regX = $container.children[1].x - $window.width()/2 + $container.children[1].getBounds().width/2;
					currentImage = 1;
					
					if(_isSlideShow) {
						var targContainer = currentImage < 0 ? $containerClone : $container;
						
						createjs.Tween.get(targContainer.children[$containerClone.children.length-1].children[0], {override: true})
								.to({alpha: 1 }, animSpeed, ease)
					}
				}  else if(currentImage == -1) {
					
					stage.regX = $container.children[$container.children.length - 1].x - $window.width()/2 + $container.children[$container.children.length - 1].getBounds().width/2;
					currentImage = $container.children.length - 1;
					
					if(_isSlideShowFromIndex) {
						stopSlideshow();
						
						var targContainer = currentImage < 0 ? $containerClone : $container;
						
						for(var i=0; i<$container.children[$containerClone.children.length-1].children.length; i++) {
							if($container.children[$containerClone.children.length-1].children[i]._full) {
								createjs.Tween.get($container.children[$containerClone.children.length-1].children[i], {override: true})
									.to({alpha: 1 }, animSpeed, ease)
								createjs.Tween.get($containerClone.children[$containerClone.children.length-1].children[i], {override: true})
									.to({alpha: 1 }, animSpeed, ease)
							} else {
								$container.children[$containerClone.children.length-1].children[i].alpha = 0;
								$container.children[$containerClone.children.length-1].children[i].alpha = 0;
							}
						}
						
						
					}
				}
				
			
				
			}
			
			
			function nextImage(){
				if($('body').hasClass('animating') || settings.page.current != 'work' || _isIndex) return true;			
				$('body').addClass('animating');
				
				console.log(currentImage);
				
				if(_isSlideShowFromIndex) {
					stopSlideshow();					
					
					if(currentImage == $container.children.length - 1) {
						$containerClone.x = -$containerClone.getBounds().width - ($window.width()/2);
						stage.regX = $containerClone.x + $containerClone.children[$container.children.length - 1].x - $window.width()/2 + $containerClone.children[$container.children.length - 1].getBounds().width/2;
						currentImage = $container.children.length - 1;
					} else {
						
					}
					
					_slideShowDirection = "right";
					
					var targContainer = currentImage < 0 ? $containerClone : $container;
					//console.log(targContainer);
					var _toNext = false;
					
					for(var i=0; i<$container.children[Math.abs(currentImage)].children.length; i++) {
						
						if($container.children[Math.abs(currentImage)].children[i].alpha < 1 || $containerClone.children[Math.abs(currentImage)].children[i].alpha < 1) {
							_toNext = false;
							
						} else {
							_toNext = true;
						}
						if($container.children[Math.abs(currentImage)].children[i]._full) {
							
							createjs.Tween.get($container.children[Math.abs(currentImage)].children[i], {override: false})
									.to({alpha: 1 }, animSpeed, ease)
									.call(onNextComplete)

							createjs.Tween.get($containerClone.children[Math.abs(currentImage)].children[i], {override: false})
									.to({alpha: 1 }, animSpeed, ease)
						}
						
						
					}
					
					if(_toNext) {
						
						var _nextID  = currentImage < $container.children.length - 1 ? currentImage + 1 : -($container.children.length-1);
				
						var _nextX = _nextID < 0 ? $containerClone.x + $containerClone.children[$containerClone.children.length + _nextID].x - $window.width()/2 + $containerClone.children[$containerClone.children.length + _nextID].getBounds().width/2 : $container.x + $container.children[_nextID].x - $window.width()/2 + $container.children[_nextID].getBounds().width/2;
				
						var targContainer = _nextID < 0 ? $containerClone : $container;
						
						
						for(var i=0; i<$container.children[Math.abs(currentImage)].children.length; i++) {
								createjs.Tween.get($container.children[Math.abs(currentImage)].children[i], {override: true})
										.to({alpha: 0 }, animSpeed, ease)
								createjs.Tween.get($containerClone.children[Math.abs(currentImage)].children[i], {override: true})
										.to({alpha: 0 }, animSpeed, ease, ease)
						}
						
						
						
					
						//_nextX -= $window.width()/2;
					
						currentImage = _nextID;
						
						/*
						for(var i=0; i<$container.children[Math.abs(currentImage)].children.length; i++) {
							if($container.children[Math.abs(currentImage)].children[i]._full) {
								createjs.Tween.get($container.children[Math.abs(currentImage)].children[i], {override:true})
										.to({alpha: 1 }, animSpeed, ease)
								createjs.Tween.get($containerClone.children[Math.abs(currentImage)].children[i], {override:true})
										.to({alpha: 1 }, animSpeed, ease)		
							}
						}
						*/
						
						/*
						for(var i=0; i<targContainer.children[Math.abs(currentImage)].children.length; i++) {
								createjs.Tween.get(targContainer.children[Math.abs(currentImage)].children[i], {override: true})
										.to({alpha: 1 }, animSpeed, ease)
						}
						*/
						
						if($container.children[Math.abs(currentImage)].children.length < 3) {
							
							for(var i=0; i<$container.children[Math.abs(currentImage)].children.length; i++) {
								if($container.children[Math.abs(currentImage)].children[i]._full) {
									$container.children[Math.abs(currentImage)].children[i].alpha = 1;
									$containerClone.children[Math.abs(currentImage)].children[i].alpha = 1;
									break;
								}
							}
							
						} else {
							// grouped
							var _img;
							for(var i=0; i<$container.children[Math.abs(currentImage)].children.length; i++) {
								if($container.children[Math.abs(currentImage)].children[i]._full) {
									$container.children[Math.abs(currentImage)].children[i].alpha = 1;
									$containerClone.children[Math.abs(currentImage)].children[i].alpha = 1;
									break;
								}
							}
							
							//_img.alpha = 1;
							/*
							createjs.Tween.get(_img, {override: true})
									.to({alpha: 1 }, animSpeed, ease)
							*/
						
		
						}
						
						
						
				
						createjs.Tween.get(stage, {override: true})
								.to({regX: _nextX }, animSpeed, ease)
								.call(onNextComplete)
					} else {
						
					}
					
					
				} else {
					
					var _nextX;
					var _nextID  = currentImage < $container.children.length - 1 ? currentImage + 1 : $container.children.length - 1;
					var targContainer = _nextID < 0 ? $containerClone : $container;
					
					
					if(currentImage == $container.children.length - 1) {
						$containerClone.x = -$containerClone.getBounds().width - ($window.width()/2);
						stage.regX = $containerClone.x + $containerClone.children[$container.children.length - 1].x - $window.width()/2 + $containerClone.children[$container.children.length - 1].getBounds().width/2;
						currentImage = 0;
						_nextX =  $container.children[0].x - $window.width()/2 + $container.children[0].getBounds().width/2;
					} else {
						currentImage++;
						_nextX = _nextID < 0 ? $container.children[$containerClone.children.length + _nextID].x - $window.width()/2 + $container.children[$containerClone.children.length + _nextID].getBounds().width/2 : $container.children[_nextID].x - $window.width()/2 + $container.children[_nextID].getBounds().width/2;
					}

					//currentImage = _nextID;
					stopSlideshow();
					
					for(var i=0; i<$container.children[Math.abs(currentImage)].children.length; i++) {
						$container.children[Math.abs(currentImage)].children[i].alpha = 1;
						$containerClone.children[Math.abs(currentImage)].children[i].alpha = 1;
					}
					
					createjs.Tween.get(stage, {override: true})
							.to({regX: _nextX }, animSpeed, ease)
							.call(onNextComplete)
				}
				
				
				
				
			}

			
			function onNextComplete(){
				$('body').removeClass('animating');
				
				
				if( currentImage == $container.children.length - 1 ) {
					console.log('set stage back')
					$containerClone.x = -$containerClone.getBounds().width - ($window.width()/2);
					stage.regX = $containerClone.x + $containerClone.children[$containerClone.children.length-1].x - $window.width()/2 + $containerClone.children[$containerClone.children.length-1].getBounds().width/2;
					currentImage = -1;
					
					
					stopSlideshow();
					
					if(_isSlideShowFromIndex) {
						
						for(var i=0; i<$container.children[$containerClone.children.length-1].children.length; i++) {
							if($container.children[$containerClone.children.length-1].children[i]._full) {
								createjs.Tween.get($container.children[$containerClone.children.length-1].children[i], {override: true})
									.to({alpha: 1 }, animSpeed, ease)
								createjs.Tween.get($containerClone.children[$containerClone.children.length-1].children[i], {override: true})
									.to({alpha: 1 }, animSpeed, ease)
							} else {
								$container.children[$containerClone.children.length-1].children[i].alpha = 0;
								$container.children[$containerClone.children.length-1].children[i].alpha = 0;
							}
						}
						
				
					}
					
				}	
			}
			
			function onClickComplete(event) {
				$('body').removeClass('animating');
			
			}

			
			function showIndexComplete(){
				console.log('showIndex Complete')
				$('body').addClass('index');
				$window.on('mousewheel', scrollThumbnails);	
			}
			
			function indexComplete(){
				$('body').removeClass('animating');
			}
			

			
			var tempBounds;
			
			function showIndex(){
				
				if($('body').hasClass('animating') || settings.page.current != 'work') return true;			
				$('body').addClass('animating');
				
			
				//var prevImageWidth = (images[0].image.width * ($window.height() * .7 / images[0].image.height));
				//var prevImageX = (images[0].image.width * ($window.height() * .7 / images[0].image.height)) ;
				//var offset = 20;
				
				
				if(!_isIndex) {
					//console.log('CURRENT IMAGE ' + currentImage);
			
					var _num = currentImage < 0 ? Math.abs(currentImage) : currentImage;
					var _targContainer = currentImage < 0 ? $containerClone : $container;
					var _offset = currentImage < 0 ? -_orig$containerSize : 0;
					
					tempBounds = $container.getBounds().width;
					
					//$('.canvas-container').off('mousedown', onMouseDown);
					
					for(var i=images.length; i<thumbs.length; i++) {
							createjs.Tween.get(thumbs[i], {override: true})
									.to({alpha: 1 }, animSpeed, ease)
							createjs.Tween.get(thumbsClone[i], {override: true})
									.to({alpha: 1 }, animSpeed, ease)
							
					}
					
					for(var i=0; i<images.length; i++) {
							createjs.Tween.get(thumbs[i], {override: true})
									.to({alpha: 0 }, animSpeed, ease)
							createjs.Tween.get(thumbsClone[i], {override: true})
									.to({alpha: 0 }, animSpeed, ease)
						
							createjs.Tween.get(images[i], {override: true})
									.to({alpha: 1 }, animSpeed, ease)
							createjs.Tween.get(imagesClone[i], {override: true})
									.to({alpha: 1 }, animSpeed, ease)
							
					}
					
					createjs.Tween.get($container, {override: true})
						.to({
							alpha: 1
						}, animSpeed, ease)
						
					createjs.Tween.get($containerClone, {override: true})
						.to({
							alpha: 1
						}, animSpeed, ease)
						
						
					//console.log('_NUM ' + _num);
					
					//stage.regX = $container.children[_num].x - $window.width()/2 + ( $container.children[_num].getBounds().width/2 )
					
					//regX: _oX[_num] - $window.width() + ( ($container.children[_num].getBounds().width/2) * .3 )
					
					/*
					createjs.Tween.get(stage, {override: true})
						.to({
							regX: _oX[_num]
						}, 2000, ease)
					*/

						
						/*
						
						for(var i=0; i<_bmps.length; i++) {
								if(_bmps[i]._id != event.target._id)
								createjs.Tween.get(_bmps[i], {override: true})
										.to({alpha: 1 }, animSpeed, ease)
				
						}
				*/

					/*
					*
					*	ANIMATE ALL CONTAINERS TO SMALL
					*
					*/
					for(var i=0; i<$container.children.length; i++) {
						//var _xVal = _oX[i] * .3 
						createjs.Tween.get($container.children[i], {override: true})
							.to({
								x:_oX[i] * .3,
								scaleX:.3,
								scaleY:.3,
							}, 2000, ease)
							
						createjs.Tween.get($containerClone.children[i], {override: true})
							.to({
								x:_oX[i] * .3,
								scaleX:.3,
								scaleY:.3,
							}, 2000, ease)
					}
					
					createjs.Tween.get($container, {override: true})
						.to({
							y:$window.height()/2 - ($window.height()/2)/2
					}, 2000, ease);
					
			
					
					
					console.log(_num)
					
					
					
					if($containerClone.x > $container.getBounds().width) {
						
						createjs.Tween.get($containerClone, {override: true})
							.to({
								x:_orig$containerSize + 5,
								y:$window.height()/2 - ($window.height()/2)/2
						}, 2000, ease)
					} else {
						$containerClone.x = -_set$containerSize - $window.width()/2
						
						createjs.Tween.get($containerClone, {override: true})
							.to({
								x:-_orig$containerSize - 5,
								y:$window.height()/2 - ($window.height()/2)/2
						}, 2000, ease)
					}
					

					createjs.Tween.get(stage, {override: true})
						.to({
							regX: (_oX[_num] * .3) - $window.width()/2 + ($container.children[_num].getBounds().width * .3)/2
						}, 2000, ease)
					
					/*
					createjs.Tween.get(stage, {override: true})
											.to({
												regX:( $container.children[_num].x * .3 ) - $window.width()/2 + ( $container.children[_num].getBounds().width * ( .3 ))/2
											}, 2000, ease)
					*/
					
					
					/*
					createjs.Tween.get($container, {override: true})
						.to({
							scaleX:.3,
							scaleY:.3
					}, 2000, ease)
					
					createjs.Tween.get($containerClone, {override: true})
						.to({
							x:-_orig$containerSize - 6,
							scaleX:.3,
							scaleY:.3
						}, 2000, ease)
					*/
					
					//$containerClone.alpha = 0;
					
					stage.removeEventListener("tick", tickStage )
					stage.addEventListener("tick", tickStage );
					
					
					
				} else {
					
					console.log('CURRENT IMAGE ' + currentImage);
					
					var _num = currentImage < 0 ? Math.abs(currentImage) : currentImage;
					var _targContainer = currentImage < 0 ? $containerClone : $container;
					var _offset = currentImage < 0 ? -_set$containerSize : 0;
					var _winOffset = currentImage < 0 ? $window.width() : $window.width()/2;
					
					console.log('_NUM ' + _num);
					
					stage.removeEventListener("tick", tickStage );
					

					/*
					*
					*	ANIMATE ALL CONTAINERS TO LARGE
					*
					*/
					for(var i=0; i<$container.children.length; i++) {
						//var _xVal = _oX[i] * .3 
						createjs.Tween.get($container.children[i], {override: true})
							.to({
								x:_sX[i],
								scaleX:1,
								scaleY:1,
							}, 2000, ease)
							
						createjs.Tween.get($containerClone.children[i], {override: true})
							.to({
								x:_sX[i],
								scaleX:1,
								scaleY:1,
							}, 2000, ease)
					}
					
					createjs.Tween.get($container, {override: true})
						.to({
							y:0
					}, 2000, ease);
					
					if($containerClone.x > $container.getBounds().width) {
						createjs.Tween.get($containerClone, {override: true})
							.to({
								x:_set$containerSize + $window.width()/2,
								y:0
						}, 2000, ease)
					} else {
						createjs.Tween.get($containerClone, {override: true})
							.to({
								x:-_set$containerSize - $window.width()/2,
								y:0
						}, 2000, ease)
					}
					
					var _cloneOffset = _clickedClone ? -_set$containerSize - $window.width()/2 : 0;
					
					console.log('clone offset ' + _cloneOffset);
					
					createjs.Tween.get(stage, {override: true})
						.to({
							regX: _cloneOffset + (_sX[_num]) - $window.width()/2 + ($container.children[_num].getBounds().width)/2
						}, 2000, ease).
						call(function(){ 
							stage.regX = (_sX[_num]) - $window.width()/2 + ($container.children[_num].getBounds().width)/2;
							initSlideshow(); 
						
						})
						
						/*
						$containerClone.x = -_set$containerSize - ( $window.width()/2);
					
			
						createjs.Tween.get($containerClone, {override: true})
							.to({
								x:-_orig$containerSize - 7,
								scaleX:1,
								scaleY:1,
								y:$window.height()/2 - ($window.height())/2
						}, 2000, ease)
						*/
						
						
						/*
					for(var i=0; i<$container.children.length; i++) {
					
						createjs.Tween.get($container.children[i], {override: true})
							.to({
								x:_setXArr[i],
								y:$window.height()/2 - ($window.height() * .7)/2,
								scaleX:1,
								scaleY:1
							}, 2000, ease)
					}
					
					for(var i=0; i<$container.children.length; i++) {
					
						createjs.Tween.get($containerClone.children[i], {override: true})
							.to({
								x:_setXArr[i],
								y:$window.height()/2 - ($window.height() * .7)/2,
								scaleX:1,
								scaleY:1
							}, 2000, ease)
					}
					
					createjs.Tween.get($containerClone, {override: true})
						.to({
							x:-_set$containerSize - $window.width()/2
						}, 2000, ease)
										
					
				
						*/
			
				}
				setTimeout(function(){ $('body').removeClass('animating') }, 2000);
				

				_isIndex = !_isIndex;
		
			}
			
			
			
			function onProgress(event) {
				//console.log(event);
			}
			
			
			
			
			
			
			$("body").keydown(function(e) {
			  if(e.which == 37) { // left     
				  prevImage();
				  return true;
			  }
			  else if(e.which == 39) { // right     
				  nextImage();
				  return true;
			  }
			  else if(e.which == 32) { // spacebar
				  showIndex();
			  	  return true;
			  }
		  	});
			
			
			

			
			function tweenUpComplete(event) {
				//$container.addChildAt(currentItem, 0);
				$('body').removeClass('animating');

			}
			
			function positionIndex(event){
				//$container.setTransform(0, $container.y, $container.scaleX, $container.scaleY, 0, 0, 0, _nextX);
				//stage.regX = containers[currentImage].x - $window.width()/2;
				stage.update();
			}
			
			function tweenUpdate(){
				stage.update();
			}
			
			function handleComplete(event) {
				loaderBar.visible = false;
				addEventListeners();
				//createCloneStrip();
				stage.update();
			}
			
			function setCanvasSize(){
				$el.attr('width', $window.width());
				$el.attr('height', $window.height());
			}
			
			function createCloneStrip(){
				leftStrip = $container.clone(true);
				rightStrip = $container.clone(true);
				
				leftStrip.x = -$container.getBounds().width + $window.width()/2;
				rightStrip.x = $container.getBounds().width + $window.width()/2;
				
				console.log(leftStrip);
				
				stage.addChild(leftStrip);
				stage.addChild(rightStrip);
			}
			
			function addEventListeners(){
				/*
				$('.work').on('click', function(){
					if(!$('body').hasClass('index')) showIndex();
				});
				*/
				$('.canvas-container').on('mousedown', onMouseDown);
				
				//$('.left-arrow').on('click', prevImage);
				//$('.right-arrow').on('click', nextImage);
				
				
			}
			
			
			function onMouseDown(event) {
				if($('body').hasClass('animating') || settings.page.current != 'work' || _isIndex) return true;			
				
				var left = event.clientX < $window.width()/2 ? true : false;
			
				if(!left) {
					nextImage();
				} else {
					prevImage();
				}
			}
			

			
			function winResize(){	
				clearInterval(slideInterval);
				clearTimeout(winTimer);
				
				setCanvasSize();
				
				//if(thumbsLoaded)
				//sizeContainers();
				
				
				
				winTimer = setTimeout(function(){ 
					setCanvasSize();
					//resizeImages();
					//resizeContainers();
				}, 200);
				
				tick();
			}
			
		  	function tick(e) {
				stage.update(e);
		    }
			
			
			init();	
			winResize();
			addEventListeners();
			$window.on('resize', throttle(winResize, 200));
		//stage.update();
};
  