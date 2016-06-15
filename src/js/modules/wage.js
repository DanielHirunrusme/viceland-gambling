var settings = require( "modules/settings" ),
	velocity = require("velocity-animate/velocity"),
section  = require('modules/section-controller')();

module.exports = function( el ) {
		var $el = $( el ),
		$window = $( window ),
		wageTimer,
		timerVal = 500,
		peaked = false;

		
		function addWage(e){
			if(settings.account.wage > 0 && settings.account.wage < 100) {
				
				if(settings.account.wage + 10 <= settings.account.money) {
					settings.account.wage += 10;
					peaked = false;
				} else {
					peaked = true;
				} 
				
			} else if(settings.account.wage >= 100 && settings.account.wage < 1000) {
				
				if(settings.account.wage + 20 <= settings.account.money) {
					settings.account.wage += 20;
					peaked = false;
				} else {
					peaked = true;
				}
				
			} else if(settings.account.wage >= 1000) {
				
				if(settings.account.wage + 50 <= settings.account.money) {
					settings.account.wage += 50;
					peaked = false;
				} else {
					peaked = true;
				} 
				
			}
			
			checkPeaked();
			
			
			/*
			var $wageModule = $(e.currentTarget).parent();
			var $input = $wageModule.find('input');
			
			if($input.val() < 9) {
				var num = Number($input.val());
				$input.val(num + 1);
			}
			*/
			timerVal = timerVal > 100 ? timerVal - 50 : 100;
			clearTimeout(wageTimer);
			wageTimer = setTimeout(addWage, timerVal);
		}
		
		function subtractWage(e){
			if(settings.account.wage >= 20 && settings.account.wage < 100) {
				settings.account.wage -= 10;
			} else if(settings.account.wage >= 100 && settings.account.wage < 1000) {
				settings.account.wage -= 20
			} else if(settings.account.wage >= 1000) {
				settings.account.wage -= 50;
			}
			
			$('.amount-num').text( settings.account.wage );
			timerVal = timerVal > 100 ? timerVal - 50 : 100;
			clearTimeout(wageTimer);
			wageTimer = setTimeout(subtractWage, timerVal);
		}
		
		function checkPeaked(){
			if(!peaked) {
				$('.amount-num').text( settings.account.wage );
			}  else {
				
				$('.stats-money-box p span').velocity('stop').velocity({ 
					color:'#ff0000'
				});
				
				$('.stats-money-box p').velocity('stop').velocity({ 
					color:'#ff0000'
				}, {
					complete: function(){
						$('.stats-money-box p').velocity({ 
							color:'#000000'
						});
						
						$('.stats-money-box p span').velocity('stop').velocity({ 
							color:'#000000'
						});
					}
				})
			}
		}
		
		
		function clearTimer(){
			timerVal = 500;
			clearTimeout(wageTimer);
		}
		
		$('.add-wage').on('mousedown', addWage).on('mouseup', clearTimer)
		$('.subtract-wage').on('mousedown', subtractWage).on('mouseup', clearTimer)
};
  