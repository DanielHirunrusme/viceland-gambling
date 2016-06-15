var settings = require( "modules/settings" ),
	velocity = require("velocity-animate/velocity"),
	section  = require('modules/section-controller')();





module.exports = function( el ) {
		var $el = $( el ),
		$window = $( window ),
		loaderInt
		
		//$window.on('mousewheel', scrollTitleScreen);
		//$el.on('click', scrollTitleScreen); 
		
		
		/* LOADER */
		loaderInt = setInterval(checkLoaded, 200);
		
		
		function checkLoaded(){
			var loaded = false;
			var amtLoaded = 0;
			$('.animation-iframe').each(function(){
				if($(this).hasClass('loaded')) {
					loaded = true;
					amtLoaded++;
				} else {
					loaded = false;
				}
			});
			
			console.log(amtLoaded)
			
			$('.loader-bar').css('width', (amtLoaded/12)/100 + '%' );
			
			if(loaded) {
				clearInterval(loaderInt);
				$('.loader').remove();
				$('#login form').show();
			}
		}
		
		
		$('#login-name').focus();
		//toSection('#game');
		
		$el.find('#login-submit').on('click', function(e){
			e.preventDefault();
			console.log('clicked');
			console.log($('#login-name').val());
			
			
			
			if($('#login-name').val() != '') {
				$('#login-name').prop( "disabled", true );
				$(this).prop( "disabled", true ).addClass('disabled');
			
				$('.account-name').text($('#login-name').val());
				var numAnim = new CountUp("game-money", 0, settings.account.money);
				numAnim.start();
				
				settings.account.name = $('#login-name').val();
				$('.message-center h1').text('welcome ' + settings.account.name + '!');
				
				toSection('#game');
			} else {
				$('#login-name').addClass('invalid');
			}
			
		});
		
		
		function scrollTitleScreen(){
			$('body').addClass('scrolling').attr('data-page', 'work');
			$el.off();
			$window.off('mousewheel', scrollTitleScreen);
			
			
			
			$el.velocity({ 
				top:'-100%'
			}, {
				duration:settings.animationSpeed,
				complete:function(){ setPath('work'); settings.page.current = 'work'; }
			});
			
			$('.main-wrapper').velocity({ 
				top:0
			}, {
				duration:settings.animationSpeed
			}); 
		} 
		
		//toSection('#game');
		
		$('#game-money').text('500'); //comment this out
		
};
  