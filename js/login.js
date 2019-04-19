$(function(){
	//获取验证码事件
	$(".getcode").on('click',getCode);

	function getCode(e){
		//触发请求
		var url=$.urls.user_code_url;
		console.log(url);
		$.network.network_get({
			url:url,
			success:function(res){
				
			}
		});
		var that=$(this);
		that.css('background-color',"#ccc");
		var count=60;
		that.off('click');
		var timer=setInterval(function(){
			count--;
			that.text(count+"秒后重新获取");
			if(count<=0){
				that.css('background-color',"#2db7f5").html("获取验证码");
				that.on('click',getCode);
				clearInterval(timer);
			}
		},1000);
	}



	$(".login-btn").click(function(){
		var user_name=$("#username").val();
		user_name==""?user_name="":user_name=user_name.trim();
		var pass_word=$("#password").val();
		pass_word==""?pass_word="":pass_word=pass_word.trim();
		if(user_name==="" || pass_word===""){
			alert("请保证用户名和验证码的完整性!!");
		}
		console.log(user_name+","+pass_word);
		var url=$.urls.user_login_url;
		$.network.network_get({
			url:url,
			data:{
				user_name:user_name,
				pass_word:pass_word
			},
			success:function(res){
				if(res.msg==="ok"){
					alert("登录成功!");
					$(".user-name").text(res.data.user_name);	
					$(".body").hide();
					$("#index").show();
					$.util.get_food({
						pageNum:1,
						pageSize:10
					});
				}else{
					alert(res.msg);
				}
			}
		})
	});
});