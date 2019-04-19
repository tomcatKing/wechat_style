$(function(){
	const prefix_url="http://localhost:8080/wechat/";

	function getUrl(url){
		return prefix_url+url;
	}

	$.urls={
		user_code_url:getUrl("user/code"),
		user_info_url:getUrl("user/info"),
		user_login_url:getUrl("user/login"),
		user_logout_url:getUrl("user/logout"),
		order_list_url:getUrl("manage/order/list"),
		order_detail_url:getUrl("manage/order/detail"),
		food_list_url:getUrl("manage/food/list"),
		food_detail_url:getUrl("manage/food/detail"),
		food_add_url:getUrl("manage/food/add"),
		food_update_url:getUrl("manage/food/update")
	}

});