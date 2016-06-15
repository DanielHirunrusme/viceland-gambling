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
		var imageContainer;
		var imageConainerClone;
		
		var $container;
		var $containerClone;
		
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
		var containers = [];
		var manifest = [];
		var thumbsManifest = [];
		var _index = 0;
		var _xOffset = $window.width()/2;
		var ease = createjs.Ease.sineInOut;
		var spacing = 20;
		var _mouseFactor = 1;
		var _moveIndex = false;
		
		var _origXArr = [];
		var _setXArr  = [];
		var _bmps     = [];
		var _origImageContainerSize;
		var _setImageContainerSize;
		var _isSlideShow;
		
		var timer;
		var winTimer;
		var animSpeed = 800;
		var timerSpeed = 10;
		var slideInterval;
		var intervalSpeed = 8000;
		var loadIndex = 0;
		var imageContainers = [];
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
				imageContainer = new createjs.Container();
				imageContainer.x = 0;
				imageContainer.alpha = 0;
				
				//clone
				imageContainerClone = new createjs.Container();
				imageContainerClone.x = 0;
				imageContainerClone.alpha = 0;
				//imageContainer.y = 200;
				loaderWidth = 100;
				stage.addChild(imageContainer, imageContainerClone);
				var bgBar = new createjs.Shape();
				var padding = 3
				
				//stage.addChild(imageContainer, imageContainerClone);
				
				//bgBar.graphics.setStrokeStyle(1).beginStroke(loaderColor).drawRect(-padding / 2, -padding / 2, loaderWidth + padding, barHeight + padding);
				//loaderBar.x = canvas.width/2 + loaderWidth/2 >> 1;
				//loaderBar.y = canvas.height - barHeight >> 1;
				//loaderBar.addChild(bar, bgBar);
				//stage.addChild(loaderBar);
				/*
				$container = new createjs.Container();
				$containerClone = new createjs.Container();
				
				$containerClone.alpha = 1;
				$containerClone.y = 100;
				
				stage.addChild( $container, $containerClone );
				*/
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
				
				//createContainers();
				
				
				/*
				preloadThumbs = new createjs.LoadQueue(true, "thumbs/");
				preloadThumbs.on("progress", handleProgressThumbs);
				preloadThumbs.on("complete", handleCompleteThumbs);
				preloadThumbs.on("fileload", handleFileLoadThumbs);
				preloadThumbs.on("error", handleFileError);
				preloadThumbs.loadManifest(thumbsManifest, true, "thumbs");
				*/
				
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
			
			
			
			
			
			function createContainers(){
				
				for(var i=0; i<$('.project-image').length; i++) {
					
					var _scaleY = parseFloat($window.height() * .7 / $('.project-image').eq(i).data('height')).toFixed(4);
					var _scaleX = _scaleY;
					var _y = $window.height()/2 - ($window.height() * .7)/2;
				    var _isInGroup = manifest[i].group != false ? true : false;
					var _groupID = !_isInGroup ? false : manifest[i].groupID;
					
					var _w =  ($('.project-image').eq(i).data('width') * _scaleX);
					var _h =  ($('.project-image').eq(i).data('height') * _scaleY);
					
					var imgContainer;
					var background = new createjs.Shape();
					
					var colors = ["#ccc", "#234sf2", "#415kf2", "#a2f245", "#231dd2", "#4dft24", "#5lsccd", "#sdg234", "#234as4", "#444wef" ]
					var getColor = colors[ Math.floor(Math.random()*colors.length) ];
					
					
					
					if(_isInGroup) {
						
						if(_groupID < 1){
							
							
							imgContainer = new createjs.Container();
							imageContainers.push( imgContainer );
							//$container.addChild( imgContainer );
							//imgContainer.addChild( background )
							
							//$containerClone.addChild( imgContainer.clone(true) );
							
							
						} else {
							imgContainer = imageContainers[loadIndex];
							imgContainer.regX = (_w/2 + ( $('.project-image').eq(i-1).data('width') * _scaleX )/2)/2 + 10;
							imgContainer.x = $window.width()/2 + ($window.width() * loadIndex);
					
							loadIndex++;
						}
						
						imgContainer.y = _y;

					} else {
						imgContainer = new createjs.Container();
						//$container.addChild( imgContainer );
						//$containerClone.addChild( imgContainer.clone(true) );
						
						imgContainer.y = _y;
						imgContainer.x = $window.width()/2 + ($window.width() * loadIndex);
					
						imgContainer.regX = _w/2;
						imageContainers.push( imgContainer );
						
						loadIndex++
					}

					imgContainer.regY = _h/2;
					imgContainer.y = $window.height()/2;
					//$containerClone.addChild( imgContainer.clone(true) );
					
					
					
					
				}
				
				
				
				//console.log($container)
				//$containerClone.x = 0;
				
			}
			
			
			
			
			function stop() {
				if (preload != null) {
					preload.close();
				}
			}
			
			function handleProgressThumbs(event) {
				
			}
			
			function handleCompleteThumbs(event) {
				
			}
			
			var thumbsLoaded = 0;
			var thumbLoadIndex = 0;
			var thumbIndex = 0;
			var thumbs = [];
			
			function handleFileLoadThumbs(event) {
				thumbsLoaded++;
				
				var image = event.result;
				var _scaleY = parseFloat($window.height() * .7 / image.height).toFixed(4);
				var _scaleX = _scaleY;
			    var _isInGroup = thumbsManifest[thumbIndex].group != false ? true : false;
				var _groupID = !_isInGroup ? false : thumbsManifest[thumbIndex].groupID;
				var _y = $window.height()/2 - ($window.height() * .7)/2;
				var w = image.width;
				var h = image.height;
				var ratio = parseFloat(image.height/image.width).toFixed(2);
				
				//console.log(image)
				
				var img = new createjs.Bitmap(image).set({
					 scaleX:_scaleX, scaleY:_scaleY,
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
					 scaleX:_scaleX, scaleY:_scaleY,
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
				
				
				
				if(thumbIndex > fileThreshold){
					//img.cache(0, 0, img.getBounds().width, img.getBounds().height);
					//$container.children[thumbLoadIndex].addChild( img );
					
				} else {
	
				}
			
				
				img.cache(0, 0, img.getBounds().width, img.getBounds().height);
				imgClone.cache(0, 0, img.getBounds().width, img.getBounds().height);
				
				$container.children[thumbLoadIndex].addChild( img );
				$containerClone.children[thumbLoadIndex].addChild( imgClone );
				
				$containerClone.y = 200;
				
				
				
				if(!_isInGroup) {
					thumbLoadIndex += 1;
					
				} else {
					if(_groupID < 1) {
						//var large_w = $('.project-image').eq(thumbIndex).data('width');
						var _cw = $container.children[thumbLoadIndex].getBounds().width;
						img.x = -_cw/2 - 10;
						imgClone.x = -_cw/2 - 10;

					} else {
						//var large_w = $('.project-image').eq(thumbLoadIndex - 1).data('width');
						//console.log( $container.children[thumbLoadIndex].getBounds().width)
						img.x = $container.children[thumbLoadIndex].getBounds().width - (w * _scaleX);
						imgClone.x = $containerClone.children[thumbLoadIndex].getBounds().width - (w * _scaleX);
					}
					thumbLoadIndex = _groupID < 1 ? thumbLoadIndex : thumbLoadIndex + 1;
				}

				thumbIndex++;
				
				
			}
			
			
			
			
			function handleFileError(event) {
				console.log('error ' + event);
			}
			
			function handleProgress(event) {
				var expo = $('.project-image').length / fileThreshold
				$('.preloader').css('width', (event.loaded * expo) * $window.width());
				
				if(filesLoaded == fileThreshold) {
					scrollTitleScreen();
				}
			}	
			
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
				
				console.log(stage);
				stage.alpha = 1;
				imageContainer.alpha = 1;
				imageContainerClone.alpha = 1;
				
				//$container.alpha = 1;
				
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
						
						//for(var i=0; i<$container.children.length; i++) $container.children[i].alpha = 1;
						$('body').removeClass('animating');
						setPath('work'); 
						settings.page.current = 'work'; 
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
				
				var image = event.result;
				var _scaleY = parseFloat($window.height() * .7 / image.height).toFixed(4);
				var _scaleX = _scaleY;
			    var _isInGroup = manifest[_index].group != false ? true : false;
				var _groupID = !_isInGroup ? false : manifest[_index].groupID;
				var _y = $window.height()/2 - ($window.height() * .7)/2;
				var w = image.width;
				var h = image.height;
				//var ratio = parseFloat(image.height/image.width).toFixed(2);
				
				/*
				filesLoaded++;
				
				
				
				var image = event.result;
				var _scaleY = parseFloat($window.height() * .7 / image.height).toFixed(4);
				var _scaleX = _scaleY;
			    var _isInGroup = manifest[_index].group != false ? true : false;
				var _groupID = !_isInGroup ? false : manifest[_index].groupID;
				var _y = $window.height()/2 - ($window.height() * .7)/2;
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
					_origX: 0,
					_id: _index,
					_group: !_isInGroup ? false : manifest[_index].group,
					_groupID: _groupID
				});
				
	
				//console.log(imageContainers.length)
				if(fileLoadIndex > fileThreshold){
					img.alpha = 0;
				}
				
				if(fileLoadIndex > 0) {
					$container.children[fileLoadIndex].alpha = 0;
				}
				
				
				
				img.on("click", handleClickAlt);
				img.on("mouseover", handleOver);
				img.on("mouseout", handleOut);
				
				imgClone.on("click", handleClickAlt);
				imgClone.on("mouseover", handleOver);
				imgClone.on("mouseout", handleOut);
				
				img.cache(0, 0, img.getBounds().width, img.getBounds().height);
				imgClone.cache(0, 0, img.getBounds().width, img.getBounds().height);
			
				//console.log($container.children[fileLoadIndex]);
				$container.children[fileLoadIndex].addChild( img );
				$containerClone.children[fileLoadIndex].addChild( imgClone );
				
				if(!_isInGroup) {
					fileLoadIndex += 1;
					img.x = 0;
					imgClone.x = 0;
					//$container.children[fileLoadIndex].cache(0, 0, $window.width(), $window.width());
					//$container.children[fileLoadIndex].removeAllChildren();
				} else {
					if(_groupID < 1) {
						img.x = -(w * _scaleX)/2 - 10;
						imgClone.x = -(w * _scaleX)/2 - 10;
					} else {
						//console.log('large ' + $container.children[fileLoadIndex].children[3].getBounds().width)
						//img.x = $container.children[fileLoadIndex].getBounds().width - img.getBounds().width;
						img.x = ( $('.project-image').eq(_index - 1).data('width') * _scaleX)/2 + 10
						imgClone.x = ( $('.project-image').eq(_index - 1).data('width') * _scaleX)/2 + 10
					}
					fileLoadIndex = _groupID < 1 ? fileLoadIndex : fileLoadIndex + 1;
				}
				
				if(fileLoadIndex > fileThreshold){
					createjs.Tween.get(img, {override: true})
							.to({alpha: 1 }, 300, ease)
					setTimeout(function(){ stage.removeChild(thumbs[_index]); }, 300);
				} else {
					img.alpha = 1;
					imgClone.alpha = 1;
					stage.removeChild(thumbs[_index]);
				}
				

				//thumbs[_index].x += 200;

			
				
				_bmps.push(img);
					*/
				/*
				*
				*	CREATE IMAGE SPRITE
				*
				*/
				var bmp = new createjs.Bitmap(image).set({
					 scaleX:_scaleX, scaleY:_scaleY,
					 regX: 0, regY: 0,
					 cursor: "pointer",
					 x: 0, 
					 y: 0,
					_origX: 0,
					_id: _index,
					_group: !_isInGroup ? false : manifest[_index].group,
					_groupID: _groupID
				});
				

				images.push(bmp);
				
				bmp.scaleY = parseFloat($window.height() * .7 / image.height).toFixed(1);
				bmp.scaleX = bmp.scaleY;
				
				/*
				*
				*	CACHE IMAGE
				*
				*/
				//bmp.cache(0, 0, bmp.getBounds().width, bmp.getBounds().height);
				
				/*
				*
				*	CLICK HANDLERS
				*
				*/
				bmp.on("click", handleClickAlt);
				bmp.on("mouseover", handleOver);
				bmp.on("mouseout", handleOut);
				
				var prevImageX, prevImageWidth, offset;
				var imageWidth = (image.width * ($window.height() * .7 / image.height));
		
				/*
				*
				*	SET GROUPED IMAGES
				*
			*/
				if(_isInGroup) {
					if(_groupID > 0){
						if(containers[containerIndex] != undefined)
						bmp.x = containers[containerIndex].getBounds().width + 20;
					} else {
						bmp.x = 0;
					}
					
				}
				
				var _offset = 20;
				
				var bmpClone = bmp.clone( false );
				bmpClone._id = _index;
				bmpClone.on("click", handleClickAlt);
				bmpClone.on("mouseover", handleOver);
				bmpClone.on("mouseout", handleOut);
				
				
				
				_bmps.push(bmp);
				_bmps.push(bmpClone);
				
				if(!_isInGroup) {
					
					var border = new createjs.Shape(
								new createjs.Graphics().beginFill("#00FF00").drawRect(-5, -5, bmp.getBounds().width  + 10, bmp.getBounds().height + 10).endFill()
						).set({
							regX: 0,
							regY: 0,
							scaleX: .7,
							scaleY: .7
						});
					
						
					var container = new createjs.Container().set({ _id:containerIndex });
					container.addChild(bmp);
					
					var containerClone = new createjs.Container().set({ _id:-containerIndex });
					
					
					containerClone.addChild(bmpClone);
					
					containers.push(container);
					
					var _xPos = containerIndex > 0 ? containers[containerIndex - 1].x + $window.width() : $window.width()/2;
					var _origX = containerIndex > 0 ? containers[containerIndex - 1].x + containers[containerIndex - 1].getBounds().width/2 + 20 : containers[containerIndex].x + containers[containerIndex].getBounds().width/2;
					//_origXArr.push(_origX);
					
					container.regX = container.getBounds().width/2;
					containerClone.regX = containerClone.getBounds().width/2;
					
				//	container.cache(0, 0, container.getBounds().width, container.getBounds().height);
					//containerClone.cache(0, 0, containerClone.getBounds().width, containerClone.getBounds().height);
					
					
					imageContainer.addChild(container);
					imageContainerClone.addChild(containerClone);
					
					container.snapToPixel = true;
					containerIndex++;
				} else {
					if(_groupID>0) {
						//containers[containerIndex].addChild( bmp );
						imageContainer.children[containerIndex].addChild(bmp);
		
					
						imageContainerClone.children[containerIndex].addChild(bmpClone);
						
						
			
						//var _xPos = containerIndex > 0 ? containers[containerIndex-1].x + $window.width() : $window.width()/2;
						//var _origX = containerIndex > 0 ? containers[containerIndex - 1].x + containers[containerIndex - 1].getBounds().width/2  + 20 : containers[containerIndex].x + containers[containerIndex].getBounds().width/2;
						//_origXArr.push(_origX);
						
						//containers[containerIndex].regX = containers[containerIndex].getBounds().width/2;
						//containers[containerIndex].snapToPixel = true;
						imageContainer.children[containerIndex].regX = imageContainer.children[containerIndex].getBounds().width/2;
						imageContainer.children[containerIndex].snapToPixel = true;
						imageContainerClone.children[containerIndex].regX = imageContainerClone.children[containerIndex].getBounds().width/2;
						imageContainerClone.children[containerIndex].snapToPixel = true;
						
						
						//imageContainer.children[containerIndex].cache(0, 0, imageContainer.children[containerIndex].getBounds().width, imageContainer.children[containerIndex].getBounds().height);
						//imageContainerClone.children[containerIndex].cache(0, 0, imageContainerClone.children[containerIndex].getBounds().width, imageContainerClone.children[containerIndex].getBounds().height);
						
						
						containerIndex++;
					} else {
						var container = new createjs.Container().set({ _id:containerIndex });
						container.addChild( bmp );
						containers.push(container);
						
						var containerClone = new createjs.Container().set({ _id:-containerIndex });
						
						
				
					
						containerClone.addChild(bmpClone);
						
						//container.cache(0, 0, $window.width(), $window.height());
						
						//var _xPos = containerIndex > 0 ? containers[containerIndex - 1].x + $window.width() : $window.width()/2;
						//container.regX = container.getBounds().width/2;
						//container.x = _xPos;
						imageContainer.addChild(container);
						imageContainerClone.addChild(containerClone);
						
					}
				}
			
				
				_index++;
				
				//winResize();
				stage.update();
			}
			
			function resizeContainers(){

				_origXArr = [];
	
				var _y = $window.height()/2 - ($window.height() * .7)/2;
				
				for(var i=0; i<imageContainer.children.length; i++) {
					var _isInGroup = 0;
					var _offset = 6; // 20 * .3
					

					
					imageContainer.children[i].scaleX = .3;
					imageContainer.children[i].scaleY = .3;
					
					imageContainer.children[i].x = i > 0 ? (imageContainer.children[i-1].getBounds().width/2 * .3) + imageContainer.children[i-1].x + (imageContainer.children[i].getBounds().width/2 * .3) + _offset : 0;
					
					
					_origXArr[i] = imageContainer.children[i].x;
					_origImageContainerSize = imageContainer.getBounds().width;
					
				}
				
				//console.log(_origXArr);
				
				for(var i=0; i<imageContainer.children.length; i++) {
					var _isInGroup = 0;
					var _offset = $window.width()/2; // 20 * .3
					
					
					imageContainer.children[i].scaleX = 1;
					imageContainer.children[i].scaleY = 1;
					
					imageContainer.children[i].x = i > 0 ? imageContainer.children[i-1].getBounds().width/2 + imageContainer.children[i-1].x + imageContainer.children[i].getBounds().width/2 + _offset : 0;
					imageContainer.children[i].y = _y;
					
					imageContainerClone.children[i].scaleX = 1;
					imageContainerClone.children[i].scaleY = 1;
					
					imageContainerClone.children[i].x = i > 0 ? imageContainer.children[i-1].getBounds().width/2 + imageContainer.children[i-1].x + imageContainer.children[i].getBounds().width/2 + _offset : 0;
					imageContainerClone.children[i].y = _y;
					
					_setImageContainerSize = imageContainer.getBounds().width;
					
					_setXArr.push ( imageContainer.children[i].x );
					
					//console.log(i + ' ' + imageContainer.children[i].x )
					//console.log(i + ' ' + imageContainer.children[i].getBounds().width )

				}
				
				
			}
		
			
			function resizeImages(){
				var imageWidths = [];
				var portrait = false;
				
				for(var i=0; i<images.length; i++){
					if(images[i].image.width * parseFloat($window.height() * .7 / images[i].image.height).toFixed(4) + 100 > $window.width()) {
						portrait = true;
					}
				}
				
				if(!portrait) {
					for(var i=0; i<images.length; i++){
						images[i].scaleY = parseFloat($window.height() * .7 / images[i].image.height).toFixed(4);
						images[i].scaleX = images[i].scaleY;
						images[i].y = $window.height()/2 - ($window.height() * .7)/2;
					
						if(images[i]._group) {
							if(images[i]._groupID > 0){
								var imageWidth = (images[i-1].image.width * ($window.height() * .7 / images[i-1].image.height));
								images[i].x = imageWidth + spacing;
							} else {
								images[i].x = 0;
							
							}
					
						}
						//images[i].parent.regX = images[i].parent.getBounds().width/2;
						stage.regX = containers[currentImage].x  - $window.width()/2;
					}
				} else {
					
					var largest_width = 0;
					
					for(var i=0; i<images.length; i++){
						largest_width = images[i].image.width > largest_width ? images[i].image.width : largest_width;
					}
					
					for(var i=0; i<images.length; i++){
						
						var _width = largest_width - (largest_width/images[i].image.height)
						
						images[i].scaleY = parseFloat( ($window.width()-(spacing * 4)) / (_width) ).toFixed(4);
						images[i].scaleX = images[i].scaleY;
						images[i].y = $window.height()/2 - ($window.height() * .7)/2;
					
						if(images[i]._group) {
							if(images[i]._groupID > 0){
								var _groupWidth = images[i-1].image.width * images[i-1].scaleX;
								//var _width = largest_width - (largest_width/images[i].image.height)
								images[i].x = _groupWidth + spacing;
							} else {
								images[i].x = 0;
							
							}
					
						}
						stage.regX = containers[currentImage].x  - $window.width()/2;
					}
				}
			}
			
			function handleCompleteAlt(event) {
				
				for(var i=0; i<containers.length; i++) {
					//console.log(containers[i].getBounds().width)
				}
				
		
				
				$window.on('mousewheel', scrollThumbnails);	
				loaderBar.visible = false;
				stage.regX = containers[currentImage].x  - $window.width()/2;
				stage.update();
				scrollTitleScreen();
				resizeContainers();
				setClone();

				initSlideshow();
				
				$('.index').on('click', showIndex);
			}
			
			
			function setClone(){
				imageContainerClone.x = -imageContainer.getBounds().width - $window.width()/2;
			}

			function watchStrips(direction){
				console.log(imageContainer.x + imageContainer.children[0].x);
				console.log(imageContainerClone.x + imageContainerClone.children[0].x);
				if(direction == "left") {
					if(stage.regX <= imageContainerClone.x + imageContainer.children[0].x) {
						stage.regX = imageContainer.children[0].x;
						//imageContainerClone.x = -imageContainer.getBounds().width - $window.width()/2;
					}
				} else {
					if(stage.regX >= imageContainer.x + imageContainer.children[imageContainer.children.length-1].x) {
						stage.regX = imageContainerClone.x + imageContainerClone.children[imageContainerClone.children.length-1].x;
					}
				}
			}
			
			function handleOver(event) {
				if(!_isIndex) {
					return false;
				} else {
					/*
					for(var i=0; i<imageContainer.children.length; i++) {
						
						for(var j=0; i<imageContainer.children[i].children.length; i++) {
							createjs.Tween.get(imageContainer.children[i].children[j].image, {override: true})
									.to({alpha: .6 }, 300, ease)
							createjs.Tween.get(imageContainerClone.children[i].children[j].image, {override: true})
									.to({alpha: .6 }, 300, ease)
						}
						
						console.log(imageContainerClone.children[i])
					}*/
					
					for(var i=0; i<_bmps.length; i++) {
						console.log(event.target._id)
							if(_bmps[i]._id != event.target._id)
							createjs.Tween.get(_bmps[i], {override: true})
									.to({alpha: .6 }, 300, ease)
					
					}
					
					
						
				}
			}
			
			function handleOut(event) {
				if(!_isIndex) {
					return false;
				} else {
					for(var i=0; i<_bmps.length; i++) {
							createjs.Tween.get(_bmps[i], {override: true})
									.to({alpha: 1 }, 300, ease)
					}
	
					
				}
			}
			
			
			function handleClickAlt(event) {
				//if($('body').hasClass('animating') || settings.page.current != 'work' || _isIndex) return true;
				
				
				if(!_isIndex){
					nextImage();
					initSlideshow();
				} else {
					for(var i=0; i<_bmps.length; i++) {
							if(_bmps[i]._id != event.target._id)
							createjs.Tween.get(_bmps[i], {override: true})
									.to({alpha: 0 }, 300, ease)
					
					}
					
					createjs.Tween.get(event.target, {override: true})
							.to({alpha: 1 }, 300, ease)
					
					
					
					currentImage = event.target.parent._id;
					slideShowOn();
					showIndex();
				}
			}
			
			
			function initSlideshow(){
				clearTimeout(timer);
				clearInterval(slideInterval);
				
				timer = setTimeout(function(){
					slideInterval = setInterval(function(){
						nextImage();
					}, intervalSpeed);
				}, timerSpeed);
			}
			
			function slideShowOn(){
				_isSlideShow = true;
			}
			
			function slideShowOff(){
				_isSlideShow = false;
			}
			

			$(window).on('mousewheel', function(e){
				if(!_isIndex) return true;
				if($('body').hasClass('animating')) return true;
					
			

					
					stage.regX += e.deltaY;
					
			
					
					var direction;
					if(e.deltaY > 1) {
						//watchStrips("left");
						direction = "right";
					} else {
						//watchStrips("right");
						direction = "left";
					}
				
					var offset = $window.width()/2;
				
				
				
					if(direction == "left") {
						if(stage.regX + e.deltaY <= imageContainerClone.x + imageContainer.children[0].x) {
							console.log('repeat left')
							stage.regX = imageContainer.children[0].x + e.deltaY;
						}
					} else {
						//console.log(e.deltaY)
						if(stage.regX + e.deltaY >= imageContainer.children[imageContainer.children.length-1].x - $window.width()) {
						
							stage.regX = imageContainerClone.x + imageContainerClone.children[imageContainerClone.children.length-1].x + e.deltaY - $window.width();
						}
					}
				
			}).on('mousemove', function(e){
				var factor = e.clientX < $window.width()/2 ? $window.width() - $window.width()/2 - e.clientX : e.clientX - $window.width()/2;
					factor = ( (factor - 200) / ($window.width()*.5) ).toFixed(1);
					factor = factor < 0 ? 0 : factor;
					factor = factor > 1 ? 1 : factor;
					factor = e.clientX < $window.width()/2 ? -factor * 2 : factor * 2;
				//console.log(factor);
				
				if(!_isIndex || $('body').hasClass('animating')) return true;
				
				//var factor = Math.abs(e.clientX/$window.width()) * (_origImageContainerSize - $window.width()); moves entire strip [---]
				
				
				if(e.clientX < $window.width()/2 ){
					_moveIndex = true;
					_mouseFactor = factor;
				} else if( e.clientX > $window.width()/2  ) {
					_moveIndex = true;
					_mouseFactor = factor;
				} else {
					_moveIndex = false;
				}
				
			
				
			});
			
			function prevImage(){
				if($('body').hasClass('animating') || settings.page.current != 'work' || _isIndex) return true;			
				$('body').addClass('animating');
				
				if(_isSlideShow) {
					
					var targContainer = currentImage < 0 ? imageContainerClone : imageContainer;
					console.log(targContainer);
					var _toNext = false;
					var _prevID  = currentImage > -(imageContainer.children.length - 1) ? currentImage - 1 : imageContainer.children.length-1;
					
					
					for(var i=0; i<imageContainer.children[Math.abs(currentImage)].children.length; i++) {
						if(imageContainer.children[Math.abs(currentImage)].children[i].alpha < 1) {
							_toNext = false;
							createjs.Tween.get(targContainer.children[Math.abs(currentImage)].children[i], {override: true})
									.to({alpha: 1 }, animSpeed, ease)
							createjs.Tween.get(imageContainerClone.children[Math.abs(currentImage)].children[i], {override: true})
									.to({alpha: 1 }, animSpeed, ease)
									.call(onPrevComplete)
							console.log('animate it')
						} else {
							_toNext = true;
						}
					}
					
			
					
					if(_toNext) {
						
						
						for(var i=0; i<imageContainer.children[Math.abs(currentImage)].children.length; i++) {
								createjs.Tween.get(targContainer.children[Math.abs(currentImage)].children[i], {override: true})
										.to({alpha: 0 }, animSpeed, ease)
								createjs.Tween.get(imageContainerClone.children[Math.abs(currentImage)].children[i], {override: true})
										.to({alpha: 0 }, animSpeed, ease)
						}
						
						var _prevID  = currentImage > -(imageContainer.children.length - 1) ? currentImage - 1 : imageContainer.children.length-1;
						var _nextX = _prevID < 0 ? imageContainerClone.x + imageContainerClone.children[imageContainerClone.children.length + _prevID].x : imageContainer.x + imageContainer.children[_prevID].x;
						var targContainer = _prevID < 0 ? imageContainerClone : imageContainer;
						
						_nextX -= $window.width()/2;
					
						currentImage = _prevID;
						/*
						for(var i=0; i<targContainer.children[Math.abs(currentImage)].children.length; i++) {
								createjs.Tween.get(targContainer.children[Math.abs(currentImage)].children[i], {override: true})
										.to({alpha: 1 }, 300, ease)
						}
						*/
						createjs.Tween.get(targContainer.children[Math.abs(currentImage)].children[0], {override: true})
								.to({alpha: 1 }, animSpeed, ease)
				
						createjs.Tween.get(stage, {override: true})
								.to({regX: _nextX }, animSpeed, ease)
								.call(onPrevComplete)
					}
					
					
				} else {
					
					var _prevID  = currentImage > -(imageContainer.children.length - 1) ? currentImage - 1 : imageContainer.children.length-1;
				
					var _nextX = _prevID > -1 ? imageContainer.children[_prevID].x : imageContainerClone.x + imageContainerClone.children[imageContainerClone.children.length + _prevID].x;
					_nextX -= $window.width()/2;
					
					
							
					currentImage = _prevID;
					console.log(currentImage);

					createjs.Tween.get(stage, {override: true})
							.to({regX: _nextX }, animSpeed, ease)
							.call(onPrevComplete)
					
				}
				
				
				
				//console.log(currentImage);
	
				
				
				
			}
			
			function onPrevComplete(){
				$('body').removeClass('animating');
				
				if(currentImage == -(imageContainer.children.length-1) ) {
					stage.regX = imageContainer.children[1].x - $window.width()/2;
					currentImage = 1;
					
					if(_isSlideShow) {
						var targContainer = currentImage < 0 ? imageContainerClone : imageContainer;
						
						createjs.Tween.get(targContainer.children[imageContainerClone.children.length-1].children[0], {override: true})
								.to({alpha: 1 }, 300, ease)
					}
				}  else if(currentImage == -1) {
					
					stage.regX = imageContainer.children[imageContainer.children.length - 1].x - $window.width()/2;
					currentImage = imageContainer.children.length - 1;
					
					if(_isSlideShow) {
						var targContainer = currentImage < 0 ? imageContainerClone : imageContainer;
						
						createjs.Tween.get(targContainer.children[imageContainerClone.children.length-1].children[0], {override: true})
								.to({alpha: 1 }, 300, ease)
					}
				}
				
			
				
			}
			
			
			function nextImage(){
				if($('body').hasClass('animating') || settings.page.current != 'work' || _isIndex) return true;			
				$('body').addClass('animating');
				
				console.log('next image');
				
				if(_isSlideShow) {
					
					var targContainer = currentImage < 0 ? imageContainerClone : imageContainer;
					//console.log(targContainer);
					var _toNext = false;
					
					for(var i=0; i<targContainer.children[Math.abs(currentImage)].children.length; i++) {
						
						if(imageContainer.children[Math.abs(currentImage)].children[i].alpha < 1) {
							_toNext = false;
						} else {
							_toNext = true;
						}
						
						
						createjs.Tween.get(imageContainer.children[Math.abs(currentImage)].children[i], {override: false})
								.to({alpha: 1 }, 300, ease)
								.call(onNextComplete)
						
				
						createjs.Tween.get(imageContainerClone.children[Math.abs(currentImage)].children[i], {override: false})
								.to({alpha: 1 }, 300, ease)
						
						
					}
					
					
					console.log('to next ' + _toNext);
					
					if(_toNext) {
						
						var _nextID  = currentImage < imageContainer.children.length - 1 ? currentImage + 1 : -(imageContainer.children.length-1);
				
						var _nextX = _nextID < 0 ? imageContainerClone.x + imageContainerClone.children[imageContainerClone.children.length + _nextID].x - $window.width()/2 : imageContainer.x + imageContainer.children[_nextID].x  - $window.width()/2;
				
						var targContainer = _nextID < 0 ? imageContainerClone : imageContainer;
						
						/*
						for(var i=0; i<targContainer.children[Math.abs(currentImage)].children.length; i++) {
								createjs.Tween.get(targContainer.children[Math.abs(currentImage)].children[i], {override:true})
										.to({alpha: 0 }, 300, ease)
								
						}
						*/
					
						//_nextX -= $window.width()/2;
					
						currentImage = _nextID;
						/*
						for(var i=0; i<targContainer.children[Math.abs(currentImage)].children.length; i++) {
								createjs.Tween.get(targContainer.children[Math.abs(currentImage)].children[i], {override: true})
										.to({alpha: 1 }, 300, ease)
						}
						*/
						
						
						createjs.Tween.get(imageContainer.children[Math.abs(currentImage)].children[0], {override: true})
								.to({alpha: 1 }, animSpeed, ease)
						createjs.Tween.get(imageContainerClone.children[Math.abs(currentImage)].children[0], {override: true})
								.to({alpha: 1 }, animSpeed, ease)
					
				
						createjs.Tween.get(stage, {override: true})
								.to({regX: _nextX }, animSpeed, ease)
								.call(onNextComplete)
					}
					
					
				} else {
					
					//var _nextID  = currentImage < $container.children.length - 1 ? currentImage + 1 : $container.children.length - 1;
					var _nextID  = currentImage < imageContainer.children.length - 1 ? currentImage + 1 : imageContainer.children.length - 1;
					var _nextX = _nextID < 0 ? imageContainerClone.x + imageContainer.children[imageContainerClone.children.length + _nextID].x - $window.width()/2 : imageContainer.children[_nextID].x - $window.width()/2;
					//var _nextX = $container.children[_nextID ].x - $window.width()/2
				
					var targContainer = _nextID < 0 ? imageContainerClone : imageContainer;
					//var targContainer = $container;
					//_nextX -= $window.width()/2;
					
					currentImage = _nextID;
					
					
					for(var i=0; i<imageContainer.children[Math.abs(currentImage)].children.length; i++) {
						imageContainer.children[Math.abs(currentImage)].children[i].alpha = 1;
						/*
							createjs.Tween.get($container.children[Math.abs(currentImage)].children[i], {override: true})
									.to({alpha: 1 }, animSpeed, ease)
						*/
					}
					
					createjs.Tween.get(stage, {override: true})
							.to({regX: _nextX }, animSpeed, ease)
							.call(onNextComplete)
				}
				
				
				
				
			}
			
			/*
			function nextImage(){
				if($('body').hasClass('animating') || settings.page.current != 'work' || _isIndex) return true;			
				$('body').addClass('animating');
				
				
				if(_isSlideShow) {
					
					var targContainer = currentImage < 0 ? imageContainerClone : imageContainer;
					//console.log(targContainer);
					var _toNext = false;
					
					for(var i=0; i<targContainer.children[Math.abs(currentImage)].children.length; i++) {
						
						if(imageContainer.children[Math.abs(currentImage)].children[i].alpha < 1) {
							_toNext = false;
							
						} else {
							_toNext = true;
						}
					
						createjs.Tween.get(imageContainer.children[Math.abs(currentImage)].children[i], {override: false})
								.to({alpha: 1 }, 300, ease)
								.call(onNextComplete)
						
						console.log(imageContainerClone.children[Math.abs(currentImage)].children[i].alpha)
						createjs.Tween.get(imageContainerClone.children[Math.abs(currentImage)].children[i], {override: false})
								.to({alpha: 1 }, 300, ease)
						
						
					}
					
					
					console.log('to next ' + _toNext);
					
					if(_toNext) {
						
						var _nextID  = currentImage < imageContainer.children.length - 1 ? currentImage + 1 : -(imageContainer.children.length-1);
				
						var _nextX = _nextID < 0 ? imageContainerClone.x + imageContainerClone.children[imageContainerClone.children.length + _nextID].x : imageContainer.x + imageContainer.children[_nextID].x;
				
						var targContainer = _nextID < 0 ? imageContainerClone : imageContainer;
						
						
						for(var i=0; i<targContainer.children[Math.abs(currentImage)].children.length; i++) {
								createjs.Tween.get(targContainer.children[Math.abs(currentImage)].children[i], {override:true})
										.to({alpha: 0 }, 300, ease)
								
						}
						
					
						_nextX -= $window.width()/2;
					
						currentImage = _nextID;

						
						
						createjs.Tween.get(imageContainer.children[Math.abs(currentImage)].children[0], {override: true})
								.to({alpha: 1 }, animSpeed, ease)
						createjs.Tween.get(imageContainerClone.children[Math.abs(currentImage)].children[0], {override: true})
								.to({alpha: 1 }, animSpeed, ease)
						
				
						createjs.Tween.get(stage, {override: true})
								.to({regX: _nextX }, animSpeed, ease)
								.call(onNextComplete)
					}
					
					
				} else {
					var _nextID  = currentImage < container.children.length - 1 ? currentImage + 1 : imageContainer.children.length - 1;
				
					var _nextX = _nextID < 0 ? imageContainerClone.x + imageContainer.children[imageContainerClone.children.length + _nextID].x : imageContainer.x + imageContainer.children[_nextID].x;
					//_nextX -= $window.width()/2;
				
					var targContainer = _nextID < 0 ? imageContainerClone : imageContainer;
					//var _nextX = _nextID < 0 ? targContainer.x + targContainer.children[Math.abs(_nextID)].x : targContainer.x + targContainer.children[_nextID].x;
					_nextX -= $window.width()/2;
					
					currentImage = _nextID;

					for(var i=0; i<imageContainer.children[Math.abs(currentImage)].children.length; i++) {
							createjs.Tween.get(imageContainer.children[Math.abs(currentImage)].children[i], {override: true})
									.to({alpha: 1 }, animSpeed, ease)
							createjs.Tween.get(imageContainerClone.children[Math.abs(currentImage)].children[i], {override: true})
									.to({alpha: 1 }, animSpeed, ease)
					}
				
					createjs.Tween.get(stage, {override: true})
							.to({regX: _nextX }, animSpeed, ease)
							.call(onNextComplete)
				}
				
				
				console.log(currentImage);
				
			}
			*/
			
			
			function onNextComplete(){
				$('body').removeClass('animating');
				/*
				if(stage.regX >= imageContainer.x + imageContainer.children[imageContainer.children.length-1].x) {
					stage.regX = imageContainerClone.x + imageContainerClone.children[imageContainerClone.children.length-1].x;
				}
				*/
				
				
				if( currentImage == imageContainer.children.length - 1 ) {
					console.log('set stage back')
					stage.regX = imageContainerClone.x + imageContainerClone.children[imageContainerClone.children.length-1].x - $window.width()/2;
					currentImage = -1;
					
					if(_isSlideShow) {
						var targContainer = currentImage < 0 ? imageContainerClone : imageContainer;
						
						createjs.Tween.get(imageContainerClone.children[imageContainerClone.children.length-1].children[0], {override: true})
								.to({alpha: 1 }, 300, ease)
					}
					
					//stage.regX = -imageContainerClone.x;
				}
				
				
			
				/*
				if( currentImage == imageContainer.children.length -1 ) {
					console.log('set stage back')
					stage.regX = imageContainerClone.x + imageContainerClone.children[imageContainerClone.children.length-1].x - $window.width()/2;
					currentImage = -1;
					
					if(_isSlideShow) {
						var targContainer = currentImage < 0 ? imageContainerClone : imageContainer;
						
						createjs.Tween.get(imageContainerClone.children[imageContainerClone.children.length-1].children[0], {override: true})
								.to({alpha: 1 }, 300, ease)
					}
					
					//stage.regX = -imageContainerClone.x;
				} else {
					console.log(currentImage);
		
				}
				*/
				
				/*
				if(currentImage == imageContainer.children.length-1 ) {
createjs.Tween.get(imageContainerClone.children[imageContainerClone.children.length-1].children[0], {override: true})
								.to({alpha: 1 }, 0, ease)
					
					stage.regX = imageContainerClone.x + imageContainerClone.children[imageContainerClone.children.length-1].x - $window.width()/2;
					currentImage = -1;
					
					if(_isSlideShow) {
						var targContainer = currentImage < 0 ? imageContainerClone : imageContainer;
						
						createjs.Tween.get(targContainer.children[imageContainerClone.children.length-1].children[0], {override: true})
								.to({alpha: 1 }, 300, ease)
					}
				}  else if(currentImage == -1) {
					
					stage.regX = imageContainer.children[imageContainer.children.length - 1].x - $window.width()/2;
					currentImage = imageContainer.children.length - 1;
					
					if(_isSlideShow) {
						var targContainer = currentImage < 0 ? imageContainerClone : imageContainer;
						
						createjs.Tween.get(targContainer.children[imageContainerClone.children.length-1].children[0], {override: true})
								.to({alpha: 1 }, 300, ease)
					}
					
				}
				*/
				
			}
			
			function onClickComplete(event) {
				$('body').removeClass('animating');
				
				//var _prevID = currentImage > 0 ? currentImage - 1 : containers.length - 1;
				//var _xPrev = containers[_prevID].x;
				//containers[_prevID].x = imageContainer.getBounds().width + _xPrev + $window.width()/2;
			
			}
			
			function handleClick(event) {
				
				currentItem = event.target.parent;
				
				var _isInGroup = event.target._group != false ? true : false;
				var _nextID, _currImageWidth, _nextX;

				
				if(!$('body').hasClass('index')) {
				
					var prevImageWidth = currentImage > 0 ? (images[currentImage-1].image.width * ($window.height() * .7 / images[currentImage-1].image.height)) : 0;
				
			
				
					//var _isInGroup = event.target._group != 'false' ? true : false;
					//var _nextID, _currImageWidth, _nextX;
				
				
					if(!_isInGroup) {
						_nextID = event.currentTarget._id + 1 < images.length ? (event.currentTarget._id + 1) : 0;
						_currImageWidth = (images[_nextID].image.width * ($window.height() * .7 / images[_nextID].image.height))
						
						if(!images[_nextID]._group) {
							//_nextX = _nextID > 0 ? images[_nextID].x - $window.width()/2 + _currImageWidth/2 : 0;
						} else {
							//_currImageWidth = (images[_nextID].image.width * ($window.height() * .7 / images[_nextID].image.height))
							_nextX = images[_nextID].x;
						}

					} else {
					
						var __next_id = event.target._groupID == 0 ? 2 : 1 ;
						console.log('is in group')
						_nextID = event.currentTarget._id + __next_id < images.length ? (event.currentTarget._id + __next_id) : 0;
						_currImageWidth = (images[_nextID].image.width * ($window.height() * .7 / images[_nextID].image.height))
						_nextX = images[_nextID].x - $window.width()/2 + _currImageWidth/2;
					}
				
					currentImage = _nextID;
					
					//console.log(currentImage)
					/*
					createjs.Tween.get(stage, {override: true})
							.to({ 
								regX: _nextX,
							}, 1000, ease)
							.on("change", tweenUpdate);
					*/
					
			createjs.Tween.get(stage, {override: true})
					.to({ 
						regX: _nextX,
					}, 1000, ease)
					.on("change", tweenUpdate);
							
					
				} else {
					currentImage = event.currentTarget._id;
					showImage()
					
					
				}
				
				/*
				createjs.Tween.get(event.target, {override: true})
					.to({x: -_xOffset }, 800, ease)
					.call(tweenUpComplete)
					.on("change", handleTweenChange);
				
				createjs.Tween.get(images[_nextID], {override: true})
					.to({x: _xOffset }, 800, ease)
					.call(tweenUpComplete)
					.on("change", handleTweenChange);
				*/
						//showIndex()
				
			}
			
			/*
			function showImageComplete(){
				console.log('showIndex Complete')
				$('body').addClass('imageMode');
				
				setInterval(nextImage, 5000);
			}
			
			
			function showImage(){
				
				$('body').removeClass('index');
				
				createjs.Tween.get(imageContainer, {override: true})
					.to({
						scaleX:1, 
						scaleY:1, 
						y:0,
						regX:_setXArr[currentImage]['_x']
					}, 2000, ease)
					.call(showImageComplete)
					.on("change", tweenUpdate)
					
					for(var i=0; i<images.length; i++) {
					
						var _alpha = i != currentImage ? 0 : 1;
					
						createjs.Tween.get(images[i], {override: true})
							.to({
								x:_setXArr[i]['_x'],
								alpha:_alpha
							}, 2000, ease)
							.on("change", tweenUpdate)
					}
			}
			*/
			
			
			function scrollThumbnails(event) {
				//console.log(event);
				
				//stage.x -= event.deltaY;
				
				//console.log(stage.x);
				//console.log(images[0].x - _origXArr[0]._width/4);
				/*
				for(var i=0; i<images.length; i++) {
					images[i].x -= event.deltaY;
					//console.log(_origXArr[i]._width)
					if(images[i].x < -40 ) {
						//console.log(images[images.length-1].x)
						//images[i].x = i > 1 ? images[i-1].x + _origXArr[i-1]._width/4 : images[images.length-1].x + _origXArr[images.length-1]._width;
					}
				}
				*/
			}
			
			
			function showIndexComplete(){
				console.log('showIndex Complete')
				$('body').addClass('index');
				$window.on('mousewheel', scrollThumbnails);	
			}
			
			function indexComplete(){
				$('body').removeClass('animating');
			}
			
			function tickStage(){
				if(!_moveIndex) return true;
				stage.regX += _mouseFactor;
				
				if(_mouseFactor < 0) {
					if(stage.regX + _mouseFactor <= imageContainerClone.x + imageContainer.children[0].x) {
						stage.regX = imageContainer.children[0].x + _mouseFactor;
					}
				} else {
					if(stage.regX + _mouseFactor >= imageContainer.children[imageContainer.children.length-1].x - $window.width()) {
						stage.regX = imageContainerClone.x + imageContainerClone.children[imageContainerClone.children.length-1].x +_mouseFactor - $window.width();
					}
				}
			}
			
			function showIndex(){
				
				if($('body').hasClass('animating') || settings.page.current != 'work') return true;			
				$('body').addClass('animating');
				
			
				//var prevImageWidth = (images[0].image.width * ($window.height() * .7 / images[0].image.height));
				//var prevImageX = (images[0].image.width * ($window.height() * .7 / images[0].image.height)) ;
				//var offset = 20;
				
				
				
				
				
				if(!_isIndex) {
					console.log('CURRENT IMAGE ' + currentImage);
			
					var _num = currentImage < 0 ? Math.abs(currentImage) : currentImage;
					var _targContainer = currentImage < 0 ? imageContainerClone : imageContainer;
					var _offset = currentImage < 0 ? -_origImageContainerSize : 0;
					
					console.log('_NUM ' + _num);
					
					createjs.Tween.get(stage, {override: true})
						.to({
							regX:_offset + _origXArr[_num] - $window.width()/2
						}, 2000, ease)
					
					
						for(var i=0; i<_bmps.length; i++) {
								if(_bmps[i]._id != event.target._id)
								createjs.Tween.get(_bmps[i], {override: true})
										.to({alpha: 1 }, 300, ease)
				
						}
						
					/*
					*
					*	ANIMATE ALL CONTAINERS TO SMALL
					*
					*/
					for(var i=0; i<imageContainer.children.length; i++) {
	
						createjs.Tween.get(imageContainer.children[i], {override: true})
							.to({
								x:_origXArr[i],
								y:$window.height()/2 - ($window.height() * .3)/2,
								scaleX:.3,
								scaleY:.3
							}, 2000, ease)
							
						createjs.Tween.get(imageContainerClone.children[i], {override: true})
							.to({
								x:_origXArr[i],
								y:$window.height()/2 - ($window.height() * .3)/2,
								scaleX:.3,
								scaleY:.3
							}, 2000, ease)
					}
					
					createjs.Tween.get(imageContainerClone, {override: true})
						.to({
							x:-_origImageContainerSize - 6
						}, 2000, ease)
					
					
					    stage.addEventListener("tick", tickStage );
					
					
					
				} else {
					console.log('CURRENT IMAGE ' + currentImage);
					
					var _num = currentImage < 0 ? Math.abs(currentImage) : currentImage;
					var _targContainer = currentImage < 0 ? imageContainerClone : imageContainer;
					var _offset = currentImage < 0 ? -_setImageContainerSize : 0;
					var _winOffset = currentImage < 0 ? $window.width() : $window.width()/2;
					
					console.log('_NUM ' + _num);
					
					stage.removeEventListener("tick", tickStage );
					
					createjs.Tween.get(stage, {override: true})
						.to({
							regX:_offset + _setXArr[_num] - _winOffset
						}, 2000, ease)
						.call(setStageCurrent);
					
					/*
					*
					*	ANIMATE ALL CONTAINERS TO LARGE
					*
					*/
					for(var i=0; i<imageContainer.children.length; i++) {
					
						createjs.Tween.get(imageContainer.children[i], {override: true})
							.to({
								x:_setXArr[i],
								y:$window.height()/2 - ($window.height() * .7)/2,
								scaleX:1,
								scaleY:1
							}, 2000, ease)
					}
					
					for(var i=0; i<imageContainer.children.length; i++) {
					
						createjs.Tween.get(imageContainerClone.children[i], {override: true})
							.to({
								x:_setXArr[i],
								y:$window.height()/2 - ($window.height() * .7)/2,
								scaleX:1,
								scaleY:1
							}, 2000, ease)
					}
					
					createjs.Tween.get(imageContainerClone, {override: true})
						.to({
							x:-_setImageContainerSize - $window.width()/2
						}, 2000, ease)
										
					
				}
			
				
				setTimeout(function(){ $('body').removeClass('animating') }, 2000);
				

				_isIndex = !_isIndex;
		
			}
			
			function setStageCurrent(){
				console.log('set current stage');
				
				
				if( currentImage == imageContainer.children.length -1 ) {
					console.log('set stage back')
					stage.regX = imageContainerClone.x + imageContainerClone.children[imageContainerClone.children.length-1].x - $window.width()/2;
					currentImage = -1;
				} else if(currentImage < 0 ) {
					console.log('set stage above')
					currentImage = Math.abs(currentImage);
					stage.regX = imageContainer.children[currentImage].x - $window.width()/2;
					
				} else {
					currentImage = Math.abs(currentImage);
					stage.regX = imageContainer.children[Math.abs(currentImage)].x - $window.width()/2;
				}
				//console.log(currentImage);
			}
			
			function onProgress(event) {
				//console.log(event);
			}
			/*
			
			function nextImage(){
				currentImage = currentImage < images.length-1 ? currentImage+1 : 0;
				
				var _isInGroup = images[currentImage]._group != 'false' ? true : false;
				var _nextID, _currImageWidth, _nextX;
				
				if(!_isInGroup) {
					_nextID = currentImage;
					_currImageWidth = (images[_nextID].image.width * ($window.height() * .7 / images[_nextID].image.height))
					_nextX = _nextID > 0 ? images[_nextID].x - $window.width()/2 + _currImageWidth/2 : 0;
					
					createjs.Tween.get(imageContainer, {override: true})
							.to({regX: _nextX }, 1000, ease)
							.call(tweenUpComplete)
							.on("change", handleTweenChange);
					
				} else {
				
					var __next_id = images[currentImage]._groupID == 0 ? 0 : 1 ;
					//console.log(images[currentImage]._groupID)
					_nextID = images[currentImage]._id + __next_id < images.length ? (images[currentImage]._id + __next_id) : 0;
					_currImageWidth = (images[_nextID].image.width * ($window.height() * .7 / images[_nextID].image.height))
					_nextX = images[_nextID].x - $window.width()/2 + _currImageWidth/2;
					
					console.log(images[_nextID]._group)
					console.log(images[currentImage]._group)
					
					if(images[_nextID]._group != images[currentImage]._group) {
						createjs.Tween.get(imageContainer, {override: true})
								.to({regX: _nextX }, 1000, ease)
								.call(tweenUpComplete)
								.on("change", handleTweenChange);
					}
					
				}
				
				

				
				//console.log(_nextX)
				
				createjs.Tween.get(images[currentImage], {override: true})
						.to({alpha: 1 }, 1000, ease)
						.call(tweenUpComplete)
						.on("change", handleTweenChange);
				
				
			}
			*/
			
			
			
			
			
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
				$('body').removeClass('animating');
				for(var i=2; i<images.length; i++){
					//images[i].x = (images[i-1].image.width * parseFloat(($window.height() * .7 / images[i-1].image.height))).toFixed(2) + images[i-1].x + 10;
				}
				stage.update();
			}
			
			function positionIndex(event){
				//imageContainer.setTransform(0, imageContainer.y, imageContainer.scaleX, imageContainer.scaleY, 0, 0, 0, _nextX);
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
				leftStrip = imageContainer.clone(true);
				rightStrip = imageContainer.clone(true);
				
				leftStrip.x = -imageContainer.getBounds().width + $window.width()/2;
				rightStrip.x = imageContainer.getBounds().width + $window.width()/2;
				
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
				//resizeImages();
				//resizeContainers();
				
				spacing = $window.width() < 768 ? 10 : 20;
				
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
  