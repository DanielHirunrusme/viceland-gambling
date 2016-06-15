/**
 * Global URL Param
 * @type {Object}
 */
var urlParam = module.exports = function() {
	
	var _timer;
	
	this.startSlideShow = function(name){
		
		//return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
	}
	
	this.stopSlideShow = function() {
		
	}
	
}

