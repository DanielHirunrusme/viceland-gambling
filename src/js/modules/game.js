/**
 * Global URL Param
 * @type {Object}
 */

var settings = require( "modules/settings" ),
	velocity = require("velocity-animate/velocity");
	section  = require('modules/section-controller')();
	upgrade  = require('modules/upgrade')(),
	shirt    = require('modules/shirt')(),
	countup  = require('countup.js/countup')


var game = module.exports = function() {
	
	var money = settings.account.money ;
	var throws = settings.account.throws;
	var upgrade_throws = settings.account.throws;
	var player_ft = settings.account.ft;
	var days_rested = 0;
	var injured = false;
	var player_mood = 0;
	var sub = 10;
	var shot = false;
	var shotWage = true;
	var shotTimeout;
	var wage = settings.account.wage;
	var shooting = true;
	var shotWage = '';
	var streak = 0;
	var record_streak = 0;
	var fillerInt, fillerIn, fillerOut;
	
	console.log('GAME INITIALIZED');
	console.log('player_ft ' + player_ft);
	
	var shot_true_message  = ["nice!", "you're a winner!", "score, baby!", "you da best!", "money shower!", "$$$$!", "nice bet", "cha-ching!", "money in the bank!", "sweet deal!", "you did it, buddy!", "bands on bands!", "you receive a simulated monetary reward", "that was successful", "life is currently working out for you"];
	var shot_false_message = ["sucker!", "well", "that was not successful", "life is not working out for you currently", "maybe next time!", "better luck next time!", "bet it back!", "you’ll win it back", "awful", "tough luck!", "too bad!", "damn!", "almost (doesn’t count)!", "glad i’m not you", "get it together"];
	
	var filler_message = ["time is passing", "what was it you wanted to be when you grew up?", "any hopes/dreams?", "here we are still", "trust people more", "remember how confusing adulthood used to be?", "here you are still", "this is your real life", "this is how you're spending your life right now"]
	
	var streak_message = ["you’re on a tear!", "hot hand!", "let it ride!", "you’re crushing it!", "wow! can i borrow $10?", "adopt me!", "will you go out with me?", "can i have a slice of the pie?", "you’re too good for this"];
	//var megastreak_message = "you're on fire!";
	var debt_message = ["loan sharks know where you live", "you’re in the hole", "be careful", "you’re gonna lose it all...", "maybe you’ll turn around, but if you don’t...", "be careful, buddy.", "you’re in the red right now", "hope you know a guy", "it’s not looking good for you", "i can’t lend you money, you know"];
	var health_message = "you've unlocked HEALTH in your stats bar";
	var mood_message = "you've unlocked MOOD in your stats bar";
	var welcome_message = "welcome " + settings.account.name + '!';
	var messageTimerIn, messageTimerOut;
	
	/*
	*	STATIC LEVELS
	*/
	var FT = [37, 52, 68, 81, 90];
	var HEALTH = [40, 60, 80, 100];

	
	function shoot() {
		
		
		//randomizeFT();
		randomizeMood();
		//randomizeHealth();
		//randomizeDaysRested();
		setSubTotal();
		
		var _shoot =  Math.random() < 0.5; //generates random true false
		
		var coin = function() {
		    return (Math.random() < (settings.account.odds/100) ? 1 : 0);
		}
		
		//console.log('% change making it')
		//console.log(settings.account.odds/100);
		
		$('.message-center').hide();
		
		shot = coin();
		//shot = 0;
		setThrows();
		setWage();
		shootAnimation();
		checkWage();
		
		
		if(throws == 9) unlockHealth();
		if(throws == 29) unlockMood();
		if (throws % 5 === 0) {
			setTimeout(function(){
				playSub();
			}, 4000)
		}
		
		// this is old functionality to show the upgrade screen
		if(throws > 0) {
			/*
			*
			*	TO DO: Determine algorithm for shooting the ball
			*
			*/
		
			
			/*
			
			
			if(throws == 0) {
				disableActions();
				
				setTimeout(function(){
					showScoreboard();
				}, 1000);
			}
			*/
		} else {
			
		}
	}
	
	function unlockHealth(){ 
		$('.health-stat').removeClass('locked');
		setMessage('new stat unlocked: HEALTH', 0, 5000);
	}
	
	function unlockMood(){
		$('.mood-stat').removeClass('locked');
		setMessage('new stat unlocked: MOOD', 0, 5000);
	}
	
	function randomizeFT(){
		var random_ft = FT[Math.floor(Math.random()*FT.length)];
		var diff = Math.floor(Math.random() * 12) - 6;
		var random_val = random_ft + diff;
		
		settings.account.ft = random_val;
		$('.account-player-ft').text(settings.account.ft + '%');
	}
	
	function randomizeHealth(){
		var max, min;
		
		var random_health = HEALTH[Math.floor(Math.random()*HEALTH.length)];
		var diff = 0;
		
		switch(random_health){
		case HEALTH[0]:
			diff = Math.floor(Math.random() * 20) - 20;
		break;
		case HEALTH[1]:
			diff = Math.floor(Math.random() * 24) - 12;
		break;
		case HEALTH[2]:
			diff = Math.floor(Math.random() * 12) - 6;
		break;
		case HEALTH[3]:
			diff = Math.floor(Math.random() * -6);
		break;
		}
		
		
		settings.account.health = random_health + diff;
		$('.account-player-health').text(settings.account.health + '%');
	}
	
	function randomizeDaysRested(){ 
		var random_rested = Math.floor(Math.random() * 8);
		var related_percent = 0;
		switch (random_rested) {
		case 0:
			related_percent = 0;
			break;
		case 1:
			related_percent = 12.5;
			break;
		case 2:
			related_percent = 25;
			break;
		case 3:
			related_percent = 37.5;
			break;
		case 4:
			related_percent = 50;
			break;
		case 5:
			related_percent = 62.5;
			break;
		case 6:
			related_percent = 75;
			break;
		case 7:
			related_percent = 87.5;
			break;
		case 8:
			related_percent = 100;
			break;
		}
		
		settings.daysRested = random_rested;
		settings.daysRestedVal = related_percent;
		
		$('.account-player-days-rested').text(settings.daysRested);
	}
	
	function randomizeMood(){ 
		var mood = Math.floor( (Math.random() * 99) + 1 );
		settings.account.mood = mood;
		
		if(settings.account.mood >= 100) {
			$('.account-player-mood').text(';)');
		} else if(settings.account.mood >= 87) {
			$('.account-player-mood').text(':D');
		} else if(settings.account.mood >= 75) {
			$('.account-player-mood').text(':)');
		} else if(settings.account.mood >= 62) {
			$('.account-player-mood').text(':|');
		} else if(settings.account.mood >= 50) {
			$('.account-player-mood').text('|:');
		} else if(settings.account.mood >= 37) {
			$('.account-player-mood').text('):');
		} else if(settings.account.mood >= 25) {
			$('.account-player-mood').text('0:');
		} else if(settings.account.mood >= 0) {
			$('.account-player-mood').text('D:');
		} else {
			$('.account-player-mood').text('D:');
		}

	}
	
	function setSubTotal(){
		settings.account.subtotal = settings.account.ft + settings.account.health + settings.account.daysRestedVal + settings.account.mood;
		
		//console.log('subtotal ' + settings.account.subtotal);
		
		if(settings.account.subtotal >= 375) {
			settings.account.odds = 100; //swish
		} else if(settings.account.subtotal >= 375) {
			settings.account.odds = 90; //swish
		} else if(settings.account.subtotal >= 325) {
			settings.account.odds = 85; //swish
		} else if(settings.account.subtotal >= 300) {
			settings.account.odds = 75; //swish
		} else if(settings.account.subtotal >= 275) {
			settings.account.odds = 60; //swish
		} else if(settings.account.subtotal >= 175) {
			settings.account.odds = 50; //miss
		} else if(settings.account.subtotal >= 155) {
			settings.account.odds = 40; //miss
		} else if(settings.account.subtotal >= 100) {
			settings.account.odds = 25; //miss
		} else {
			settings.account.odds = 10; //miss
		}
		
		//console.log('odds ' + settings.account.odds);
	}
	
	
	function setShotWage(shotName){
		shotWage = shotName;
	}
	
	function checkWage(){
		
		var _totalWage = Number( $('.amount-num').text() );
		
		if( _totalWage > money && money > 0) {
			//_totalWage = settings.account.money;
			//alert('over')
			$('#borrow-yes').off('touchstart mousedown', borrowMoney)
			settings.account.wage = money;
			setTimeout(function(){
				var numAnim = new CountUp("wage-amount", _totalWage, money);
				numAnim.start();
			}, 3000)
			
		} else if( _totalWage > money && money == 0 ) {
			$('.disable-overlay').show();
			
			setTimeout(function(){
				var numAnim = new CountUp("wage-amount", _totalWage, money);
				numAnim.start();
			}, 3000)
			
			setTimeout(function(){
				$('.disable-overlay').hide();
				$('#borrow').show();
				$('#borrow-yes').off('touchstart mousedown', borrowMoney).on('touchstart mousedown', borrowMoney);
			}, 5000);
		}
		
	}
	
	function borrowMoney(){
		//alert('borrow money');
		$('#borrow').hide();
		
		settings.account.inDebt = true;
		settings.account.debt += Math.abs( 500 );
		settings.account.money = Math.abs( 500 );
		settings.account.wage = 50;
		
		$('.amount-num').text(50);
		
		setMessage('you borrowed $500 from loan sharks', 0, 5000);

		$('.account-money').text( settings.account.money );
		$('.loan-shark').show();
	
		var numAnim = new CountUp("game-money", money, settings.account.money);
		numAnim.start();
		money = settings.account.money;
	}
	
	function setWage(){
		
		var _amount = [];
		var _amountString = '';
		var _totalWage = 0;
		
		/*
		$('.wager-unit input').each(function(){
			_amount.push($(this).val());
			_amountString += $(this).val() + ','
		});
		*/
		
		_totalWage = Number( $('.amount-num').text() );
		//alert('set wage')
		if(shot && shotWage == 'swish') {
			//correctly guessed swish
				//console.log('MONEY ' + money);
				money += _totalWage;
				
				if(!settings.account.inDebt) {
					$('.account-money').text( money )
					setTimeout(function(){
						var numAnim = new CountUp("game-money", settings.account.money, money);
						numAnim.start();
		 
						settings.account.money = money;
					}, 3000);
				} else {
					checkDebt();
				}
				
				
				
				
			
			
		} else if(!shot && shotWage == 'miss') {
			//coorectly guessed miss
			money += _totalWage;

			if(!settings.account.inDebt) {
				$('.account-money').text( money )
				setTimeout(function(){
					var numAnim = new CountUp("game-money", settings.account.money, money);
					numAnim.start();
	 
					settings.account.money = money;
				}, 3000);
			} else {
				checkDebt();
			}
			
		} else {
			//incorrectly guessed
			if( settings.account.inDebt) {
				handleDebt(_totalWage);
			} else {
				money -= _totalWage;
				$('.account-money').text( money )
				setTimeout(function(){
					var numAnim = new CountUp("game-money", settings.account.money, money);
					numAnim.start();
		 
					settings.account.money = money;
				}, 3000);
			}
		}
		
		//$('.account-money').text('$' + money);
	}
	
	function checkDebt(){
		console.log('check debt')
		if(money >= (settings.account.debt * 2) ) {
			money = money/2;
			setMessage('loan sharks collected $' + Math.abs(settings.account.debt) + ' from you', 4000, 8000);
			settings.account.debt = 0;
			settings.account.inDebt = false;
			
			setTimeout(function(){
				$('.loan-shark').hide()
			}, 3000);
			
			
		} else {
			
		}
		
		$('.account-money').text( money )
		setTimeout(function(){
			var numAnim = new CountUp("game-money", settings.account.money, money);
			numAnim.start();

			settings.account.money = money;
		}, 3000);
	}
	
	function handleDebt(debt){
		console.log('HANDLE DEBT')
		//console.log(debt)
		
		
		if( Math.abs(settings.account.debt) < 10000 ) {
			
			settings.account.inDebt = true;
			settings.account.debt += debt;
			
			console.log(' debt '  + settings.account.debt );
			console.log(' money ' + money )
			
			money = money - Math.abs( debt );
			
			
			setMessage('you borrowed $' + Math.abs(debt * 2) + ' from loan sharks', 3000, 5000);
	
			$('.account-money').text( money );
			$('.loan-shark').show();
		
			setTimeout(function(){
				var numAnim = new CountUp("game-money", settings.account.money, money);
				numAnim.start();
				settings.account.money = money;
			}, 3000);
		} else {
			setMessage('loan sharks broke your legs. Game Over.', 3000, 5000);
			setTimeout(function(){
				$('#borrow').show();
				$('#borrow-yes').hide();
				$('#borrow .cashout-message').text( 'loan sharks broke your legs. Game Over.' );
			}, 3000);
		}
		
		
	}
	
	function setSwishWage(){
		shotWage = 'swish';
		shoot();
	}
	
	function setMissWage(){
		shotWage = 'miss';
		shoot();
	}
	
	function disableActions(){
		$('#swish').prop('disabled', true).addClass('disabled');
		$('#miss').prop('disabled', true).addClass('disabled');
	}
	
	function enableActions(){
		$('#swish').prop('disabled', false).removeClass('disabled');
		$('#miss').prop('disabled', false).removeClass('disabled');
	}
	
	function showScoreboard(){
		setUpgrades();
		toSection('#upgrade');
	}
	
	function setThrows(){
		throws++;
		
		settings.account.throws = throws;
		$('.account-throws').text(throws);
		$('.account-upgrade-throws-count').text(throws);
	}
	
	function shootAnimation(){
		
		//$('#idle_imageplayer').data('imgplay').toFrame(0);
		//$('#idle_imageplayer').data('imgplay').stop();
		//$('#idle_imageplayer').addClass('shooting');
		
		$('.disable-overlay').show();
		setTimeout(function(){ $('.disable-overlay').hide(); }, 3000);
		
		//console.log(settings.account.odds)
		
		$('.animation-iframe').hide();
		
		if( settings.account.odds <= 59 ) {
			
			if (shot) {
				$('#50-swish').show();
				document.getElementById("50-swish").contentWindow.playAnimation();
			} else {
				$('#50-miss').show();
				document.getElementById("50-miss").contentWindow.playAnimation();
			}
			
		} else if( settings.account.odds <= 69 ) {
			
			if (shot) {
				$('#60-swish').show();
				document.getElementById("50-swish").contentWindow.playAnimation();
			} else {
				$('#60-miss').show();
				document.getElementById("60-miss").contentWindow.playAnimation();
			}
			
		} else if( settings.account.odds <= 79 ) {
			
			if (shot) {
				$('#70-swish').show();
				document.getElementById("70-swish").contentWindow.playAnimation();
			} else {
				$('#70-miss').show();
				document.getElementById("70-miss").contentWindow.playAnimation();
			}
		
		} else if( settings.account.odds <= 89 ) {
			
			if (shot) {
				$('#80-swish').show();
				document.getElementById("80-swish").contentWindow.playAnimation();
			} else {
				$('#80-miss').show();
				document.getElementById("80-miss").contentWindow.playAnimation();
			}
			
		} else if( settings.account.odds <= 99 ) {
			
			if (shot) {
				$('#90-swish').show();
				document.getElementById("90-swish").contentWindow.playAnimation();
			} else {
				$('#90-miss').show();
				document.getElementById("90-miss").contentWindow.playAnimation();
			}
			
		} else if( settings.account.odds == 100 ) {
			
			if (shot) {
				$('#100-swish').show();
				document.getElementById("100-swish").contentWindow.playAnimation();
			} else {
				$('#100-miss').show();
			}
		
		}
		
		
		document.getElementById("idle-animation").contentWindow.stopAnimation();
		
		//swish and guessed miss
		if(shot && shotWage == 'swish'){
			console.log('GUESSED SHOT')
			streak++;
			if(streak > record_streak) record_streak = streak;
			
			if(streak < 3) {
				setMessage( shot_true_message[ Math.floor( Math.random() * (shot_true_message.length - 1) )], 3000, 5000 );
			} else if(streak == 3) {
				setMessage( streak_message[ Math.floor( Math.random() * (streak_message.length - 1) )], 3000, 5000 );
			} else {
				setMessage( streak_message[ Math.floor( Math.random() * (streak_message.length - 1) )], 3000, 5000  );
			}
		} else if(shot && shotWage == 'miss') {
			streak = 0;
			if(!settings.account.inDebt) setMessage( shot_false_message[ Math.floor( Math.random() * (shot_false_message.length - 1) )], 3000, 5000 );
		}
		
		//miss and guessed miss
		if(!shot && shotWage == 'miss') {
			console.log('GUESSED MISS')
			streak++;
			if(streak < 3) {
				setMessage( shot_true_message[ Math.floor( Math.random() * (shot_true_message.length - 1) )], 3000, 5000 );
			} else if(streak == 3) {
				setMessage( streak_message[ Math.floor( Math.random() * (streak_message.length - 1) )], 3000, 5000 );
			} else {
				setMessage( streak_message[ Math.floor( Math.random() * (streak_message.length - 1) )], 3000, 5000  );
			}
		} else if(!shot && shotWage == 'swish') {
			streak = 0;
			if(!settings.account.inDebt) setMessage( shot_false_message[ Math.floor( Math.random() * (shot_false_message.length - 1) )], 3000, 5000 );
		}
		
		
		setTimeout(function(){ 
			$('.animation-iframe').hide(); 
			$('#idle-animation').show(); 
			
			document.getElementById("50-swish").contentWindow.stopAnimation();
			document.getElementById("50-miss").contentWindow.stopAnimation();
			document.getElementById("60-swish").contentWindow.stopAnimation();
			document.getElementById("60-miss").contentWindow.stopAnimation();
			document.getElementById("70-swish").contentWindow.stopAnimation();
			document.getElementById("70-miss").contentWindow.stopAnimation();
			document.getElementById("80-swish").contentWindow.stopAnimation();
			document.getElementById("80-miss").contentWindow.stopAnimation();
			document.getElementById("90-swish").contentWindow.stopAnimation();
			document.getElementById("90-miss").contentWindow.stopAnimation();
			document.getElementById("100-swish").contentWindow.stopAnimation();
			
			document.getElementById("idle-animation").contentWindow.playAnimation();
		}, 3000);
	}
	
	function fillerMessage(){
		
		console.log('filler message')
		clearTimeout(fillerInt)
		clearTimeout(fillerIn);
		clearTimeout(fillerOut);
		
		fillerIn = setTimeout(function(){
			if(!$('body').hasClass('animating') && !$('body').hasClass('shooting') && !$('body').hasClass('login')) {
				$('.message-center h1').text( filler_message[ Math.floor( Math.random() * (filler_message.length - 1) )] );
				$('.message-center').show();
			}
			
		}, 10000);
		
		
		fillerOut = setTimeout(function(){
			if(!$('body').hasClass('animating') && !$('body').hasClass('shooting') && !$('body').hasClass('login')) {
				$('.message-center').hide();
			}
		}, 1300);
		
		fillerInt = setTimeout(function(){
			fillerMessage( filler_message[ Math.floor( Math.random() * (filler_message.length - 1) )] );
		}, 13000);
	}
	
	function setMessage(_text, _startTime, _endTime) {
	
		//console.log( 'message set ' );
		
		clearTimeout(fillerInt)
		clearTimeout(fillerIn);
		clearTimeout(fillerOut);
		
		fillerInt = setTimeout(function(){
			fillerMessage( filler_message[ Math.floor( Math.random() * (filler_message.length - 1) )] );
		}, _endTime + 10000);
		
		//$('.message-center').hide();
		
		//clearTimeout(messageTimerIn);
		clearTimeout(messageTimerOut);
		
		messageTimerIn = setTimeout(function(){
			$('.message-center h1').text(_text);
			$('.message-center').show();
		}, _startTime);
		
		
		messageTimerOut = setTimeout(function(){
			$('.message-center').hide();
		}, _endTime);
	}
	
	function hideMessage(){
		$('.message-center').hide();
	}
	
	function resetGame (){
		e.stopPropagation();
		enableActions();
		
		settings.account.throws = 15;
		settings.account.injured = Math.random() < 0.5;
		settings.account.daysRested = Math.round(Math.random() * 40);
		
		throws = settings.account.throws;
		$('.account-throws').text(throws);
		$('.account-upgrade-throws-count').text(throws);
		
		console.log('reset game');
	}
	
	
	function playSub(){
		randomizeFT();
		randomizeMood();
		randomizeHealth();
		randomizeDaysRested();
		changeShirt();
		setMessage('new shooter!', 0, 1000);
		/*
		if(settings.account.subLeft > 0) {
		
			// SET STAS
			settings.account.subLeft--;
			
			randomizeFT();
			randomizeMood();
			randomizeHealth();
			randomizeDaysRested();
			
			//settings.account.injured = Math.random() < 0.5;
			//settings.account.daysRested = Math.round(Math.random() * 40);
			
			
			
		}
		*/
	}
	
	
	function setStatsText(){
		//SET STATS TEXT
		$('.play-sub-used').text(settings.account.subLeft);
		$('.play-sub-total').text(settings.account.sub);
		$('.account-days-rested').text(settings.account.daysRested);
		
		if(settings.account.injured){
			$('.account-injured').text('Yes');
		} else {
			$('.account-injured').text('No');
		}
	}
	
	randomizeMood();
	randomizeHealth();
	randomizeDaysRested();
	randomizeFT();
	setStatsText();
	setSubTotal();
	fillerMessage();
	
	//$('#idle_imageplayer').show().data('imgplay').play();
	$('.message-center').off('click', hideMessage).on('click', hideMessage);
	$('.upgrade-done').off('click', resetGame).on('click', resetGame);
	$('.play-sub').off('click', playSub).on('click', playSub);
	$('#swish').off('click', setSwishWage).on('click', setSwishWage);
	$('#miss').off('click', setMissWage).on('click', setMissWage);
	//$('#swish').on('touchstart mousedown', function(e){ setShotWage('swish'); shoot(); console.log('shoot') })
	//$('#miss').on('touchstart mousedown', function(e){ setShotWage('miss'); shoot(); })
}

