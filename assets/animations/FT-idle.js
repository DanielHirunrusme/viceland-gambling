(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 900,
	height: 500,
	fps: 24,
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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_1},{t:this.shape}]},89).wait(1));

	// net
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#EEEEEE").ss(3.5,2,0,3).p("AlMkaIAAB2IAACHIAACCIAAB8IAABUADekaIAAB2IBvAAIAAh2AhuikIBuAAIAAh1ABwikIAAiPAAAikIBwAAIBuAAIAACHIAACCIBvAAIAAiCIAAiHAhukZIAAB1IAACHIAACCIBuAAIBwAAIAAiCIAAiHAjiikIAAh2AjiikIB0AAAAABlIAAiCIBwAAIBuAAIBvAAAjiBlIB0AAIAAB8IAABUAjiBlIAAiCIB0AAIBuAAIAAiHAjiDhIB0AAIBuAAIBwAAIAAh8IBuAAIAAB8IAABUAjiE1IAAhUIAAh8AAAE1IAAhUIAAh8ABwE1IAAhUIBuAAIBvAAIAAh8AFNE1IAAhUAjigdIAAiHAlMikIBqAAAlMgdIBqAAAlMBlIBqAAAlMDhIBqAA");
	this.shape_2.setTransform(753.4,156.7);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(90));

	// ball-idle
	this.instance = new lib.Symbol1("synched",0);
	this.instance.setTransform(166.5,349.8,1,1,0,0,0,22.5,22.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regY:22.6,scaleY:0.98,y:422},3).to({regY:22.5,scaleY:0.58,y:431},1).to({regY:22.6,scaleY:0.98,y:422},1).to({regY:22.5,scaleY:1,y:349.8},4).to({startPosition:0},5).to({startPosition:0},1).to({regY:22.6,scaleY:0.98,y:422},2).to({regY:22.5,scaleY:0.58,y:431},1).to({regY:22.6,scaleY:0.98,y:422},1).to({regY:22.5,scaleY:1,y:349.8},2).to({startPosition:0},1).to({regY:22.6,scaleY:0.98,y:422},2).to({regY:22.5,scaleY:0.58,y:431},1).to({regY:22.6,scaleY:0.98,y:422},1).to({regY:22.5,scaleY:1,y:349.8},2).to({startPosition:0},17).to({rotation:-90,x:184.2,y:305.3},6).to({regY:22.6,rotation:-180.3,x:165.9,y:234.6},5).to({regX:22.4,rotation:-189.1,x:154.6},5).to({regX:22.5,rotation:-180.3,x:165.9},6).to({startPosition:0},11).to({regY:22.5,rotation:-90,x:184.6,y:304.5},5).to({rotation:0,x:166.5,y:349.8},6).wait(1));

	// player-idle
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
	this.shape_12._off = true;

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#00FFCC").s().p("Ak7QAMAAAggAIHAAAIAAHCIjbAAIAAFiIGSAAIAABuImSAAIAARug");
	this.shape_13.setTransform(136.7,342.3);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#00FFCC").s().p("Ak9QAMAAAggAIHAAAIAAHCIjaAAIAAGDIGVABIAABuImVgBIAARNg");
	this.shape_14.setTransform(136.9,342.3);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#00FFCC").s().p("Ak1P6IARjgIgRiyIAA5hIHAAAIAAHCIjaAAIAAEzIDMAPIC4gPIABBuIi6APIjLgPIAAL4IARC/IgRDZg");
	this.shape_15.setTransform(136,343);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#00FFCC").s().p("AkwPzIAijfIgiizIAA5TIHAAAIAAHCIjaAAIAAElIDEAeIC2geIABBuIi4AeIjDgeIAAL5IAiC+IgiDZg");
	this.shape_16.setTransform(135.5,343.6);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#00FFCC").s().p("AkrPsIAyjdIgyi0IAA5GIHAAAIAAHCIjaAAIAAEXIC8AtIC0gtIABBuIi1AtIi8gtIAAL5IAyC+IgyDZg");
	this.shape_17.setTransform(135,344.3);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#00FFCC").s().p("AkmPmIBDjcIhDi2IAA45IHAAAIAAHCIjaAAIAAELIC0A8ICyg8IABBuIizA8Ii0g8IAAL4IBBC/IhBDZg");
	this.shape_18.setTransform(134.5,345);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#00FFCC").s().p("AkhPfIBUjbIhUi3IAA4rIHAAAIAAHCIjaAAIAAD9ICsBLICwhLIABBuIiwBLIithLIAAL5IBSC+IhSDZg");
	this.shape_19.setTransform(134,345.6);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#00FFCC").s().p("AkcPYIBkjZIhki4IAA4fIHAAAIAAHCIjaAAIAADwICkBaICuhaIABBuIiuBaIilhaIAAL5IBiC+IhiDZg");
	this.shape_20.setTransform(133.5,346.3);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#00FFCC").s().p("AkyPIIBkjaIhki4IAA39IHAAAIAAHCIjaAAIAADPIDbBIICMjAIAYBXIiLDWIj0hHIAAL4IBiC/IhiDZg");
	this.shape_21.setTransform(135.8,348);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#00FFCC").s().p("AlIO3IBkjZIhki5IAA3bIHAAAIAAHCIjbAAIAACtIEUA3IBpkmIAwBAIhpFRIlEg0IAAL4IBjC/IhjDZg");
	this.shape_22.setTransform(138,349.7);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#00FFCC").s().p("AlfOmIBkjZIhki5IAA25IHAAAIAAHCIjaAAIAACLIFMAlIBGmMIBHAqIhGHMImTghIAAL4IBkC/IhkDZg");
	this.shape_23.setTransform(140.2,351.4);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#00FFCC").s().p("Al1OVIBkjZIhki5IAA2XIHAAAIAAHCIjaAAIAABpIGDATIAknyIBeAUIgjJHInigOIAAL5IBkC+IhkDZg");
	this.shape_24.setTransform(142.5,353);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#00FFCC").s().p("AmLOsIBkjZIhki4IAA12IHAAAIAAHCIjbAAIAABHIG8ABIABpYIB2gDIAALEIozAEIAAL5IBkC+IhkDZg");
	this.shape_25.setTransform(144.7,350.7);
	this.shape_25._off = true;

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#00FFCC").s().p("AmMOuIBkjZIhki4IAA12IHAAAIAAHCIjbAAIAABHIG8gKIgQpPIB2gEIASK4Io0ATIAAL5IBkC+IhkDZg");
	this.shape_26.setTransform(144.8,350.5);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#00FFCC").s().p("AmNOwIBkjZIhki4IAA12IHAAAIAAHCIjbAAIAABHIG8gXIggpEIB2gHIAkKwIo2AgIAAL5IBkC+IhkDZg");
	this.shape_27.setTransform(144.9,350.3);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#00FFCC").s().p("AmOOyIBkjZIhki4IAA12IHAAAIAAHCIjbAAIAABHIG8gjIgwo5IB3gJIA2KlIo5AuIAAL5IBkC+IhkDZg");
	this.shape_28.setTransform(145,350.1);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#00FFCC").s().p("AmPO0IBkjZIhki4IAA12IHAAAIAAHCIjbAAIAABHIG8guIg/owIB2gMIBIKbIo7A9IAAL5IBkC+IhkDZg");
	this.shape_29.setTransform(145.1,349.9);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#00FFCC").s().p("AmQO2IBkjZIhki4IAA12IHAAAIAAHCIjbAAIAABHIG8g7IhPomIB1gMIBaKRIo8BKIAAL5IBkC+IhkDZg");
	this.shape_30.setTransform(145.2,349.7);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#00FFCC").s().p("AmQO1IBkjaIhki4IAA12IHAAAIAAHCIjaAAIAABIIG8gxIhCovIB2gLIBLKZIo7BAIAAL4IBkC/IhkDZg");
	this.shape_31.setTransform(145.1,349.9);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#00FFCC").s().p("AmPOzIBkjZIhki5IAA12IHAAAIAAHCIjaAAIAABIIG8gnIg1o2IB2gKIA8KiIo5AzIAAL5IBkC+IhkDZg");
	this.shape_32.setTransform(145,350);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#00FFCC").s().p("AmOOxIBkjZIhki4IAA12IHAAAIAAHCIjaAAIAABHIG7gcIgno/IB2gIIAtKqIo3AnIAAL5IBkC+IhkDZg");
	this.shape_33.setTransform(145,350.2);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#00FFCC").s().p("AmNOwIBkjaIhki4IAA12IHAAAIAAHCIjaAAIAABIIG7gTIgapIIB2gGIAeKyIo1AdIAAL4IBkC/IhkDZg");
	this.shape_34.setTransform(144.9,350.4);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#00FFCC").s().p("AmMOuIBkjZIhki5IAA12IHAAAIAAHCIjaAAIAABIIG7gJIgNpPIB2gFIAPK7IozAQIAAL5IBkC+IhkDZg");
	this.shape_35.setTransform(144.8,350.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3}]}).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_3}]},6).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_12}]},17).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_12}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(9).to({_off:false},0).to({_off:true},6).wait(6).to({_off:false},0).to({_off:true},1).wait(6).to({_off:false},0).wait(17).to({_off:true},1).wait(43).to({_off:false},0).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_25).wait(56).to({_off:false},0).to({_off:true},1).wait(10).to({_off:false},0).wait(11).to({_off:true},1).wait(11));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(555,278,725.5,416.8);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;