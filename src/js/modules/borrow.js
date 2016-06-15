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
			$('#borrow-yes').toggleClass('clicked');
			$('#borrow-no').toggleClass('clicked');
		}
		
		$('#borrow-yes').on('touchstart mousedown', function(e){
			e.stopPropagation();
			if($('body').hasClass('animating')) return true;
			$('body').addClass('animating');
			
			$(this).addClass('clicked');
			$('#borrow-no').removeClass('clicked');
			clearInterval(swapInt);
			
			//$('.end-screen-one').velocity({ top:'-100%' }, { duration:1000 })
			//$('.end-screen-two').velocity({ top:'0%' }, { duration:1000 })
			
			setTimeout(function(){ $('body').removeClass('animating'); swapInt = setInterval(toggleClasses, 2000); }, 3000); //90 frames at 30fps
		}).on('mouseover', function(){
			over = true;
			$(this).addClass('clicked');
			$('#borrow-no').removeClass('clicked');
		}).on('mouseout', function(){
			over = false;
		})
		
		$('#borrow-no').on('touchstart mousedown', function(e){
			e.stopPropagation();
			if($('body').hasClass('animating')) return true;
			$('body').addClass('animating shooting');
			
			$(this).addClass('clicked');
			$('#borrow-yes').removeClass('clicked');
			clearInterval(swapInt);
			
			$('.end-screen-two .account-money').text( settings.account.money - settings.account.debt );
			$('.end-screen-two .account-throw').text( settings.account.throws );
			
			$('#cashout').show();
			$('#borrow').hide();
			
			$('.end-screen-one').css('top', '-100%');
			$('.end-screen-two').css('top', '0');
			
			
			setTimeout(function(){ $('body').removeClass('animating'); swapInt = setInterval(toggleClasses, 2000); }, 3000);
		}).on('mouseover', function(){
			over = true;
			$(this).addClass('clicked');
			$('#borrow-yes').removeClass('clicked');
		}).on('mouseout', function(){
			over = false;
		});
};
  