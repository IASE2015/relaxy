var is_login = false;
var is_used = false;

var config = {
	extend_width	: 100,
	retracted_width 	: 20,
	side__html 	: String()
				+ '<div id="archive" class="menu_item">過去の予約</div>'
				+ '<div id="favorite" class="menu_item">お気に入り</div>'
				+ '<div id="history" class="menu_item">閲覧履歴</div>'
				+ '<div id="setting" class="menu_item">設定</div>',
	list_html 	: String()
				+ '<div class="list_item">'
				+ '<div class="course">コース</div>'
				+ '<div class="pro">名前</div>'
				+ '<img class="icon"></img>'
				+ '<div class="qua">資格</div>'
				+ '<div class="price dt">値段</div>'
				+ '<div class="time dt">時間</div>'
				+ '<div class="detail">詳しく見る</div>'
				+ '</div>'
	/*list_css 	: String()
				+ '{ border-radius:5px;',*/


};
var $side_menu;

function main(){
	if(!is_used){
		mordalShow();
	}
	else{
		mordalHide();
	}
	$(window).resize(centeringMordal());
	setList();
}
function selectType(is_user){//p->false u->true
	if(is_user){//is_userではなくis_usedでチェック?
		mordalHide();
	}
	$('#user_type').hide();
	$('#login').fadeIn("slow");
}
function toggleMenu(){
	var menu_width = $("#side_menu").width();
	var $side = $("#side_menu");
	if(menu_width === config.retracted_width){
		$side
			.animate({ width : config.extend_width });
		$('#side_menu').append(config.side__html);
			return true;
	}
	if(menu_width === config.extend_width){
		$side
			.animate({ width : config.retracted_width });
		$('.menu_item').remove();
			return true;
	}
}
function onClickSlider(event){
	toggleMenu();
	return false;
}
function mordalShow(){
	$(this).blur();
	$('body').append(
		$('<div></div>').attr('id','mordal-over')
		);
	$('#mordal-over').css({
		"z-index" 	:	1,
		"position" 	:	"fixed",
		"top"	:	0,
		"left" 	:	0,
		"width" 	:	"100%",
		"height" 	:	"120%",
		"background-color" :	"rgba(255,255,255,0.75)"
	});
	centeringMordal();
	$("#mordal").fadeIn("slow");
}
function centeringMordal(){
	var w = $(window).width();
	var h = $(window).height();
	var cw = $("#mordal").outerWidth({ margin : true });
	var ch = $("#mordal").outerHeight({ margin : true });
	var pxleft = ((w-cw)/2);
	var pxtop = ((h-ch)/2);
	$("#mordal").css({ "left" : pxleft + "px","top" : pxtop + "px" });
}
function mordalHide(){
	$(".mordal").fadeOut("slow",function(){
		$("#mordal-over").remove();
	});
}
function setList(){
	$("#main_content").append($(config.list_html));
	$('.list_item').css({
		'border-radius':'5px',
		'border' : 'solid 1px #999999',
		'margin' : '3px',
		'width'  : '150px'
	});
	$('.price').css({
		'color' 	: "#888888", 
		'float' 	: "left",

	});
	$('.time').css({
		'color' 	: "#888888", 
				'marign' 	: "3px" 
	});
	$('.detail').css({
		'border-radius' 	: "#888888", 
		'position' : 'relative'
	});

}
function backUType(){
	$("#login").hide();
	$("#user_type").fadeIn("slow");
}
