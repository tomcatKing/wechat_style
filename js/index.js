$(function(){
	//获取用户信息
	var food_list_url=$.urls.food_list_url;
	var urer_info_url=$.urls.user_info_url;

	//获取用户信息
	$.network.network_get({
		url:urer_info_url,
		success:function(res){
			if(res.code===400){
				//用户未登录
				$(".body").hide();
				$("#login").show();

			}else{
				$(".user-name").text(res.data.user_name);
				$.util.get_food({
					pageNum:1,
					pageSize:10
				});
			}
		}
	});



});