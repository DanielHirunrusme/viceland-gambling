var initializeModules = require( "../lib/init-modules.js" ),
	settings = require( "modules/settings" ),
	velocity = require("velocity-animate");

module.exports = function( el ) {
		var $el = $( el ),
			$window = $( window );
		
		console.log('                                                 ');
		console.log('=================================================');
		console.log('pjax-container.js initialized');
		console.log('=================================================');
		console.log('                                                 ');
		 
		
		new Pjax({
		  elements: "a.pjax",
		  selectors: ["title", ".main-menu", ".main-wrapper", ".pjax-container", ".site-footer"],
		  switches: {
		    ".main-wrapper": Pjax.switches.sideBySide,
			".pjax-container": Pjax.switches.sideBySide
		  },
		  switchesOptions: { 
	   	   	".main-wrapper": {
			      classNames: {
			        // class added on the element that will be removed
			        remove: "remove-article",
			        // class added on the element that will be added
			        add: "added-article",
			        // class added on the element when it go backward
			        backward: "Animate--slideInRight",
			        // class added on the element when it go forward (used for new page too)
			        forward: "Animate--slideInLeft"
			      }
			    },
		   	   	".pjax-container": {
				      classNames: {
				        // class added on the element that will be removed
				        remove: "remove-article",
				        // class added on the element that will be added
				        add: "added-article",
				        // class added on the element when it go backward
				        backward: "Animate--slideInRight",
				        // class added on the element when it go forward (used for new page too)
				        forward: "Animate--slideInLeft"
				      }
				    }
			},
			analytics: function () {
		    	window.ga('send', 'pageview', {page: document.location.pathname, title: document.title})
		  	}
		});
		
		function whenDOMReady() {
			setTimeout(function(){ $('.waiting').removeClass('visible'); $('*').removeClass('notrans');  }, 1000); 
			settings.unique = false;
			$('body').removeClass().addClass($('.main-menu').data('page'));
			$('body *').addClass('notrans');
	
			initializeModules();
		}
		
		
		function onPJAXStart() {
			$('.waiting').addClass('visible');
			$window.off('mousewheel'); 
		}

		
		document.addEventListener("pjax:success", whenDOMReady)
		$(document).on('pjax:send', onPJAXStart)
};