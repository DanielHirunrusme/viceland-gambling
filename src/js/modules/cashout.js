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
			$('#cashout-yes').toggleClass('clicked');
			$('#cashout-no').toggleClass('clicked');
		}
		
		$('#cashout-yes').on('touchstart mousedown', function(e){
			e.stopPropagation();
			if($('body').hasClass('animating')) return true;
			$('body').addClass('animating');
			
			$(this).addClass('clicked');
			$('#cashout-no').removeClass('clicked');
			clearInterval(swapInt);
			
			$('.end-screen-one').velocity({ top:'-100%' }, { duration:1000 })
			$('.end-screen-two').velocity({ top:'0%' }, { duration:1000 })
			
			$('.end-screen-two .account-money').text( settings.account.money - settings.account.debt );
			$('.end-screen-two .account-throw').text( settings.account.throws );
			
			setTimeout(function(){ $('body').removeClass('animating'); swapInt = setInterval(toggleClasses, 2000); }, 3000); //90 frames at 30fps
		}).on('mouseover', function(){
			over = true;
			$(this).addClass('clicked');
			$('#cashout-no').removeClass('clicked');
		}).on('mouseout', function(){
			over = false;
		})
		
		$('#cashout-no').on('touchstart mousedown', function(e){
			e.stopPropagation();
			if($('body').hasClass('animating')) return true;
			$('body').addClass('animating shooting');
			
			$(this).addClass('clicked');
			$('#cashout-yes').removeClass('clicked');
			clearInterval(swapInt);
			
			$('#cashout').hide();
			
			setTimeout(function(){ $('body').removeClass('animating'); swapInt = setInterval(toggleClasses, 2000); }, 3000);
		}).on('mouseover', function(){
			over = true;
			$(this).addClass('clicked');
			$('#cashout-yes').removeClass('clicked');
		}).on('mouseout', function(){
			over = false;
		});
};
  