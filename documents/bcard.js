var sArray = new Array();
var fA = new Array();//figure
var cA = new Array();//color
var pA = new Array();//position
var sA = new Array();
var s = 2.5;
var f = { w:257.95,	h:155.91 };
var m = 9;
var mw = f.w * s;
var same = true;
var bctx,ctr;
var vr = [];
var vp = [];
var is_b = false;
var fontA = new Array();
var radian = Math.PI;
var nColor;

var screen = document.getElementById("screen");

function main(){

	screen = document.getElementById("screen");
	var canvas = document.getElementById("mycanvas");
	var ctx = canvas.getContext('2d');
	ctx.lineWidth = '2px';
	ctx.strokeStyle = "lime";
	ctx.strokeRect(0,0,(f.w+m*2)*s,(f.h+m*2)*s);
	ctx.strokeStyle = "red";
	ctx.strokeRect(m*s,m*s,f.w*s,f.h*s);

	var initL = document.forms.fm.width.value = 100;
	var initH = document.getElementById("height");
	initH.value = initL;

	createFontArray();
	$(".draw").css({
		"display" 	: "inline"
	});
}

function addCanvas(width,height,classname){
	var ws = document.getElementById("ws");

	var id = 'canvas'+(screen.getElementsByTagName('canvas').length).toString();
	$('#screen').append(
		$('<canvas></canvas>')
			.attr('id',id)
			.attr('width',width)
			.attr('height',height)
			.attr('class',classname)
		);
	var canvas = document.getElementById(id);
	if(!canvas || !canvas.getContext)return null;
	return canvas;
}
function initContext(canvas,context){
		var text  = document.forms.fm.x.value;
		var f  = document.forms.fm.font.label;
		if(!f)f = 'MS Pゴシック';
		context.fillStyle = "white";
		var x = 25;
		var y = canvas.height/2 + 8;
		context.fillStyle = nColor;
		context.fillText(text,x,y);
	$(canvas).draggable({
		containment 	: 	'#screen',
		scroll 	: false, 
	});
	}
	function addRect(){
		var width = document.forms.fm.width.value;
		if(!width /*|| width.i*/){
			width=100;
		}
		var height = document.forms.fm.height.value;
		if(!height)height=100;
		var canvas = addCanvas(width,height,"rect");
		if(!canvas)return false;
		var context = canvas.getContext('2d');
		context.beginPath();
		context.fillStyle = nColor;
		context.fillRect(0,0,width,height);
		$(canvas).draggable({
		containment 	: 	'#screen',
		scroll 	: false, 
		});
		fA.push("createRect(");
	}
	function addEllipse(){
		var width = document.forms.fm.width.value;
		var height = document.forms.fm.height.value;
		var canvas = addCanvas(width,height,"ellipse");
		if(!canvas)return false;
		var cx = width/2;
		var cy = height /2;
		var context = canvas.getContext('2d');
		context.beginPath();
		context.moveTo(-cx,-cx);
		context.arc(width/2,width/2,width/2,0,Math.PI*2,false);
		context.fillStyle = nColor;
		var cd = colorToL(c,m,ye,k);
		context.fill();
		context.closePath();
			$(canvas).draggable({
		containment 	: 	'#screen',
		scroll 	: false, 
		});
		fA.push("create(");
	}
	function addStar(){
		var width = document.forms.fm.width.value;
		var height = document.forms.fm.height.value;
		var canvas = addCanvas(width,height,"ellipse");
		if(!canvas)return false;
		var context = canvas.getContext('2d');
		context.beginPath();
		context.fillStyle = nColor;
		var cd = colorToL(c,m,ye,k);
		//star draw
		context.fill();
		context.closePath();
			$(canvas).draggable({
		containment 	: 	'#screen',
		scroll 	: false, 
	});
	}
	function setLength(isWidth){
		var width = document.forms.fm.width.value;
		var height = document.forms.fm.height.value;
		if(same){
			if(!width && isWidth)height=width;
			if(!height && isWidth)width=height;
		}
		if(width)width=100;
		if(height)height=100;
}
	function getPosition(){
		var s = document.getElementById("screen");//div
		var elements = s.getElementsByTagName('canvas');//div->canvas群
		var i;
		for(i=1;i<=elements.length-1;i++){
			var e = 'canvas'+i;
			var ele = document.getElementById(e);
			var rect = ele.getBoundingClientRect();
			var x = rect.left-30;
			var y = rect.top+62;
			var sc = toJsx(x,y);
			pA.push(sc);
			//createFile("あなたの名刺.jsx");
			cA.push(getColor(e));
		}
		createFile("あなたの名刺.jsx");
		//return '('+x+','+y+',' ;
	}
	function toJsx(x,y){
		var script = x+','+y+',';
		console.log(script);
		//addScript(pA,script);
		return script;
	}
	function createFile(fileName){
		var content = setScript();
		var i;
		var a = document.getElementById('a');
		var URL = "data:application/octet-stream,"+encodeURIComponent(content);
		a.download = fileName;
		a.href = URL;
		a.innerHTML = "右クリックで保存してください";
	}
	//
