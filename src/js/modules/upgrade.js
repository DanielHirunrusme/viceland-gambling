var settings = require( "modules/settings" ),
	velocity = require("velocity-animate/velocity"),
	section  = require('modules/section-controller')();


var upgrade = module.exports = function() {

		this.setUpgrades = function(){
			console.log(settings.account.money)
			$('.upgrade').each(function(){
				if(Number($(this).data('price')) > settings.account.money) $(this).prop('disabled', true).addClass('disabled');
			});
		}
		
		$('.upgrade-done').on('click', function(){
			toSection('#game');
		});
		
		$('#end-game-submit').on('click', function(){
			toSection('#cashout');
		});
}
  