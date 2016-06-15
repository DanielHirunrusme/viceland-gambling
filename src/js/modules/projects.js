var settings = require( "modules/settings" ),
    disableScroll = require('disable-scroll'),
	urlParam = require('modules/urlParam')();


 

module.exports = function( el ) {

		
		/*
		
		console.log('path is ' + getPath()); 
		
		if(getPath() != '/work' && getPath() != '/') {
			settings.image.current = $('.project-image[data-uri="'+getPath()+'"]').index();
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
	  
	  
	  
	  function totalWidth() {
		  var totalWidth = 0,
		  	  next_set = $('.project-image').eq(settings.image.current).data('uri');
			  
		  $('.project-image[data-uri="'+next_set+'"]').each(function(index) {
		      totalWidth += parseInt($(this).width(), 10) + 20;
		  });
		  
		  return totalWidth;
	  }
	  
	  function scrollContainer(e){
		  if($('body').hasClass('animating') || !$('body').hasClass('index') || $('body').hasClass('information')) return true;
		  
		  console.log(e.deltaX)
		  
		  var _left = _scrollLeft + e.deltaY + e.deltaX,
		  _boundLeft = -$('.project-image').last().position().left - $('.project-image').last().width()/2 + $window.width()/2,
	  	  _boundRight = $window.width()/2;
		  
		  
		  
		  _scrollLeft = _left;
		  _scrollLeft = _scrollLeft + e.deltaY >= _boundLeft ? _scrollLeft : _boundLeft;
		  _scrollLeft = _scrollLeft + e.deltaY <= _boundRight ? _scrollLeft : _boundRight;
		  
		  console.log(_scrollLeft);
		  
		  $('.projects-container').css({
		    "-webkit-transform":"translateX("+_left+"px)",
		    "-ms-transform":"translateX("+_left+"px)",
		    "transform":"translateX("+_left+"px)"
		  });​
	  }
	
	  $window.on('mousewheel', scrollContainer);		
			
	  function showIndex(){
		  $('body').addClass('animating');
		  
		  clearInterval(_slideShowTimer);
		  $('.caption-text').html('');
		  
		  $('.project-image').velocity('stop').velocity({ 
			  paddingLeft:'5px',
			  paddingRight:'5px',
			  opacity:1
		  }, 
		  { 	
			duration:1500,
			  complete:function(){
			  	//$('.work').css('display', 'inline')
			  }
		  })
		  
		  var next_set = $('.project-image').eq(settings.image.current).data('uri');
		  var $first_image = $('.project-image[data-uri="'+next_set+'"]').first();
		  
		  $('.projects-container').on('mouseover', projectsContainerOver).on('mouseout', projectsContainerOut);
		  $('.project-image').on('mouseover', projectImageOver).on('mouseout', projectImageOut);
		  
		  $('.project-image').addClass('notransition');
		  
		  $('.projects-container').velocity('stop').velocity({ 
			  height:'200px',
			  top:'50%',
			  marginTop:'-100px'
		  }, 
		  { 	
			duration:1500,
			progress:function(){
				
			  	var _left = -1 * $first_image.position().left + ($window.width()/2 - totalWidth()/2);
				_scrollLeft = _left;
				//console.log(_scrollLeft);
				$('.projects-container').css({
				    "-webkit-transform":"translateX("+_left+"px)",
				    "-ms-transform":"translateX("+_left+"px)",
				    "transform":"translateX("+_left+"px)"
				  });​
			},
			complete:function(){
			  	//$('.work').css('display', 'inline')
			  	var _left = -1 * $first_image.position().left + ($window.width()/2 - totalWidth()/2);
				_scrollLeft = _left;
				$('body').removeClass('animating').addClass('index');
			 }
		  })
	  }

			  
	  function nextImage(e){
		  if($('body').attr('data-page') != 'work') return true;
		  if($('body').hasClass('index')) {
			  zoomImage(e.currentTarget)
			  setCaption();
			  return true;
		  } else {
			  
			  clearInterval(_slideShowTimer);
			  _slideShowSpeed = 4000;
			  _slideShowTimer = setInterval(function(){
				  nextImage();
			  }, _slideShowSpeed);
			  
			  $('body').removeClass('zoomed');
			  
			  settings.image.current =  settings.image.current + 1 < _count ?  settings.image.current + 1 : 0;
			  $('.project-image').removeClass('on active');
			  var next_set = $('.project-image').eq(settings.image.current).data('uri');
		  	
			  $('.project-image').css('opacity', '')
		  
			  $('.project-image[data-uri="'+next_set+'"]').addClass('active');
			  $('.project-image').eq(settings.image.current).addClass('on');
		  
			  var totalWidth = 0;

			  $('.project-image[data-uri="'+next_set+'"]').each(function(index) {
			      totalWidth += parseInt($(this).width(), 10) + 20;
			  });
		  
			  var _left = -1 * $('.project-image[data-uri="'+next_set+'"]').position().left + ($window.width()/2 - totalWidth/2)
			  _scrollLeft = _left;
		  
			  $('.projects-container').velocity({
			      translateX: _left,
			  }, {
				  duration:0
			  });
		  	  
			  setCaption();
			  setPath(next_set);
			  
		  }
		  
		 
	  }
	  
	  function zoomImage(image){
		  $('body').addClass('animating');
		  var $image = $(image);
		  settings.image.current = $image.index();
		  
		  clearInterval(_slideShowTimer);
		  
		  _slideShowSpeed = 8000;
		  
		  _slideShowTimer = setInterval(function(){
			  nextImage();
		  }, _slideShowSpeed);
		  

		  $('body').addClass('zoomed');

		  $('.project-image').removeClass('on active notransition');
		  var next_set = $('.project-image').eq(settings.image.current).data('uri');
		  
		  $('.project-image[data-uri="'+next_set+'"]').addClass('active');
		  $('.project-image').eq(settings.image.current).addClass('on');
		  
		  
		  var next_set = $('.project-image').eq(settings.image.current).data('uri');
		  var $first_image = $('.project-image[data-uri="'+next_set+'"]').first();
	  	
		  $('.projects-container').off('mouseover', projectsContainerOver).off('mouseout', projectsContainerOut);
		  $('.project-image').off('mouseover', projectImageOver).off('mouseout', projectImageOut);
		  
			$('.project-image').each(function(){
				if(!$(this).hasClass('active')) {
					$(this).velocity('stop').velocity({ opacity:0, paddingLeft:'10px', paddingRight:'10px' }, { duration:0 });
				} else {
					$(this).velocity('stop').velocity({ opacity:1, paddingLeft:'10px', paddingRight:'10px' }, { duration:0 });
				}
			});
		  
			
		  var _left = -1 * $first_image.position().left + ($window.width()/2 - totalWidth()/2);
			
  		  $('.projects-container').velocity('stop').velocity({ 
  			  height:'100%',
  			  top:'0',
  			  marginTop:'0px'
  		  }, 
  		  { 	
  			duration:0,
  			progress:function(){
				//console.log('scrollLeft ' + $first_image.position().left)
  			  	var _left = ( -1 * $first_image.position().left + ($window.width()/2 - totalWidth()/2) );
  				//_scrollLeft = _left;
				//_scrollLeft = (_scrollLeft + $first_image.position().left + ($window.width()/2 - totalWidth()/2))
  				//console.log(_left);
				
  				$('.projects-container').css({
  				    "-webkit-transform":"translateX("+_left+"px)",
  				    "-ms-transform":"translateX("+_left+"px)",
  				    "transform":"translateX("+_left+"px)"
  				  });​
				  
				  
				
  			},
  			complete:function(){

  				$('body').removeClass('animating').removeClass('index');
  			 }
  		  })
		 

	  }
	  
	  
	  
	  function setCaption(){
		  //console.log('caption ' + $('.project-image').eq(settings.image.current).data('caption'))
		  
		  //get range
		  var next_set = $('.project-image').eq(settings.image.current).data('uri');
		  var first_index = $('.project-image[data-uri="'+next_set+'"]').first().index() + 1;
		  var last_index = $('.project-image[data-uri="'+next_set+'"]').eq( $('.project-image[data-uri="'+next_set+'"]').length - 1 ).index() + 1;
		  
		  var _range = first_index == last_index ? first_index : first_index + '—' + last_index + ' ';
		  
		  var _caption = $('.project-image').eq(settings.image.current).data('caption') != '' ? ' ' + $('.project-image').eq(settings.image.current).data('caption') : '';
		  var _text = 'N&deg;' + _range + _caption;
		  $('.caption-text').html(_text);
	  }
	  
	  
	  _slideShowTimer = setInterval(function(){
		  nextImage();
	  }, _slideShowSpeed);
	   
	  
	  $('.project-image').on('click', nextImage);
			  
			  
			  
			 /*
  			$('.projects-container').velocity('stop').velocity({ left: -1 * ( settings.image.current * $window.width() ) }, 
  			{ 	
  				duration:1500,
  				complete:function(){
  					$('body').removeClass('animating');
  				}
  			})
		
	
		
		$('.work:first-child').addClass('visible');
		
		function setMargin(){
			//$('.work:first-child').css('margin-left', $window.width()/2 - ( $('.work:first-child').width() /2 ) )
			
		}
		
		function scrollToCurrent(){
			//$('.projects-container').css('left', -1 * ($window.width() * settings.image.current));
			$('.projects-container').css('opacity', 1);
			  $('.project-image').removeClass('on active');
			  var next_set = $('.project-image').eq(settings.image.current).data('uri');
		  
			  $('.project-image[data-uri="'+next_set+'"]').addClass('active');
			  $('.project-image').eq(settings.image.current).addClass('on');
		  
			  var totalWidth = 0;

			  $('.project-image[data-uri="'+next_set+'"]').each(function(index) {
			      totalWidth += parseInt($(this).width(), 10) + 20;
			  });
		  
			  var _left = -1 * $('.project-image[data-uri="'+next_set+'"]').position().left + ($window.width()/2 - totalWidth/2)
			  _scrollLeft = _left;
			  
			  $('.projects-container').velocity({
			      translateX: _left,
			  }, {
				  duration:0
			  });
		}
		

		
		function prevImage(){
		  clearInterval(_slideShowTimer);
		  _slideShowSpeed = 4000;
		  _slideShowTimer = setInterval(function(){
			  nextImage();
		  }, _slideShowSpeed);
		  
		  $('body').removeClass('zoomed');
		  
		  settings.image.current =  settings.image.current - 1 > -1 ?  settings.image.current - 1 : _count;
		  $('.project-image').removeClass('on active');
		  var next_set = $('.project-image').eq(settings.image.current).data('uri');
	  	
		  $('.project-image').css('opacity', '')
	  
		  $('.project-image[data-uri="'+next_set+'"]').addClass('active');
		  $('.project-image').eq(settings.image.current).addClass('on');
	  
		  var totalWidth = 0;

		  $('.project-image[data-uri="'+next_set+'"]').each(function(index) {
		      totalWidth += parseInt($(this).width(), 10) + 20;
		  });
	  
		  var _left = -1 * $('.project-image[data-uri="'+next_set+'"]').position().left + ($window.width()/2 - totalWidth/2)
		  _scrollLeft = _left;
	  
		  $('.projects-container').velocity({
		      translateX: _left,
		  }, {
			  duration:0
		  });
	  	  
		  setCaption();
		  setPath(next_set);
		}
		
		$el.on('click', function(e){ 
			
			if($('body').hasClass('animating')) return true;
			//nextImage();
			
			//var _i = $(this).data('index');
			//settings.image.current = _i;
			//nextImage(settings.image.current);

		});
		
		$('a[data-page="work"]').on('click', toggleIndex);
		
		function toggleIndex(){
			if($('body').hasClass('animating')) return true;
			if(!$('body').hasClass('index')) {
				showIndex();
			} else {
				
			}
		}
		
		
		function projectsContainerOver(){
			$('.project-image').each(function(){
				if(!$(this).hasClass('over')) {
					$(this).velocity('stop').velocity({ opacity:.4 }, { duration:400 });
				}
			});
		}
		
		function projectsContainerOut(){
			$('.project-image').each(function(){
					$(this).velocity('stop').velocity({ opacity:1 }, { duration:400 });
			});
		}
		
		function projectImageOver(){
			$('.project-image').addClass('out');
			
	 	 	var this_set = $('.project-image').eq($(this).index()).data('uri');
	 	 	$('.project-image[data-uri="'+this_set+'"]').addClass('over');
			
			settings.image.current = $(this).index();
			setCaption();
			
			$('.project-image').each(function(){
				if(!$(this).hasClass('over')) {
					$(this).velocity('stop').velocity({ opacity:.4 }, { duration:400 });
				} else {
					$(this).velocity('stop').velocity({ opacity:1 }, { duration:400 });
				}
			});
		}
		
		function projectImageOut(){
			$('.project-image').removeClass('out over');
			$('.caption-text').text('');
			$('.project-image').velocity('stop').velocity({ opacity:1 }, { duration:400 });
		}
		
		$('.left-arrow').on('click', function(){
				prevImage();
				$('body').addClass('zoomed');
		});
		$('.right-arrow').on('click', function(){
				nextImage()
				$('body').addClass('zoomed');
		});
	
		
		//setMargin();
		scrollToCurrent();
		setCaption();
		$('.items-holder').addClass('loaded');
		
		$window.on('resize', function(){
			//setMargin();
			scrollToCurrent();
		})
	*/
};  