function jsByte2Hex(n) {
        var r=n.toString(16);
        return (r.length>1)?r:'0'+r;
}
function jsCMYK2RGB(c,m,y,k) {
        var r,g,b;
        c=c/100;
        m=m/100;
        y=y/100;
        k=k/100;
        r=Math.round((1-Math.min(1,c*(1-k)+k))*255);
        g=Math.round((1-Math.min(1,m*(1-k)+k))*255);
        b=Math.round((1-Math.min(1,y*(1-k)+k))*255);
        return '#'+jsByte2Hex(r)+jsByte2Hex(g)+jsByte2Hex(b);
}
function jsRGB2CMYK(r,g,b) {
        var c,m,y,k;
        k=Math.min(1-r/255,Math.min(1-g/255,1-b/255));
        c=Math.round(((1-(r/255)-k)/(1-k))*100);
        m=Math.round(((1-(g/255)-k)/(1-k))*100);
        y=Math.round(((1-(b/255)-k)/(1-k))*100);
        k=Math.round(k*100);
        return [c,m,y,k];
}
//
function getCMYKColor(){
	var c = document.forms.fm.c.value;
	if(!c)c=0;
	var m = document.forms.fm.m.value;
	if(!m)m=0;
	var ye = document.forms.fm.ye.value;
	if(!ye)ye=0;
	var k = document.forms.fm.k.value;
	if(!k)k=0;
	var color = jsCMYK2RGB(c,m,ye,k);
	var  cScript = colorToL(c,m,ye,k);
	return color;
}
function getRGBColor(){
	var r = document.forms.fm.r.value;
	if(!r)r=255;
	var g = document.forms.fm.g.value;
	if(!g)g=255;
	var b = document.forms.fm.b.value;
	if(!b)b=255;
	var color = '#'+rgbCode(r)+rgbCode(g)+rgbCode(b);
	setColor(color);
	return color;
}
function rgbCode(x){
	return parseInt(x).toString(16);
}
function colorToL(c,m,y,k){
	var colorL = c+','+m+','+y+','+k;
	cA.push(colorL);
	return colorL;
}
function back(){
	var canvas = document.getElementById("mycanvas");
	var ctx = canvas.getContext('2d');
	ctx.fillStyle = nColor;
	ctx.fillRect(0,0,(f.w+m*2)*s,(f.h+m*2)*s);
	main();
	document.forms.fm.reset();
	setColor();
	fA.push("setBackColor(");
	//backScirpt();
}
function setColor(isRgb){
	var cc = document.getElementById("cResult");
	var cctx = cc.getContext('2d');
	if(isRgb){
		nColor = getRGBColor();
		cctx.fillStyle = nColor;
	}else{
		nColor = getCMYKColor();
		cctx.fillStyle = nColor;
	}
	cctx.fillRect(0,0,1000,1000);
}

