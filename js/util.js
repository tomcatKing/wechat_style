$(function(){
	//请求食物列表
	var food_list_url=$.urls.food_list_url;

	//定义一个food数组
	var food={
		pageNum:0,
		pageSize:0,
		list:[]
	}

	function getFoods(data){
		$.network.network_get({
			url:food_list_url,
			data:data,
			success:function(res){
				food.pageNum=res.data.pageNum,
				food.pageSize=res.data.pages,
				food.list=res.data.list;
				_initFood(food);
			}
		});
	}

	//获取美食详情
	function _detail(params){
		var food_id=params;
		var foodList=food.list;
		for(var index=0;index<foodList.length;index++){
			var cur=foodList[index];
			if(cur.food_id==food_id){
				$(".food-detail").html('<div class="food-detail-title">商品详情</div><div class="food-detail-line"><div class="food-detail-bt">商品名称</div>'+
			'<div class="food-detail-txt">'+cur.food_name+'</div></div><div class="food-detail-line">'+
			'<div class="food-detail-bt">商品描述</div><div class="food-detail-txt">'+cur.food_detail+'</div></div><div class="food-detail-line">'+
			'<div class="food-detail-bt">商品状态</div><div class="food-detail-txt">'+cur.food_status+'</div></div><div class="food-detail-line">'+
			'<div class="food-detail-bt">商品价格</div><div class="food-detail-txt">'+cur.food_price+'</div></div><div class="food-detail-line">'+
			'<div class="food-detail-img">商品图片</div><div><img src="'+cur.food_img+'"/></div></div><div class="food-detail-line">'+
			'<div class="food-detail-bt">商品销量</div><div class="food-detail-txt">'+cur.food_count+'</div></div><div class="food-detail-line">'+
			'<div class="food-detail-bt">商品类型</div><div class="food-detail-txt">'+cur.food_type+'</div></div><div class="after-btn food-after-btn" >返回上页</div>');
			}
		}
	}

	//更新美食详情
	function _update(params){
		var update_food_url=$.urls.food_update_url;
		$.network.network_post({
			url:update_food_url,
			data:params.data,
			success:function(res){
				if(res.code===200){
					alert("数据更新成功!!,请重新刷新页面");
				}
			}
		});
	}

	//隐藏美食详情,显示美食列表
	function _backfood(){
		$(".food-detail").hide();
		$("#index").show();
	}

	//隐藏美食编辑,显示美食列表
	function _editfood(){
		$(".food-edit-manager").hide();
		$("#index").show();
	}

	//初始化美食编辑
	function _edit(params){
		var food_id=params;
		var foodList=food.list;
		for(var index=0;index<foodList.length;index++){
			var cur=foodList[index];
			if(cur.food_id==food_id){
				$(".food-edit-manager").html('<div class="food-manager-title">商品管理--修改商品<small style="font-size:15px">(数据为空表示不修改)</small></div><div class="food-manager-item"><div class="food-manager-item-txt">商品名称</div><div class="food-manager-item-input"><input type="text" class="update_food_name" value="'+cur.food_name+'" placeholder="请输入商品名称" /></div></div><div class="food-manager-item"><div class="food-manager-item-txt">商品描述</div><div class="food-manager-item-input"><input class="update_food_detail" type="text" value="'+cur.food_detail+'" placeholder="请输入商品描述" /></div></div><div class="food-manager-item"><div class="food-manager-item-txt">商品价格</div><div class="food-manager-item-input"><input type="number" class="update_food_price" min="1" max="100" value="'+cur.food_price+'" placeholder="请输入商品价格" /></div></div><div class="food-manager-item"><div class="food-manager-item-txt">商品图片</div><div class="food-manager-item-input"><input type="text" value="'+cur.food_img+'" class="update_food_img" placeholder="请输入商品图片链接" /></div></div><div class="food-manager-item"><div class="food-manager-item-txt">商品类型</div><div class="food-manager-item-input"><input type="number" min="1" max="4" class="update_food_type" value="'+cur.food_type+'" placeholder="对应美食分类:1-甜食,2-瓜果,3-蛋糕,4-饮料" /></div></div><div class="food-manager-item"><div class="food-manager-item-txt">商品状态</div><div class="food-manager-item-input"><input type="number" min="1" max="4" class="update_food_status" value="'+cur.food_status+'" placeholder="商品状态:1-在售,2-下架,3-删除" /></div></div><div class="food-update-btn" data-id="'+cur.food_id+'">修改商品</div><div class="after-btn food-back-btn">返回上页</div>');
			}
		}
	}

	//初始化食物列表
	function _initFood(params){
		var foodList=params.list;
		foodList.length>0 ? $(".food-table").html("<tr><th>美食id</th><th>美食名称</th><th>美食价格</th><th>"+
			"美食状态</th><th>相关操作</th><th>相关操作</th></tr>") :"";
		for(var index=0;index<foodList.length;index++){
			var cur=foodList[index];
			$(".food-table").append("<tr>"+
								"<td>"+cur.food_id+"</td>"+
								"<td>"+cur.food_name+"</td>"+
								"<td>"+cur.food_price+"</td>"+
								"<td>"+cur.food_status+"</td>"+
								"<td class='food-edit' data-id='"+cur.food_id+"'>编辑</td>"+
								"<td class='food-show' data-id='"+cur.food_id+"'>查看</td>"+
							"</tr>");
		}
		$(".pageStart").text(params.pageNum);
		$(".pageEnd").text(params.pageSize);
	}

	//点击上一页
	function prev_page_food(){
		var pageNum=food.pageNum;
		var pageSize=food.pageSize;
		if(pageNum<=1){
			alert("已经是第一页了!!");
			return;
		}
		getFoods({
			pageNum:pageNum-1,
			pageSize:10
		});
		food.pageNum=pageNum-1;
		$(".pageStart").text(food.pageNum);
	}

	//点击下一页
	function next_page_food(){
		var pageNum=food.pageNum;
		var pageSize=food.pageSize;
		if(pageNum>=pageSize){
			alert("已经是最后一页了!!");
			return;
		}
		getFoods({
			pageNum:pageNum+1,
			pageSize:10
		});
		food.pageNum=pageNum+1;
		$(".pageStart").text(food.pageNum);
	}

	//存放订单信息的对象数组
	var order={
		pageNum:0,
		pageSize:0,
		list:[]
	}

	//展示给外部的显示方法
	function _initOrder(params){
		var orderList=params.list;
		orderList.length>0 ? $(".order-table").html("<tr><th>订单号</th><th>收件人</th><th>订单状态</th><th>订单金额</th><th>创建时间</th><th>相关操作</th></tr>") :"";
		for(var index=0;index<orderList.length;index++){
			var cur=orderList[index];
			$(".order-table").append('<tr><td>'+cur.order_no+'</td><td>'+cur.shippingVo.receiver_name+'</td><td>'+cur.status+'</td><td>￥'+cur.payment+'</td><td>'+cur.create_time+'</td><td class="show-order" data-id="'+cur.order_no+'">查看</td></tr>');
		}
		//设置页面展示的页数
		$(".order-pageStart").text(params.pageNum);
		$(".order-pageEnd").text(params.pageSize);

	}

	//初始化订单页面方法
	function getOrders(data){
		var order_list_url=$.urls.order_list_url;
		$.network.network_get({
			url:order_list_url,
			data:data,
			success:function(res){
				order.pageNum=res.data.pageNum,
				order.pageSize=res.data.pages,
				order.list=res.data.list;
				_initOrder(order);
			}
		});
	}

	
	//订单上一页
	function _prev_page_order(){
		var pageNum=order.pageNum;
		var pageSize=order.pageSize;
		if(pageNum<=1){
			alert("已经是第一页了!!");
			return;
		}
		getOrders({
			pageNum:pageNum-1,
			pageSize:10
		});
		order.pageNum=pageNum-1;
		$(".order-pageStart").text(order.pageNum);
	}

	//订单下一页
	function _next_page_order(){
		var pageNum=food.pageNum;
		var pageSize=food.pageSize;
		if(pageNum>=pageSize){
			alert("已经是最后一页了!!");
			return;
		}
		getOrders({
			pageNum:pageNum+1,
			pageSize:10
		});
		order.pageNum=pageNum-1;
		$(".order-pageStart").text(order.pageNum);
	}

	//订单详情
	function _show_order_detail(data){
		var orderList=order.list;
		var order_no=data;
		for(var index=0;index<orderList.length;index++){
			var cur=orderList[index];
			if(cur.order_no===order_no){
				var html_text='<div class="order-detail-title">订单详情</div><div class="order-detail-line"><div class="order-detail-bt">订单号</div><div class="order-detail-txt">'+cur.order_no+'</div>'+
		'</div><div class="order-detail-line"><div class="order-detail-bt">创建时间</div><div class="order-detail-txt">'+cur.create_time+'</div></div><div class="order-detail-line"><div class="order-detail-bt">收件人</div><div class="order-detail-txt">'+cur.shippingVo.receiver_name+'('+cur.shippingVo.receiver_phone+')  &nbsp;&nbsp;'+cur.shippingVo.receiver_province+'省\\'+cur.shippingVo.receiver_city+'市\\'+cur.shippingVo.receiver_district+'区\\'+cur.shippingVo.receiver_address+'</div></div><div class="order-detail-line"><div class="order-detail-bt">订单状态</div><div class="order-detail-txt">'+cur.status+'</div></div><div class="order-detail-line"><div class="order-detail-bt">支付方式</div><div class="order-detail-txt">'+cur.payment_type+'</div>'+
		'</div><div class="order-detail-line"><div class="order-detail-bt">订单金额</div><div class="order-detail-txt">'+cur.payment+'</div></div>';

				html_text=html_text+'<table><tr><th>商品图片</th><th>商品信息</th>'+
				'<th>商品单价</th><th>购买数量</th><th>商品总价</th></tr>';

				var order_items=cur.orderItemList;
				for(var i=0;i<order_items.length;i++){
					var orderItem=order_items[i];
					html_text=html_text+'<tr><td><img src="'+orderItem.food_img+'"/></td><td>'+orderItem.food_name+'</td><td>￥'+orderItem.food_price+'</td><td>'+orderItem.food_num+'</td><td>￥'+orderItem.total_price+'</td></tr>';
				}

				html_text=html_text+'</table><div class="after-btn order-detail-after-btn">返回上页</div>';
				$(".order-detail").html(html_text);
			}
		}
	}

	function _hide_order_detail(){
		$(".order-detail").hide();
		$(".order-context").show().parent().show();
	}

	//工具暴露方法
	$.util={
		get_food:function(data){
			getFoods(data);
		},
		//上一页
		prev_page_food:function(){
			prev_page_food();
		},
		//下一页
		next_page_food:function(){
			next_page_food();
		},
		//美食详情
		food_detail:function(data){
			_detail(data);
		},
		//隐藏美食详情,显示美食内容
		back_food:function(){
			_backfood();
		},
		//编辑美食
		food_edit:function(data){
			_edit(data);
		},
		//隐藏美食编辑
		back_foodByEdit:function(){
			_editfood();
		},
		//更新美食
		update_food:function(data){
			_update(data);
		},

		//订单部分
		get_order:function(data){
			getOrders(data);
		},
		//上一页
		prev_page_order:function(){
			_prev_page_order();
		},
		//下一页
		next_page_order:function(){
			_next_page_order();
		},
		//显示订单详情
		show_order_detail:function(data){
			_show_order_detail(data);
		},
		//隐藏订单详情
		hide_order_detail:function(){
			_hide_order_detail();
		},
		//模糊搜索美食列表
		search_food_url:function(data){
			getFoods(data);
		},
		//模糊搜索订单列表
		search_order_url:function(data){
			getFoods(data);
		}
	}


});