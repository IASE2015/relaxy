var config = {
	extended_width : 120,
	retracted_width : 80,
	side_html : String()
				+ '<div id="archive" class="menu_item">過去の予約</div>'
				+ '<div id="favorite" class="menu_item">お気に入り</div>'
				+ '<div id="history" class="menu_item">閲覧履歴</div>'
				+ '<div id="setting" class="menu_item">設定</div>',
	msg_html : String()
				+ '<br>'
				+ '<div>送信フォーム</div>'
				+ '<textarea id="msg" style="width:300px;height:200px;">',
	course_html : String()
				+ '',
	tag_html 	: String()
				+'<div class="tag"><div>', 
				
}

function main(){
	addTag();
	setTag();
	$('#message').bind('click',addMsgForm);
}

function setIcon(src){
	$("#icon").attr(
		'src',src
		);
}

function setTag(){
	$(".tag")
		.css({
		'background-color'	: '#0ee0ce',
		'color' 	: '#ffffff', 
		'border-radius'	: '20px', 
		});
}
function addTag(){
	$(".tag_list").append(
		$('<div></div>')
			.attr('class','tag')
			);
}
function setTime(){

}
function reBindClickMsg(){
	$('#message').unbind('click');
	$('#message').bind('click',sendForm);
}
function addMsgForm(){
	reBindClickMsg();
	$("#detail").append(config.msg_html);
	$("")
}
function toggleMenu(){
	var menu_width = $("#side_menu").width();
	var $side = $("#side_menu");
	if(menu_width === config.retracted_width){
		$side
			.animate({ width : config.extended_width });
			return true;
	}
	else if(menu_width === config.extended_width){
		$side 
			.animate({ width : config.retracted_width });
			return true;
	}
	return false;
}
function onMenuSlider(event){
	toggleMenu();
	return false;
}
function sendForm(){

}
function addCourse(){
	for(var i=0;i<3;i++){
		$('#course').append(

			);
	}
}