function addScript(){
		var script;
		var elements = screen.getElementsByTagName('canvas');
		var i;
		for(i=1;i<=elements.length-1;i++){
			var e = 'canvas'+i;
			var ele = document.getElementById(e);
			var cname = ele.getAttribute("class");
			switch(cname){
				case "rect":
					script = "createRect(";
					//get
					break;
				case "ellipse":
					script = "createEllipse(";
					break;
			}
			pA.push(script);
		}
}
function createSArray(){
	var scr="";
	var i ;
	for(i=0;i<pA.length;i++){
		scr += fA[i];
		scr += pA[i];
		scr += sA[i];
		scr += createPart(cA);
		scr += "); \n\ ";
	}
	scr += "\n\n\n\";
	return scr;
}
function setScript(){
	var wscr = "\
	#target illustrator\n\
	var setting = {'name':'[name]','affliation':'[affliation]',\n\
	contact:'[contact]',\n\
	toLaser:false,};\n\
	var dPos = {'x':120,'y':180,'w':320,'h':480};\n\
	var d = {x:20,y:200,w:150,h:40,s:40};\n\
	var dlg = new Window('dialog','所属と名前',[dPos.x,dPos.y,dPos.x+dPos.w,dPos.y+dPos.h]);\n\
	dlg.name = dlg.add('statictext',[d.x,20,d.x+d.s,60],'名前');\n\
	dlg.nameField = dlg.add('edittext',[100,20,250,60],setting.name);\n\
	dlg.aff = dlg.add('statictext',[20,65,80,105],'所属');\n\
	dlg.affField = dlg.add('edittext',[100,65,250,105],setting.affliation);\n\
	dlg.cont = dlg.add('statictext',[20,110,80,150],'連絡先');\n\
	dlg.contField = dlg.add('edittext',[100,110,250,150],setting.contact);\n\
	dlg.checkLaser = dlg.add('checkbox',[20,150,180,180],'レーザー');\n\
	dlg.okButton = dlg.add('button',[dPos.w-130,dPos.h-50,dPos.w-10,dPos.h-10],'実行',{name:'ok'});\n\
	dlg.show();\n\
	dlg.okButton.onClick = apply();\n\
	var colorSetting = DocumentColorSpace.CMYK;\n\
	if(setting.toLaser ) colorSetting = DocumentColorSpace.RGB;\n\
	var doc = app.documents.add(colorSetting,841.89,595.28);\n\
	var formatLayer = doc.layers.add();\n\
	var format= formatLayer.pathItems;\n\
	formatLayer.name = 'フォーマット';\n\
	var f ={\n\
	x:(activeDocument.width-257.95)/2,\n\
	y:(activeDocument.height-155.91)-50,\n\
	w:257.95,h:155.91\n\
	};\n\
	var fRect = format.rectangle(f.y,f.x,f.w,f.h);\n\
	var rX = f.x;\n\
	var rY = f.y;\n\
	var rW= f.w;\n\
	var rH = f.h;\n\
	var h = f.h;\n\
	var mm = 72/25.4;\n\
	var s = 9;\n\
	var b = 34.5;\n\
	";/*var trimData = [[[rX+rW/2-mm*13,rY+mm*6.75],[rX+rW/2+mm*13,rY+mm*6.75]],\n\
	[[rX+rW/2,rY+mm*4.5],[rX+rW/2,rY+mm*13]],\n\
	[[rX+rW/2-mm*13,rY-h-mm*6.75],[rX+rW/2+mm*13,rY-h-mm*6.75]],\n\
	[[rX+rW/2,rY-h-mm*4.5],[rX+rW/2,rY-h-mm*13]],\n\	
	[[rX,rY+b],[rX,rY+s],[rX-b,rY+s]],\n\
	[[rX-s,rY+b],[rX-s,rY],[rX-b,rY]],\n\
	[[rX+rW,rY+b],[rX+rW,rY+s],[rX+rW+b+0.5,rY+s]],\n\
	[[rX+rW+s,rY+b],[rX+rW+s,rY],[rX+rW+b,rY]],\n\
	[[rX,rY-rH-34],[rX,rY-rH-9],[rX-34,rY-rH-9]],\n\
	[[rX-34,rY-rH],[rX-9,rY-rH],[rX-9,rY-rH-34]],\n\
	[[rX+rW+34,rY-rH],[rX+rW+9,rY-rH],[rX+rW+9,rY-rH-34]],\n\
	[[rX+rW+34,rY-rH-9],[rX+rW,rY-rH-9],[rX+rW,rY-rH-34]],\n\
	[[rX-19,rY-rH/2+35],[rX-19,rY-rH/2-35]],\n\
	[[rX-36,rY-rH/2],[rX-11,rY-rH/2]],\n\
	[[rX+rW+19,rY-rH/2+35],[rX+rW+19,rY-rH/2-35]],\n\
	[[rX+rW+36,rY-rH/2],[rX+rW+11,rY-rH/2]],\n\
	];\n\*/
	wscr += "\
	var actD = activeDocument.pathItems;\n\
	makeTrim(trimData,actD);\n\
	var trim;\n\
	function makeTrim(trimData,actD){\n\
	if(setting.toLaser) return;\n\
	for(var i =0;i<trimData.length;i++){\n\
	for(var j=0;j<trimData[i].length-1;j++){\n\
	trim= actD.add();\n\
	trim.setEntirePath([trimData[i][j],trimData[i][j+1]]);\n\
	trim.strokeWidth = 0.3;\n\
	trim.strokeColor = setCMYKColor(100,100,100,100);\n\
	}\n\
	}\n\
	}\n\
	var fLayer =doc.activeLayer;\n\
	var canvas = doc.layers.add();\n\n\n\n\
	";
	//scriptを入れる
	wscr += createSArray();

	wscr += "\
	var i;\n\
	for(i=0;i<sArray.length;i++){\n\
	var script = sArray.shift();\n\
	wscr += script;\n\
	}\n\
	var nObj ;\n\
	createTextObj(nObj,setting.name,17,257.95/2,70,'Chalkduster',5);\n\
	var affObj ;\n\
	createTextObj(affObj,setting.affliation,10,28,30,'Chalkduster',-5);\n\
	var cObj ;\n\
	createTextObj(cObj,setting.contact,8,55,130,'Chalkduster',-5);\n\
	app.activeDocument.selection = fRect;\n\
	aScale = 250;\n\
	if ( documents.length > 0 ){\n\
	activeDocument.views[0].zoom = aScale * 0.01\n\
	}\n\
	function apply(){\n\
	dlg.close();\n\
	bind();\n\
	}\n\
	function bind(){\n\
	setting.name = dlg.nameField.text;\n\
	setting.affliation = dlg.affField.text;\n\
	setting.contact = dlg.contField.text;\n\
	setting.toLaser = dlg.checkLaser.value;\n\
	}\n\
	";
	/*function setBackColor(c,m,y,k){\n\
		var layerObj = doc.activeLayer;\n\
		var path = layerObj.pathItems;\n\
		var pObj = layerObj.pathItems.rectangle(f.y+9,f.x-9,f.w+9*2,f.h+9*2);\n\
		pObj.filled = true;\n\
		pObj.stroked = false;\n\
	if(setting.toLaser) pObj.fillColor = setRGBColor(255,255,255);\n\
	else pObj.fillColor = setCMYKColor (c,m,y,k);\n\
	}\n\
	*/
	wscr += "\
	function setCMYKColor(c,m,y,k){\n\
	if(setting.toLaser){\n\
	if(k>0)return setRGBColor(0,0,0);\n\
	return setRGBColor (255 ,255, 255);\n\
	}\n\
	var tmpColor = new CMYKColor();}\n\
	";
	/*tmpColor.cyan = c;\n\
		tmpColor.magenta = m;\n\
		tmpColor.yellow = y;\n\
		tmpColor.black = k;\n\
		return tmpColor;\n\
		}\n\
	function setRGBColor(r,g,b){\n\
		var tmpC = new RGBColor();\n\
		tmpC.red = r;\n\
		tmpC.green = g;\n\
		tmpC.blue = b;\n\
		return tmpC;\n\
		}\n\
	function createObj(s){\n\
		var a = doc.textFrames.add();\n\
		a.contents = s;\n\
	}\n\
	function makeOutline(obj){\n\
			if(obj.typename == 'TextFrame'){\n\
			 obj.createOutline();\n\
			}\n\
		}\n\
	function setFont(fontN,nObj){\n\
		var fName = app.textFonts[fontN];\n\
		nObj.paragraphs[0].characterAttributes.textFont = fName;\n\
	}\n\
	function createTextObj(obj,what,s,center,y,fontN,r){\n\
		var obj = doc.textFrames.add();\n\
		obj.contents = what;\n\
		obj.paragraphs[0].size = s;\n\
		var x = setLocate(what,s,center);\n\
		obj.translate(f.x+x,f.y-y);\n\
		setFont(fontN,obj);\n\
		obj.rotate(r,true,true,true,true,Transformation.CENTER);\n\
		makeOutline(obj);\n\
		}\n\*/

	wscr += "\
	function createRect(x,y,w,h,r,c,m,ye,k){\n\
	var rect = doc.pathItems.rectangle(f.y+y,f.x+x,w,h);\n\
	rect.filled = true;\n\
	rect.fillColor = setCMYKColor(c,m,ye,k);\n\
	rect.stroked = false;\n\
	rect.rotate(r,true,true,true,true,Transformation.CENTER);\n\
	}\n\
	";
	/*function setColor(obj,c,m,y,k){\n\
			activeDocument.defaultFillColor = setCMYKColor(c,m,y,k);\n\
			}\n\
	function createPolygon(path,x,y,r,n,c,m,ye,k,o,ro){\n\
		var ppo = path.polygon(f.x+x,f.y-y,r,n);\n\
		ppo.fillColor = setCMYKColor(c,m,ye,k);\n\
		ppo.strokeColor = setCMYKColor(c,m,ye,k+30);\n\
		ppo.opacity = o;\n\
		ppo.rotate(ro,true,true,true,true,Transformation.RIGHT);\n\
		}\n\
	function createPath(){\n\
		return activeDocument.pathItems;\n\
		}\n\
	function setObjColor(path,c,m,y,k){\n\
		if(setting.toLaser) return;\n\
		path.fillColor = setCMYKColor(c,m,y,k);\n\
		}\n\
		function setBrush(actD){\n\
		var selObj  = actD.selection;\n\
		actD.brushes['モップ'].applyTo(selObj);\n\
		}\n\
	function setLocate(what,s,x){\n\
	var start = x-(what.length/2)*s;\n\
		return start;\n\
	}\n\*/
	//wscr.push(sArray);
	return wscr;
}

function baackScript(){

	return script;
}
function getRotate(){
	var r = document.getElementById("angle").value;
	return r;
}
function createFontArray(){
	var i = 0;
	//for(i=0;i<fA.length;i++){
	$('#fonts').append(
		$('<option><option>')
		.attr('id',i)
		.attr('value',i)
		.attr('label',fontA[i])
	);
}
function setFSample(){
	var font = document.forms.fm.fonts.selected;

}
function getColor(eid){
	var id = "."+ eid;
	var color = $(id).css("background-color");
	color
	return color;
}
function setScale(){
	var ss = $("#width").val() + ',' + $("#height").val();
	sA.push(ss);
	return ss;
}
function createPart(array){
	var part =  array.shift();
	if(part===undefined){
		return "";
	}
	else return part;
}





