$(function(){
	//点击上一页触发事件
	$(".prev_food").click(function(){
		$.util.prev_page_food();
	});

	//点击下一页触发事件
	$(".next_food").click(function(){
		$.util.next_page_food();
	});

	//编辑美食详情
	$(".food-table").on('click','.food-edit',function(){
		$(".body").hide();
		$(".food-edit-manager").show();
		$.util.food_edit(parseInt($(this).attr('data-id')));
		console.log("编辑美食详情事件触发");
	});

	//查看美食详情
	$(".food-table").on('click','.food-show',function(){
		$(".body").hide();
		$(".food-detail").show();
		$.util.food_detail(parseInt($(this).attr('data-id')));
		console.log("显示美食详情事件触发");
	});

	//隐藏美食详情,显示美食列表
	$(".food-detail").on('click','.food-after-btn',function(){
		$.util.back_food();
	});

	//隐藏修改美食,显示美食列表
	$(".food-edit-manager").on('click',".food-back-btn",function(){
		$.util.back_foodByEdit();
	});

	//添加商品
	$(".food-add").click(function(){
		$(".body").hide();
		$(".food-add-manager").show();
	});

	$(".add-after-btn").click(function(){
		$(".food-add-manager").hide();
		$("#index").show();
	});

	//更新美食信息
	$(".food-edit-manager").on('click','.food-update-btn',function(){
		var food_id=parseInt($(this).attr('data-id'));
		var food_name=$(".update_food_name").val();
		var food_detail=$(".update_food_detail").val();
		var food_price=parseFloat($(".update_food_price").val());
		var food_img=$(".update_food_img").val();
		var food_type=parseInt($(".update_food_type").val());
		var food_status=parseInt($(".update_food_status").val());
		
		var data={};
		data.food_id=food_id;
		if(food_name!=null && food_name.trim()!==""){
			data.food_name=food_name;
		}
		if(food_detail!=null && food_detail.trim()!==""){
			data.food_detail=food_detail;
		}
		if(food_price!=null && food_price>0 && food_price!==""){
			data.food_price=food_price;
		}
		if(food_img!=null && food_img.trim()!==""){
			data.food_img=food_img;
		}
		if(food_status!=null && food_status>0 && food_status<5){
			data.food_type=food_type;
		}
		if(food_status!=null && food_status>0 && food_status <4){
			data.food_status=food_status;
		}
		var params={};
		params.data=data;
		//发送请求
		$.util.update_food(params);
	});


	//添加美食信息
	$(".food-add-btn").click(function(){
		var food_name=$(".add_food_name").val();
		food_name==""?food_name="":food_name=food_name.trim();

		var food_detail=$(".add_food_detail").val();
		food_detail==""?food_detail="":food_detail.trim();

		var food_price=parseFloat($(".add_food_price").val());
		food_price<=0 ?food_price=0 : food_price=food_price; 

		var food_img=$(".add_food_img").val();
		food_img==""?food_img="":food_img=food_img.trim();

		var food_type=parseInt($(".add_food_type").val());
		food_type<=0 ? food_type=0 : food_type=food_type;

		//检查输入是否合法
		if(food_name=="" || food_detail=="" || food_price<=0 || food_img=="" || food_type>4 || food_type<1){
			alert("输入值不合法!!");
			return;
		}

		//发送请求
		var add_food_url=$.urls.food_add_url;
		$.network.network_post({
			url:add_food_url,
			data:{
				food_name:food_name,
				food_detail:food_detail,
				food_price:food_price,
				food_img:food_img,
				food_type:food_type
			},
			success:function(res){
				if(res.code===400){
					alert(res.msg);
				}else{
					alert("添加商品成功");
				}
			}
		});
	});

	//模糊搜索食物
	$(".food-sh-btn").click(function(){
		var search_title=$(this).prev().val();
		if(search_title==="" && search_title.trim() ===""){
			return;
		}else{
			$.util.search_food_url({
				keyword:search_title,
				pageNum:1,
				pageSize:10
			});
		}
	});
});