(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 900,
	height: 500,
	fps: 30,
	color: "#FFFFFF",
	manifest: []
};



// symbols:



(lib.Symbol1 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF6600").s().p("AjgDhIAAnBIHBAAIAAHBg");
	this.shape.setTransform(22.5,22.5);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,45.1,45.1);


// stage content:
(lib.FTidle = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// rim
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#999999").s().p("AhzJ4IAAh0IAAkbIAAtgIDnAAIAATvg");
	this.shape.setTransform(818.9,91.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AGVCNIAAi6IiQAAIAAArIgXAAIAAABIhDAAIAAgBIgcAAIAAABIhKAAIAAgBIgaAAIAAABIhIAAIAAgBIgdAAIAAABIg9AAIAAgBIgbAAIAAABIhKAAIAAgBIgcAAIAAABIhGAAIAAgBIgcAAIAAABIgrAAIAAgBIgYAAIAAABIgFAAIAAgBIgaAAIAAiKIN6AAIAAEZg");
	this.shape_1.setTransform(762.6,128.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(90));

	// net
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#EEEEEE").ss(3.5,2,0,3).p("AlMkaIAAB2IAACHIAACCIAAB8IAABUADekaIAAB2IBvAAIAAh2AhuikIBuAAIAAh1ABwikIAAiPAAAikIBwAAIBuAAIAACHIAACCIBvAAIAAiCIAAiHAhukZIAAB1IAACHIAACCIBuAAIBwAAIAAiCIAAiHAjiikIAAh2AjiikIB0AAAAABlIAAiCIBwAAIBuAAIBvAAAjiBlIB0AAIAAB8IAABUAjiBlIAAiCIB0AAIBuAAIAAiHAjiDhIB0AAIBuAAIBwAAIAAh8IBuAAIAAB8IAABUAjiE1IAAhUIAAh8AAAE1IAAhUIAAh8ABwE1IAAhUIBuAAIBvAAIAAh8AFNE1IAAhUAjigdIAAiHAlMikIBqAAAlMgdIBqAAAlMBlIBqAAAlMDhIBqAA");
	this.shape_2.setTransform(753.4,156.7);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(90));

	// 80-MISS-miss
	this.instance = new lib.Symbol1("synched",0);
	this.instance.setTransform(190.2,219.3,1,1,-90,0,0,22.5,22.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(30).to({_off:false},0).to({rotation:0,x:566.2,y:162.7},13).to({rotation:90,x:877.5,y:268.7},10).to({rotation:0,x:387,y:423.1},17).to({x:166.5,y:349.8},12).wait(8));

	// ball
	this.instance_1 = new lib.Symbol1("synched",0);
	this.instance_1.setTransform(166.5,349.8,1,1,0,0,0,22.5,22.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regY:22.6,scaleY:0.98,y:422},3).to({regY:22.5,scaleY:0.58,y:431},1).to({regY:22.6,scaleY:0.98,y:422},1).to({regY:22.5,scaleY:1,y:349.8},4).to({rotation:-90,x:184.6,y:304.5},5).to({startPosition:0},10).to({x:183.8,y:224.9},5).to({_off:true},1).wait(60));

	// player
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#00FFCC").s().p("Ak6QAIAAjbIAAjUIAA5RIHAAAIAAHCIjaAAIAAFAIDCAAIDMAAIABBuIjMAAIjDAAIAALZIAADdIAADag");
	this.shape_3.setTransform(136.5,342.3);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#00FFCC").s().p("Ak7QAMAAAggAIHAAAIAAHCIjaAAIAAFaIGQAAIABBuImRgBIAAR3g");
	this.shape_4.setTransform(136.7,342.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#00FFCC").s().p("Ak8QAMAAAggAIHAAAIAAHCIjbAAIAAFzIGUAAIAABuImUAAIAARdg");
	this.shape_5.setTransform(136.8,342.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#00FFCC").s().p("Ak+QAMAAAggAIHAAAIAAHCIjaAAIAAGLIGWABIABBvImXgBIAAREg");
	this.shape_6.setTransform(136.9,342.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#00FFCC").s().p("Ak/QAIAAjUIAAjXIAA5VIHAAAIAAHCIjaAAIAAGkIDFAAIDTABIABBuIjTgBIjGAAIAAJ4IAADYIAADcg");
	this.shape_7.setTransform(137.1,342.3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#00FFCC").s().p("Ak+QAMAAAggAIHAAAIAAHCIjaAAIAAGRIGWAAIABBuImXgBIAARAg");
	this.shape_8.setTransform(137,342.3);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#00FFCC").s().p("Ak9QAMAAAggAIHAAAIAAHCIjaAAIAAF9IGVAAIAABuImVAAIAARTg");
	this.shape_9.setTransform(136.9,342.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#00FFCC").s().p("Ak8QAMAAAggAIHAAAIAAHCIjaAAIAAFoIGSABIABBuImTAAIAARng");
	this.shape_10.setTransform(136.7,342.3);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#00FFCC").s().p("Ak7QAMAAAggAIHAAAIAAHCIjaAAIAAFUIGQAAIABBuImRAAIAAR8g");
	this.shape_11.setTransform(136.6,342.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#00FFCC").s().p("Ak6QAIAAjhIAAiwIAA5vIHAAAIAAHCIjaAAIAAFAIDUAAIC6AAIABBuIi9AAIjSAAIAAL5IAAC+IAADZg");
	this.shape_12.setTransform(136.5,342.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#00FFCC").s().p("Ak0P4IAUjgIgUixIAA5fIHAAAIAAHCIjaAAIAAEwIDLATIC3gTIABBuIi6ASIjJgSIAAL5IAUC+IgUDZg");
	this.shape_13.setTransform(135.9,343.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#00FFCC").s().p("AkuPwIAojeIgoizIAA5OIHAAAIAAHCIjaAAIAAEfIDBAkIC1gkIABBuIi3AkIjAgkIAAL5IAoC+IgoDZg");
	this.shape_14.setTransform(135.3,343.9);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#00FFCC").s().p("AkoPoIA8jcIg8i1IAA4+IHAAAIAAHCIjaAAIAAEPIC3A2ICzg2IABBuIi0A2Ii3g2IAAL5IA8C+Ig8DZg");
	this.shape_15.setTransform(134.7,344.7);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#00FFCC").s().p("AkiPgIBQjaIhQi3IAA4uIHAAAIAAHCIjaAAIAAD/ICtBIICxhIIABBuIixBIIiuhIIAAL5IBOC+IhODZg");
	this.shape_16.setTransform(134.1,345.5);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#00FFCC").s().p("AkcPYIBkjZIhki4IAA4fIHAAAIAAHCIjaAAIAADwICkBaICuhaIABBuIiuBaIilhaIAAL5IBiC+IhiDZg");
	this.shape_17.setTransform(133.5,346.3);
	this.shape_17._off = true;

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#00FFCC").s().p("AklPoIBQjZIhQi4IAA4+IHAAAIAAHCIjaAAIAAEPIDDApICNiyIAVBXIiNDCIjYgiIAAL5IBOC+IhODZg");
	this.shape_18.setTransform(134.6,344.7);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#00FFCC").s().p("AkvP4IA+jZIg+i4IAA5fIHAAAIAAHCIjaAAIAAEwIDkgJIBrkKIAqBCIhuEqIkLAVIAAL5IA9C+Ig9DZg");
	this.shape_19.setTransform(135.5,343.1);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#00FFCC").s().p("Ak5QIIArjZIgri4IAA5+IHAAAIAAHCIjZAAIAAFPIEDg7IBKliIA+AsIhNGSIk+BNIAAL5IAqC+IgqDZg");
	this.shape_20.setTransform(136.5,341.5);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#00FFCC").s().p("AlCQYIAXjZIgXi4IAA6fIHAAAIAAHCIjaAAIAAFwIEjhsIApm6IBTAUIgtH6IlyCGIAAL5IAXC+IgXDZg");
	this.shape_21.setTransform(137.4,339.9);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#00FFCC").s().p("AlMQoIAEjZIgEi4IAA6+IHAAAIAAHCIjaAAIAAGPIFEieIAGoRIBpgDIgOJiImlC+IAAL5IAEC+IgEDZg");
	this.shape_22.setTransform(138.3,338.3);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#00FFCC").s().p("AlrQoIAEjZIgEi4IAA6+IHAAAIAAHCIjaAAIAAGPIFEitIBFo+IBoAJIhMKCImlDSIAAL1IAEC+IgEDZg");
	this.shape_23.setTransform(141.5,338.3);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#00FFCC").s().p("AmKQoIAEjZIgEi4IAA6+IHAAAIAAHCIjaAAIAAGPIFDi9ICEppIBoAVIiKKiImlDkIAALyIAEC+IgEDZg");
	this.shape_24.setTransform(144.6,338.3);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#00FFCC").s().p("AmpQwIAEjZIgEi5IAA6+IHAAAIAAHCIjaAAIAAGQIFDjOIDCqTIBoAfIjILCImlD4IAALvIAEC+IgEDZg");
	this.shape_25.setTransform(147.7,337.5);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#00FFCC").s().p("AnIROIADjZIgDi5IAA6+IHCAAIAAHCIjdAAIAAGQIFEjeIEAq/IBoArIkHLiImlELIAALrIAFC/IgFDZg");
	this.shape_26.setTransform(150.8,334.6);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#00FFCC").s().p("AnoRrIAEjZIgEi4IAA6+IHCAAIAAHCIjcAAIAAGPIFEjtIE+rqIBpA2IlGMBImlEeIAALpIAEC+IgEDZg");
	this.shape_27.setTransform(153.9,331.6);
	this.shape_27._off = true;

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#00FFCC").s().p("AnWQ6IADjZIgDi8IAA6zIHCAAIAAHCIjcAAIAAGIIE2jWIEzqfIBeA7Ik5K1ImOECIAALnIADDBIgDDZg");
	this.shape_28.setTransform(152.2,336.5);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#00FFCC").s().p("AnFQgIADjaIgDi9IAA6pIHCAAIAAHCIjcAAIAAGAIEpi+IEopUIBUBBIktJnIl4DmIADOpIgDDZg");
	this.shape_29.setTransform(150.5,339.1);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#00FFCC").s().p("AmzQcIACjZIgCjBIAA6eIHAAAIAAHCIjbAAIAAF4IEdimIEdoLIBJBHIkhIbIliDIIAEOsIgEDZg");
	this.shape_30.setTransform(148.7,339.5);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#00FFCC").s().p("AmiQYIACjaIgC9WIHAAAIAAHCIjaAAIAAFwIEPiPIERm/IA/BNIkVHNIlKCsIACOtIgCDZg");
	this.shape_31.setTransform(147,339.9);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#00FFCC").s().p("AmRQUMAAAggnIHAAAIAAHBIjaAAIAAFoIEDh2IEFl2IA1BSIkJGBIk0CPIAASIg");
	this.shape_32.setTransform(145.2,340.3);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#00FFCC").s().p("Al/QQMAAAggfIHAAAIAAHCIjaAAIAAFfID1hfID6kqIAqBXIj8E0IkdBzIAASJg");
	this.shape_33.setTransform(143.5,340.7);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#00FFCC").s().p("AluQMMAAAggXIHAAAIAAHCIjaAAIAAFXIDphHIDujgIAgBeIjwDmIkHBXIAASKg");
	this.shape_34.setTransform(141.8,341.1);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#00FFCC").s().p("AlcQIMAAAggPIHAAAIAAHCIjbAAIAAFPIDcgvIDjiWIAVBjIjkCaIjwA6IAASMg");
	this.shape_35.setTransform(140,341.5);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#00FFCC").s().p("AlLQEMAAAggHIHAAAIAAHCIjaAAIAAFHIDOgYIDYhKIALBpIjYBMIjZAdIAASOg");
	this.shape_36.setTransform(138.3,341.9);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#00FFCC").s().p("Ak6QAMAAAggAIHAAAIAAHCIjaAAIAAFAIGOAAIABBuImPAAIAASQg");
	this.shape_37.setTransform(136.5,342.3);
	this.shape_37._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3}]}).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_3}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(14).to({_off:false},0).wait(3).to({x:133.6},0).wait(7).to({_off:true},1).wait(65));
	this.timeline.addTween(cjs.Tween.get(this.shape_27).wait(34).to({_off:false},0).wait(5).to({_off:true},1).wait(50));
	this.timeline.addTween(cjs.Tween.get(this.shape_37).wait(50).to({_off:false},0).wait(38).to({_off:true},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(555,278,725.5,416.8);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;