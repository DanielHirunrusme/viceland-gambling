/**
 * Global settings shared by all modules
 * @type {Object}
 */
var settings = module.exports = {
	breakpoints: {
		xs: 481,
		s: 641,
		m: 1000,
		ml: 999,
		l: 1281,
		xl: 1441,
		xxl: 1921
	},
	padding: {
		top: $(window).height() * .04,
		left: $(window).width() * .03
	},
	account: {
		name: '',
		ft: Math.round( (Math.random() * 60) + 30 ),
		health: Math.round( (Math.random() * 60) + 30 ),
		mood: Math.floor( (Math.random() * 99) + 1 ),
		money: 500,
		throws: 0,
		daysRested: 0,
		daysRestedVal:0,
		injured: false,
		wage: 50,
		sub: 10,
		subLeft:10,
		subtotal:0,
		odds:0,
		inDebt:false,
		debt:0,
		borrowed:0
	},
};
 
settings.breakpoints = settings.breakpoints;
settings.account.name = settings.account.name;
settings.account.ft = settings.account.ft;
settings.account.health = settings.account.health;
settings.account.mood = settings.account.mood;
settings.account.money = settings.account.money;
settings.account.throws = settings.account.throws;
settings.account.daysRested = settings.account.daysRested;
settings.account.daysRestedVal = settings.account.daysRestedVal;
settings.account.subtotal = settings.account.subtotal;
settings.account.injured = settings.account.injured;
settings.account.wage = settings.account.wage;
settings.account.sub = settings.account.sub; 
settings.account.subLeft = settings.account.subLeft; 
settings.account.odds = settings.account.odds;
settings.account.inDebt = settings.account.inDebt;
settings.account.debt = settings.account.debt;
settings.account.borrowed = settings.account.borrowed;

/*
settings.breakpoints.header = settings.breakpoints.m;
settings.breakpoints.navHover = settings.breakpoints.m;
settings.breakpoints.mobile = settings.breakpoints.l;
*/ 